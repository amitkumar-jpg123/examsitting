import { Link } from "react-router-dom";

function NotFound() {
  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-8xl font-bold text-blue-900">

        404

      </h1>

      <p className="text-2xl mt-4">

        Page Not Found

      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
      >
        Go To Home
      </Link>

    </div>

  );
}

export default NotFound;