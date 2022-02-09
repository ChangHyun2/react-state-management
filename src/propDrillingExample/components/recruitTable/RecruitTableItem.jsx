import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import RecruitApi from "../../../api/recruit";

export default function RecruitTableItem({ recruit, setRecruits }) {
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
    <StyledTableItem key={id} onClick={handleClick}>
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
    </StyledTableItem>
  );
}

const StyledTableItem = styled.tr`
  th,
  td {
    width: calc(100% / 10);
    border: 1px solid;
    padding: 10px;
    text-align: center;
  }
`;
