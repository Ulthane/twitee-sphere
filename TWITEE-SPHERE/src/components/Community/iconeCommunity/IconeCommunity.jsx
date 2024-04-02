import { useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";

export default function IconeCommunity() {
  const [icon, setIcon] = useState();
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

  const fetchCommunity = async () => {
    try {
      const url = `https://twitee-api.gamosaurus.fr/api/communities/get/id/3`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setIcon(json);
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  //affichage
  useEffect(() => {
    userDisplay();
    fetchCommunity();
  }, []);

  return (
    <div>
      <img src={icon} alt="icone community" />
      <p>{userData.id_communities}</p>
      {console.log(icon)}
      {icon && icon.description && <p>{icon.description}</p>}
    </div>
  );
}
