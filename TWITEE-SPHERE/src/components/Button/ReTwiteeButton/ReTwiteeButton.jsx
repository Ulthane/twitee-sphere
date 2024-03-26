import { useState } from "react";
import ReTwiteeModal from "../../modales/ReTwiteeModal";

export default function ReTwiteeButton({ twiteeValue }) {
  //STATES
  const [reTwiteeModalDisplay, setReTwiteeModalDisplay] = useState(false);

  //METHODES

  const displayModaleHandler = (value) => {
    setReTwiteeModalDisplay(value);
  };

  return (
    <>
      <div
        className="flex flex-row gap-1 hover:cursor-pointer"
        onClick={displayModaleHandler}
      >
        <img
          src="../../../public/icons/article/repostIcon.svg"
          alt="repost icon"
          width={"25px"}
        />
      </div>
      {reTwiteeModalDisplay && (
        <ReTwiteeModal
          displayModaleHandler={displayModaleHandler}
          twiteeValue={twiteeValue}
        />
      )}
    </>
  );
}
