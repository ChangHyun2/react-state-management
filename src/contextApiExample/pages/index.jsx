import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RecruitApi from "../../api/recruit";
import { useRecruitsContext } from "../context/recruits";
import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

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
