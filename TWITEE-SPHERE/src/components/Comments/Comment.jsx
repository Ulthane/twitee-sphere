import { useContext } from "react";
//Composant
import TrashIcon from "../../assets/SVG/TrashIcon";
import { deleteFetch } from "../../utils/Fetch";
import { useToken } from "../../hooks/useToken";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";
import UserProfile from "../UserProfile/UserProfile";

export default function Comment({ commentInformation, refreshCommentHandler }) {
  //hooks
  const { getToken } = useToken();

  //Context
  const { user } = useContext(TwiteeContext);

  // variables
  const token = getToken();

  // Mettre ma trash icon que si id comment = user co
  const TrashIconDisplay = () => {
    // console.log("user", user);
    // console.log("commentInformation", commentInformation);
    // const isUser
    return (
      <>
        <div
          className=" min-w-[15] p-1"
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
      <div className="rounded-xl backdrop-blur-md bg-blueBgArticle/50 text-white grid grid-cols-[2fr_7fr] p-2 gap-3 w-full">
        <div className=" self-start w-2/7 mr-6">
          <UserProfile userInformations={commentInformation.user} />
        </div>
        <div className="flex justify-between w-max-full break-words text-sm font-light ml-8 text-wrap w-5/7">
          <p className="ml-2 text-wrap w-full">
            {commentInformation.description}
          </p>
          {user.id_user === commentInformation.user.id_user &&
            TrashIconDisplay()}
        </div>
      </div>
    </>
  );
}
