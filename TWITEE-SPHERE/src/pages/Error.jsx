import ErrorIcon from "../assets/SVG/ErrorIcon";

export default function Error() {
    return (
        <>
            <div className="h-screen mx-auto text-white">
                <div className="flex flex-col justify-center items-center h-2/3">
                    <ErrorIcon />
                    <h1 className="text-4xl mb-5">Error 404</h1>
                    <div className="text-xl">
                        Une erreur s'est produite rafraichissez la page
                    </div>
                </div>
            </div>
        </>
    );
}
