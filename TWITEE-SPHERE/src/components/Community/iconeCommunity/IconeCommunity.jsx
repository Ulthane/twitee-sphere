import { useContext, useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";
import { TwiteeContext } from "../../../store/TwiteeContext";
import { useFetchCommunity } from "../../../hooks/useFetchCommunity";
import { toast } from "react-toastify";

export default function IconeCommunity() {
  //Hook personaliser
  const { getToken } = useToken();
  //state
  const [userData, setUserData] = useState([]);
  const [icon, setIcon] = useState([]);
  const [loading, setLoading] = useState(false);

  //context
  const { setCommunity, community } = useContext(TwiteeContext);

  const { communitiesById } = useFetchCommunity();

  const fetchCommunity = async () => {
    try {
      const communityData = await communitiesById(userData.id_communities);
      setIcon(communityData);
      setCommunity(communityData);
      console.log(communityData);
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

  // Cycles
  useEffect(() => {
    userDisplay();
  }, []);

  useEffect(() => {
    if (userData.id_user !== undefined) {
      fetchCommunity();
      setLoading(true);
    }
  }, [userData]);

  useEffect(() => {
    console.log(community);
  }, [community]);

  return (
    <div>
      {loading ? (
        icon.map((item, index) => (
          <div key={index}>
            <img
              className="w-[45px] h-[45px] rounded-full object-cover"
              src={item.icon}
              alt="Icône de la communauté"
            />
          </div>
        ))
      ) : (
        <div className="h-[100vh] flex items-center text-white font-bold text-2xl my-5 w-[90px]">
          <img src="loading/ripple-loading.svg" alt="Loading" />
        </div>
      )}
    </div>
  );
}
