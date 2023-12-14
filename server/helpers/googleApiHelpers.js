const getTodayCalories = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await getDayCalories(fitness, dayStart, dayEnd);
  return extractData(resultData, "fpVal");
};

const get12WeekCalories = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setMonth(dayStart.getMonth() - 1);
  dayStart.setHours(0, 0, 0, 0);
  // dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const result = [];

  const resultData = await getWeekCalories(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData, "fpVal"));

  dayStart.setMonth(dayStart.getMonth() - 1);
  dayEnd.setMonth(dayEnd.getMonth() - 1);
  const resultData2 = await getWeekCalories(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData2, "fpVal"));

  dayStart.setMonth(dayStart.getMonth() - 1);
  dayEnd.setMonth(dayEnd.getMonth() - 1);
  const resultData3 = await getWeekCalories(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData3, "fpVal"));

  return result;
};

const get12DayCalories = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setDate(dayStart.getDate() - 11);
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await getDayCalories(fitness, dayStart, dayEnd);
  return extractArrayData(resultData, "fpVal");
};

const getTodaySteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await getDaySteps(fitness, dayStart, dayEnd);
  return extractData(resultData, "intVal");
};

const get12DaySteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setDate(dayStart.getDate() - 11);
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await getDaySteps(fitness, dayStart, dayEnd);
  return extractArrayData(resultData, "intVal");
};

const get30DaySteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setMonth(dayStart.getMonth() - 1);
  dayStart.setHours(0, 0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const resultData = await getDaySteps(fitness, dayStart, dayEnd);
  return extractArrayData(resultData, "intVal");
};

const get12WeekSteps = async (fitness) => {
  const dayStart = new Date();
  const dayEnd = new Date();
  dayStart.setMonth(dayStart.getMonth() - 1);
  dayStart.setHours(0, 0, 0, 0);
  // dayEnd.setDate(dayEnd.getDate() + 1);
  dayEnd.setHours(0, 0, 0, 0);
  const result = [];

  const resultData = await getWeekSteps(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData, "intVal"));

  dayStart.setMonth(dayStart.getMonth() - 1);
  dayEnd.setMonth(dayEnd.getMonth() - 1);
  const resultData2 = await getWeekSteps(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData2, "intVal"));

  dayStart.setMonth(dayStart.getMonth() - 1);
  dayEnd.setMonth(dayEnd.getMonth() - 1);
  const resultData3 = await getWeekSteps(fitness, dayStart, dayEnd);
  result.push(extractArrayData(resultData3, "intVal"));

  return result;
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
  if (data.data.bucket[0].dataset[0].point.length !== 0) {
    return data.data.bucket[0].dataset[0].point[0].value[0][valueKey];
  } else {
    return {
      message: "No Data Found",
    };
  }
};

const getDayCalories = async (fitness, start, end) => {
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
        },
      ],
      bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
      startTimeMillis: start.getTime(),
      endTimeMillis: end.getTime(),
    },
  });
  return resultData;
};
const getWeekCalories = async (fitness, start, end) => {
  const resultData = await fitness.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
        },
      ],
      bucketByTime: { durationMillis: 7 * 24 * 60 * 60 * 1000 },
      startTimeMillis: start.getTime(),
      endTimeMillis: end.getTime(),
    },
  });
  console.log(resultData.data.bucket);
  return resultData;
};

const getDaySteps = async (fitness, start, end) => {
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
      startTimeMillis: start.getTime(),
      endTimeMillis: end.getTime(),
    },
  });
  return resultData;
};

const getWeekSteps = async (fitness, start, end) => {
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
      bucketByTime: { durationMillis: 7 * 24 * 60 * 60 * 1000 },
      startTimeMillis: start.getTime(),
      endTimeMillis: end.getTime(),
    },
  });
  return resultData;
};

const extractArrayData = (data, valueKey) => {
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
  get12WeekCalories,
  get12DaySteps,
  get30DaySteps,
  get12WeekSteps,
};
