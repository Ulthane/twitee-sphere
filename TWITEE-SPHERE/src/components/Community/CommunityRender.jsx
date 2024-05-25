import { useEffect, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import Button from "../Button/Button";

export default function CommunityRender({
    userInfo,
    community,
    changeCommunity,
    myCommunity,
}) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        userInfo.then((res) => {
            setUserData(res);
        });
    }, []);

    return (
        <div
            className="rounded-[25px] p-5 w-[600px] h-[auto] community mb-[15px]"
            style={{ background: "rgba(42, 163, 239, 0.1)" }}
        >
            {/* Mapping des communautés pour afficher dynamiquement */}
            <div className="flex justify-between mb-[5px]">
                <UserProfile userInformations={userData} />
                <img
                    className="w-[50px] h-[50px] rounded-xl object-cover"
                    src={community.icon}
                    alt="icone de la communauté"
                />
            </div>
            <h2 className="text-blueLogo text-[36px]">
                <b>{community.name}</b>
            </h2>
            <p className="text-[16px]">{community.description}</p>
            <div className="mt-[15px] flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        className="mr-[10px] w-8"
                        src="Icons/user/score.png"
                        alt="icone user"
                    />
                    <p>{community.score}</p>
                </div>
                <Button
                    fn={(e) => {
                        changeCommunity(
                            e,
                            community.id_communities,
                            community.name
                        );
                    }}
                    value={
                        myCommunity !== 0 &&
                        community.id_communities === myCommunity
                            ? "Quitter"
                            : "Rejoindre"
                    }
                    type={"button"}
                    w={"200px"}
                    h={"50px"}
                    className={
                        myCommunity !== 0 &&
                        community.id_communities === myCommunity
                            ? "p-3 bg-blue-700 hover:bg-red-500"
                            : "p-3 bg-blueLogo hover:bg-blueLogoDark"
                    }
                />
            </div>
        </div>
    );
}
