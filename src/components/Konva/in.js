export const obj = {
  id: "",
  name: "导航任务20230731174137",
  describe: "",
  method: "TASK_NAVIGATION",
  params: {
    circulate: 1,
    point: [
      {
        location: {
          x: "0.174888",
          y: "0.114216",
          omega: 0,
        },
        process: [],
        station: [],
      },
      {
        location: {
          x: "0.314898",
          y: "0.133333",
          omega: 0,
        },
        process: [],
        station: [],
      },
      {
        location: {
          x: "0.334330",
          y: "0.190196",
          omega: 0,
        },
        process: [],
        station: [],
      },
    ],
  },
  deviceIds: [],
  scenceId: "402888b489207a6a01892083339f0001",
};

const arr = [
  {
    location: {
      x: "0.174888",
      y: "0.114216",
      omega: 0,
    },
    process: [],
    station: [],
  },
  {
    location: {
      x: "0.314898",
      y: "0.133333",
      omega: 0,
    },
    process: [],
    station: [],
  },
  {
    location: {
      x: "0.334330",
      y: "0.190196",
      omega: 0,
    },
    process: [],
    station: [],
  },
];

const map = new Map();

arr.forEach((i, index) => {
  map.set(index, i);
});

export { map };
