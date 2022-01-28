import { useParams } from "react-router-dom";

import RecruitForm from "../components/RecruitForm";
import Link from "../../components/Link";

export default function RecruitEditPage({ setRecruits, recruits }) {
  const { id } = useParams();
  const recruit = recruits.find((recruit) => recruit.id === id);

  return (
    <>
      <Link className="button" to={`../detail/${id}`}>
        뒤로
      </Link>
      <hr />
      <RecruitForm setRecruits={setRecruits} recruit={recruit} />
    </>
  );
}
