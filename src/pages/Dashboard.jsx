import "./css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Pie from "../components/Pie";
import Bar from "../components/Bar";
import Donut from "../components/Donut";
import { allNews } from "../components/atoms";
import { likesPerCategory } from "../components/data";
import { useRecoilValue } from "recoil";
import AdminCard from "../components/AdminCard";
import FlipCard from "../components/FlipCard";

export default function Dashboard() {
  const newsFeeds = useRecoilValue(allNews);
  const navigate = useNavigate();
  let totalLikes = 0,
    totalViews = 0,
    totalPublished = 0;
  let topViewedNewsIndex = 0;
  let topLikedNewsIndex = 0;
  for (let i = 0; i < newsFeeds.length; i++) {
    if (newsFeeds[i].status == "published") {
      totalPublished++;
      totalLikes += newsFeeds[i].likes;
      totalViews += newsFeeds[i].views;
      if (newsFeeds[topViewedNewsIndex].views < newsFeeds[i].views) {
        topViewedNewsIndex = i;
      }
      if (newsFeeds[topLikedNewsIndex].likes < newsFeeds[i].likes) {
        topLikedNewsIndex = i;
      }
    }
  }
  const categoriesArr = likesPerCategory.map((c) => c.category);
  const categoryViewsArr = likesPerCategory.map((c) => c.views);
  const categoryLikesArr = likesPerCategory.map((c) => c.likes);
  return (
    <div id="db">
      <div id="db-left">
        <p className="db-title">Quick Stats</p>
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
              id={"db-total-likes-2d"}
              className="pr-chart"
            />
            <p>Likes: {totalLikes}</p>
          </div>
        </div>
        <Pie
          id="db-cat-vs-views"
          chartName={"Category-Views"}
          labels={categoriesArr}
          dataArr={categoryViewsArr}
          className="pr-chart"
        />
        <Bar
          id="db-cat-vs-likes"
          chartName={"Category-vs-Likes"}
          labels={categoriesArr}
          dataArr={categoryLikesArr}
          className="pr-chart"
          axis="x"
        />
      </div>
      <div id="db-mid">
        <p className="db-title">Admin Profile</p>
        <div id="db-mid-profile">
          <AdminCard />
        </div>
        <p className="db-title">Top Performed Feeds</p>
        <div id="db-mid-topPerformed">
          <FlipCard title="Most Viewed Feed" index={topViewedNewsIndex} />
          <FlipCard title="Most Liked Feed" index={topLikedNewsIndex} />
        </div>
      </div>
      <div id="db-right">
        <div id="db-right-quickLinks">
          <p className="db-title">Quick Links</p>
          <div>
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/create");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "cneter",
                gap: "10px",
                fontSize: "large",
              }}
            >
              <i className="fa-solid fa-plus db-link-icon"></i>
              <p>Create Feed</p>
            </button>
            <button
              className="primary-btn db-icon"
              onClick={() => {
                navigate("/manage");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "cneter",
                gap: "10px",
                fontSize: "large",
              }}
            >
              <i className="fa-solid fa-list-check db-link-icon"></i>
              Manage Feeds
            </button>
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/performance");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "cneter",
                gap: "10px",
                fontSize: "large",
              }}
            >
              <i className="fa-solid fa-chart-simple db-link-icon"></i>
              Performance Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
