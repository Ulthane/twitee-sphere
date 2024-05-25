// librairie
import { Link } from "react-router-dom";

//composant
import IconeCommunity from "../Community/iconeCommunity/IconeCommunity";

//Utils
import { firstLetterUpperCase } from "../../utils/stringFunction";
import route from "../../routes/route";

export default function UserProfile({
    communityDisplay = false,
    userInformations = {},
}) {
    return (
        <div className="flex justify-between items-center">
            {userInformations && (
                <img
                    className="w-14 h-14 rounded-full object-cover mr-5"
                    src={userInformations.img_src}
                    alt="Photo de profil"
                />
            )}
            {userInformations && (
                <Link
                    to={route.USER_INFORMATION}
                    state={{ targetedUserId: userInformations.id_user }}
                >
                    {userInformations.firstname && (
                        <p className="text-xl mb-1">
                            {firstLetterUpperCase(userInformations.firstname) +
                                " " +
                                firstLetterUpperCase(userInformations.lastname)}
                        </p>
                    )}

                    <p className="text-sm">{userInformations.surname}</p>
                </Link>
            )}
            {communityDisplay && (
                <div className="items-center mx-[35px]">
                    <IconeCommunity />
                </div>
            )}
        </div>
    );
}
