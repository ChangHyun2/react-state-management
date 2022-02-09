import { useParams, useNavigate } from "react-router-dom";

import RecruitApi from "../../api/recruit";
import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";

export default function RecruitEditPage({ setRecruits, recruits }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const recruit = recruits.find((recruit) => recruit.id === id);

  if (!recruit) {
    navigate("../");
    return null;
  }

  const editRecruit = async (formValues) => {
    try {
      const { id } = recruit;
      await RecruitApi.patch(id, formValues);

      setRecruits((prev) =>
        prev.map((recruit) =>
          recruit.id === id ? { ...recruit, ...formValues } : { ...recruit }
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      navigate(`../detail/${id}`);
    }
  };

  return (
    <>
      <Link className="button" to={`../detail/${id}`}>
        뒤로
      </Link>
      <hr />
      <RecruitForm recruit={recruit} onSubmit={editRecruit} />
    </>
  );
}
