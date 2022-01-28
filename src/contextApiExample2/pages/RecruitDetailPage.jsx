import { useParams } from "react-router-dom";

import { useRecruitsContext } from "../context/recruits";
import RecruitCard from "../components/RecruitCard";
import Link from "../../components/Link";

export default function RecruitDetailPage() {
  const { id } = useParams();
  const {
    state: { recruits },
  } = useRecruitsContext();

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
