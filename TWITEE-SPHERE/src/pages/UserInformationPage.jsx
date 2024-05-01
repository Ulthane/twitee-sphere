// Librairy
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Component
import Button from "../components/Button/Button";
import UserZone from "../components/UserZone/UserZone";
import UserProfile from "../components/UserProfile/UserProfile";
import RemoveFriendButton from "../components/Button/RemoveFriendButton/RemoveFriendButton";
import UpdateProfilModal from "../components/modales/UpdateProfilModal/UpdateProfilModal";
import AddFriendButton from "../components/Button/AddFriendButton/AddFriendButton";

//Context
import { TwiteeContext } from "../store/TwiteeContext";

//Utils
import { firstLetterUpperCase } from "../utils/stringFunction";
import { getFetch } from "../utils/Fetch";
import { useToken } from "../hooks/useToken";
import { toast } from "react-toastify";

export default function UserInformationsPage() {
  // Context
  const { user: connectedUserInformations } = useContext(TwiteeContext);

  //Targeted User
  const { state } = useLocation();

  //token
  const token = useToken();

  //State
  const [targetedUserInformations, setTargetedUserInformations] = useState();
  const [updateProfilModalDisplay, setUpdateProfilModalDisplay] =
    useState(false);
  const [targetedUserId, setTargetedUserId] = useState();
  const [connectedUserId, setConnectedUserId] = useState(
    connectedUserInformations.id_user
  );

  // console.log(targetedUserId);
  // console.log(connectedUserId);

  //Méthodes
  const targetedUserFriendsDisplay = () => {
    if (targetedUserInformations.friends !== undefined) {
      return (
        <>
          {targetedUserInformations.friends[0] !== "initial" &&
            targetedUserInformations.friends.map((friendInformation, index) => (
              <div
                className="pr-2 flex flex-row justify-between items-center w-full mb-4"
                key={index}
              >
                <UserProfile userInformations={friendInformation} />

                {targetedUserId === connectedUserInformations.id_user && (
                  <RemoveFriendButton
                    firstName={firstLetterUpperCase(
                      friendInformation.firstname
                    )}
                    lastName={firstLetterUpperCase(friendInformation.lastname)}
                    idUser={friendInformation.id_user}
                  />
                )}
              </div>
            ))}
        </>
      );
    }
  };

  const updateProfilModalDisplayHandler = (value) => {
    setUpdateProfilModalDisplay(value);
  };

  const getTargetedUserInformations = async () => {
    console.log("state", state);
    const response = await getFetch(
      `https://twitee-api.gamosaurus.fr/api/users/get/other/${state.targetedUserId}`,
      { Authorization: token.getToken() }
    );

    if (response.message) {
      toast.error(response.message);
    } else {
      const userInformations = { ...response };
      setTargetedUserInformations({ ...userInformations });
    }
  };

  const targetedUserIdHandler = () => {
    if (state.targetedUserId !== targetedUserId) {
      setTargetedUserId(state.targetedUserId);
    }

    if (connectedUserInformations.id_user && !connectedUserId) {
      setConnectedUserId(connectedUserInformations.id_user);
    }
  };

  const isFriend = () => {
    let count = 0;
    if (connectedUserInformations.friends !== undefined) {
      connectedUserInformations.friends.forEach((friend) => {
        if (friend.id_user === state.targetedUserId) {
          count++;
        }
      });
    }
    if (state.targetedUserId === connectedUserInformations.id_user) {
      count++;
    }
    return count === 0 ? true : false;
  };

  //Cycle
  useEffect(() => {
    getTargetedUserInformations();
  }, [targetedUserId]);

  return (
    <>
      {targetedUserIdHandler()}
      {targetedUserInformations == undefined ? (
        <div></div>
      ) : (
        <div>
          {/* User informations */}
          <div className=" mt-9 mx-auto  text-white flex flex-row gap-3 justify-start items-center">
            <img
              src={targetedUserInformations.img_src}
              alt="avatar"
              className=" w-[120px]  overflow-y-hidden"
              style={{ clipPath: "ellipse(33% 50%)" }}
            />

            <div className=" font-bold text-4xl">
              {firstLetterUpperCase(targetedUserInformations.firstname) +
                " " +
                firstLetterUpperCase(targetedUserInformations.lastname)}
            </div>

            {isFriend() && (
              <AddFriendButton
                firstName={targetedUserInformations.firstname}
                lastName={targetedUserInformations.lastname}
                idUser={state.targetedUserId}
              />
            )}
          </div>
          {state.targetedUserId === connectedUserInformations.id_user && (
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
            <div className=" my-1">{targetedUserFriendsDisplay()}</div>
          </div>
        </div>
      )}

      {updateProfilModalDisplay && (
        <UpdateProfilModal
          userInformations={connectedUserInformations}
          displayModaleHandler={updateProfilModalDisplayHandler}
        />
      )}
    </>
  );
}
