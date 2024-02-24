import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      {/* NavBar */}

      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <div>{/* SideBar Menue */}</div>
        <div>
          {/* Outlet */}
          <Outlet />
        </div>
        <div>{/* SideBar Community */}</div>
      </div>

      {/* Footer */}
    </>
  );
}
