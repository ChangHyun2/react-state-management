import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RecruitsApi from "../../api/recruits";
import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

export default function PropDrillingExample() {
  const [recruits, setRecruits] = useState([]);
  const [isLoadingRecruits, setIsLoadingRecruits] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingRecruits(true);
      try {
        const recruits = await RecruitsApi.get();

        setRecruits(recruits);
      } catch (e) {
        console.error(e);
      }
      setIsLoadingRecruits(false);
    })();
  }, []);

  return (
    <div>
      <h2>prop drilling example</h2>
      <Routes>
        <Route
          index
          element={
            <RecruitsPage
              recruits={recruits}
              setRecruits={setRecruits}
              isLoadingRecruits={isLoadingRecruits}
            />
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
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </div>
  );
}
