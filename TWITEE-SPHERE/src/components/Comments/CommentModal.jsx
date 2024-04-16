//Hooks
import { useEffect, useRef, useState, useContext } from "react";
import { useToken } from "../../hooks/useToken";

//Utils
import { getFetch, postFetch } from "../../utils/Fetch";

//Components
import ModaleTempalte from "../modales/ModaleTemplate";
import Button from "../Button/Button";
import Comment from "./Comment.jsx";
import AlerteModal from "../modales/AlertModal.jsx";

//Context
import { TwiteeContext } from "../../store/TwiteeContext.jsx";

//Librairies
import { toast } from "react-toastify";

export default function CommentModal({
  displayModaleHandler,
  commentModalDisplay,
  id_article,
  getNumberOfComment,
}) {
  //Context
  const { articles } = useContext(TwiteeContext);

  //States
  const [comments, setComments] = useState([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const [alertModalDisplay, setAlertModalDisplay] = useState(false);

  //Ref
  const comment = useRef();

  // Hooks
  const { getToken } = useToken();

  //Variables
  const token = getToken();

  // Méthode

  const refreshCommentHandler = () => setRefreshComment(!refreshComment);

  const alertModaleDisplayHandler = (value) => {
    setAlertModalDisplay(value);
  };

  const sendComment = async (event) => {
    event.preventDefault();
    console.log("send");

    if (
      comment.current.value == "" ||
      [...comment.current.value].length > 281
    ) {
      alertModaleDisplayHandler(true);
    } else {
      const request = await postFetch(
        "https://twitee-api.gamosaurus.fr/api/comentaries/create",
        { Authorization: token },
        {
          id_article: id_article,
          description: comment.current.value,
        }
      );

      if (request.message !== "success") {
        toast.error(request.message);
      } else {
        const newComment = [
          ...comments,
          {
            id_article: id_article,
            description: comment.current.value,
            user: {
              firstName: "",
              lastname: "",
              id_communities: "",
              img_src: "",
            },
          },
        ];
        setComments(newComment);
        refreshCommentHandler();
        comment.current.value = "";
      }
    }
  };

  const getComments = async () => {
    // console.log("Get_Comments");
    const response = await getFetch(
      `https://twitee-api.gamosaurus.fr/api/comentaries/get?limit=30&offset=0&id=${id_article}`,
      { Authorization: token }
    );

    const newComments = [...response];
    setComments(newComments);
  };

  const commentsDisplay = () => {
    const newComments = [...comments].reverse();
    return (
      <>
        {newComments.map((comment, index) => (
          <Comment
            key={index}
            commentInformation={comment}
            refreshCommentHandler={refreshCommentHandler}
          />
        ))}
      </>
    );
  };

  //Cycles
  useEffect(() => {
    getComments();
    getNumberOfComment(comments.length);
    // console.log("Bug 3");
  }, [refreshComment, articles]);

  useEffect(() => {
    getNumberOfComment(comments.length);
    // console.log("Bug 4");
  }, [comments]);

  return (
    <>
      {commentModalDisplay && (
        <ModaleTempalte displayModaleHandler={displayModaleHandler}>
          <h2 className="text-[32px] my-5 font-bold font-poppins">
            <span className="text-blueLogo">C</span>ommentaires
          </h2>
          <div className="grid grid-cols-[1fr_3fr] h-full w-full p-10 gap-5">
            <div>
              <form
                className="flex flex-col justify-between items-center gap-4"
                onSubmit={(event) => sendComment(event)}
              >
                <textarea
                  name="newTwitee"
                  id="newTwitee"
                  cols="25"
                  rows="10"
                  placeholder="Ecrivez votre message..."
                  className="p-5 font-poppins font-bold text-[16px] w-[300px] border-0 rounded-3xl bg-blueLogo/10 text-white focus:outline-none resize-none"
                  ref={comment}
                ></textarea>

                <Button
                  value="Envoyer"
                  w="250px"
                  h="50px"
                  className="mb-10 bg-blueLogo hover:bg-blueLogoDark"
                  type="submit"
                />
              </form>
            </div>
            <div className="h-[500px] font-poppins font-bold text-[16px]  border-0 rounded-3xl bg-blueLogo/10 text-white flex flex-col justify-stretch gap-2 resize-none p-4 overflow-y-auto">
              {commentsDisplay()}
            </div>
          </div>
        </ModaleTempalte>
      )}
      {alertModalDisplay && (
        <AlerteModal
          displayModaleHandler={alertModaleDisplayHandler}
          alertMessage={
            "Votre commentaire doit contenir entre 1 et 281 caractères"
          }
        />
      )}
    </>
  );
}
