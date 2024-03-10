export default function UserZone({ userInformations }) {
  //JSX
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2">
        {/* user's picture */}
        <img
          className="w-[40px] h-[40px] rounded-full shadow-lg "
          src="https://cdn.pixabay.com/photo/2016/12/17/16/16/woman-1913737_1280.jpg"
          alt="user's picture"
        />
        {/* User first name and last name */}
        <span className=" font-bold">
          {userInformations.firstname + " " + userInformations.lastname}
        </span>
      </div>
    </>
  );
}
