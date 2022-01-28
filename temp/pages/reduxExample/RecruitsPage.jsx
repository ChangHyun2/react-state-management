import RecruitTable from "../../components/reduxExample/RecruitTable";
import Link from "../../../components/Link";

export default function RecruitsPage() {
  return (
    <>
      <Link className="button" to="create">
        추가
      </Link>
      <hr />
      <RecruitTable />
    </>
  );
}