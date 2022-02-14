import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";
import { addRecruit } from "../redux/features/recruits";

export default function RecruitCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formValues, setIsSubmitting) => {
    setIsSubmitting(true);
    try {
      const {
        payload: { id },
      } = await dispatch(addRecruit(formValues));

      navigate(`../detail/${id}`);
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
