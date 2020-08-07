const FriendRequest = require("../models/FriendRequest");
const { formatResponse } = require("../library/formatResponse");
const User = require("../models/User");
/**Check for valid userId */
const validUserId = async (userId) => {
  //console.log("validate UserId:", userId);
  let validuserId = await User.findOne({ userId: userId });
  return !validuserId
    ? formatResponse(true, 404, "UserId Not Found", userId)
    : true;
};
exports.getFriendList = async (req, res) => {
  console.log("Get friend list control");
  const EXCLUDE = "-__v -_id";
  const { senderId } = req.body;

  /**Verify userId */
  let isUserIdValid = await validUserId(senderId);
  //console.log("isUserIdValid::", isUserIdValid);
  if (isUserIdValid.error)
    return res.status(isUserIdValid.status).json(isUserIdValid);

  /**get friend request information */

  let reqQuery = {
    $or: [
      {
        $and: [{ senderId: senderId }],
      },
      {
        $and: [{ recieverId: senderId }],
      },
    ],
  };
  FriendRequest.find(reqQuery)
    .select(EXCLUDE)
    .lean()
    .exec((error, friendRequests) => {
      console.log("error/FR in getting FriendRequest::", error);
      if (error !== null) {
        res
          .status(500)
          .json(
            formatResponse(true, 500, "Error Fetching Friend Requests", error)
          );
      } else {
        res
          .status(200)
          .json(
            formatResponse(false, 200, "FriendRequests Fetched", friendRequests)
          );
      }
    });
};
