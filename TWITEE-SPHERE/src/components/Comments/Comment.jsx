import { useContext } from "react";
//Composant
import UserZone from "../UserZone/UserZone";
import TrashIcon from "../../assets/SVG/TrashIcon";

export default function Comment({ commentInformation }) {
  return (
    <>
      <div className="rounded-xl backdrop-blur-md bg-blueBgArticle/50 text-white grid grid-cols-[2fr_7fr] p-2 gap-1">
        <div className=" self-start">
          <UserZone userInformations={commentInformation.user} />
        </div>
        <div>
          {commentInformation.description}
          <TrashIcon />
        </div>
      </div>
    </>
  );
}
