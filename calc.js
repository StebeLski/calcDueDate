const { validateSubmitDate, validateTurnAround, validateDecorator, isWeekends } = require('./utils/helpers');
/**
 *
 * @param {string} submitDate string date
 * @param {number} turnaround integer posotive number
 *
 * @returns {date}  calculating date in local format and kyiv timezone
 */
function CalculateDueDate(submitDate, turnaround) {
  const fullDays = turnaround / 8;
  const restHours = turnaround % 8;
  let startDate = new Date(submitDate);
  let dateHours = startDate.getHours();

  startDate.setHours(9);
  dateHours += restHours - 9;

  addingDays = () => {
    startDate.setDate(startDate.getDate() + 1);
    if (isWeekends(startDate)) {
      startDate.setDate(startDate.getDate() + 2);
    }
  };

  for (let i = 1; i <= fullDays; ++i) {
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

module.exports = {
  CalculateDueDate
};
