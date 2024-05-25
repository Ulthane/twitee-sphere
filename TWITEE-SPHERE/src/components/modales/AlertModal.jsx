//Components
import ModaleTempalte from "../modales/ModaleTemplate";
import Button from "../Button/Button.jsx";

export default function AlerteModal({ displayModaleHandler, alertMessage }) {
    // Méthode

    return (
        <>
            <ModaleTempalte displayModaleHandler={displayModaleHandler}>
                <div className="m-6 flex flex-col justify-center items-center ">
                    <h2 className=" text-xl font-bold my-4">{alertMessage}</h2>

                    <Button
                        value="Ok"
                        w="150px"
                        h="50px"
                        className="bg-blueLogo hover:bg-blueLogoDark my-2"
                        fn={() => displayModaleHandler(false)}
                    />
                </div>
            </ModaleTempalte>
        </>
    );
}
