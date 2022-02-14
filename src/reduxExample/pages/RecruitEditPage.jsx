import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RecruitForm from "../../components/RecruitForm";
import Link from "../../components/Link";
import { updateRecruit } from "../redux/features/recruits";

export default function RecruitEditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recruits = useSelector((state) => state.recruits.data);
  const recruit = recruits.find((recruit) => recruit.id === id);

  const handleSubmit = async (formValues, setIsSubmitting) => {
    setIsSubmitting(true);
    try {
      await dispatch(updateRecruit({ id, data: formValues }));
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
