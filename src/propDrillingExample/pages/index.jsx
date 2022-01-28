import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RecruitApi from "../../api/recruit";

import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

export default function PropDrillingExample() {
  const [recruits, setRecruits] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const recruits = await RecruitApi.get();

        setRecruits(recruits);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <h2>prop drilling example</h2>
      <Routes>
        <Route
          index
          element={
            <RecruitsPage recruits={recruits} setRecruits={setRecruits} />
          }
        />
        <Route
          path="create"
          element={<RecruitCreatePage setRecruits={setRecruits} />}
        />
        <Route
          path="detail/:id"
          element={<RecruitDetailPage recruits={recruits} />}
        />
        <Route
          path="edit/:id"
          element={
            <RecruitEditPage setRecruits={setRecruits} recruits={recruits} />
          }
        />
      </Routes>
    </div>
  );
}
