import { Sidebar, Content } from "@/components";
import { Routes, Route } from "react-router-dom";
import {
  PersonalOff,
  Orders,
  Accounting,
  Users,
  DataBase,
  Employees,
  Notification,
} from "@/components/pages";

function App() {
  return (
    <div className="bg-[#1A1919] min-h-screen grid grid-cols-[250px_auto] gap-5 h-full w-full p-5">
      <Sidebar />
      <div className="bg-white top-0 right-0 left-[250px] h-full rounded-3xl">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/PersonalOff" element={<PersonalOff />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/DataBase" element={<DataBase />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Notification" element={<Notification />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
