//Library
import { useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";
import { toast } from "react-toastify";
import { getFetch } from "../../../utils/Fetch";
//Components
import LikeButton from "../../Button/LikeButton/Likebutton";
import CommentButton from "../../Button/CommentButton/CommentButton";
import ReTwiteeButton from "../../Button/ReTwiteeButton/ReTwiteeButton";
import NewTwiteeModal from "../../modales/NewTwiteeModal";
import AddFriendButton from "../../Button/AddFriendButton/AddFriendButton";
import UserProfile from "../../UserProfile/UserProfile";

export default function Article({
    articleInformations,
    communityId,
    connectedUserId,
    friend,
    setRefreshHomeHandler,
}) {
    // console.log("articleInformations", article);
    //States
    const [isOpen, setOpen] = useState(false);
    const [updateTwiteeModalDisplay, setUpdateTwiteeModalDisplay] =
        useState(false);
    const [communityImg, setCommunityImg] = useState("");

    //Varaibles
    const token = useToken();

    // Méthodes
    const getCommunityImg = async (communityId) => {
        const request = await getFetch(
            `https://twitee-api.gamosaurus.fr/api/communities/get/id/${communityId}`,
            { Authorization: token.getToken() }
        );

        const userCommunity = { ...request[0] };

        if (request) {
            if (userCommunity.id_communities) {
                setCommunityImg(userCommunity.icon);
            }
        } else {
            toast.error("Une erreur s'est produite");
        }
    };

    const updateTwiteeModalDisplayHandler = (value) => {
        setUpdateTwiteeModalDisplay(value);
    };

    const updateArticle = () => {
        setOpen(!isOpen);
        setUpdateTwiteeModalDisplay(true);
    };

    const DropDown = () => {
        const handleDropDown = () => {
            setOpen(!isOpen);
        };
        return (
            <div className="dropdown flex flex-col items-end relative">
                <button className="font-bold" onClick={handleDropDown}>
                    ...
                </button>

                <div
                    id="dropdown"
                    className={`z-10 w-44 bg-blue-50 absolute mr-5 rounded divide-y divide-gray-100 ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <ul className="z-10 w-44 bg-blue-50 rounded-xl text-blueBgArticle font-bold">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 text-xs rounded hover:bg-blue-200"
                                onClick={updateArticle}
                            >
                                Modifier
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    //Cycle
    useEffect(() => {
        getCommunityImg(articleInformations.user.id_communities);
    }, []);

    //JSX
    return (
        <>
            <div className="max-w-md min-w-[600px] p-6 bg-blueBgArticle rounded-3xl shadow">
                {/* Header Container */}
                <div className="flex flex-row justify-between items-center gap-3 mb-3 ">
                    {/* User's informations */}
                    <div className="flex flex-row justify-center items-center gap-2 relative">
                        <UserProfile
                            userInformations={articleInformations.user}
                        />

                        {/* Add Friends */}
                        {articleInformations.user.id_user != connectedUserId &&
                        !friend ? (
                            <AddFriendButton
                                firstName={articleInformations.user.firstname}
                                lastName={articleInformations.user.lastname}
                                idUser={articleInformations.user.id_user}
                            />
                        ) : null}
                    </div>
                    {/* actions and Community */}
                    <div className="flex flex-row justify-center items-center gap-3">
                        {articleInformations.user.id_user === connectedUserId &&
                            DropDown()}

                        {/* Community's image */}
                        {communityImg != "" && (
                            <img
                                className="w-[50px] h-[50px] rounded-xl"
                                src={communityImg}
                                alt="community's picture"
                            />
                        )}
                    </div>
                </div>
                {/* article's message */}
                <p className="mb-3 text-sm text-white w-max-full break-words">
                    {articleInformations.description}
                </p>
                {/* article's image */}
                {articleInformations.img_src !== "" && (
                    <img
                        className="m-auto rounded-3xl w-max-[300px] h-max-[150px]"
                        src={articleInformations.img_src}
                        alt="default"
                    />
                )}

                {/* Footer container */}
                <div className="flex flex-row justify-evenly items-center mt-6">
                    {/* COMMENT BUTTON */}
                    <CommentButton
                        articleId={articleInformations.id_articles}
                    />
                    {/* RETWITEE BUTTON */}
                    <ReTwiteeButton
                        twiteeValue={{
                            textValue: articleInformations.description,
                            imgSrcValue: articleInformations.img_src,
                        }}
                    />
                    {/* LIKE BUTTON */}
                    <LikeButton
                        articleId={articleInformations.id_articles}
                        communityId={communityId}
                        token={token.getToken()}
                        userID={articleInformations}
                    />
                </div>
            </div>

            {/* MODALE UPDATE TWITEE */}
            {updateTwiteeModalDisplay && (
                <NewTwiteeModal
                    updateStateModalDisplay={updateTwiteeModalDisplayHandler}
                    value={{
                        textValue: articleInformations.description,
                        imgSrcValue: articleInformations.img_src,
                    }}
                    update={true}
                    id={articleInformations.id_articles}
                    setRefreshHomeHandler={setRefreshHomeHandler}
                />
            )}
        </>
    );
}
