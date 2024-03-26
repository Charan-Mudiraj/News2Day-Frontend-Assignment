import "./css/PreviewNews.css";
import whatsappIcon from "../assets/whatsapp.png";
import icon from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { newNews } from "../components/atoms";
import { useNavigate, useLocation } from "react-router-dom";

function TopMedia({ media }) {
  const playVideo = () => {
    const video = document.getElementById("media-video");
    video.addEventListener("play", () => {
      video.classList.add("video-playing");
      document.getElementById("video-play-btn").style.display = "none";

      const btns = document.getElementById("pn-labels-btns");
      if (btns) {
        btns.style.display = "none";
      }
      document.getElementById("pn-labels").style.height = "auto";
    });
    video.addEventListener("seeking", () => {
      video.play();
    });
    video.addEventListener("pause", () => {
      video.classList.remove("video-playing");
      document.getElementById("video-play-btn").style.display = "block";
      if (window.innerWidth > 1300) {
        const btns = document.getElementById("pn-labels-btns");
        if (btns) {
          btns.style.display = "flex";
        }
        document.getElementById("pn-labels").style.height = "100%";
      }
    });
    video.play();
  };
  return (
    <div>
      {media.mediaType == "image" ? (
        <img src={media.url} id="background-image" />
      ) : (
        <i
          class="fa-solid fa-circle-play"
          id="video-play-btn"
          onClick={playVideo}
        ></i>
      )}
      <div>
        {media.mediaType == "image" ? (
          <img src={media.url} />
        ) : (
          <video controls id="media-video">
            <source src={media.url} />
          </video>
        )}
      </div>
    </div>
  );
}
export default function PreviewNews() {
  const [currentMedia, setCurrentMedia] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [news, setNews] = useRecoilState(newNews);
  const [media, category, title, content] = [
    news.media,
    news.category,
    news.title,
    news.content,
  ];
  useEffect(() => {
    if (location.state) {
      setNews({
        media: location.state.media,
        title: location.state.title,
        content: location.state.content,
        category: location.state.category,
        created: location.state.created,
        status: location.state.status,
        likes: location.state.likes,
        views: location.state.views,
      });
    }
  }, []);
  return (
    <>
      <button
        className="primary-btn"
        style={{ position: "absolute", top: "20px", left: "40px" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      {news.status && news.status == "published" && (
        <div id="preview-meta">
          <p>Created On: {news.created}</p>
          <p>
            <i class="fa-regular fa-eye" style={{ marginRight: "5px" }}></i>
            Views: {news.views}
          </p>
          <p>
            <i class="fa-solid fa-thumbs-up" style={{ marginRight: "5px" }}></i>
            Likes: {news.likes}
          </p>
        </div>
      )}

      <div id="pn">
        <div id="pn-top">
          <div id="pn-labels">
            {media.length > 1 && (
              <div id="pn-labels-btns">
                <button
                  onClick={() => {
                    if (currentMedia > 0) {
                      setCurrentMedia(currentMedia - 1);
                      const image =
                        scrollContainerRef.current?.children[currentMedia - 1];
                      image?.scrollIntoView({
                        behaviour: "smooth",
                        block: "nearest",
                      });
                    }
                  }}
                >
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  onClick={() => {
                    if (currentMedia < media.length - 1) {
                      setCurrentMedia(currentMedia + 1);
                      const image =
                        scrollContainerRef.current?.children[currentMedia + 1];
                      image?.scrollIntoView({
                        behaviour: "smooth",
                        block: "nearest",
                      });
                    }
                  }}
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
            <div id="pn-labels-bottom">
              <p>{category}</p>
              {media.length > 1 && (
                <div>
                  {media.map((m, i) => (
                    <input key={i} type="radio" checked={currentMedia == i} />
                  ))}
                </div>
              )}
              <p>News2Day</p>
            </div>
          </div>
          <div id="pn-media" ref={scrollContainerRef}>
            {media.map((m, i) => (
              <TopMedia key={i} media={m} />
            ))}
          </div>
        </div>
        <div id="pn-content">
          <p id="pn-title">{title}</p>
          <p id="pn-desc">{content}</p>
        </div>
        <div id="pn-bottom">
          <div>
            <img src={icon} style={{ marginLeft: "10px" }} />
            <div>
              <p>Your name</p>
              <div>
                <i class="fa-regular fa-clock"></i>
                <p>15 hr. ago</p>
              </div>
            </div>
          </div>
          <div>
            <i class="fa-regular fa-thumbs-up"></i>
            <i class="fa-regular fa-paper-plane"></i>
            <img src={whatsappIcon} style={{ marginRight: "10px" }} />
          </div>
        </div>
      </div>
    </>
  );
}
