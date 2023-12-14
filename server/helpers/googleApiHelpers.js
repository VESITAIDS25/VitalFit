const getTodayCalories = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: dayStart.getTime(),
      endTimeMillis: dayEnd.getTime(),
    },
  });
  return extractData(resultData, "fpVal");
};

const getTodaySteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
          dataSourceId:
            "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: dayStart.getTime(),
      endTimeMillis: dayEnd.getTime(),
    },
  });
  return extractData(resultData, "intVal");
};

const get12DaySteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setDate(dayStart.getDate() - 11);
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
          dataSourceId:
            "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: dayStart.getTime(),
      endTimeMillis: dayEnd.getTime(),
    },
  });
  return extract12DayData(resultData, "intVal");
};

const get12DayCalories = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setDate(dayStart.getDate() - 11);
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: dayStart.getTime(),
      endTimeMillis: dayEnd.getTime(),
    },
  });
  return extract12DayData(resultData, "fpVal");
};

const getTodayHeartPoints = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.heart_minutes",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: dayStart.getTime(),
      endTimeMillis: dayEnd.getTime(),
    },
  });

  return extractData(resultData, "fpVal");
};

const extractData = (data, valueKey) => {
  if (data.data.bucket[0].dataset[0].point) {
    return data.data.bucket[0].dataset[0].point[0].value[0][valueKey];
  } else {
    return {
      message: "No Data Found",
    };
  }
};

const extract12DayData = (data, valueKey) => {
  if (data.data.bucket[0].dataset[0].point) {
    return data.data.bucket.map((el) => {
      return el.dataset[0].point[0].value[0][valueKey];
    });
  }
};

module.exports = {
  getTodayCalories,
  getTodayHeartPoints,
  getTodaySteps,
  get12DayCalories,
  get12DaySteps,
};
