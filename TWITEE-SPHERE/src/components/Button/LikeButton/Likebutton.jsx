import { useEffect, useState } from "react";
import LikeIcon from "../../../assets/SVG/LikeIcon";
import { postFetch, deleteFetch, getFetch } from "../../../utils/Fetch";

export default function LikeButton({
  articleId,
  communityId,
  token,
  ...props
}) {
  //STATES
  const [isLike, setIsLike] = useState(false);
  const [numberOfLike, setNumberOfLike] = useState(0);

  //METHODES
  const getNumberOflike = () => {
    const numberOfLikeRequest = getFetch(
      `https://twitee-api.gamosaurus.fr/api/likes/get/${articleId}`,
      {
        Authorization: token,
      }
    );

    numberOfLikeRequest.then((result) => setNumberOfLike(result[0].total));
  };

  const likeHandler = async (articleId, communityId) => {
    if (isLike === false) {
      const request = postFetch(
        "https://twitee-api.gamosaurus.fr/api/likes/create",
        { Authorization: token },
        {
          id_article: articleId,
          id_community: communityId,
        }
      );

      if (request.status === 500) {
        toast.error(request.message);
      } else {
        setIsLike(!isLike);
        console.log(isLike);
      }
      return;
    } else {
      // ERREUR DANS LA REQUETE
      console.log(articleId);
      const request = deleteFetch(
        `https://twitee-api.gamosaurus.fr/api/likes/delete/${articleId}`,
        { Authorization: token }
      );

      console.log(request);

      if (request.status === 500) {
        toast.error(request.message);
      } else {
        setIsLike(!isLike);
        console.log(isLike);
      }
      return;
    }
  };

  //CYCLES
  useEffect(() => {
    getNumberOflike(), [];
  });

  return (
    <div
      className="flex flex-row gap-1 hover:cursor-pointer"
      onClick={() => {
        likeHandler(articleId, communityId);
      }}
    >
      <LikeIcon tailwindClasse={isLike ? "text-red-800" : "text-white"} />
      <span>{numberOfLike}</span>
    </div>
  );
}