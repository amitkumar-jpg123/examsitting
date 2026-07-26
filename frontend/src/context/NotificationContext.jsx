import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


// Create Context

const NotificationContext = createContext();



// Provider

export const NotificationProvider = ({children}) => {


  const [notifications,setNotifications] = useState([]);




  // Load old notifications

  useEffect(()=>{


    const oldNotifications =
      JSON.parse(
        localStorage.getItem("notifications")
      ) || [];


    setNotifications(oldNotifications);


  },[]);






  // Add Notification

  const addNotification = (message)=>{


    const newNotification = {


      id: Date.now(),


      message: message,


      time: new Date().toLocaleString(),


      read:false


    };




    setNotifications((prev)=>{


      const updatedNotifications = [

        newNotification,

        ...prev

      ];



      localStorage.setItem(

        "notifications",

        JSON.stringify(updatedNotifications)

      );



      return updatedNotifications;


    });



  };






  // Make Global Notification Function

  useEffect(()=>{


    window.addNotification = addNotification;



    return ()=>{

      delete window.addNotification;

    };


  },[]);








  // Clear All

  const clearNotifications = ()=>{


    setNotifications([]);



    localStorage.removeItem(
      "notifications"
    );


  };






  return (

    <NotificationContext.Provider


      value={{

        notifications,

        addNotification,

        clearNotifications


      }}


    >


      {children}


    </NotificationContext.Provider>


  );


};






// Custom Hook

export const useNotification = ()=>{


  return useContext(
    NotificationContext
  );


};