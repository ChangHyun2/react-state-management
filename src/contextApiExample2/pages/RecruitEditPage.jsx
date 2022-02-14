import { useParams, useNavigate } from "react-router-dom";

import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";
import { useRecruitsContext } from "../context/recruits";

export default function RecruitEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    state: { recruits },
    helpers: { updateRecruit },
  } = useRecruitsContext();

  const recruit = recruits.find((recruit) => recruit.id === id);

  if (!recruit) {
    navigate("../");
    return null;
  }

  const handleSubmit = async (formValues, setIsSubmitting) => {
    setIsSubmitting(true);
    try {
      await updateRecruit(id, formValues);
      navigate(`../detail/${id}`);
    } catch (e) {
      console.error(e);
      window.alert(e.message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Link className="button" to={`../detail/${id}`}>
        뒤로
      </Link>
      <hr />
      <RecruitForm recruit={recruit} onSubmit={handleSubmit} />
    </>
  );
}
