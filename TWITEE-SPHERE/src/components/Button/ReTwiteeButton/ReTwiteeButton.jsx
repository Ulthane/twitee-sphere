import { useState } from "react";
import ReTwiteeModal from "../../modales/ReTwiteeModal";
import RepostIcon from "../../../assets/SVG/RepostIcon";

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
                <RepostIcon />
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
