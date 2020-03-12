function validateSubmitDate(value) {
  // TODO check if submit date have valid format
  // if (!(value instanceof Date)) {
  //   throw new Error('Submit date must be a Date type')
  // }

  const startDate = Date.parse(value);

  if (isNaN(startDate)) {
    throw new Error('Please, provide valid data format');
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

  return true;
}

function validateTurnAround(value) {
  if (!(value === parseInt(value, 10))) {
    throw new Error('Please, provide integer number of turnaround hours');
  }

  return true;
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

function CalculateDueDate(submitDate, turnaround) {
  const fullDays = turnaround / 8;
  const restHours = turnaround % 8;
  let startDate = new Date(submitDate);

  for (let i = 1; i < fullDays; i++) {
    startDate.setDate(startDate.getDate() + 1);
    if (isWeekends(startDate)) {
      startDate.setDate(startDate.getDate() + 2);
    }
  }
}

CalculateDueDate = validateDecorator(CalculateDueDate, [validateSubmitDate, validateTurnAround]);

CalculateDueDate('9 Mar 2020 10:59:00 GMT', 48);
