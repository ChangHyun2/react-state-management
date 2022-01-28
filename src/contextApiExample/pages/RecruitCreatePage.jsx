import RecruitForm from "../components/RecruitForm";
import Link from "../../components/Link";

export default function RecruitCreatePage() {
  return (
    <>
      <Link className="button" to="../">
        뒤로
      </Link>
      <hr />
      <RecruitForm />
    </>
  );
}