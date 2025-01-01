import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage.tsx";
import { TopPage } from "./TopPage.tsx";
import { InputPage } from "./InputPage.tsx";
import { Provider } from "jotai";
function AppRoutes() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<LoginPage />} />{" "}
        <Route path="/top" element={<TopPage />} />{" "}
        <Route path="/input" element={<InputPage />} />{" "}
      </Routes>
    </Provider>
  );
}
export default AppRoutes;
