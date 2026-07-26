function ExamTable({ exams }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

      <table className="w-full">

        <thead className="bg-blue-900 text-white">

          <tr>

            <th className="p-4">Subject</th>

            <th>Date</th>

            <th>Time</th>

            <th>Semester</th>

            <th>Room</th>

          </tr>

        </thead>

        <tbody>

          {exams.map((exam) => (

            <tr
              key={exam.id}
              className="text-center border-b hover:bg-gray-100"
            >

              <td className="p-4">
                {exam.subject}
              </td>

              <td>{exam.date}</td>

              <td>{exam.time}</td>

              <td>{exam.semester}</td>

              <td>{exam.room}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ExamTable;