function validateSubmitDate(value) {
  const startDate = Date.parse(value);

  if (isNaN(startDate)) {
    throw new Error('Please, provide valid data format');
  }

  const dateRightFormat = new Date(value);

  const checkDay = dateRightFormat.getDay();
  const checkHour = dateRightFormat.getHours();

  if (checkDay === 1 || checkDay === 0) {
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

function CalculateDueDate(submitDate, turnaround) {
  console.log('test');
}

CalculateDueDate = validateDecorator(CalculateDueDate, [validateSubmitDate, validateTurnAround]);

CalculateDueDate('10 Mar 2020 10:59:00 GMT', 55);
