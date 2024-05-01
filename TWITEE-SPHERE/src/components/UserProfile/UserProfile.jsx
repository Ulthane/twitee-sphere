// librairie
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//composant
import IconeCommunity from "../Community/iconeCommunity/IconeCommunity";

//hook
import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";

//Utils
import { firstLetterUpperCase } from "../../utils/stringFunction";
import route from "../../routes/route";

export default function UserProfile({
  communityDisplay = false,
  userInformations = null,
}) {
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
      <img
        className="w-14 h-14 rounded-full object-cover mr-5"
        src={userInformations.img_src}
        alt="Photo de profil"
      />
      <Link
        to={route.USER_INFORMATION}
        state={{ targetedUserId: userInformations.id_user }}
      >
        <p className="text-xl mb-1">
          {firstLetterUpperCase(userInformations.firstname) +
            " " +
            firstLetterUpperCase(userInformations.lastname)}
        </p>
        <p className="text-sm">{userData.surname}</p>
      </Link>
      {communityDisplay && (
        <div className="items-center mx-[35px]">
          <IconeCommunity />
        </div>
      )}
    </div>
  );
}
