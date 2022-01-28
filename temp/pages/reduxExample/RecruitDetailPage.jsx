import { useParams } from "react-router-dom";

import RecruitCard from "../../components/reduxExample/RecruitCard";
import Link from "../../../components/Link";
import { useSelector } from "react-redux";

export default function RecruitDetailPage() {
  const { id } = useParams();

  const recruits = useSelector((state) => state.recruits.data);
  const recruit = recruits.find((recruit) => recruit.id === id);

  return (
    <>
      <Link className="button" to="../">
        뒤로
      </Link>
      <Link className="button" to={`../edit/${id}`}>
        수정
      </Link>
      <hr />
      <RecruitCard recruit={recruit} />
    </>
  );
}
