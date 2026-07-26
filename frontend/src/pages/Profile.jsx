import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

  return (

    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="ml-72 w-full">

        <Navbar />

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-lg p-10">

            <div className="flex items-center gap-8">

              <img
                src="https://i.pravatar.cc/150"
                alt="Admin"
                className="w-32 h-32 rounded-full"
              />

              <div>

                <h1 className="text-4xl font-bold text-blue-900">
                  Admin Profile
                </h1>

                <p className="mt-3 text-lg">
                  Name : Admin
                </p>

                <p>Email : admin@gmail.com</p>

                <p>Role : Administrator</p>

                <button className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">

                  Edit Profile

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;