import { useNavigate } from "react-router";

import Link from "../../components/Link";
import RecruitForm from "../../components/RecruitForm";
import { useRecruitsContext } from "../context/recruits";

export default function RecruitCreatePage() {
  const navigate = useNavigate();
  const {
    helpers: { addRecruit },
  } = useRecruitsContext();

  const handleSubmit = async (formValues, setIsSubmitting) => {
    setIsSubmitting(true);
    try {
      await addRecruit(formValues);
      navigate("../");
    } catch (e) {
      console.error(e);
      window.alert(e.message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Link className="button" to="../">
        뒤로
      </Link>
      <hr />
      <RecruitForm onSubmit={handleSubmit} />
    </>
  );
}
