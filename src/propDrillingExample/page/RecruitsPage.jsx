import Link from "../../components/Link";
import RecruitTable from "../components/RecruitTable";

export default function RecruitsPage({ recruits, setRecruits }) {
  return (
    <>
      <Link className="button" to="create">
        추가
      </Link>
      <hr />
      <RecruitTable recruits={recruits} setRecruits={setRecruits} />
    </>
  );
}
