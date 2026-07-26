import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import InvigilatorLogin from "./pages/InvigilatorLogin";

import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Exams from "./pages/Exams";
import Invigilators from "./pages/Invigilators";

import GenerateSeating from "./pages/GenerateSeating";
import ViewSeating from "./pages/ViewSeating";

import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import AdminRegister from "./pages/AdminRegister";
import Admins from "./pages/Admins";

import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import {
  NotificationProvider
} from "./context/NotificationContext";
import Notifications from "./pages/Notifications";

import Contact from "./pages/Contact";

import InvigilatorDashboard from "./pages/InvigilatorDashboard";


import MyDuties from "./pages/invigilator/MyDuties";
import Attendance from "./pages/invigilator/Attendance";
import InvigilatorStudents from "./pages/invigilator/InvigilatorStudents";
import ReportIncident from "./pages/invigilator/ReportIncident";
import InvigilatorProfile from "./pages/invigilator/InvigilatorProfile";

import InvigilatorLayout from "./layouts/InvigilatorLayout";
import InvigilatorProtectedRoute 
from "./components/InvigilatorProtectedRoute";

function App() {
  return (
    <>

      <NotificationProvider>


        <Toaster

          position="top-right"

          reverseOrder={false}

          toastOptions={{

            duration:3000,

            style:{

              background:"#fff",

              color:"#1f2937",

              fontSize:"15px",

              borderRadius:"10px",

            }

          }}

        />


        <Routes>


          {/* PUBLIC ROUTES */}


          <Route
            path="/"
            element={<Home />}
          />

          <Route path="/contact"element={<Contact />}/>


          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />


          <Route
            path="/admin-register"
            element={<AdminRegister />}
          />


          <Route
            path="/invigilator-login"
            element={<InvigilatorLogin />}
          />

<Route

element={

<InvigilatorProtectedRoute>

<InvigilatorLayout/>

</InvigilatorProtectedRoute>

}

>

<Route
  path="/invigilator-dashboard"
  element={<InvigilatorDashboard />}
/>


<Route
path="/invigilator-duties"
element={<MyDuties />}
/>


<Route
path="/invigilator-attendance"
element={<Attendance />}
/>


<Route
path="/invigilator-students"
element={<InvigilatorStudents />}
/>


<Route
path="/invigilator-report"
element={<ReportIncident />}
/>


<Route
path="/invigilator-profile"
element={<InvigilatorProfile />}
/>


</Route>


          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />


          <Route
            path="/verify-otp"
            element={<VerifyOTP />}
          />


          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />





          {/* ADMIN ROUTES */}



          <Route element={

            <ProtectedRoute>

              <AdminLayout />

            </ProtectedRoute>

          }>



            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />


            <Route
              path="/admins"
              element={<Admins />}
            />


            <Route
              path="/students"
              element={<Students />}
            />


            <Route
              path="/rooms"
              element={<Rooms />}
            />


            <Route
              path="/exams"
              element={<Exams />}
            />


            <Route
              path="/invigilators"
              element={<Invigilators />}
            />


            <Route
              path="/generate-seating"
              element={<GenerateSeating />}
            />


            <Route
              path="/view-seating"
              element={<ViewSeating />}
            />


            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
 path="/notifications"
 element={<Notifications />}
/>


            <Route
              path="/profile"
              element={<Profile />}
            />

            


            <Route
              path="/admin-profile"
              element={<AdminProfile />}
            />


          </Route>





          {/* 404 */}


          <Route
            path="*"
            element={<NotFound />}
          />


        </Routes>


      </NotificationProvider>


    </>

  );

}


export default App;