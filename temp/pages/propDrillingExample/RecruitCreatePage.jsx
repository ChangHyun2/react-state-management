import RecruitForm from "../../components/propDrillingExample/RecruitForm";
import Link from "../../../components/Link";

export default function RecruitCreatePage({ setRecruits }) {
  return (
    <>
      <Link className="button" to="../">
        뒤로
      </Link>
      <hr />
      <RecruitForm setRecruits={setRecruits} />
    </>
  );
}
