import axios from "axios";
import { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../config";

export default function NewsFeed() {
  const [data, setData] = useState("");

  useEffect(() => {
    const options = {
      url: "https://crypto-news-live3.p.rapidapi.com/news",
      headers: {
        "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com/news",
        "x-rapidapi-key": NEWS_API_KEY,
      },
    };
    const getData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, []);

  const news = data && data.slice(0, 7);

  return (
    <div className="news-feed">
      <h2>NewsFeed</h2>
      {news && news.map((item) => <p key={item.title}>{item.title}</p>)}
    </div>
  );
}
