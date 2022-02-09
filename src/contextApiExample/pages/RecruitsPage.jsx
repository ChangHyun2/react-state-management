import RecruitsTable from "../components/RecruitsTable";
import Link from "../../components/Link";

export default function RecruitsPage() {
  return (
    <>
      <Link className="button" to="create">
        추가
      </Link>
      <hr />
      <RecruitsTable />
    </>
  );
}
