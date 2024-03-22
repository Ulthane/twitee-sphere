import { useContext } from "react";
//Composant
import UserZone from "../UserZone/UserZone";
import TrashIcon from "../../assets/SVG/TrashIcon";
import { deleteFetch } from "../../utils/Fetch";
import { useToken } from "../../hooks/useToken";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function Comment({ commentInformation, refreshCommentHandler }) {
  //hooks
  const { getToken } = useToken();

  //Context
  const { user } = useContext(TwiteeContext);

  // variables
  const token = getToken();

  // Mettre ma trash icon que si id comment = user co
  console.log(user);
  console.log(commentInformation);
  const TrashIconDisplay = () => {
    console.log(user.id);
    console.log(commentInformation);
    // const isUser
    return (
      <>
        <div
          className=" min-w-[15]"
          onClick={() =>
            deleteCommentHandler(commentInformation.id_comentaries)
          }
        >
          <TrashIcon />
        </div>
      </>
    );
  };

  //Méthodes
  const deleteCommentHandler = async (commentID) => {
    const request = await deleteFetch(
      `https://twitee-api.gamosaurus.fr/api/comentaries/delete/${commentID}`,
      {
        Authorization: token,
      }
    );
    if (request.message === "success") {
      refreshCommentHandler();
    } else {
      toast.error(request.message);
    }
  };

  return (
    <>
      <div className="rounded-xl backdrop-blur-md bg-blueBgArticle/50 text-white grid grid-cols-[2fr_7fr] p-2 gap-1">
        <div className=" self-start">
          <UserZone userInformations={commentInformation.user} />
        </div>
        <div className="flex justify-between">
          {commentInformation.description}
          {/* FINIR LA CONDITION DANS LA FONCTION POUR AFFICHER QUE SI LE USER EST LE MEME */}
          {TrashIconDisplay()}
        </div>
      </div>
    </>
  );
}
