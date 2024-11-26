export default function formatPhoneNumber(input: string) {
  const isValid = /^\d{10}$/.test(input);
  if (!isValid) {
    return "Invalid input. Please provide a string of 10 digits.";
  }

  const countryCode = "+84";
  const carrierCode = input.substring(1, 4);
  const part1 = input.substring(4, 7);
  const part2 = input.substring(7);

  return `(${countryCode}) ${carrierCode} ${part1} ${part2}`;
}
