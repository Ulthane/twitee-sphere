//Librairies
import { useState } from "react";
import { Link } from "react-router-dom";

//Component
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NewTwiteeModal from "../modales/NewTwiteeModal";
import UserProfile from "../UserProfile/UserProfile";

//Utils
import route from "../../routes/route";

export default function Header() {
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
                <Link to={route.HOME}>
                    <Logo />
                </Link>

                <Button
                    value="+"
                    w="50px"
                    h="50px"
                    className="bg-blueLogo hover:bg-blueLogoDark"
                    fn={() => setnewTwiteeModalDisplay(true)}
                />

                <UserProfile
                    userInformations={connectedUserInformation}
                    communityDisplay={true}
                />
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
