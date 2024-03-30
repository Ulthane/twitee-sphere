import Button from "../Button/Button";

export default function TopCommunity({ topCommunity }) {
  return (
    <div className="w-full flex justify-around items-center mt-[20px] mb-[50px] ">
      <img
        className="w-[50px]"
        src="https://cdn.pixabay.com/photo/2016/05/30/15/44/lion-1425003_960_720.png"
        alt=""
      />
      <h3>
        <span className="text-[20px]">Top Communauté</span> <br />
        <span className="text-blueLogo text-[36px]">
          <b>Girly friends</b>
        </span>
      </h3>
      <span style={{ borderRight: "1px solid white", height: "80px" }}></span>
      <h3>
        <span className="text-blueLogo text-[36px]">
          <b>3789</b>
        </span>
        <br /> <span className="text-[20px]">points</span>
      </h3>
      <Button
        click={() => handleClick()}
        value={"+"}
        type={"button"}
        w={"60px"}
        h={"60px"}
        textSize={"30px"}
        className=" bg-blueLogo hover:bg-blueLogoDark"
      />
    </div>
  );
}
