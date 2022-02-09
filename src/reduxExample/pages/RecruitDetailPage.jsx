import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import RecruitCard from "../../components/RecruitCard";
import Link from "../../components/Link";

export default function RecruitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recruits = useSelector((state) => state.recruits.data);
  const recruit = recruits.find((recruit) => recruit.id === id);

  if (!recruit) {
    navigate("../");
    return null;
  }

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
