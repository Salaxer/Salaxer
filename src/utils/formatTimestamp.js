import { DateTime } from "luxon";

function formatTimestamp(timestamp) {
    // Convertir el timestamp de Firebase a un objeto DateTime de Luxon
    const date = DateTime.fromJSDate(timestamp);
    const now = DateTime.now();

    // Comparar fechas ignorando las horas
    const isToday = date.hasSame(now, "day");
    const isYesterday = date.hasSame(now.minus({ days: 1 }), "day");
    if (isToday) {
      // Hoy
      return date.toFormat("hh:mm a");
    } else if (isYesterday) {
      // Ayer
      return `Yesterday ${date.toFormat("hh:mm a")}`;
    } else if (now.diff(date, "days").days < 7) {
      // Dentro de la última semana
      return `${date.toFormat("cccc, hh:mm a")}`;
    } else {
      // Más de una semana
      return date.toFormat("dd/MM/yyyy hh:mm a");
    }
}

export default formatTimestamp;