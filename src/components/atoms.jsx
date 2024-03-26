import { atom } from "recoil";
import { categories, sampleNewsFeeds } from "./data";

const initToggles = () => {
  const toggles = [];
  for (let i = 0; i < categories.length; i++) {
    toggles.push(false);
  }
  return toggles;
};
// const samplePublishedNewsFeeds = () => {
//   const feeds = sampleNewsFeeds.map((n) => {
//     delete n.status;
//     return {
//       ...n,
//       views: 0,
//       likes: 0,
//       timeSpent: [],
//     };
//   });
// };

const categoriesToggles = atom({
  key: "categoriesToggles",
  default: initToggles(),
});

const newNews = atom({
  key: "newNews",
  default: {
    media: [], // {mediaType: "image" || "video", url: string}
    title: "",
    content: "",
    category: "",
    created: "",
  },
});

const allNews = atom({
  key: "allNews",
  default: sampleNewsFeeds, // newNews + {status: "published" || "drafted"}
});

const acivePath = atom({
  key: "avtivePath",
  default: "/",
});

export { categoriesToggles, newNews, allNews, acivePath };
