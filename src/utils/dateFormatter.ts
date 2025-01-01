export const formatDate = (inputDate: string): string => {
  if (!inputDate) return "";
  const date = new Date(inputDate);

  // Check if the input includes time
  const includesTime =
    inputDate.includes("T") && inputDate.split("T")[1].trim() !== "";

  // Format based on the presence of time
  const formattedDate = includesTime
    ? `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
    : `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;

  return formattedDate;
};

export const reformatDate = (formattedDate: string): string => {
  if (!formattedDate) return "";
  const [time, date] = formattedDate.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const [day, month, year] = date.split("-").map(Number);

  const dateObj = new Date(year, month - 1, day, hours, minutes);

  return dateObj.toISOString();
};
