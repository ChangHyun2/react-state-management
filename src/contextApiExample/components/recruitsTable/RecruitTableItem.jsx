import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RecruitsApi from "../../../api/recruits";
import { useRecruitsContext } from "../../context/recruits";

export default function RecruitTableItem({ recruit }) {
  const navigate = useNavigate();
  const {
    helpers: { deleteRecruit, updateRecruit },
  } = useRecruitsContext();

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
      deleteRecruit(id);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickIsPublishedToggler = async (e) => {
    e.stopPropagation();
    setIsTogglingPublishStatus(true);
    const updated = { isPublished: !recruit.isPublished };

    try {
      await RecruitsApi.patch(id, updated);
      updateRecruit(id, updated);
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
