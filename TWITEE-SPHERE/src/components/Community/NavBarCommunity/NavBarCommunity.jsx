//composant
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Logo from "../../Logo/Logo";
import UserProfile from "../../UserProfile/UserProfile";

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
            type={"search"}
            placeholder={"Rechercher"}
            className=" w-[600px] h-[50px] "
            reference={searchRef}
            onchange={(e) => searchCommunities(e)}
          />
          <Button
            value={
              <img
                className="mx-auto"
                width="15"
                height="100px"
                src="../../public/Icons/searchBar/search_white.svg"
                alt="icone search"
              />
            }
            w={"80px"}
            h={"50px"}
            className=" bg-blueLogo absolute right-0 top-3 cursor-default"
          />
        </form>
      </div>
      <UserProfile communityDisplay={true} userInformations={userInformation} />
    </div>
  );
}
