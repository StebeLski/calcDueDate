function validateSubmitDate(value) {
  // TODO check if submit date have valid format
  // TODO split this validator to error handling and requirements validation
  // if (!(value instanceof Date)) {
  //   throw new Error('Submit date must be a Date type')
  // }

  const startDate = Date.parse(value);

  if (isNaN(startDate)) {
    throw new Error('Please, provide valid date format');
  }

  const dateRightFormat = new Date(value);
  const checkDay = dateRightFormat.getDay();
  const checkHour = dateRightFormat.getHours();

  if (checkDay === 6 || checkDay === 0) {
    throw new Error('Please, provide working day (Mon to Fri)');
  }
  if (checkHour < 8 || checkHour > 16) {
    throw new Error('Please, provide working hours (from 9AM to 17PM)');
  }
  return;
}

function validateTurnAround(value) {
  if (!(value === parseInt(value, 10))) {
    throw new Error('Please, provide integer number of turnaround hours');
  }

  if (value <= 0) {
    throw new Error('Please, provide positive number');
  }
  return;
}

function validateDecorator(f, checks) {
  return function() {
    checks[0](arguments[0]);
    checks[1](arguments[1]);

    return f.apply(this, arguments);
  };
}

function isWeekends(date) {
  const day = date.getDay();
  if (day === 6) {
    return true;
  }
  return false;
}

module.exports = {
  validateSubmitDate,
  validateTurnAround,
  validateDecorator,
  isWeekends
};
