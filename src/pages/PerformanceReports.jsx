import { useRecoilValue } from "recoil";
import { allNews } from "../components/atoms";
import Donut from "../components/Donut";
import "./css/PerformanceReports.css";
import { likesPerCategory } from "../components/data";
import Bar from "../components/Bar";
import Pie from "../components/Pie";
import Line from "../components/Line";

export default function PerformanceReports() {
  const newsFeeds = useRecoilValue(allNews);
  let totalLikes = 0,
    totalViews = 0,
    totalPublished = 0;
  for (let i = 0; i < newsFeeds.length; i++) {
    if (newsFeeds[i].status == "published") {
      totalPublished++;
      totalLikes += newsFeeds[i].likes;
      totalViews += newsFeeds[i].views;
    }
  }
  const categoriesArr = likesPerCategory.map((c) => c.category);
  const categoryLikesArr = likesPerCategory.map((c) => c.likes);
  const categoryViewsArr = likesPerCategory.map((c) => c.views);
  const categoryTimeSpent = categoryViewsArr.slice().reverse();
  return (
    <div id="pr">
      <div id="pr-total">
        <div>
          <p>Published: {totalPublished}</p>
          <p>Views: {totalViews}</p>
        </div>
        <hr />
        <div>
          <Donut
            labels={["Likes", "No Likes"]}
            chartName={"Total-Likes"}
            dataArr={[totalLikes, totalViews - totalLikes]}
            id={"pr-total-likes-2d"}
            className="pr-chart"
          />
          <p>Likes: {totalLikes}</p>
        </div>
      </div>
      <div>
        <Bar
          id="pr-cat-vs-likes"
          chartName={"Category-vs-Likes"}
          labels={categoriesArr}
          dataArr={categoryLikesArr}
          className="pr-chart"
          axis="x"
        />
        <p className="pr-title">
          No.of Likes for Each Categories of News Feeds
        </p>
      </div>
      <div>
        <Pie
          id="pr-cat-vs-views"
          chartName={"Category-Views"}
          labels={categoriesArr}
          dataArr={categoryViewsArr}
          className="pr-chart"
        />
        <p className="pr-title">
          No.of Likes for Each Categories of News Feeds
        </p>
      </div>
      <div>
        <Bar
          id="pr-cat-vs-timeSpent"
          chartName={"Category-vs-TimeSpent(sec)"}
          labels={categoriesArr}
          dataArr={categoryTimeSpent}
          className="pr-chart"
          axis="y"
        />
        <p className="pr-title">
          No.of Likes for Each Categories of News Feeds
        </p>
      </div>
      <div>
        <Line
          id="pr-users-reg"
          chartName={"Months-vs-UserRegistrations"}
          labels={["January", "February", "March", "April", "May", "June"]}
          dataArr={[65, 80, 45, 32, 51, 39]}
          className="pr-chart"
        />
        <p className="pr-title">
          No.of Likes for Each Categories of News Feeds
        </p>
      </div>
    </div>
  );
}
