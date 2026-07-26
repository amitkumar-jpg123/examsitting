function InvigilatorTable({ invigilators }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

      <table className="w-full">

        <thead className="bg-blue-900 text-white">

          <tr>

            <th className="p-4">Faculty Name</th>

            <th>Department</th>

            <th>Email</th>

            <th>Phone</th>

          </tr>

        </thead>

        <tbody>

          {invigilators.map((item) => (

            <tr
              key={item.id}
              className="text-center border-b hover:bg-gray-100"
            >

              <td className="p-4">{item.name}</td>

              <td>{item.department}</td>

              <td>{item.email}</td>

              <td>{item.phone}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default InvigilatorTable;