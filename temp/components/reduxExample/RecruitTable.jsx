import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteRecruit, updateRecruit } from "../../redux/features/recruits";

function RecruitTableItem({
  recruit: {
    id,
    title,
    recruit_type,
    job,
    career,
    start_date,
    end_date,
    isPublished,
  },
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingPublishStatus, setIsTogglingPublishStatus] = useState(false);

  const handleClick = (e) => navigate(`detail/${id}`);

  const handleClickDeleteButton = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);

    try {
      await dispatch(deleteRecruit(id));
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickIsPublishedToggler = async (e) => {
    e.stopPropagation();
    setIsTogglingPublishStatus(true);

    try {
      await dispatch(
        updateRecruit({ id, data: { isPublished: !isPublished } })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsTogglingPublishStatus(false);
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
          {isTogglingPublishStatus ? "updating..." : isPublished ? "on" : "off"}
        </button>
      </td>
      <td>
        <button onClick={handleClickDeleteButton}>
          {isDeleting ? "deleting..." : "del"}
        </button>
      </td>
    </tr>
  );
}

export default function RecruitTable() {
  const recruits = useSelector((state) => state.recruits.data);

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
        {recruits?.map((recruit) => (
          <RecruitTableItem key={recruit.id} recruit={recruit} />
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
