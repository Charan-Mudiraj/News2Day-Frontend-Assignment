import "./css/FlipCard.css";
import { allNews } from "./atoms";
import { useRecoilValue } from "recoil";

export default function FlipCard({ title, index }) {
  const newsFeeds = useRecoilValue(allNews);
  const news = newsFeeds[index];
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="title">{title}</p>
          <p>(Hover Me to Flip)</p>
        </div>
        <div className="flip-card-back">
          <div>
            <div>
              <img src={news.media[0].url} />
            </div>
          </div>
          <div style={{ padding: "6px", height: "100%" }}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "13px",
                textAlign: "left",
              }}
            >
              {news.title.substring(0, 30) + "..."}
            </p>
            <p style={{ fontSize: "10px" }}>
              {news.content.substring(0, 200) + "..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
