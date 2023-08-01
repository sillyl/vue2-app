export function getMapAllList() {
  return {
    code: 0,
    message: "success",
    response: [
      {
        id: "8ad8e8f485a9dd980185a9e1961d000d",
        no: null,
        name: "ff",
        type: 2,
        fileType: "png",
        from: "导入",
        location: "120.808416:30.800828:784.12",
        zoom: null,
        level: null,
        rectangle: null,
        offsetX: null,
        offsetY: null,
        createTime: 1673592411676,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "8ad8e8f486dda6520186ddb6b6310001",
        no: null,
        name: "南京地图",
        type: 2,
        fileType: "jpg",
        from: "导入",
        location: "119.068212:32.049673:600",
        zoom: "200:1000",
        level: "13:19",
        rectangle: "119.063496:32.047511:119.073498:32.051373",
        offsetX: null,
        offsetY: null,
        createTime: 1678756984369,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "8ad8e8f4875ad95901875adae5210000",
        no: null,
        name: "pgm地图",
        type: 0,
        fileType: "pgm",
        from: "导入",
        location: "",
        zoom: "",
        level: "",
        rectangle: "",
        offsetX: null,
        offsetY: null,
        createTime: 1680856507679,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "4028f08188044704018804502a6d0004",
        no: null,
        name: "map042801",
        type: 0,
        fileType: "pgm",
        from: "iii设备",
        location: null,
        zoom: null,
        level: null,
        rectangle: null,
        offsetX: null,
        offsetY: null,
        createTime: 1683699542636,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "40288ae988338d960188339047f20005",
        no: null,
        name: "testmap0515",
        type: 0,
        fileType: "pgm",
        from: "oooo设备",
        location: null,
        zoom: null,
        level: null,
        rectangle: null,
        offsetX: null,
        offsetY: null,
        createTime: 1684492273649,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "40288ae988338d96018833b6c7ac0015",
        no: null,
        name: "map051901",
        type: 0,
        fileType: "pgm",
        from: "pppp设备",
        location: null,
        zoom: null,
        level: null,
        rectangle: null,
        offsetX: null,
        offsetY: null,
        createTime: 1684494796716,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
      {
        id: "8ad8e8098967a3fd018967b1567a0003",
        no: null,
        name: "k",
        type: 0,
        fileType: "png",
        from: "导入",
        location: "",
        zoom: "",
        level: "",
        rectangle: "",
        offsetX: 0.0,
        offsetY: 0.0,
        createTime: 1689661822585,
        userId: "8ad8e8f485a9dd980185a9e131db000a",
      },
    ],
  };
}

export function viewMap(id) {
  return;
}

export function getAllDeviceList(scenceId, matchScence) {
  return {
    code: 0,
    message: "success",
    response: [
      {
        key: "402888ef891e589101891e5ecde00001",
        label: "辅助pingtai",
      },
    ],
  };
}

export function getDeviceInfo(id) {
  return {
    code: 0,
    message: "success",
    response: {
      id: "402888ef891e589101891e5ecde00001",
      sn: "1",
      mapDeviceId: null,
      name: "辅助平台",
      location: "",
      ip: "192.168.8.102",
      port: 8083,
      videoUrls: ["rtsp://192.168.1.108:554/id=1&type=1"],
      rosDescUrl: null,
      rosBridgeUrl: "ws://192.168.8.102:9090",
      createTime: 1688431676896,
      groupId: "8ad8e8f485b9375b0185b9385f4d0001",
      productId: "2c951081879df83401879dfcc5d00001",
      userId: "8ad8e8f485a9dd980185a9e131db000a",
      deviceStatus: 0,
      curMapId: null,
      curScenceId: "402888b489207a6a01892083339f0001",
      curTaskId: "8ad8e80989ae76270189b0270e700004",
    },
  };
}

export function getScenceList(status) {
  return {
    code: 0,
    message: "success",
    response: [
      {
        id: "402888b489207a6a01892083339f0001",
        userId: "8ad8e8f485a9dd980185a9e131db000a",
        name: "建图任务20230704184646",
        deviceIds: ["402888ef891e589101891e5ecde00001"],
        channels: null,
        mapId: null,
        status: "Open",
        subscribeId: null,
        videoPushs: null,
        timeScope: 1000,
        createTime: 1688467616670,
      },
    ],
  };
}

export function addScence(data) {
  return;
}

export function getScenceMetaTaskList(type) {
  return {
    code: 0,
    message: "success",
    response: [
      {
        id: "8ad8e8f485a9dd980185a9dda0710004",
        name: "编队",
        describe: "",
        method: "TASK_TEAM",
        params: null,
        type: 2,
        createTime: 1673592152177,
      },
      {
        id: "8ad8e8f485a9dd980185a9dda0720005",
        name: "围捕",
        describe: "",
        method: "TASK_ROUNDUP",
        params: null,
        type: 2,
        createTime: 1673592152178,
      },
      {
        id: "8ad8e8f485a9dd980185a9dda0730006",
        name: "侦查",
        describe: "",
        method: "TASK_INVESTIGATE",
        params: null,
        type: 0,
        createTime: 1673592152179,
      },
      {
        id: "8ad8e8f485a9dd980185a9dda0740007",
        name: "抓取",
        describe: "",
        method: "TASK_GRAB",
        params: null,
        type: 2,
        createTime: 1673592152180,
      },
      {
        id: "8ad8e8f485a9dd980185a9dda0750008",
        name: "建图",
        describe: "",
        method: "TASK_MAPPING",
        params: null,
        type: 2,
        createTime: 1673592152181,
      },
      {
        id: "8ad8e8f485a9dd980185a9dda0760009",
        name: "导航",
        describe: "",
        method: "TASK_NAVIGATION",
        params: null,
        type: 0,
        createTime: 1673592152182,
      },
      {
        id: "1",
        name: "目标识别",
        describe: "",
        method: "TASK_RECOGNITION",
        params: null,
        type: 1,
        createTime: 1673592152182,
      },
      {
        id: "2",
        name: "目标跟踪",
        describe: "",
        method: "TASK_TRACKING",
        params: null,
        type: 2,
        createTime: 1673592152182,
      },
    ],
  };
}

export function getTaskInfo(id) {
  return;
}

export function addTask(data) {
  return;
}

export function updateTask(data) {
  return;
}

export function getIdentifierList() {
  return {
    code: 0,
    message: "success",
    response: [
      {
        id: "1",
        name: "苹果",
        code: "1",
        createTime: 1673592152182,
      },
      {
        id: "2",
        name: "手雷",
        code: "2",
        createTime: 1673592152182,
      },
      {
        id: "3",
        name: "猫",
        code: "3",
        createTime: 1673592152182,
      },
      {
        id: "4",
        name: "人",
        code: "4",
        createTime: 1673592152182,
      },
    ],
  };
}
