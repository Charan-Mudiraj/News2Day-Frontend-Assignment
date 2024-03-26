import "./App.css";
import CreateNews from "./pages/CreateNews";
import PreviewNews from "./pages/PreviewNews";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageNews from "./pages/ManageNews";
import PerformanceReports from "./pages/PerformanceReports";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";

function TopHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  if (currentPath == "/preview") {
    return <></>;
  }
  return (
    <div
      style={{
        width: "fit-content",
        paddingTop: "18px",
        margin: "0 auto",
        paddingBottom: "5px",
      }}
      id="top-header"
    >
      <Header />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <TopHeader />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/preview" element={<PreviewNews />}></Route>
          <Route path="/create" element={<CreateNews />}></Route>
          <Route path="/manage" element={<ManageNews />}></Route>
          <Route path="/performance" element={<PerformanceReports />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}
