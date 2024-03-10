//Library
import { useState, useContext } from "react";
import { useToken } from "../../../hooks/useToken";
import { toast } from "react-toastify";
import { deleteFetch } from "../../../utils/Fetch";
import { TwiteeContext } from "../../../store/TwiteeContext";

//Components
import LikeButton from "../../Button/LikeButton/Likebutton";
import CommentButton from "../../Button/CommentButton/CommentButton";
import NewTwiteeModal from "../../modales/NewTwiteeModal";

export default function Article({ articleInformations, communityId }) {
  //Context
  const { getThirtyArticlesWhithOffset } = useContext(TwiteeContext);
  //States
  const [isOpen, setOpen] = useState(false);
  const [updateTwiteeModalDisplay, setUpdateTwiteeModalDisplay] =
    useState(false);

  // const [articleInformation, setArticleInformation] =
  //   useState(articleInformations);

  //Varaibles
  const token = useToken();

  // Méthode
  const deleteArticleHandler = () => {
    setOpen(!isOpen);
    const resquest = deleteFetch(
      `https://twitee-api.gamosaurus.fr/api/articles/delete/${articleInformations.id_articles}`,
      { Authorization: token.getToken() }
    );

    getThirtyArticlesWhithOffset();
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
      <div className="max-w-md p-6 bg-blueBgArticle rounded-3xl shadow">
        {/* Header Container */}
        <div className="flex flex-row justify-between items-center gap-3 mb-3 ">
          {/* User's informations */}
          <div className="flex flex-row justify-center items-center gap-2">
            {/* user's picture */}
            <img
              className="w-[40px] h-[40px] rounded-full shadow-lg"
              src={articleInformations.user.img_src}
              alt="user's picture"
            />
            {/* User first name and last name */}
            <span className=" font-bold">
              {articleInformations.user.firstname +
                " " +
                articleInformations.user.lastname}
            </span>
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
        <p className="mb-3 text-sm text-white">
          {articleInformations.description}
        </p>
        {/* article's image */}
        <img
          className="rounded-3xl w-max-[300px] h-max-[150px]"
          src={articleInformations.img_src}
          alt="default"
        />
        {/* Footer container */}
        <div className="flex flex-row justify-evenly items-center mt-6">
          <CommentButton
            articleId={articleInformations.id_articles}
            token={token.getToken()}
          />
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/repostIcon.svg"
              alt="repost icon"
              width={"25px"}
            />
          </div>
          {/* LIKE BUTTON */}
          <LikeButton
            articleId={articleInformations.id_articles}
            communityId={communityId}
            token={token.getToken()}
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
