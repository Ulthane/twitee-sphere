//Librairie
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
//Components
import NavBar from "../components/NavBar/NavBar.jsx";
import Header from "../components/Header/Header.jsx";
import { getFetch } from "../utils/Fetch.js";
import CommunityBar from "../components/Community/CommunityBar/CommunityBar.jsx";


export default function Main() {
  //Context
  const { user, setUser, setCommunity } = useContext(TwiteeContext);

  //State:
  const [userInformations, setUserInformations] = useState(user);

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
      toast.error(response.message);
    } else {
      let userInformations = await response.json();
      let newUser = { ...userInformations };

      //User Informations to SessionStorage
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
      //setCommunity Context
      if (userCommunity.id_communities) {
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
    <div className="h-screen text-white grid grid-rows-[1fr_10fr] box-border ">
      <div className="px-4 pt-4 border-b-2 border-blueBgArticleLight">
        {/* HEADER */}
        <Header />
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
          className="sticky top-0 w-[350px]"
        >
          {/* SideBar Community */}
          {/* COMMUNITY BAR */}
          <CommunityBar />
        </div>
      </div>

    </div>
  );
}
