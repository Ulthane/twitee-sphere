//Librairies
import { useContext, useState } from "react";
//Component
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NewTwiteeModal from "../modales/NewTwiteeModal";
import UserProfile from "../UserProfile/UserProfile";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function Header() {
  //Context
  const { community } = useContext(TwiteeContext);

  // const [userCommunityInformation, setUserCommunityInformation] =
  //   useState(community);

  console.log(community);

  // STATE
  const [newTwiteeModalDisplay, setnewTwiteeModalDisplay] = useState(false);

  const connectedUserInformation = JSON.parse(
    sessionStorage.getItem("user_informations")
  );
  //Méthodes
  const updateNewTwiteeModalDisplayHandler = (value) => {
    setnewTwiteeModalDisplay(value);
  };

  //JSX
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <Logo />

        <Button
          value="+"
          w="50px"
          h="50px"
          className="bg-blueLogo hover:bg-blueLogoDark"
          fn={() => setnewTwiteeModalDisplay(true)}
        />

        <UserProfile userInformations={connectedUserInformation} />
      </div>
      {/* MODALE NEW TWITEE */}
      {newTwiteeModalDisplay && (
        <NewTwiteeModal
          updateStateModalDisplay={updateNewTwiteeModalDisplayHandler}
        />
      )}
    </>
  );
}
