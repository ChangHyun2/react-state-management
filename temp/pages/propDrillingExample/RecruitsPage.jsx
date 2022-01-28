import RecruitTable from "../../components/propDrillingExample/RecruitTable";
import Link from "../../../components/Link";

export default function RecruitsPage({ recruits }) {
  return (
    <>
      <Link className="button" to="create">
        추가
      </Link>
      <hr />
      <RecruitTable recruits={recruits} />
    </>
  );
}
