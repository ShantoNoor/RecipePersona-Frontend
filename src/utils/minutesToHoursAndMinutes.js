export default function minutesToHoursAndMinutes(minutes) {
  // Check for invalid input
  if (minutes < 0 || !Number.isInteger(minutes)) {
    throw new Error("Invalid input: minutes must be a non-negative integer.");
  }

  // Calculate hours and remaining minutes
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Format the output string
  const hoursString = hours === 0 ? "" : `${hours} Hour `;
  const minutesString =
    remainingMinutes === 0 ? "" : `${remainingMinutes} Minute`;

  return hoursString + minutesString;
}
