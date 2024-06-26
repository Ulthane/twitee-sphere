// Librairy
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Component
import Button from "../components/Button/Button";
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
    const [userCommunity, setUserCommunity] = useState("");

    //Méthodes
    const targetedUserFriendsDisplay = () => {
        if (targetedUserInformations.friends !== undefined) {
            return (
                <>
                    {targetedUserInformations.friends[0] !== "initial" &&
                        targetedUserInformations.friends.map(
                            (friendInformation, index) => (
                                <div
                                    className="pr-2 flex flex-row justify-between items-center w-full mb-4"
                                    key={index}
                                >
                                    <UserProfile
                                        userInformations={friendInformation}
                                    />

                                    {targetedUserId ===
                                        connectedUserInformations.id_user && (
                                        <RemoveFriendButton
                                            firstName={firstLetterUpperCase(
                                                friendInformation.firstname
                                            )}
                                            lastName={firstLetterUpperCase(
                                                friendInformation.lastname
                                            )}
                                            idUser={friendInformation.id_user}
                                        />
                                    )}
                                </div>
                            )
                        )}
                </>
            );
        }
    };

    const getUserCommunity = async (communityId) => {
        const request = await getFetch(
            `https://twitee-api.gamosaurus.fr/api/communities/get/id/${communityId}`,
            { Authorization: token.getToken() }
        );

        const userCommunity = { ...request[0] };

        if (request) {
            if (userCommunity.id_communities) {
                setUserCommunity(userCommunity);
            }
        } else {
            toast.error("Une erreur s'est produite");
        }
    };

    const updateProfilModalDisplayHandler = (value) => {
        setUpdateProfilModalDisplay(value);
    };

    const getTargetedUserInformations = async () => {
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
        setUserCommunity("");
        getTargetedUserInformations();
    }, [targetedUserId]);

    useEffect(() => {
        if (targetedUserInformations) {
            getUserCommunity(targetedUserInformations.id_communities);
        }
    }, [targetedUserInformations]);

    //JSX
    return (
        <>
            {targetedUserIdHandler()}
            {targetedUserInformations == undefined ? (
                <div></div>
            ) : (
                <div>
                    {/* User informations */}
                    <div className=" mt-9 mx-auto text-white flex flex-row gap-3 justify-start items-center">
                        <img
                            src={targetedUserInformations.img_src}
                            alt="avatar"
                            className=" w-[120px] h-[120px] overflow-y-hidden object-cover rounded-xl"
                        />

                        <div className=" font-bold text-4xl">
                            {firstLetterUpperCase(
                                targetedUserInformations.firstname
                            ) +
                                " " +
                                firstLetterUpperCase(
                                    targetedUserInformations.lastname
                                )}
                        </div>

                        {isFriend() && (
                            <AddFriendButton
                                firstName={targetedUserInformations.firstname}
                                lastName={targetedUserInformations.lastname}
                                idUser={state.targetedUserId}
                            />
                        )}
                    </div>
                    {state.targetedUserId ===
                        connectedUserInformations.id_user && (
                        <Button
                            value="Modifier profil"
                            w="120px"
                            h="40px"
                            className="bg-blueLogo hover:bg-blueLogoDark my-2"
                            textSize="0.8rem"
                            fn={() => updateProfilModalDisplayHandler(true)}
                        />
                    )}
                    {/* User's community informations */}
                    {userCommunity != "" && (
                        <div className=" mt-9 mx-auto  text-white flex flex-col gap-3 justify-start items-start">
                            <div className=" font-bold text-2xl">
                                Ma communauté
                            </div>
                            <div className="flex flex-row items-center justify-between w-full pe-10">
                                <div className="flex items-center">
                                    <img
                                        className=" rounded-2xl w-28 me-5"
                                        src={userCommunity.icon}
                                        alt="community image"
                                    />
                                    <div className="font-bold text-2xl">
                                        {userCommunity.name}
                                    </div>
                                </div>

                                <div className="flex text-2xl">
                                    <span className="font-bold">Points :</span>
                                    &nbsp;{userCommunity.score}
                                </div>
                            </div>
                            <div> {userCommunity.description}</div>
                        </div>
                    )}

                    {/* User's friends */}
                    <div className=" mt-9 mx-auto  text-white flex flex-col gap-3 ">
                        <div className=" font-bold text-2xl mb-4">Friends</div>
                        <div className=" my-1">
                            {targetedUserFriendsDisplay()}
                        </div>
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
