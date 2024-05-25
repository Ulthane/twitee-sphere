//Hooks
import { useRef, useContext } from "react";

//Components
import ModaleTempalte from "../modales/ModaleTemplate";
import Button from "../Button/Button";
import Comment from "./Comment.jsx";

export default function CommentModal({
    displayModaleHandler,
    commentModalDisplay,
    comments,
    setNewCommentHandler,
    refreshCommentHandler,
}) {
    //Ref
    const comment = useRef();

    // Méthode

    const sendComment = (event) => {
        event.preventDefault();
        setNewCommentHandler(comment.current.value);
        comment.current.value = "";
    };

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
                            {/* {commentsDisplay()} */}
                            {comments.reverse().map((comment, index) => (
                                <Comment
                                    key={"comments_" + index}
                                    commentInformation={comment}
                                    refreshCommentHandler={
                                        refreshCommentHandler
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </ModaleTempalte>
            )}
        </>
    );
}
