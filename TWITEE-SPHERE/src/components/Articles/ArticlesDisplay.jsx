import { useEffect, useState } from "react";
import Article from "./Article/Article";
import { toast } from "react-toastify";

export default function ArticlesDisplay() {
  const articlesTest = [
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices felis non orci suscipit viverra. Donec tincidunt malesuada ex, iaculis elementum odio elementum sit amet. Proin non arcu dui.",
      imgSrc:
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
      userInformations: {
        firstName: "John",
        lastName: "Doe",
        imgProfil:
          "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_1280.jpg",
      },
      communityInformations: {
        name: "Farmer",
        imgProfil:
          "https://cdn.pixabay.com/photo/2016/05/21/10/39/village-1406652_1280.jpg",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices felis non orci suscipit viverra. Donec tincidunt malesuada ex, iaculis elementum odio elementum sit amet. Proin non arcu dui.",
      imgSrc:
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
      userInformations: {
        firstName: "John",
        lastName: "Doe",
        imgProfil:
          "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_1280.jpg",
      },
      communityInformations: {
        name: "Farmer",
        imgProfil:
          "https://cdn.pixabay.com/photo/2016/05/21/10/39/village-1406652_1280.jpg",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices felis non orci suscipit viverra. Donec tincidunt malesuada ex, iaculis elementum odio elementum sit amet. Proin non arcu dui.",
      imgSrc:
        "https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_1280.jpg",
      userInformations: {
        firstName: "John",
        lastName: "Doe",
        imgProfil:
          "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_1280.jpg",
      },
      communityInformations: {
        name: "Farmer",
        imgProfil:
          "https://cdn.pixabay.com/photo/2016/05/21/10/39/village-1406652_1280.jpg",
      },
    },
  ];

  //STATE
  const [articlesOffset, setArticlesOffset] = useState(0);
  const [articles, setArticles] = useState([]);

  //Variables
  const token = sessionStorage.getItem("token");

  const getThirtyArticlesWhithOffset = async () => {
    const response = await fetch(
      `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${articlesOffset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      let data = await response.json();
      //   console.log(twitee.current.value);

      let newData = [...data];
      setArticles(newData);
    }
  };

  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  console.log(articles);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {articles.map((article, index) => (
        <Article key={index} articleInformations={article} />
      ))}
    </div>
  );
}
