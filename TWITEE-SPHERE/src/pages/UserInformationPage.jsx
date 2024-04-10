// Librairy
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

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

  //author article ID
  const { state } = useLocation();

  const userFriendsDisplay = (
    <>
      {userInformations.friends.map((friendInformation, index) => (
        <div
          className="pr-2 flex flex-row justify-between items-center w-full mb-4"
          key={index}
        >
          <UserZone userInformations={friendInformation} />

          {state.authorId === userInformations.id_user && (
            <RemoveFriendButton
              firstName={firstLetterUpperCase(friendInformation.firstname)}
              lastName={firstLetterUpperCase(friendInformation.lastname)}
              idUser={friendInformation.id_user}
            />
          )}
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
          style={{ clipPath: "ellipse(33% 50%)" }}
        />

        <div className=" font-bold text-4xl">
          {firstLetterUpperCase(userInformations.firstname) +
            " " +
            firstLetterUpperCase(userInformations.lastname)}
        </div>
      </div>
      {state.authorId === userInformations.id_user && (
        <Button
          value="Modifier profil"
          w="110px"
          h="40px"
          className="bg-blueLogo hover:bg-blueLogoDark my-2"
          textSize="0.8rem"
          fn={() => updateProfilModalDisplayHandler(true)}
        />
      )}
      {/* User's community informations */}
      <div className=" mt-9 mx-auto  text-white flex flex-row gap-3 justify-start items-center">
        <div className=" font-bold text-2xl">Ma communauté</div>
      </div>

      {/* User's friends */}
      <div className=" mt-9 mx-auto  text-white flex flex-col gap-3 ">
        <div className=" font-bold text-2xl mb-4">Friends</div>
        <div className=" my-1">{userFriendsDisplay}</div>
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
