import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecruitForm from "../components/RecruitForm";
import Link from "../../components/Link";

export default function RecruitEditPage() {
  const { id } = useParams();

  const recruits = useSelector((state) => state.recruits.data);
  const recruit = recruits.find((recruit) => recruit.id === id);

  return (
    <>
      <Link className="button" to={`../detail/${id}`}>
        뒤로
      </Link>
      <hr />
      <RecruitForm recruit={recruit} />
    </>
  );
}
