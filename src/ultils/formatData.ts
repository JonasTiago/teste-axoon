export const formatDate = (dateString: string) => {
  const regex = /^(\d{8})T(\d{6})\.(\d{3})000$/;
  const match = dateString.match(regex);

  if (!match) return ""; // Se não estiver no formato, retorna uma string vazia

  const datePart = match[1]; // '20240919'
  const timePart = match[2]; // '154055'

  // Extrai ano, mês, dia, horas, minutos e segundos
  const year = datePart.slice(0, 4);
  const month = datePart.slice(4, 6);
  const day = datePart.slice(6, 8);
  const hours = timePart.slice(0, 2);
  const minutes = timePart.slice(2, 4);
  const seconds = timePart.slice(4, 6);

  // Cria um objeto Date em UTC
  const date = new Date(
    Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    )
  );

  // Subtrai 3 horas
  date.setHours(date.getHours() - 3);

  // Monta a string no formato 'yyyy-MM-ddTHH:mm:ss'
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// export default formatDate;

export const reverseFormatDate = (formattedDate: string) => {
  const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
  const match = formattedDate.match(regex);

  if (!match) return ""; // Se não estiver no formato, retorna uma string vazia

  const year = match[1];
  const month = match[2];
  const day = match[3];
  const hours = match[4];
  const minutes = match[5];
  const seconds = match[6];

  // Cria um objeto Date em UTC
  const date = new Date(
    Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10) + 3, // Adiciona 3 horas
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    )
  );

  // Monta a string no formato 'yyyyMMddTHHmmss.SSS000'
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const timePart = date.toISOString().slice(11, 19).replace(/:/g, "");
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");

  return `${datePart}T${timePart}.${milliseconds}000`;
};
