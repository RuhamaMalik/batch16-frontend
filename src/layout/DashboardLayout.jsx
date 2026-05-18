import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const { loading} = useAuthContext();
  if(loading){
     return (
    <>
     <h1> Loading... </h1>
    </>
  )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar//////////////  */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* /// main contrnt */}
      <div className={`flex flex-col flex-1 `}>

        {/* //////// dashboard content /////// */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;