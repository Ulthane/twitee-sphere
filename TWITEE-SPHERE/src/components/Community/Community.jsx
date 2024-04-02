import { toast } from "react-toastify";
import { useToken } from "../../hooks/useToken";
import Button from "../Button/Button";
import UserCommunity from "./userCommunityPage/UserCommunity";

export default function Community({ communitiesToDisplay }) {
  //
  //Hook personnaliser
  const { getToken } = useToken();

  //Function

  //Rejoindre la commnunauté
  const changeCommunity = async (e, communityId, name) => {
    e.preventDefault();
    const data = communityId;
    console.log(communityId);
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/users/modify";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success(`Bravo vous venez de rejoindre ${name}`);
    } catch (e) {
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  return (
    <>
      {communitiesToDisplay.map((community, index) => (
        <div
          key={community.community_id}
          className="rounded-[25px] p-5 w-[600px] h-[auto] community mb-[15px]"
          style={{ background: "rgba(42, 163, 239, 0.1)" }}
        >
          {/* Mapping des communautés pour afficher dynamiquement */}
          <div className="flex justify-between mb-[5px]">
            {console.log(community.id_communities)}
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
              <img
                className="mr-[10px]"
                src="../../public/Icons/user/user_white.svg"
                alt="icone user"
              />
              <p>2532</p>
            </div>

            <Button
              fn={(e) =>
                changeCommunity(e, community.id_communities, community.name)
              }
              value={"Rejoindre"}
              type={"button"}
              w={"200px"}
              h={"50px"}
              className=" p-3 bg-blueLogo hover:bg-blueLogoDark"
            />
          </div>
        </div>
      ))}
    </>
  );
}
