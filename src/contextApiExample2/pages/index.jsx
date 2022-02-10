import { Route, Routes } from "react-router-dom";

import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

export default function ContextApiExample() {
  return (
    <div>
      <h2>context api2 example</h2>
      <Routes>
        <Route index element={<RecruitsPage />} />
        <Route path="create" element={<RecruitCreatePage />} />
        <Route path="detail/:id" element={<RecruitDetailPage />} />
        <Route path="edit/:id" element={<RecruitEditPage />} />
      </Routes>
    </div>
  );
}
