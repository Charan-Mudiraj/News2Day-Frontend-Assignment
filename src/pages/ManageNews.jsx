import "./css/ManageNews.css";
import { useRecoilState } from "recoil";
import { allNews } from "../components/atoms";
import { useNavigate } from "react-router-dom";
import { generateRandomColor } from "../components/functions";
function Row({ news, sno, setNewsFeeds }) {
  const navigate = useNavigate();
  const onDelete = () => {
    setNewsFeeds((nf) => {
      const newNF = [...nf];
      newNF.splice(sno, 1);
      return newNF;
    });
  };
  const onEdit = () => {
    navigate("/create", { state: news });
  };
  const onView = () => {
    navigate("/preview", { state: news });
  };
  const statusBg = news.status == "published" ? "#00ff003f" : "#ff00003f";
  return (
    <tr>
      <th>{sno + 1}</th>
      <td>{news.title}</td>
      <td>{news.category}</td>
      <td>{news.created}</td>
      <td style={{ backgroundColor: statusBg }}>
        <b>{news.status}</b>
      </td>
      <td className="mn-actions">
        {news.status != "published" && (
          <i className="fa-solid fa-pen-to-square" onClick={onEdit}></i>
        )}
        <i className="fa-solid fa-trash" onClick={onDelete}></i>
        <i className="fa-regular fa-eye" onClick={onView}></i>
      </td>
    </tr>
  );
}
export default function ManageNews() {
  const columns = [
    "S.no.",
    "Title",
    "Category",
    "Creation Date",
    "Status",
    "Actions",
  ];
  const [newsFeeds, setNewsFeeds] = useRecoilState(allNews);
  return (
    <div id="mn">
      <table>
        <tr>
          <th colSpan="6">Your News Feeds</th>
        </tr>
        <tr>
          {columns.map((c, i) => (
            <th key={i} style={{ backgroundColor: generateRandomColor(0.247) }}>
              {c}
            </th>
          ))}
        </tr>
        {newsFeeds.map((n, i) => (
          <Row news={n} key={i} sno={i} setNewsFeeds={setNewsFeeds} />
        ))}
      </table>
    </div>
  );
}
