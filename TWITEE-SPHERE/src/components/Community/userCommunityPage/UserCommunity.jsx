import { useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";
import IconeCommunity from "../iconeCommunity/IconeCommunity";

export default function UserCommunity() {
  //Hook personaliser
  const { getToken } = useToken();
  //state
  const [userData, setUserData] = useState([]);

  // fetch du profil du user
  const userDisplay = async () => {
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/users/get/id";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setUserData(json);
    } catch (e) {
      toast.error("Erreur lors du chargement du profil");
    }
  };

  //affichage
  useEffect(() => {
    userDisplay();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div>
        <img
          className="w-[25px] mr-4"
          src="https://cdn.pixabay.com/photo/2013/07/13/10/50/one-eyed-monster-157897_960_720.png"
          alt="Photo de profil"
        />
      </div>
      <div>
        <p className="text-lg">
          <b>{userData.firstname + " " + userData.lastname}</b>
        </p>
        <p className="text-sm">{userData.surname}</p>
      </div>
      <div className="items-center ml-[50px]">
        <IconeCommunity />
      </div>
    </div>
  );
}
