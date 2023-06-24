// function to check a date is within 30 days from today
const isWithinLast30Days = (date) => {
  // Get today's date
  const today = new Date();

  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Convert both dates to their respective UTC values
  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const utcThirtyDaysAgo = Date.UTC(
    thirtyDaysAgo.getFullYear(),
    thirtyDaysAgo.getMonth(),
    thirtyDaysAgo.getDate()
  );

  // Convert the provided date to its UTC value
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  // Check if the date is within the last 30 days
  return utcDate >= utcThirtyDaysAgo && utcDate <= utcToday;
};

module.exports = {
  isWithinLast30Days,
};
