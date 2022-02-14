import { useNavigate } from "react-router-dom";

import Link from "../../components/Link";
import RecruitForm from "../../components/RecruitForm";
import RecruitsApi from "../../api/recruits";

export default function RecruitCreatePage({ setRecruits }) {
  const navigate = useNavigate();

  const handleSubmit = async (formValues, setIsSubmitting) => {
    setIsSubmitting(true);
    try {
      const recruit = await RecruitsApi.post(formValues);
      setRecruits((prev) => [...prev, recruit]);
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
