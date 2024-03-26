import { useEffect, useState } from "react";
import "./css/CreateNews.css";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Category from "../components/Category";
import { categories } from "../components/data";
import "../components/css/Category.css";
import { useRecoilState } from "recoil";
import { newNews } from "../components/atoms";
import { useNavigate, useLocation } from "react-router-dom";
import { allNews } from "../components/atoms";

export default function CreateNews() {
  const [news, setNews] = useRecoilState(newNews);
  const [allNewsFeeds, setAllNewsFeeds] = useRecoilState(allNews);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setNews({
        media: location.state.media,
        title: location.state.title,
        content: location.state.content,
        category: location.state.category,
        created: location.state.created,
      });
    }
  }, []);

  const isAllFilled = (news) => {
    return news.media.length != 0 && news.title && news.content && news.category
      ? true
      : false;
  };
  if (isAllFilled(news) && !news.created) {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fullDate = date + "/" + month + "/" + year;
    setNews((n) => {
      return {
        ...n,
        created: fullDate,
      };
    });
  }

  const inputMedia = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, video/*";
    input.click();
    input.addEventListener("change", () => {
      const file = input.files[0];
      const fileUrl = URL.createObjectURL(file);
      let mediaType = file.type.includes("image") ? "image" : "video";
      if (mediaType == "video") {
        const index = news.media.findIndex((n) => n.mediaType == "video");
        if (index >= 0) {
          alert("A Video Already Exists. Only (1) video is allowed per feed.");
          return;
        }
      }
      setNews((n) => {
        const media = [...n.media];
        media.push({ mediaType: mediaType, url: fileUrl });
        return {
          ...n,
          media: media,
        };
      });
    });
  };
  const storeInGlobalFeeds = (newFeed) => {
    if (location.state) {
      //edited news
      const index = allNewsFeeds.findIndex((n) => n.id == location.state.id);
      if (index >= 0) {
        const allFeeds = [...allNewsFeeds];
        allFeeds[index] = newFeed;
        setAllNewsFeeds(allFeeds);
      }
      return;
    }
    // new news
    const allFeeds = [...allNewsFeeds, newFeed];
    setAllNewsFeeds(allFeeds);
  };
  const saveToDraft = () => {
    storeInGlobalFeeds({
      ...news,
      status: "drafted",
    });
    navigate("/manage");
  };
  const publish = () => {
    storeInGlobalFeeds({
      ...news,
      status: "published",
    });
    navigate("/manage");
  };

  return (
    <div id="cn">
      <div>
        <label>
          <p>Add Images or Videos</p>
        </label>

        <div id="cn-mediaList">
          {news.media.map((m, i) => {
            if (m.mediaType == "image") {
              return (
                <div key={i}>
                  <img src={m.url} className="cn-media" />
                </div>
              );
            }
            return (
              <div key={i}>
                <video className="cn-media" controls>
                  <source src={m.url} />
                </video>
              </div>
            );
          })}
          <div id="cn-addMedia" onClick={inputMedia}>
            <PhotoIcon id="cn-photoIcon" />
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <label>
          <p>Title</p>
        </label>
        <input
          type="text"
          value={news.title}
          onInput={(e) => {
            setNews((n) => {
              return {
                ...n,
                title: e.target.value,
              };
            });
          }}
        />
      </div>
      <div>
        <label>
          <p>Content</p>
        </label>
        <textarea
          id=""
          rows="5"
          style={{ resize: "none" }}
          value={news.content}
          onInput={(e) => {
            setNews((n) => {
              return {
                ...n,
                content: e.target.value,
              };
            });
          }}
        ></textarea>
      </div>
      <div>
        <label>
          <p>Categories</p>
        </label>
        <div className="radio-tile-group" id="cn-categories">
          {categories.map((c, i) => (
            <Category title={c.title} icon={c.icon} key={i} index={i} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="primary-btn" onClick={saveToDraft}>
          Save to Draft
        </button>
        <button className="secondary-btn" onClick={publish}>
          Publish
        </button>
        <button
          className="secondary-btn"
          onClick={() => {
            navigate("/preview");
          }}
        >
          Priview
        </button>
      </div>
    </div>
  );
}
