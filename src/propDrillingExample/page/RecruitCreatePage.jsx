import { useNavigate } from "react-router-dom";

import RecruitApi from "../../api/recruit";
import Link from "../../components/Link";
import RecruitForm from "../../components/RecruitForm";

export default function RecruitCreatePage({ setRecruits }) {
  const navigate = useNavigate();

  const createRecruit = async (formValues) => {
    try {
      const recruit = await RecruitApi.post(formValues);

      setRecruits((prev) => [...prev, recruit]);
    } catch (e) {
      console.error(e);
    } finally {
      navigate("../");
    }
  };

  return (
    <>
      <Link className="button" to="../">
        뒤로
      </Link>
      <hr />
      <RecruitForm onSubmit={createRecruit} />
    </>
  );
}
