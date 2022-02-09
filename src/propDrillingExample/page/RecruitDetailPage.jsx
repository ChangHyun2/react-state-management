import { useParams, useNavigate } from "react-router-dom";

import Link from "../../components/Link";
import RecruitCard from "../../components/RecruitCard";

export default function RecruitDetailPage({ recruits }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recruit = recruits.find((recruit) => recruit.id === id);

  if (!recruit) {
    navigate("/prop-drilling");
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
