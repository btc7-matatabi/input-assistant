import { Route, Routes } from "react-router-dom";
import { TopPage } from "./TopPage.tsx";
import { InputPage } from "./InputPage.tsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />{" "}
      <Route path="/input" element={<InputPage />} />{" "}
    </Routes>
  );
}
export default AppRoutes;
