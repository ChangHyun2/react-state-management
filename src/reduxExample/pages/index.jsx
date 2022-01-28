import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { fetchRecruits } from "../redux/features/recruits";
import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

export default function ContextApiExample() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.recruits.error);

  useEffect(() => {
    dispatch(fetchRecruits());
  }, [dispatch]);

  useEffect(() => {
    if (error !== null) {
      console.error(error);
    }
  }, [error]);
  return (
    <div>
      <h2>context api example</h2>
      <Routes>
        <Route index element={<RecruitsPage />} />
        <Route path="create" element={<RecruitCreatePage />} />
        <Route path="detail/:id" element={<RecruitDetailPage />} />
        <Route path="edit/:id" element={<RecruitEditPage />} />
      </Routes>
    </div>
  );
}
