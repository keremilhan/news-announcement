import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AddNews from "../pages/AddNews";
import PrivateRouter from "./PrivateRouter";
import UpdateContent from "../pages/UpdateContent";
import AddAnouncements from "../pages/AddAnouncements";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addnews" element={<PrivateRouter />}>
          <Route path="" element={<AddNews />} />
        </Route>
        <Route path="/addanouncements" element={<PrivateRouter />}>
          <Route path="" element={<AddAnouncements />} />
        </Route>
        <Route path="/detail/:id" element={<PrivateRouter />}>
          <Route path="" element={<Details />} />
        </Route>
        <Route path="/updatecontent/:id" element={<PrivateRouter />}>
          <Route path="" element={<UpdateContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
