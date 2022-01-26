import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import RecruitApi from "../api/recruit";

import RecruitsPage from "./contextApiExample2/RecruitsPage";
import RecruitCreatePage from "./contextApiExample2/RecruitCreatePage";
import RecruitEditPage from "./contextApiExample2/RecruitEditPage";
import RecruitDetailPage from "./contextApiExample2/RecruitDetailPage";
import { useRecruitsContext } from "../context/recruits2";

export default function ContextApiExample() {
  const {
    helpers: { setRecruits },
  } = useRecruitsContext();

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
