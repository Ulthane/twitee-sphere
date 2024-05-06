//Librairie
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import { Outlet } from "react-router-dom";

//Components
import NavBar from "../components/NavBar/NavBar.jsx";
import Header from "../components/Header/Header.jsx";
import { getFetch } from "../utils/Fetch.js";
import CommunityBar from "../components/Community/CommunityBar/CommunityBar.jsx";

export default function Main() {
  //Context
  const { user, setUser, community, setCommunity } = useContext(TwiteeContext);

  //State:
  const [userInformations, setUserInformations] = useState(user);
  const [userCommunityInformation, setUserCommunityInformation] =
    useState(community);

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
      let userInformations = await response.json();
      let newUser = { ...userInformations };

      //User Informations to SessionStorage
      // console.log("newUser", newUser);
      sessionStorage.setItem("user_informations", JSON.stringify(newUser));
      //setState Context
      setUserInformations(newUser);
    }
  };

  const getUserCommunityInformations = async (communityId) => {
    const request = await getFetch(
      `https://twitee-api.gamosaurus.fr/api/communities/get/id/${communityId}`,
      { Authorization: token }
    );

    const userCommunity = { ...request[0] };

    if (request) {
      //User Community Informations to SessionStorage
      // sessionStorage.setItem("user_community", JSON.stringify(usercommunity));
      //setCommunity Context
      if (userCommunity.id_communities) {
        setUserCommunityInformation(userCommunity);
        // console.log("usercommunity", userCommunity);
        setCommunity(userCommunity);
      }
    } else {
      toast.error("Une erreur s'est produite");
    }
  };

  //CYCLE
  useEffect(() => {
    getUserInformations();
  }, []);

  useEffect(() => {
    if (userInformations.id_communities) {
      getUserCommunityInformations(userInformations.id_communities);
    }

    setUser(userInformations);
  }, [userInformations]);

  return (
    <div className="h-screen text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <div className="px-4 py-2  ">
        {/* HEADER */}
        <Header />
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
