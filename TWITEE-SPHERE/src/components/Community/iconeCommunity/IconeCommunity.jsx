//hook
import { useContext, useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";
import { useFetchCommunity } from "../../../hooks/useFetchCommunity";
import { toast } from "react-toastify";

//context
import { TwiteeContext } from "../../../store/TwiteeContext";

export default function IconeCommunity() {
  //Hook personaliser
  const { getToken } = useToken();
  const { communitiesById } = useFetchCommunity();

  //context
  const { setCommunity, community } = useContext(TwiteeContext);

  //state
  const [userData, setUserData] = useState([]);
  const [icon, setIcon] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCommunity = async () => {
    setLoading(false);
    try {
      const communityData = await communitiesById(userData.id_communities);
      setCommunity(communityData);
      setIcon(communityData);
      setLoading(true);
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
      setLoading(true);
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

  // Cycles

  //Récuperation des données du user
  useEffect(() => {
    userDisplay();
  }, []);

  // recuperation des donnés de la communauté du user
  useEffect(() => {
    // verification que le user existe
    if (userData.id_user !== undefined) {
      fetchCommunity();
    }
  }, [userData]);

  useEffect(() => {
    if (community) {
      console.log("Community data:", community); // Affiche les données de la communauté dans la console
    } else {
      console.log("Aucune donnée de communauté disponible");
    }
  }, [community]);
  return (
    <div>
      {loading ? (
        icon.map((item, index) => (
          <div key={index}>
            <img
              className="w-[50px] h-[50px] rounded-xl object-cover"
              src={item.icon}
              alt="Icône de la communauté"
            />
          </div>
        ))
      ) : (
        <div className="w-[50px]">
          <img src="loading/ripple-loading.svg" alt="Loading" />
        </div>
      )}
    </div>
  );
}
