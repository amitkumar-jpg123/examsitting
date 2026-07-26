function RoomTable({ rooms }) {
  return (
    <table className="w-full">

      <thead className="bg-blue-900 text-white">

        <tr>

          <th className="p-4">Room</th>

          <th>Capacity</th>

          <th>Building</th>

          <th>Floor</th>

        </tr>

      </thead>

      <tbody>

        {rooms.map((room) => (

          <tr
            key={room.id}
            className="text-center border-b"
          >

            <td className="p-4">{room.roomNo}</td>

            <td>{room.capacity}</td>

            <td>{room.building}</td>

            <td>{room.floor}</td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default RoomTable;