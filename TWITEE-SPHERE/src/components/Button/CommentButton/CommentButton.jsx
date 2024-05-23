import { useEffect, useState } from "react";
import CommentModal from "../../Comments/CommentModal";
import CommentaryIcon from "../../../assets/SVG/ComentaryIcon";
import { getFetch, postFetch } from "../../../utils/Fetch";
import { useToken } from "../../../hooks/useToken";
import AlerteModal from "../../modales/AlertModal";

export default function CommentButton({ articleId }) {
    //STATES
    // const [numberOfComment, setNumberOfComment] = useState(numberOfComments);
    const [commentModalDisplay, setCommentModalDisplay] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [alertModalDisplay, setAlertModalDisplay] = useState(false);
    const [refreshComment, setRefreshComment] = useState(false);

    // Hooks
    const { getToken } = useToken();

    // Variable
    const token = getToken();
    const connectedUserInformations = JSON.parse(
        sessionStorage.getItem("user_informations")
    );

    //METHODES
    // const getNumberOfComment = (value) => {
    //     setNumberOfComment(value);
    // };

    const refreshCommentHandler = () => {
        setRefreshComment(!refreshComment);
    };

    const alertModaleDisplayHandler = (value) => {
        setAlertModalDisplay(value);
    };

    const setNewCommentHandler = (value) => {
        setNewComment(value);
    };

    const displayModaleHandler = (value) => {
        setCommentModalDisplay(value);
    };

    const sendComment = async (comment) => {
        console.log(comment);
        if (comment == "" || [...comment].length > 281) {
            alertModaleDisplayHandler(true);
        } else {
            const request = await postFetch(
                "https://twitee-api.gamosaurus.fr/api/comentaries/create",
                { Authorization: token },
                {
                    id_article: articleId,
                    description: comment,
                }
            );

            if (request.message !== "success") {
                toast.error(request.message);
            } else {
                const newComment = [
                    ...comments,
                    {
                        id_article: articleId,
                        description: comment,
                        user: {
                            id_user: connectedUserInformations.id_user,
                            firstname: connectedUserInformations.firstname,
                            lastname: connectedUserInformations.lastname,
                            id_communities:
                                connectedUserInformations.id_community,
                            img_src: connectedUserInformations.img_src,
                        },
                    },
                ];
                setComments(newComment);
                // refreshCommentHandler();
                setNewComment({});
            }
        }
    };

    const getComments = async () => {
        const response = await getFetch(
            `https://twitee-api.gamosaurus.fr/api/comentaries/get?limit=30&offset=0&id=${articleId}`,
            { Authorization: token }
        );

        const newComments = [...response];
        setComments(newComments);
    };
    useEffect(() => {
        getComments();
    }, [commentModalDisplay, refreshComment, articleId]);

    useEffect(() => {
        if (Object.keys(newComment).length != 0) {
            console.log("newComment", newComment);
            sendComment(newComment);
        }
    }, [newComment]);

    return (
        <>
            <div
                className="flex flex-row gap-1 hover:cursor-pointer"
                onClick={() => displayModaleHandler(true)}
            >
                {/* <img
                    src="icons/article/comentaryIcon.svg"
                    alt="comentary icon"
                    width={"25px"}
                /> */}
                <CommentaryIcon />
                <span>{comments.length}</span>
            </div>

            <CommentModal
                displayModaleHandler={displayModaleHandler}
                commentModalDisplay={commentModalDisplay}
                id_article={articleId}
                comments={comments}
                setNewCommentHandler={setNewCommentHandler}
                refreshCommentHandler={refreshCommentHandler}
                // getNumberOfComment={getNumberOfComment}
            />
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
