import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar.jsx";
import { useEffect } from "react";
import { useContext } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import CommunityBar from "../components/Community/CommunityBar/CommunityBar.jsx";

export default function Main() {
  //Context
  const { setUser } = useContext(TwiteeContext);

  // VARIABLE
  const token = sessionStorage.getItem("token");

  //METHOD
  const getUserInformations = async () => {
    const response = await fetch(
      `https://twitee-api.gamosaurus.fr/api/users/get/id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      let user = await response.json();
      let newUser = { ...user };
      // console.log("newUser");
      // console.log(newUser);
      setUser(newUser);
    }
  };

  //CYCLE
  useEffect(() => {
    getUserInformations();
    // console.log("BUUUUUUUUUUUUUUUUUUUG");
  }, []);
  return (
    <div className="h-screen text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <div
        className="px-4 py-2  "
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* HEADER */}
        HEADER
      </div>

      <div className="h-full grid gap-6 grid-cols-[1fr_4fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        <div className="h-full ">
          {/* Outlet */}
          <Outlet />
        </div>
        <div
          className="sticky top-0 w-[250px]"
          // style={{ background: "rgba(255,255,255,0.2)" }}
        >
          {/* SideBar Community */}
          {/* COMMUNITY BAR */}
          <CommunityBar />
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
