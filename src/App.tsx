import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import OrderManagement from "./pages/Orders/OrderManagement";
import PicupAndDelivery from "./pages/picup&delivery/PicupAndDelivery";
import Payments from "./pages/Payments/Payments";
import ServicesAndPricing from "./pages/ServicesAndPricing/ServicesAndPricing";
import Report from "./pages/reportspage/Report";
import AdminAndStaff from "./pages/Admin&Staff/AdminAndStaff";
import AccountSection from "./pages/AccountSection/AccountSection";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerOrdersPage from "./pages/Customer/CustomerOrdersPage";
import Customers from "./pages/Customer/Customers";
import Settings from "./pages/settingspage/Settings";
import SupportAndHelp from "./pages/Supportpage/SupportAndHelp";
import TimeSlot from "./pages/TimeSlot/TimeSlot";

function App() {
  return (
    <BrowserRouter>
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />  
      <Routes>

        {/* MAIN DASHBOARD LAYOUT */}
        <Route path="/" element={<DashboardLayout />}>

          {/* Default Dashboard */}
          <Route index element={<Home/>} />

          {/* Dashboard Route */}
          <Route path="dashboard" element={<Home />} />
          <Route path="orders" element={<OrderManagement/>} />
          <Route path="pickup" element={<PicupAndDelivery/>} />
          <Route path="customers" element={<Customers/>} />
          <Route path="payments" element={<Payments/>} />
          <Route path="services-pricing" element={<ServicesAndPricing/>} />
          <Route path="reports" element={<Report/>} />
          <Route path="admin-staff" element={<AdminAndStaff/>} />
          <Route path="account-session" element={<AccountSection/>} />
          <Route path="support" element={<SupportAndHelp/>} />
          <Route path="settings" element={<Settings/>} />

        </Route>
         <Route path="customers/:userId/orders" element={<CustomerOrdersPage />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
