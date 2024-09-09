// App.jsx
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components";
import {
  PersonalOff,
  Orders,
  Accounting,
  Users,
  DataBase,
  Employees,
  Notification,
} from "@/components/pages";
import { SignInForm } from "./components/signIN";
import { Content } from "@/components";

function App() {
  return (
    <Routes>
      <Route path="/x" element={<SignInForm />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Content />} />
        <Route path="/PersonalOff" element={<PersonalOff />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Accounting" element={<Accounting />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/DataBase" element={<DataBase />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/Notification" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
