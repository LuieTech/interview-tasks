
function findAvailableSlots(bookedSlots) {

  const WORK_START_HOUR = 9;
  const WORK_END_HOUR = 17; 

  function generateSlotsForDate(date) {
    const slots = [];
    for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
      const start = hour.toString().padStart(2, "0") + ":00";
      const end = (hour + 1).toString().padStart(2, "0") + ":00";
      slots.push({ date, start, end });
    }
    return slots;
  }

  const bookingsByDate = {};
  for (const slot of bookedSlots) {
    if (!bookingsByDate[slot.date]) {
      bookingsByDate[slot.date] = new Set();
    }
    bookingsByDate[slot.date].add(slot.start);
  }

  const uniqueDates = [...new Set(bookedSlots.map((s) => s.date))];

  let availableSlots = [];

  for (const date of uniqueDates) {
    const allSlots = generateSlotsForDate(date);
    const bookedStarts = bookingsByDate[date] || new Set();

    const freeSlots = allSlots.filter((slot) => !bookedStarts.has(slot.start));

    availableSlots = availableSlots.concat(freeSlots);
  }

  availableSlots.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return a.start.localeCompare(b.start);
  });

  return availableSlots;
}

const bookedSlots = [
  { date: "2025-07-08", start: "09:00", end: "10:00" },
  { date: "2025-07-08", start: "13:00", end: "14:00" },
  { date: "2025-09-15", start: "09:00", end: "10:00" },
  { date: "2025-07-10", start: "09:00", end: "10:00" },
  { date: "2025-09-05", start: "10:00", end: "11:00" },
  { date: "2025-07-10", start: "10:00", end: "11:00" },
  { date: "2025-08-20", start: "15:00", end: "16:00" },
  { date: "2025-07-15", start: "14:00", end: "15:00" },
  { date: "2025-08-01", start: "12:00", end: "13:00" },
  { date: "2025-08-01", start: "13:00", end: "14:00" },
  { date: "2025-08-15", start: "10:00", end: "11:00" },
  { date: "2025-08-20", start: "09:00", end: "10:00" },
  { date: "2025-07-09", start: "11:00", end: "12:00" },
  { date: "2025-08-25", start: "11:00", end: "12:00" },
  { date: "2025-09-10", start: "14:00", end: "15:00" },
  { date: "2025-07-22", start: "15:00", end: "16:00" },
  { date: "2025-09-15", start: "12:00", end: "13:00" },
  { date: "2025-09-18", start: "11:00", end: "12:00" },
  { date: "2025-09-22", start: "16:00", end: "17:00" },
];

console.log(findAvailableSlots(bookedSlots));
