const parseDate = (formattedDateTime: string) => {
  // Quebrar a string formatada no formato "dd/MM/yyyy HH:mm:ss"
  const [datePart, timePart] = formattedDateTime.split(" ");
  if (!datePart || !timePart) {
    throw new Error(
      "Input is not in the expected format 'dd/MM/yyyy HH:mm:ss'"
    );
  }

  const [day, month, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(":");

  if (!day || !month || !year || !hours || !minutes || !seconds) {
    throw new Error("Incomplete date or time values");
  }

  // Criar um objeto de data local, garantindo que todos os valores sejam numéricos
  const localDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // Meses no JS começam do 0
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(seconds, 10)
  );

  if (isNaN(localDate.getTime())) {
    throw new Error("Invalid date");
  }

  // Ajustar para o formato esperado "yyyyMMddTHHmmss.SSS000"
  const isoYear = String(localDate.getFullYear());
  const isoMonth = String(localDate.getMonth() + 1).padStart(2, "0");
  const isoDay = String(localDate.getDate()).padStart(2, "0");
  const isoHours = String(localDate.getHours()).padStart(2, "0");
  const isoMinutes = String(localDate.getMinutes()).padStart(2, "0");
  const isoSeconds = String(localDate.getSeconds()).padStart(2, "0");
  const isoMilliseconds = String(localDate.getMilliseconds()).padStart(3, "0");

  // Montar o formato final "yyyyMMddTHHmmss.SSS000"
  const reversedDateTime = `${isoYear}${isoMonth}${isoDay}T${isoHours}${isoMinutes}${isoSeconds}.${isoMilliseconds}000`;

  return reversedDateTime;
};

export default parseDate;
