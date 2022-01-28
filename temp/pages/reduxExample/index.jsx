import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import { useDispatch, useSelector } from "react-redux";

import RecruitDetailPage from "./RecruitDetailPage";
import { fetchRecruits } from "../../redux/features/recruits";

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
