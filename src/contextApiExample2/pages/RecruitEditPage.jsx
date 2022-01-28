import { useParams } from "react-router-dom";

import { useRecruitsContext } from "../context/recruits";
import RecruitForm from "../components/RecruitForm";
import Link from "../../components/Link";

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
