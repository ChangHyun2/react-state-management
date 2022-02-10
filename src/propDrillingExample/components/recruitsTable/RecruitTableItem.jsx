import { useState } from "react";

import { useNavigate } from "react-router-dom";

import RecruitsApi from "../../../api/recruits";

export default function RecruitTableItem({ recruit, setRecruits }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingPublishStatus, setIsTogglingPublishStatus] = useState(false);

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
    setIsDeleting(true);
    try {
      await RecruitsApi.delete(id);

      setRecruits((prev) => prev.filter((recruit) => recruit.id !== id));
    } catch (e) {
      console.error(e);
    }
    setIsDeleting(false);
  };

  const handleClickIsPublishedToggler = async (e) => {
    e.stopPropagation();

    setIsTogglingPublishStatus(true);
    try {
      const updated = await RecruitsApi.patch(id, {
        isPublished: !recruit.isPublished,
      });

      setRecruits((prev) =>
        prev.map((recruit) => (recruit.id === id ? updated : recruit))
      );
    } catch (e) {
      console.error(e);
    }
    setIsTogglingPublishStatus(false);
  };

  return (
    <tr key={id} onClick={handleClick}>
      <td>{id}</td>
      <td>{title}</td>
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
          {isDeleting ? "deleting..." : "delete"}
        </button>
      </td>
    </tr>
  );
}
