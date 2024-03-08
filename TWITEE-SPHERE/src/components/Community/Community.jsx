import { useEffect, useState } from "react";
import { useToken } from "../../hook/useToke";
import Button from "../Button/Button";

export default function Community({ communitiesToDisplay }) {
  return (
    <>
      {communitiesToDisplay.map((community, index) => (
        <div
          key={index}
          className="rounded-[25px] p-5 w-[700px] community mb-[15px]"
          style={{ background: "rgba(42, 163, 239, 0.1)" }}
        >
          {/* Mapping des communautés pour afficher dynamiquement */}

          <div className="flex justify-between mb-[20px]">
            <h3>profil ..</h3>
            <img
              className="w-[40px] rounded-[10px]"
              src="https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg"
              alt=""
            />
          </div>
          <h2 className="text-blueLogo text-[36px]">
            <b>{community.name}</b>
          </h2>
          <p className="text-[16px]">{community.description}</p>
          <div className="mt-[35px] flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="mr-[10px]"
                src="../../public/Icons/user/user_white.svg"
                alt="icone user"
              />
              <p>2532</p>
            </div>
            <Button value={"Rejoindre"} />
          </div>
        </div>
      ))}
    </>
  );
}
