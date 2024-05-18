//composant
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Logo from "../../Logo/Logo";
import UserProfile from "../../UserProfile/UserProfile";
import SearchIcon from "../../../assets/SVG/SearchIcon";

export default function NavBarCommunity({
    searchCommunities,
    searchRef,
    userInformation,
}) {
    return (
        <div className="w-full flex flex-row justify-between items-center px-4 border-b-2 border-blueBgArticleLight">
            {/* HEADER */}
            <Logo />
            <div className="relative">
                <form id="searchForm" onSubmit={(e) => searchCommunities(e)}>
                    <Input
                        type={"text"}
                        placeholder={"Rechercher"}
                        className=" w-[450px] h-[50px] "
                        reference={searchRef}
                        onchange={(e) => searchCommunities(e)}
                    />
                </form>
            </div>
            <UserProfile
                communityDisplay={true}
                userInformations={userInformation}
            />
        </div>
    );
}
