import { useParams, useNavigate } from "react-router-dom";

import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";
import RecruitsApi from "../../api/recruits";

export default function RecruitEditPage({ setRecruits, recruits }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recruit = recruits.find((recruit) => recruit.id === id);

  if (!recruit) {
    navigate("../");
    return null;
  }

  const handleSubmit = async (formValues) => {
    try {
      const { id } = recruit;
      await RecruitsApi.patch(id, formValues);

      setRecruits((prev) =>
        prev.map((recruit) =>
          recruit.id === id ? { ...recruit, ...formValues } : { ...recruit }
        )
      );
      navigate(`../detail/${id}`);
    } catch (e) {
      console.error(e);
      window.alert(e);
    }
  };

  return (
    <>
      <Link className="button" to={`../detail/${id}`}>
        뒤로
      </Link>
      <hr />
      <RecruitForm recruit={recruit} onSubmit={handleSubmit} />
    </>
  );
}
