define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/getFriendRequests",
    "title": "Get Friend Requests for A User",
    "version": "0.0.1",
    "group": "MultiUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>user's or sender unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Get FriendRequest Status Sample Request",
          "content": "{\n       \"senderId\":\"eetkc3U56\"\n   }",
          "type": "json"
        },
        {
          "title": "Get FriendRequest Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "Get FriendRequest No AuthToken Request",
          "content": "{\n       \"subTaskId\": \"sEFE9f0Nb\",\n       \"taskId\": \"gKmVTLkfa\",\n       \"operation\": \"delete\",\n       \"userId\": \"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Get FriendRequest Status Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"FriendRequests Fetched\",\n        \"data\": [\n            {\n                \"status\": \"accepted\",\n                \"createdOn\": \"2020-08-03T13:07:42.309Z\",\n                \"uniqueCombination\": \"F7cL5F5Xm:eetkc3U56\",\n                \"recieverId\": \"eetkc3U56\",\n                \"recieverName\": \"saurabh bharti\",\n                \"senderId\": \"F7cL5F5Xm\",\n                \"senderName\": \"nancy sams\"\n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get FriendRequest Invalid Params Response",
          "content": "{\n    \"error\": true,\n    \"status\": \"Not Valid Input Params\",\n    \"message\": \"\\\"senderId\\\" is required\"\n}",
          "type": "json"
        },
        {
          "title": "Get FriendRequest No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "MultiUser",
    "name": "PostApiV1Getfriendrequests"
  },
  {
    "type": "post",
    "url": "/api/v1/createSubTask",
    "title": "Create a SubTask",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>SubTask Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of Subtask</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SubTask Create Sample Request",
          "content": "{\n      \"taskId\": \"gKmVTLkfa\",\n      \"userId\": \"QWLx8cOcJ\",\n      \"name\":\"sub-task 1\",\n      \"status\":\"open\"\n    }",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid Name Request",
          "content": "{\n     \"taskId\": \"gKmVTLkfa\",\n     \"userId\": \"QWLx8cOcJ\",\n     \"name\":\"sub-task 1\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid User Request",
          "content": "{\n     \"taskId\": \"gKmVTLkfa\",\n     \"userId\": \"QWLx8cO\",\n     \"name\":\"sub-task 1\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid TaskId Request",
          "content": "{\n     \"taskId\": \"gKmVTLk\",\n     \"userId\": \"QWLx8cO\",\n     \"name\":\"sub-task 1\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "SubTask Creation Existing SubTaskName Request",
          "content": "{\n     \"taskId\": \"gKmVTLkfa\",\n     \"userId\": \"QWLx8cO\",\n     \"name\":\"sub-task 1\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "SubTask Creation No AuthToken Request",
          "content": "{\n     \"name\": \"start-project\",\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "SubTask Creation Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"Sub Task Created\",\n        \"data\": {\n            \"createdOn\": \"2020-08-06T13:19:18.506Z\",\n            \"status\": \"open\",\n            \"name\": \"sub-task 1\",\n            \"subTaskId\": \"sEFE9f0Nb\",\n            \"taskId\": \"gKmVTLkfa\",\n            \"userId\": \"QWLx8cOcJ\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "SubTask Creation Invalid Name Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" length must be at least 3 characters long\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" is required\",\n    \"\\\"taskId\\\" is required\",\n    \"\\\"status\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid User  Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"UserId Not Found\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        },
        {
          "title": "SubTask Creation Invalid TaskId  Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"TaskId Not Found\",\n  \"data\": \"gKmVTLk\"\n}",
          "type": "json"
        },
        {
          "title": "SubTask Creation Existing SubTaskName Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"Sub Task Name Exists\",\n  \"data\": \"sub-task 1\"\n}",
          "type": "json"
        },
        {
          "title": "SubTask Creation No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Createsubtask"
  },
  {
    "type": "post",
    "url": "/api/v1/createTaskList",
    "title": "Create a tasklist",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>TaskList Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TaskList Create Sample Request",
          "content": "{\n      \"name\": \"start-project\",\n      \"userId\":\"QWLx8cOcJ\"\n    }",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid Name Request",
          "content": "{\n     \"name\": \"st\",\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid User Request",
          "content": "{\n     \"name\": \"start-project\",\n     \"userId\":\"QWLx8c\"\n   }",
          "type": "json"
        },
        {
          "title": "TaskList Creation No AuthToken Request",
          "content": "{\n     \"name\": \"start-project\",\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "TaskList Creation Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Task List Created\",\n      \"data\": {\n        \"createdOn\": \"2020-08-06T10:56:31.573Z\",\n        \"name\": \"start-project\",\n        \"userId\": \"QWLx8cOcJ\",\n        \"taskListId\": \"BUpX2mV3E\"\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "TaskList Creation Invalid Name Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" length must be at least 3 characters long\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"UserId Not Found\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        },
        {
          "title": "TaskList Creation No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Createtasklist"
  },
  {
    "type": "post",
    "url": "/api/v1/createTaskList",
    "title": "Create a tasklist",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Task Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskListId",
            "description": "<p>List's Unique Id for the task</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "useruserIdId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of task open/done</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Task Create Sample Request",
          "content": "{\n      \"name\":\"task 1\",\n      \"taskListId\":\"BUpX2mV3E\",\n      \"userId\":\"QWLx8cOcJ\",\n      \"status\":\"open\"\n    }",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid Name Request",
          "content": "{\n     \"name\":\"t\",\n     \"taskListId\":\"BUpX2mV3E\",\n     \"userId\":\"QWLx8cOcJ\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid TaskListId Request",
          "content": "{\n     \"name\":\"t\",\n     \"taskListId\":\"BUpX2mV\",\n     \"userId\":\"QWLx8cOcJ\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid userId Request ",
          "content": "{\n     \"name\":\"t\",\n     \"taskListId\":\"BUpX2mV3E\",\n     \"userId\":\"QWLx8cO\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "Task Creation Existing TaskName Request ",
          "content": "{\n     \"name\":\"task 1\",\n     \"taskListId\":\"BUpX2mV3E\",\n     \"userId\":\"QWLx8cOcJ\",\n     \"status\":\"open\"\n   }",
          "type": "json"
        },
        {
          "title": "Task Creation No AuthToken Request",
          "content": "{\n     \"name\": \"start-project\",\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Task Creation Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"Task Created\",\n        \"data\": {\n            \"createdOn\": \"2020-08-06T11:40:50.967Z\",\n            \"name\": \"task 1\",\n            \"taskId\": \"_0g28dnYQ\",\n            \"taskListId\": \"BUpX2mV3E\",\n            \"userId\": \"QWLx8cOcJ\",\n            \"status\": \"open\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Task Creation Invalid Name Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" length must be at least 3 characters long\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"name\\\" is required\",\n    \"\\\"taskListId\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "TaskList Creation Invalid TaskListId Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"TaskListId Not Found\",\n  \"data\": \"BUpX2mV\"\n}",
          "type": "json"
        },
        {
          "title": "Task Creation Invalid userId  Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"UserId Not Found\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        },
        {
          "title": "Task Creation Existing TaskName  Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Task Name Exists\",\n  \"data\": \"task 1\"\n}",
          "type": "json"
        },
        {
          "title": "Task Creation No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Createtasklist"
  },
  {
    "type": "post",
    "url": "/api/v1/getAllTaskList?skip=[value]",
    "title": "Get all Tasklists for a user",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TaskList Create Sample Request",
          "content": "{\n      \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTaskList Invalid User Request",
          "content": "{\n     \"userId\":\"QWLx8c\"\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTaskList Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTaskList No AuthToken Request",
          "content": "{\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Get AllTaskList Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Task List Fetched\",\n      \"data\": [\n        {\n            \"createdOn\": \"2020-08-06T10:56:31.573Z\",\n            \"name\": \"start-project\",\n            \"userId\": \"QWLx8cOcJ\",\n            \"taskListId\": \"BUpX2mV3E\"\n        }\n      ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get AllTaskList Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"UserId Not Found\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        },
        {
          "title": "Get AllTaskList Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Get AllTaskList Sample Error Response 3",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1GetalltasklistSkipValue"
  },
  {
    "type": "post",
    "url": "/api/v1/getSubTasks",
    "title": "Get all SubTasks for a Task",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task's Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TaskList Create Sample Request",
          "content": "{\n   \"taskId\": \"gKmVTLkfa\" \n   }",
          "type": "json"
        },
        {
          "title": "Get AllSubTasks Invalid TaskId Request",
          "content": "{\n     \"taskId\": \"gKmVTLkf\"\n   }",
          "type": "json"
        },
        {
          "title": "Get AllSubTasks Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "Get AllSubTasks No AuthToken Request",
          "content": "{\n     \"taskId\": \"gKmVTLkfa\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Get AllSubTasks Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"Fetched Subtasks\",\n        \"data\": [\n            {\n                \"createdOn\": \"2020-08-06T13:19:18.506Z\",\n                \"status\": \"open\",\n                \"name\": \"sub-task 1\",\n                \"subTaskId\": \"sEFE9f0Nb\",\n                \"taskId\": \"gKmVTLkfa\",\n                \"userId\": \"QWLx8cOcJ\"\n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get AllSubTasks Invalid TaskId Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"TaskId Not Found\",\n  \"data\": \"gKmVTLkf\"\n}",
          "type": "json"
        },
        {
          "title": "Get AllSubTasks Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"taskId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Get AllSubTasks Sample Error Response 3",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Getsubtasks"
  },
  {
    "type": "post",
    "url": "/api/v1/getTasks",
    "title": "Get all Tasks for a user & TaskList",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskListId",
            "description": "<p>TaskLists's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "userId",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TaskList Create Sample Request",
          "content": "{\n   \"taskListId\": \"BUpX2mV3E\",\n      \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTasks Invalid User Request",
          "content": "{\n     \"taskListId\": \"BUpX2mV3E\",\n     \"userId\":\"QWLx8cO\"\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTasks Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "Get AllTasks No AuthToken Request",
          "content": "{\n     \"taskListId\": \"BUpX2mV3E\",\n     \"userId\":\"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Get AllTasks Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Fetched Tasks\",\n      \"data\": [\n        {\n            \"createdOn\": \"2020-08-06T11:40:50.967Z\",\n            \"name\": \"task 1\",\n            \"taskId\": \"_0g28dnYQ\",\n            \"taskListId\": \"BUpX2mV3E\",\n            \"userId\": \"QWLx8cOcJ\",\n            \"status\": \"open\"\n        }\n      ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get AllTasks Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": 404,\n  \"message\": \"UserId Not Found\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        },
        {
          "title": "Get AllTasks Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"userId\\\" is required\",\n    \"\\\"taskListId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Get AllTasks Sample Error Response 3",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Gettasks"
  },
  {
    "type": "post",
    "url": "/api/v1/revertChanges",
    "title": "Undo Last Change Done by a User",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Undo Last Change Sample Request",
          "content": "{\n        \"userId\":\"eetkc3U56\"\n   }",
          "type": "json"
        },
        {
          "title": "Undo Last Change No Change Request",
          "content": "{\n       \"userId\":\"eetkc3U\"\n   }",
          "type": "json"
        },
        {
          "title": "Undo Last Change No AuthToken Request",
          "content": "{\n       \"userId\":\"eetkc3U\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Undo Last Change Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"Revert Success\",\n        \"data\": {\n            \"_id\": \"5f2b3ba7bf4dd9121909b52e\",\n            \"userId\": \"eetkc3U56\",\n            \"entity\": \"TaskList\",\n            \"updatedOn\": \"2020-08-05T23:07:19.959Z\",\n            \"updateId\": \"eetkc3U56:hArugVncn:1596668839959\",\n            \"operation\": \"create\",\n            \"__v\": 0\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Undo Last Change No Change Response",
          "content": "{\n    \"error\": true,\n    \"status\": 404,\n    \"message\": \"No Historic Data Found\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Undo Last Change No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Revertchanges"
  },
  {
    "type": "post",
    "url": "/api/v1/updateSubTask",
    "title": "Update a SubTask",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subTaskId",
            "description": "<p>SubTask's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>operation edit/delete</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "Request-Example:",
            "description": "<p>[update:{ &quot;name&quot;: &quot;updated-name&quot;,&quot;status&quot;: &quot;done&quot;,&quot;taskId&quot;: &quot;5ipvkk7Vn&quot; }]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update a SubTask Sample Request",
          "content": "{\n        \"subTaskId\": \"sEFE9f0Nb\",\n        \"taskId\": \"gKmVTLkfa\",\n        \"operation\": \"edit\",\n        \"userId\": \"QWLx8cOcJ\",\n        \"update\":{\n            \"name\":\"updated-sub\",\n            \"status\":\"done\",\n            \"taskId\":\"gKmVTLkfa\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "Delete a SubTask Sample Success Request",
          "content": "{\n       \"subTaskId\": \"sEFE9f0Nb\",\n       \"taskId\": \"gKmVTLkfa\",\n       \"operation\": \"delete\",\n       \"userId\": \"QWLx8cOcJ\"\n   }",
          "type": "json"
        },
        {
          "title": "update/delete SubTask Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "update/delete SubTask No AuthToken Request",
          "content": "{\n       \"subTaskId\": \"sEFE9f0Nb\",\n       \"taskId\": \"gKmVTLkfa\",\n       \"operation\": \"delete\",\n       \"userId\": \"QWLx8cOcJ\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Update a SubTask Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"SubTask Updated\",\n      \"data\": \"1-doc updated\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete a SubTask Sample Success Response",
          "content": "{\n  \"error\": false,\n  \"status\": 200,\n  \"message\": \"SubTask Deleted\",\n  \"data\": \"1-doc deleted\"\n}",
          "type": "json"
        },
        {
          "title": "update/delete SubTask Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"operation\\\" is required\",\n    \"\\\"taskId\\\" is required\",\n    \"\\\"subTaskId\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "update/delete SubTask No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Updatesubtask"
  },
  {
    "type": "post",
    "url": "/api/v1/updateTask",
    "title": "Update a Task",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskIdId",
            "description": "<p>Task's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskListId",
            "description": "<p>TaskList's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>operation edit/delete</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "Request-Example:",
            "description": "<p>[update:{ &quot;name&quot;: &quot;updated-name&quot;,&quot;status&quot;: &quot;done&quot;,&quot;taskListId&quot;: &quot;5ipvkk7Vn&quot; }]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update a Task Sample Request",
          "content": "{\n        \"taskId\": \"_0g28dnYQ\",\n        \"taskListId\": \"BUpX2mV3E\",\n        \"userId\": \"QWLx8cOcJ\",\n        \"operation\": \"edit\",\n        \"update\": {\n            \"name\": \"task 2\",\n            \"status\": \"done\",\n            \"taskListId\": \"9BtUxPstM\"\n        }\n    }",
          "type": "json"
        },
        {
          "title": "Delete a Task Sample Success Request",
          "content": "{\n     \"taskId\": \"_0g28dnYQ\",\n     \"taskListId\": \"BUpX2mV3E\",\n     \"userId\": \"QWLx8cOcJ\",\n     \"operation\": \"delete\"\n   }",
          "type": "json"
        },
        {
          "title": "update/delete Task Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "update/delete Task No AuthToken Request",
          "content": "{\n     \"taskId\": \"_0g28dnYQ\",\n     \"taskListId\": \"BUpX2mV3E\",\n     \"userId\": \"QWLx8cOcJ\",\n     \"operation\": \"delete\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Update a Task Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Task Updated\",\n      \"data\": \"1-doc updated\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete a Task Sample Success Response",
          "content": "{\n  \"error\": false,\n  \"status\": 200,\n  \"message\": \"Task deleted\",\n  \"data\": \"1-docs deleted\"\n}",
          "type": "json"
        },
        {
          "title": "update/delete Task Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n     \"\\\"taskListId\\\" is required\",\n    \"\\\"operation\\\" is required\",\n    \"\\\"taskId\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "update/delete Task No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"_0g28dnYQ\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Updatetask"
  },
  {
    "type": "post",
    "url": "/api/v1/updateTaskList",
    "title": "Update name of a Tasklist",
    "version": "0.0.1",
    "group": "TaskManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskListId",
            "description": "<p>TaskList's Unique Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>operation edit/delete</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "Request-Example:",
            "description": "<p>[update:{ &quot;name&quot;: &quot;updated-name&quot; }]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update a TaskList Sample Request",
          "content": "{\n     \"userId\": \"QWLx8cOcJ\",\n     \"taskListId\": \"BUpX2mV3E\",\n     \"operation\": \"edit\",\n     \"update\": {\n        \"name\": \"project-complete\"\n     }\n    }",
          "type": "json"
        },
        {
          "title": "Delete a TaskList Sample Success Request",
          "content": "{\n     \"userId\": \"QWLx8cOcJ\",\n     \"taskListId\": \"6Z99Ytlax\",\n     \"operation\": \"delete\"\n   }",
          "type": "json"
        },
        {
          "title": "update/delete TaskList Invalid Params Request",
          "content": "{\n    //blank request\n   }",
          "type": "json"
        },
        {
          "title": "update/delete TaskList No AuthToken Request",
          "content": "{\n     \"userId\": \"QWLx8cOcJ\",\n     \"taskListId\": \"6Z99Ytlax\",\n     \"operation\": \"delete\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>AuthorizationToken Recieved after Login Success</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Update a TaskList Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"TaskList Updated\",\n      \"data\": \"1-doc updated\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete a TaskList Sample Success Response",
          "content": "{\n  \"error\": false,\n  \"status\": 200,\n  \"message\": \"TaskList deleted\",\n  \"data\": \"1-docs deleted\"\n}",
          "type": "json"
        },
        {
          "title": "update/delete TaskList Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n    \"\\\"taskListId\\\" is required\",\n    \"\\\"operation\\\" is required\",\n    \"\\\"userId\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "update/delete TaskList No AuthToken Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"AuthToken Missing\",\n  \"data\": \"QWLx8cO\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "TaskManagement",
    "name": "PostApiV1Updatetasklist"
  },
  {
    "type": "post",
    "url": "/api/v1/login",
    "title": "Login a user",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Sample Request",
          "content": "{\n      \"email\":\"user@gmail.com\",\n      \"password\":\"saurabh123123\"\n    }",
          "type": "json"
        },
        {
          "title": "Login Invalid User Request",
          "content": "{\n      \"email\":\"us@gmail.com\",\n      \"password\":\"saurabh123123\"\n   }",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"email\":\"user@gmail.com\",\n      \"password\":\"saurabh1231\"\n   }",
          "type": "json"
        },
        {
          "title": "Login Invalid Params Request",
          "content": "{\n      \"email\":\"user@gmail.com\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sign-Up Success Response",
          "content": "{\n       \"error\": false,\n       \"status\": 200,\n       \"message\": \"Login Sucess\",\n       \"data\": {\n          \"createdOn\": \"2020-08-06T10:15:33.561Z\",\n          \"friends\": [],\n          \"userId\": \"QWLx8cOcJ\",\n          \"firstName\": \"nancy\",\n          \"lastName\": \"sams\",\n          \"email\": \"user@gmail.com\",\n          \"mobile\": \"223466372421\",\n          \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlRyRXNUNFVEZiIsImlhdCI6MTU5NjcwOTQxODE1NSwiZXhwIjoxNTk2ODgyMjE4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJrYW5iYW5Cb2FyZCIsImRhdGEiOnsiY3JlYXRlZE9uIjoiMjAyMC0wOC0wNlQxMDoxNTozMy41NjFaIiwiZnJpZW5kcyI6W10sInVzZXJJZCI6IlFXTHg4Y09jSiIsImZpcnN0TmFtZSI6Im5hbmN5IiwibGFzdE5hbWUiOiJzYW1zIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsIm1vYmlsZSI6IjIyMzQ2NjM3MjQyMSJ9fQ.Qktve9MPXunk4dn5ETDsZOpEFrG_dnwcpIdILWwaXPo\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Login Invalid User Response",
          "content": "{\n   \"error\": true,\n   \"status\": 404,\n   \"message\": \"User Not Found\",\n   \"data\": \"us@gmail.com\"\n}",
          "type": "json"
        },
        {
          "title": "Login Invalid Password Request",
          "content": "{\n      \"error\": true,\n      \"status\": 401,\n      \"message\": \"Login Failed\",\n      \"data\": null\n   }",
          "type": "json"
        },
        {
          "title": "Login Invalid Params Request",
          "content": "{\n      \"error\": true,\n      \"status\": 400,\n      \"message\": \"Not valid Input Params\",\n      \"data\": [\n         \"\\\"password\\\" is required\"\n      ]\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Login"
  },
  {
    "type": "post",
    "url": "/api/v1/recoverPassword",
    "title": "RecoverPassword Via Email",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "RecoverPassword Sample Request",
          "content": "{\n      \"email\":\"user@gmail.com\",\n   }",
          "type": "json"
        },
        {
          "title": "RecoverPassword Invalid User Request",
          "content": "{\n      \"email\":\"us@gmail.com\"   \n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "RecoverPassword Success Response",
          "content": "{\n       \"error\": false,\n       \"status\": 200,\n       \"message\": \"Recovery Sucess\",\n       \"data\": {\n           \"email\": \"user@gmail.com\",\n           \"recoveryCode\": 759774,\n           \"Operation\": \"Email Sent\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "RecoverPassword Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": \"404\",\n  \"message\": \"User Not Found\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Recoverpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/resetPassword",
    "title": "ResetPassword for a User",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recoveryCode",
            "description": "<p>RecoveryCode sent in email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>NewPassword SetBy the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ResetPassword Sample Request",
          "content": "{\n       \"recoveryCode\":\"759774\",\n       \"email\":\"user@gmail.com\",\n       \"password\":\"bharti123\"\n    }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid User Request",
          "content": "{\n     \"recoveryCode\":\"759774\",\n     \"email\":\"us@gmail.com\",\n     \"password\":\"bharti123\"\n   }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid Params Request",
          "content": "{\n     \"recoveryCode\":\"759774\",\n     \"email\":\"user@gmail.com\",\n   }",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid RecoveryCode Request",
          "content": "{\n     \"recoveryCode\":\"546346\",\n     \"email\":\"user@gmail.com\",\n     \"password\":\"bharti123\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "ResetPassword Success Response",
          "content": "{\n      \"error\": false,\n      \"status\": 200,\n      \"message\": \"Password Reset Success\",\n      \"data\": {\n        \"updated\": 1,\n        \"email\": \"user@gmail.com\"\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "ResetPassword Invalid User Response",
          "content": "{\n  \"error\": true,\n  \"status\": \"404\",\n  \"message\": \"User Not Found\",\n  \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid Params Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not valid Input Params\",\n  \"data\": [\n     \"\\\"password\\\" is required\"\n  ]\n}",
          "type": "json"
        },
        {
          "title": "ResetPassword Invalid RecoveryCode Response",
          "content": "{\n  \"error\": true,\n  \"status\": 400,\n  \"message\": \"Not Valid RecoveryCode\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Resetpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/signup",
    "title": "Register a new user",
    "version": "0.0.1",
    "group": "UserManagement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Firstname of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Lastname of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password needed for login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sign-Up Sample Request",
          "content": "{\n     \"firstName\": \"nancy\",\n     \"lastName\":\"sams\",\n     \"email\":\"user@gmail.com\",\n     \"mobile\":223466372421,\n     \"password\":\"Aasdkjte123\"\n    }",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid Params Request",
          "content": "{\n     \"firstName\": \"nancy\",\n     \"email\":\"user@gmail.com\",\n     \"mobile\":223466372421,\n     \"password\":\"Aasdkjte123\"\n   }",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid User Request",
          "content": "{\n     \"firstName\": \"nancy\",\n     \"email\":\"user@gmail.com\",\n     \"mobile\":223466372421,\n     \"password\":\"Aasdkjte123\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sign-Up Success Response",
          "content": "{\n        \"error\": false,\n        \"status\": 200,\n        \"message\": \"User Create Sucess\",\n        \"data\": {\n            \"createdOn\": \"2020-08-06T10:15:33.561Z\",\n            \"friends\": [],\n            \"userId\": \"QWLx8cOcJ\",\n            \"firstName\": \"nancy\",\n            \"lastName\": \"sams\",\n            \"email\": \"user@gmail.com\",\n            \"mobile\": \"223466372421\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Sign-Up Invalid Params Response",
          "content": "{\n    \"error\": true,\n    \"status\": 400,\n    \"message\": \"Not valid Input Params\",\n    \"data\": [\n        \"\\\"lastName\\\" is required\"\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Sign-Up Invalid User Request",
          "content": "{\n      \"error\": true,\n      \"status\": 401,\n      \"message\": \"User Exists\",\n      \"data\": \"user@gmail.com\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "router/apidoc.js",
    "groupTitle": "UserManagement",
    "name": "PostApiV1Signup"
  }
] });
