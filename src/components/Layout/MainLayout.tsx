import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ApiStatusChecker from "../Home/ApiStatusChecker";
import Navbar from "../Navbar.tsx/Navbar";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <ApiStatusChecker />
    </div>
  );
};

export default MainLayout;
