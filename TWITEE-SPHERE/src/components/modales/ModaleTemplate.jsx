// Librairie
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ModaleTempalte({ displayModaleHandler, children }) {
  return (
    <>
      {createPortal(
        <div
          className="absolute bottom-0 right-0 left-0 top-0 flex justify-center items-center"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="w-[1020px] backdrop-blur-md bg-blueBgArticle/50 text-white flex flex-col justify-center items-center gap-2 rounded-xl">
            <div className="absolute right-5 top-5 hover:text-blueLogo hover:cursor-pointer">
              <div
                className="text-[35px]"
                onClick={(event) => {
                  event.stopPropagation();
                  displayModaleHandler(false);
                }}
              >
                <IoCloseCircleOutline />
              </div>
            </div>
            {children}
          </div>
        </div>,
        document.querySelector("body")
      )}
    </>
  );
}
