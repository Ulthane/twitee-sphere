import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay() {
  //Context
  const { setArticles, articles, getThirtyArticlesWhithOffset } =
    useContext(TwiteeContext);
  const context = useContext(TwiteeContext);
  console.log("CONTEXT");
  console.log(context);

  //STATE
  const [articlesOffset, setArticlesOffset] = useState(0);
  const [articlesToDisplay, setArticlesToDisplay] = useState();

  //Methode
  const prepareArticlesToDisplay = () => {
    const articlesToDisplay = [...articles].reverse();
    return articlesToDisplay.map((article, index) => (
      <Article key={index} articleInformations={article} />
    ));
  };

  //CYCLES
  useEffect(() => {
    setArticlesToDisplay(prepareArticlesToDisplay());
    console.log("Update");
  }, [articles]);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {articlesToDisplay}
    </div>
  );
}
