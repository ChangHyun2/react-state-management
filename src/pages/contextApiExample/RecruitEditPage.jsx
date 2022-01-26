import { useParams } from "react-router-dom";
import RecruitForm from "../../components/contextApi/RecruitForm";
import Link from "../../components/Link";
import { useRecruitsContext } from "../../context/recruits";

export default function RecruitEditPage() {
  const {
    state: { recruits },
  } = useRecruitsContext();
  const { id } = useParams();

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
