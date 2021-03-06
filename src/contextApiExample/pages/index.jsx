import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import RecruitsApi from "../../api/recruits";
import { useRecruitsContext } from "../context/recruits";
import RecruitsPage from "./RecruitsPage";
import RecruitCreatePage from "./RecruitCreatePage";
import RecruitEditPage from "./RecruitEditPage";
import RecruitDetailPage from "./RecruitDetailPage";

export default function ContextApiExample() {
  const {
    helpers: { setRecruits, setIsLoading },
  } = useRecruitsContext();

  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const recruits = await RecruitsApi.get();

        setRecruits(recruits);
      } catch (e) {
        setError(e);
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

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
