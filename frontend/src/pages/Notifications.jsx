import {
  useNotification
} from "../context/NotificationContext";


function Notifications(){

  const {
    notifications,
    clearNotifications
  } = useNotification();



  return (

    <div
      className="
      p-6
      "
    >

      <h1
        className="
        text-2xl
        font-bold
        mb-5
        "
      >
        🔔 All Notifications
      </h1>



      {
        notifications.length === 0 ?

        (

          <p className="text-gray-500">
            No Notifications Available
          </p>

        )

        :

        (

          notifications.map((item)=>(

            <div
              key={item.id}
              className="
              bg-white
              shadow
              rounded-lg
              p-4
              mb-3
              "
            >

              <h3>
                {item.message}
              </h3>


              <p
                className="
                text-sm
                text-gray-500
                "
              >
                {item.time}
              </p>


            </div>


          ))

        )

      }



      {
        notifications.length > 0 &&

        <button

        onClick={clearNotifications}

        className="
        bg-red-600
        text-white
        px-5
        py-2
        rounded-lg
        "

        >

        Clear All

        </button>

      }


    </div>

  );

}


export default Notifications;