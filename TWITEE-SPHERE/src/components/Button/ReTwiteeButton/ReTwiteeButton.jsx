import { useState } from "react";

export default function ReTwiteeButton() {
  //STATES

  const [commentModalDisplay, setCommentModalDisplay] = useState(false);

  //METHODES

  const displayModaleHandler = (value) => {
    setCommentModalDisplay(value);
  };

  return (
    <>
      <div className="flex flex-row gap-1">
        <img
          src="../../../public/icons/article/repostIcon.svg"
          alt="repost icon"
          width={"25px"}
        />
      </div>
      {/* 
      <CommentModal
        displayModaleHandler={displayModaleHandler}
        commentModalDisplay={commentModalDisplay}
        id_article={articleId}
        getNumberOfComment={getNumberOfComment}
      /> */}
    </>
  );
}
