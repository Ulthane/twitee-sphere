import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Main() {
  return (
    <div className="h-screen gradientBackGround text-white grid grid-rows-[1fr_10fr_0.5fr] ">
      <div
        className="px-4 py-2"
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* NavBar */}
        NAVBAR
      </div>

      <div className="grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2">
        <div style={{ background: "rgba(255,255,255,0.2)" }}>
          {/* SideBar Menue */}
          <NavBar />
        </div>
        <div>
          {/* Outlet */}
          <Outlet />
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)" }}>
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
