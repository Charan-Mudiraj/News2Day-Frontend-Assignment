import { useRecoilState } from "recoil";
import { categoriesToggles, newNews } from "./atoms";
// const toggleAtIndex = (arr, i) => {
//   const newArr = [...arr];
//   newArr[i] = !arr[i];
//   return newArr;
// };
export default function Category({ title, icon, index }) {
  // const [toggles, setToggles] = useRecoilState(categoriesToggles);
  const [news, setNews] = useRecoilState(newNews);
  const selectCat = news.category;
  return (
    <div
      className="input-container"
      onClick={() => {
        setNews((n) => {
          return {
            ...n,
            category: title,
          };
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <input
        id="walk"
        className="radio-button"
        type="checkbox"
        name="radio"
        checked={selectCat == title}
        onChange={() => {}}
      />
      <div className="radio-tile">
        <div className="icon walk-icon">{icon}</div>
        <label
          htmlFor="walk"
          className="radio-tile-label"
          style={{ cursor: "pointer" }}
        >
          {title}
        </label>
      </div>
    </div>
  );
}
