//hook
import { useContext, useEffect, useState } from "react";
import { useFetchCommunity } from "../../hooks/useFetchCommunity";

//style
import { toast } from "react-toastify";

//composant
import UserCommunity from "./userCommunityPage/UserCommunity";
import Button from "../Button/Button";
import TopCommunity from "./TopCommunity";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function Community({ communitiesToDisplay }) {
  //Hook personnaliser
  const { modifyCommunity, fetchProfil } = useFetchCommunity();

  //state
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  //Function

  //Rejoindre la commnunauté
  const changeCommunity = async (e, communityId, name) => {
    e.preventDefault();
    setLoading(false);
    let data;

    if (communityId === userData.id_communities) {
      data = { id_communities: null };
    } else {
      data = { id_communities: communityId };
    }

    console.log(communityId);
    try {
      await modifyCommunity(data);
      if (communityId === userData.id_communities) {
        toast.success(`vous venez de quitter ${name}`);
      } else {
        toast.success(`Bravo vous venez de rejoindre ${name}`);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      userDisplay();
    } catch (e) {
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  // fetch du profil du user
  const userDisplay = async () => {
    try {
      const json = await fetchProfil();

      setUserData(json);
      setLoading(true);
    } catch (e) {
      toast.error("Erreur lors du chargement du profil");
    }
  };

  useEffect(() => {
    userDisplay();
  }, []);
  return (
    <>
      {/* Top community */}
      <TopCommunity changeCommunity={changeCommunity} />
      {loading ? (
        communitiesToDisplay.map((community, index) => (
          <div
            key={community.id_communities}
            className="rounded-[25px] p-5 w-[600px] h-[auto] community mb-[15px]"
            style={{ background: "rgba(42, 163, 239, 0.1)" }}
          >
            {/* Mapping des communautés pour afficher dynamiquement */}
            <div className="flex justify-between mb-[5px]">
              {/* {console.log(community.id_communities)} */}
              <UserCommunity />
              <img
                className="w-[40px] h-[30px] object-contain rounded-[10px]"
                src={community.icon}
                alt="icone de la communauté"
              />
            </div>
            <h2 className="text-blueLogo text-[36px]">
              <b>{community.name}</b>
            </h2>
            <p className="text-[16px]">{community.description}</p>
            <div className="mt-[15px] flex justify-between items-center">
              <div className="flex items-center">
                <p className="mx-2 text-blueLogo">
                  {/* Score */}
                  <b>{community.score}</b>
                </p>
                <p>Points</p>
              </div>
              <Button
                fn={(e) => {
                  changeCommunity(e, community.id_communities, community.name);
                  handleClick(index);
                }}
                value={
                  userData &&
                  community.id_communities === userData.id_communities
                    ? "Quitter"
                    : "Rejoindre"
                }
                type={"button"}
                w={"200px"}
                h={"50px"}
                className={
                  userData &&
                  community.id_communities === userData.id_communities
                    ? "p-3 bg-blue-700 hover:bg-red-500"
                    : "p-3 bg-blueLogo hover:bg-blueLogoDark"
                }
              />
            </div>
          </div>
        ))
      ) : (
        <div className="h-[100vh] flex items-center text-white font-bold text-2xl my-5 w-[90px]">
          <img src="loading/ripple-loading.svg" alt="Loading" />
        </div>
      )}
    </>
  );
}
