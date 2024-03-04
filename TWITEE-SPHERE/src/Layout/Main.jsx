import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar.jsx";

export default function Main() {
  return (
    <div className="h-screen text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <div
        className="px-4 py-2  "
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* HEADER */}
        HEADER
      </div>

      <div className="h-full grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        <div className="h-full ">
          {/* Outlet */}
          <Outlet />
        </div>
        <div
          className="sticky top-0"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          {/* SideBar Community */}
          COMMUNITY BAR
        </div>
      </div>

      <div
        className="px-4 py-2"
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* Footer */}
        FOOTER
      </div>
    </div>
  );
}
