// librairie
import { toast } from "react-toastify";

//composant
import IconeCommunity from "../Community/iconeCommunity/IconeCommunity";

//hook
import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";

export default function UserProfile({ communityDisplay = false }) {
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
          src="https://cdn.dribbble.com/users/3253684/screenshots/19281779/media/f91d93b3811f2e3929ee09543b80691e.jpg?resize=1600x1200&vertical=center"
          alt="Photo de profil"
        />
      <div>
        <p className="text-xl mb-1">
          <b>{userData.firstname + " " + userData.lastname}</b>
        </p>
        <p className="text-sm">{userData.surname}</p>
      </div>
      {communityDisplay && (
        <div className="items-center mx-[35px]">
          <IconeCommunity />
        </div>
      )}
    </div>
  );
}
