// Librairie
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Route
import route from "../../routes/route";

// Composant
import NavlinkDisplay from "./NavLink/NavlinkDisplay";
import NewTwiteeModal from "../modales/NewTwiteeModal";
import Button from "../Button/Button";

// Hooks
import { useToken } from "../../hooks/useToken";

// SVG
import HomeIcon from "../../assets/SVG/HomeIcon";
import CommunityIcon from "../../assets/SVG/CommunityIcon";
import FireIcon from "../../assets/SVG/FireIcon";

export default function Home() {
    // STATE
    const [newTwiteeModalDisplay, setnewTwiteeModalDisplay] = useState(false);

    // HOOKS
    const { deleteToken } = useToken();
    const navigate = useNavigate();

    //Méthodes
    const updateNewTwiteeModalDisplayHandler = (value) => {
        setnewTwiteeModalDisplay(value);
    };

    const logout = () => {
        deleteToken();
        navigate(route.LOGIN);
    };

    return (
        <>
            <ul className="flex flex-col justify-center items-start h-75 w-100 gap-y-5">
                {/* Link to home */}
                <li>
                    <NavlinkDisplay
                        route={route.HOME}
                        img={<HomeIcon />}
                        value={"Accueil"}
                    />
                </li>
                {/* Link to Follows */}
                <li>
                    <NavlinkDisplay
                        route={route.FOLLOW}
                        img={<FireIcon />}
                        value={"Suivis"}
                    />
                </li>
                {/* Link to Community */}
                <li>
                    <NavlinkDisplay
                        route={route.COMMUNITY}
                        img={<CommunityIcon />}
                        value={"Communauté"}
                    />
                </li>
                {/* New Twitee button */}
                <li>
                    <Button
                        value="Twitee"
                        w="250px"
                        h="50px"
                        className="bg-blueLogo hover:bg-blueLogoDark"
                        fn={() => setnewTwiteeModalDisplay(true)}
                    />
                </li>
                {/* Logout button */}
                <li>
                    <Button
                        value="Déconnexion"
                        w="250px"
                        h="50px"
                        className="bg-red-400 hover:bg-red-500"
                        fn={logout}
                    />
                </li>
            </ul>

            {/* MODALE NEW TWITEE */}
            {newTwiteeModalDisplay && (
                <NewTwiteeModal
                    updateStateModalDisplay={updateNewTwiteeModalDisplayHandler}
                />
            )}

            <div className="fixed bottom-4 text-sm text-gray-500">
                1.0 - Twitee Team, All Right Reserved ©
            </div>
        </>
    );
}
