import Link from "../../components/Link";
import RecruitsTable from "../components/RecruitsTable";

export default function RecruitsPage({ recruits, setRecruits }) {
  return (
    <>
      <Link className="button" to="create">
        추가
      </Link>
      <hr />
      <RecruitsTable recruits={recruits} setRecruits={setRecruits} />
    </>
  );
}
