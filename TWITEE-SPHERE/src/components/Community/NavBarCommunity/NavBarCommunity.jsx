//composant
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Logo from "../../Logo/Logo";
import UserCommunity from "../userCommunityPage/UserCommunity";

export default function NavBarCommunity({ searchCommunities, searchRef }) {
  return (
    <div className="px-4 py-2 flex justify-between ">
      {/* HEADER */}
      <Logo />
      <div className="relative">
        <form id="searchForm" onSubmit={(e) => searchCommunities(e)}>
          <Input
            type={"search"}
            placeholder={"Rechercher"}
            className=" w-[300px] h-[50px] "
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
      <UserCommunity />
    </div>
  );
}
