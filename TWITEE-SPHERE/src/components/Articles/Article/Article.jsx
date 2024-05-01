//Library
import { useState, useContext } from "react";
import { useToken } from "../../../hooks/useToken";
import { toast } from "react-toastify";
import { deleteFetch } from "../../../utils/Fetch";
import { TwiteeContext } from "../../../store/TwiteeContext";

//Components
import LikeButton from "../../Button/LikeButton/Likebutton";
import CommentButton from "../../Button/CommentButton/CommentButton";
import ReTwiteeButton from "../../Button/ReTwiteeButton/ReTwiteeButton";
import NewTwiteeModal from "../../modales/NewTwiteeModal";
import AddFriendButton from "../../Button/AddFriendButton/AddFriendButton";
// import UserZone from "../../UserZone/UserZone";
import UserProfile from "../../UserProfile/UserProfile";

export default function Article({
  articleInformations,
  communityId,
  connectedUserId,
}) {
  //Context
  const { getThirtyArticlesWhithOffset } = useContext(TwiteeContext);
  //States
  const [isOpen, setOpen] = useState(false);
  const [updateTwiteeModalDisplay, setUpdateTwiteeModalDisplay] =
    useState(false);

  //Varaibles
  const token = useToken();

  // Méthode
  const deleteArticleHandler = async () => {
    setOpen(!isOpen);
    console.log(token.getToken());
    const request = await deleteFetch(
      `https://twitee-api.gamosaurus.fr/api/articles/delete/${articleInformations.id_articles}`,
      { Authorization: token.getToken() }
    );

    if (request.message !== "success") {
      toast.error(request.message);
    } else {
      getThirtyArticlesWhithOffset();
    }
  };

  const updateTwiteeModalDisplayHandler = (value) => {
    setOpen(!isOpen);
    setUpdateTwiteeModalDisplay(value);
  };

  const updateArticle = () => {
    setUpdateTwiteeModalDisplay(true);
  };

  const DropDown = () => {
    const handleDropDown = () => {
      setOpen(!isOpen);
    };
    return (
      <div className="dropdown">
        <button className=" font-bold" onClick={handleDropDown}>
          ...
        </button>

        <div
          id="dropdown"
          className={`z-10 w-44 bg-blueBgArticle rounded divide-y divide-gray-100 shadow ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className=" z-10 w-44 bg-blueBgArticle rounded-xl shadow ">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-xs rounded hover:bg-blueLogo"
                onClick={updateArticle}
              >
                Modifier
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-xs rounded hover:bg-blueLogo"
                onClick={deleteArticleHandler}
              >
                Supprimer
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  //JSX
  return (
    <>
      <div className="max-w-md min-w-[450px] p-6 bg-blueBgArticle rounded-3xl shadow">
        {/* Header Container */}
        <div className="flex flex-row justify-between items-center gap-3 mb-3 ">
          {/* User's informations */}
          <div className="flex flex-row justify-center items-center gap-2 relative">
            {/* <UserZone userInformations={articleInformations.user} /> */}
            <UserProfile />

            {/* Add Friends */}
            {articleInformations.user.id_user != connectedUserId && (
              <AddFriendButton
                firstName={articleInformations.user.firstname}
                lastName={articleInformations.user.lastname}
                idUser={articleInformations.user.id_user}
              />
            )}
          </div>
          {/* actions and Community */}
          <div className="flex flex-row justify-center items-center gap-3">
            {DropDown()}

            {/* Community's image */}
            <img
              className="w-[40px] h-[40px] rounded-xl"
              // src={articleInformations.communityInformations.imgProfil}
              alt="community's picture"
            />
          </div>
        </div>
        {/* article's message */}
        <p className="mb-3 text-sm text-white w-max-full break-words">
          {articleInformations.description}
        </p>
        {/* article's image */}
        {articleInformations.img_src !== "" && (
          <img
            className="rounded-3xl w-max-[300px] h-max-[150px]"
            src={articleInformations.img_src}
            alt="default"
          />
        )}

        {/* Footer container */}
        <div className="flex flex-row justify-evenly items-center mt-6">
          {/* COMMENT BUTTON */}
          <CommentButton
            articleId={articleInformations.id_articles}
            token={token.getToken()}
          />
          {/* RETWITEE BUTTON */}
          <ReTwiteeButton
            twiteeValue={{
              textValue: articleInformations.description,
              imgSrcValue: articleInformations.img_src,
            }}
          />
          {/* LIKE BUTTON */}
          <LikeButton
            articleId={articleInformations.id_articles}
            communityId={communityId}
            token={token.getToken()}
            userID={articleInformations}
          />
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/frameIcon.svg"
              alt="frame icon"
              width={"25px"}
            />
          </div>
        </div>
      </div>

      {/* MODALE UPDATE TWITEE */}
      {updateTwiteeModalDisplay && (
        <NewTwiteeModal
          updateStateModalDisplay={updateTwiteeModalDisplayHandler}
          value={{
            textValue: articleInformations.description,
            imgSrcValue: articleInformations.img_src,
          }}
          update={true}
          id={articleInformations.id_articles}
        />
      )}
    </>
  );
}
