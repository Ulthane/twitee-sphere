// React
import { useContext, useState } from "react";

//Component
import Button from "../components/Button/Button";
import UserZone from "../components/UserZone/UserZone";
import RemoveFriendButton from "../components/Button/RemoveFriendButton/RemoveFriendButton";
import UpdateProfilModal from "../components/modales/UpdateProfilModal/UpdateProfilModal";

//Context
import { TwiteeContext } from "../store/TwiteeContext";

//Utils
import { firstLetterUpperCase } from "../utils/stringFunction";

export default function UserInformationsPage() {
  // Context
  const { user } = useContext(TwiteeContext);

  //State
  const [updateProfilModalDisplay, setUpdateProfilModalDisplay] =
    useState(false);

  //Variables
  const userInformations = { ...user };

  const userFriendsDisplay = (
    <>
      {userInformations.friends.map((friendInformation, index) => (
        <div
          className="pr-2 flex flex-row justify-between items-center w-full"
          key={index}
        >
          <UserZone userInformations={friendInformation} />

          <RemoveFriendButton
            firstName={firstLetterUpperCase(friendInformation.firstname)}
            lastName={firstLetterUpperCase(friendInformation.lastname)}
            idUser={friendInformation.id_user}
          />
        </div>
      ))}
    </>
  );

  console.log(userInformations);

  //Méthodes
  const updateProfilModalDisplayHandler = (value) => {
    setUpdateProfilModalDisplay(value);
  };

  return (
    <>
      {/* User informations */}
      <div className=" mt-9 mx-auto  text-white flex flex-row gap-3 justify-start items-center">
        <img
          src={userInformations.img_src}
          alt="avatar"
          className=" w-[120px]  overflow-y-hidden"
          style={{ "clip-path": "ellipse(33% 50%)" }}
        />

        <div className=" font-bold text-4xl">
          {firstLetterUpperCase(userInformations.firstname) +
            " " +
            firstLetterUpperCase(userInformations.lastname)}
        </div>
      </div>
      <Button
        value="Modifier profil"
        w="110px"
        h="40px"
        className="bg-blueLogo hover:bg-blueLogoDark my-2"
        textSize="0.8rem"
        fn={() => updateProfilModalDisplayHandler(true)}
      />
      {/* User's community informations */}
      <div className=" mt-9 mx-auto  text-white flex flex-row gap-3 justify-start items-center">
        <div className=" font-bold text-2xl">Ma communauté</div>
      </div>

      {/* User's friends */}
      <div className=" mt-9 mx-auto  text-white flex flex-col gap-3 ">
        <div className=" font-bold text-2xl mb-4">Friends</div>
        <div className=" my-1 flex flex-row gap-3  justify-between items-center">
          {userFriendsDisplay}
        </div>
      </div>

      {updateProfilModalDisplay && (
        <UpdateProfilModal
          userInformations={userInformations}
          displayModaleHandler={updateProfilModalDisplayHandler}
        />
      )}
    </>
  );
}
