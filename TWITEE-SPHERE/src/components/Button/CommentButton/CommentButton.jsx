import { useState } from "react";
import CommentModal from "../../Comments/CommentModal";
import CommentaryIcon from "../../../assets/SVG/ComentaryIcon";

export default function LikeButton({ articleId }) {
    //STATES
    const [numberOfComment, setNumberOfComment] = useState(0);
    const [commentModalDisplay, setCommentModalDisplay] = useState(false);

    //METHODES
    const getNumberOfComment = (value) => {
        setNumberOfComment(value);
    };
    const displayModaleHandler = (value) => {
        setCommentModalDisplay(value);
    };

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
                <span>{numberOfComment}</span>
            </div>

            <CommentModal
                displayModaleHandler={displayModaleHandler}
                commentModalDisplay={commentModalDisplay}
                id_article={articleId}
                getNumberOfComment={getNumberOfComment}
            />
        </>
    );
}
