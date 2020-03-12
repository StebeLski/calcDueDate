const { validateSubmitDate, validateTurnAround, validateDecorator, isWeekends } = require('./utils/helpers');

function CalculateDueDate(submitDate, turnaround) {
  addingDays = () => {
    startDate.setDate(startDate.getDate() + 1);
    if (isWeekends(startDate)) {
      startDate.setDate(startDate.getDate() + 2);
    }
  };

  const fullDays = turnaround / 8;
  const restHours = turnaround % 8;
  let startDate = new Date(submitDate);
  let dateHours = startDate.getHours();

  startDate.setHours(9);
  dateHours += restHours - 9;

  for (let i = 0; i < fullDays; i++) {
    addingDays();
  }

  if (dateHours >= 8) {
    addingDays();
    dateHours -= 8;
  }

  startDate.setHours(startDate.getHours() + dateHours);

  return startDate.toLocaleString({ timeZone: 'Europe/Kiev' });
}

CalculateDueDate = validateDecorator(CalculateDueDate, [validateSubmitDate, validateTurnAround]);

CalculateDueDate('9 Mar 2020 16:59:00 GMT+0200', 48);
