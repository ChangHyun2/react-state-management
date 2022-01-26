import { useParams } from "react-router-dom";
import RecruitCard from "../../components/contextApi2/RecruitCard";
import Link from "../../components/Link";
import { useRecruitsContext } from "../../context/recruits2";

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
