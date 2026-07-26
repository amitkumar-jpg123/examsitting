function StudentTable({ students }) {
  return (
    <table className="w-full">

      <thead className="bg-blue-900 text-white">

        <tr>

          <th className="p-4">Roll</th>

          <th>Name</th>

          <th>Department</th>

          <th>Semester</th>

        </tr>

      </thead>

      <tbody>

        {students.map((student) => (

          <tr
            key={student.id}
            className="border-b text-center"
          >

            <td className="p-4">{student.roll}</td>

            <td>{student.name}</td>

            <td>{student.branch}</td>

            <td>{student.semester}</td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;