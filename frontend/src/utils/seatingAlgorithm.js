export function generateSeats(
  students,
  rooms
) {
  let seating = [];

  let studentIndex = 0;

  rooms.forEach((room) => {
    for (
      let seat = 1;
      seat <= room.capacity;
      seat++
    ) {
      if (studentIndex >= students.length)
        break;

      seating.push({
        room: room.roomNo,
        seatNo: seat,
        student: students[studentIndex],
      });

      studentIndex++;
    }
  });

  return seating;
}