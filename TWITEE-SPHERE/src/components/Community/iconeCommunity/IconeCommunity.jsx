import { useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";

export default function IconeCommunity() {
  //Hook personaliser
  const { getToken } = useToken();
  //state
  const [userData, setUserData] = useState([]);
  const [icon, setIcon] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Effect pour fetchCommunity
  useEffect(() => {
    fetchCommunity();
    // console.log();
  }, []);

  useEffect(() => {
    if (icon.length > 0) {
      userDisplay();
      setLoading(true);
      console.log(icon);
    }
  }, [icon]);

  // console.log(icon);
  return (
    <div>
      {loading ? (
        icon.map((item, index) => (
          <div key={index}>
            <img
              className="w-[60px] h-[40px] rounded-[10px]"
              src={item.icon}
              alt="Icône de la communauté"
            />
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
