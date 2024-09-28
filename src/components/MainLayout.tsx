import { Sidebar } from "@/components";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";

export const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <div className="bg-[#1A1919] min-h-screen grid grid-cols-[250px_auto] gap-5 h-full w-full p-5">
      <Sidebar />
      <div className="bg-white top-0 right-0 left-[250px] h-full rounded-3xl">
        <Outlet />
      </div>
    </div>
  );
};
