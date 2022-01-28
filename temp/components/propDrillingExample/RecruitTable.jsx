import styled from "styled-components";
import RecruitApi from "../../api/recruit";
import { useNavigate } from "react-router-dom";

function RecruitTableItem({ recruit, setRecruits }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    recruit_type,
    job,
    career,
    start_date,
    end_date,
    isPublished,
  } = recruit;

  const handleClick = (e) => {
    navigate(`detail/${recruit.id}`);
  };

  const handleClickDeleteButton = async (e) => {
    e.stopPropagation();

    try {
      await RecruitApi.delete(id);

      setRecruits((prev) => prev.filter((recruit) => recruit.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickIsPublishedToggler = async (e) => {
    e.stopPropagation();

    try {
      await RecruitApi.patch(id, { isPublished: !recruit.isPublished });

      setRecruits((prev) =>
        prev.map((recruit) =>
          recruit.id === id
            ? { ...recruit, isPublished: !recruit.isPublished }
            : recruit
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <tr key={id} onClick={handleClick}>
      <td>{id}</td>
      <td className="title">{title}</td>
      <td>{recruit_type}</td>
      <td>{job}</td>
      <td>{career}</td>
      <td>{`${start_date === "" ? "" : start_date} ~ ${
        end_date === "" ? "" : end_date
      }`}</td>
      <td>
        <button onClick={handleClickIsPublishedToggler} className="delete">
          {isPublished ? "on" : "off"}
        </button>
      </td>
      <td>
        <button onClick={handleClickDeleteButton}>del</button>
      </td>
    </tr>
  );
}

export default function RecruitTable({ recruits, setRecruits }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {[
            "id",
            "채용 제목",
            "채용 전형",
            "직군",
            "경력",
            "채용 기간",
            "공고 상태",
            "삭제",
          ].map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recruits.map((recruit) => (
          <RecruitTableItem
            key={recruit.id}
            recruit={recruit}
            setRecruits={setRecruits}
          />
        ))}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  width: 100%;
  font-size: 14px;
  word-break: break-all;
  border-collapse: collapse;

  tr {
    th,
    td {
      width: calc(100% / 10);
      border: 1px solid;
      padding: 10px;
      text-align: center;
    }
  }
`;
