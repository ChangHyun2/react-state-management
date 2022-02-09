import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addRecruit } from "../redux/features/recruits";
import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";

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
    } finally {
      setIsSubmitting(false);
    }
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
