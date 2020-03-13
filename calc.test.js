const { CalculateDueDate } = require('./calc');
const { isWeekends } = require('./utils/helpers');

test('throw an error because unvalid date format', () => {
  expect(() => {
    CalculateDueDate('9 Mar 2020 16 GMT+0200', 4);
  }).toThrow();
});

test('throw an error because not working hours (over 17 PM)', () => {
  expect(() => {
    CalculateDueDate('9 Mar 2020 17:59:00 GMT+0200', 4);
  }).toThrow();
});

test('throw an error because not working hours (under 8 AM)', () => {
  expect(() => {
    CalculateDueDate('9 Mar 2020 7:59:00 GMT+0200', 4);
  }).toThrow();
});

test('throw an error because submited date is a weekend', () => {
  expect(() => {
    CalculateDueDate('8 Mar 2020 9:59:00 GMT+0200', 4);
  }).toThrow();
});

test('throw an error because turnaround time is not integer', () => {
  expect(() => {
    CalculateDueDate('8 Mar 2020 9:59:00 GMT+0200', 4.5);
  }).toThrow();
});

test('throw an error because turnaround time is not positive', () => {
  expect(() => {
    CalculateDueDate('8 Mar 2020 9:59:00 GMT+0200', -4);
  }).toThrow();
});

test('check how is weekend helper work. not weekend date', () => {
  const weekend = isWeekends(new Date('9 Mar 2020 9:59:00 GMT+0200'));
  expect(weekend).toEqual(false);
});

test('check how is weekend helper work. weekend date', () => {
  const weekend = isWeekends(new Date('14 Mar 2020 9:59:00 GMT+0200'));
  expect(weekend).toEqual(true);
});

test('simple check of the correct operation of the function', () => {
  const oneHourAdded = CalculateDueDate('9 Mar 2020 9:59:00 GMT+0200', 1);
  expect(oneHourAdded).toEqual('3/9/2020, 10:59:00 AM');
});

test('how to function skip weekends', () => {
  const oneHourAdded = CalculateDueDate('13 Mar 2020 16:59:00 GMT+0200', 1);
  expect(oneHourAdded).toEqual('3/16/2020, 9:59:00 AM');
});

test('how to function transition day to the next if time if over', () => {
  const oneHourAdded = CalculateDueDate('12 Mar 2020 16:59:00 GMT+0200', 1);
  expect(oneHourAdded).toEqual('3/13/2020, 9:59:00 AM');
});

test('check how to skip two weekends', () => {
  const oneHourAdded = CalculateDueDate('13 Mar 2020 16:59:00 GMT+0200', 80);
  expect(oneHourAdded).toEqual('3/27/2020, 4:59:00 PM');
});
