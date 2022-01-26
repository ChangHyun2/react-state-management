import { useNavigate } from "react-router-dom";

export default function RecruitCard({ recruit }) {
  const navigate = useNavigate();

  if (!recruit) {
    navigate("/context-api2");
    return null;
  }

  const {
    id,
    title,
    recruit_type,
    job,
    career,
    start_date,
    end_date,
    created_at,
    updated_at,
    isPublished,
  } = recruit;

  return (
    <div>
      <ul>
        {Object.entries({
          id,
          title,
          recruit_type,
          job,
          career,
          start_date,
          end_date,
          created_at,
          updated_at,
          isPublished,
        }).map(([key, value]) => (
          <li key={key}>
            <h2>{key}</h2>
            <div>{value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
