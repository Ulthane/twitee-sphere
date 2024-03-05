import Button from "../Button/Button";

export default function Community() {
  return (
    <div
      className="rounded-[25px] p-5 w-[700px]"
      style={{ background: "rgba(42, 163, 239, 0.1)" }}
    >
      <div className="flex justify-between mb-[20px]">
        <h3>John Doe</h3>
        <img
          src="https://pixabay.com/fr/illustrations/chien-chiot-mignonne-dessin-anim%C3%A9-3431913/"
          alt=""
        />
      </div>
      <h2 className="text-blueLogo">Girly friends</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="mt-[35px] flex justify-around items-center">
        <p>2532</p>
        {/* Assurez-vous que le composant Button est correctement défini et importé */}
        <Button value={"Rejoindre"} />
      </div>
    </div>
  );
}
