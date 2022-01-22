import { useParams } from "react-router-dom";
import RecruitCard from "../../components/propDrilling/RecruitCard";
import Link from "../../components/Link";

export default function RecruitDetailPage({ recruits }) {
  const { id } = useParams();
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
