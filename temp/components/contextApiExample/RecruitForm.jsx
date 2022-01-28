import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecruitApi from "../../api/recruit";
import { useRecruitsContext } from "../../context/recruits";

function Field({ field: { label, type }, onChange, value }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} onChange={onChange} value={value} />
    </label>
  );
}

const fields = [
  [
    {
      name: "title",
      label: "제목",
      type: "text",
    },
    {
      name: "recruit_type",
      label: "유형",
      type: "text",
    },
    {
      name: "job",
      label: "포지션",
      type: "text",
    },
  ],
  [
    {
      name: "career",
      label: "커리어",
      type: "text",
    },
    {
      name: "start_date",
      label: "시작일",
      type: "date",
      serializer: (value) =>
        value === "" ? value : dayjs(value).format("YYYY-MM-DD"),
    },
    {
      name: "end_date",
      label: "종료일",
      type: "date",
      serializer: (value) =>
        value === "" ? value : dayjs(value).format("YYYY-MM-DD"),
    },
  ],
];

export default function RecruitForm({ recruit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    helpers: { addRecruit, updateRecruit },
  } = useRecruitsContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(
    recruit ?? {
      title: "initial title",
      recruit_type: "initial recruit_type",
      job: "initial job",
      career: "initial career",
      start_date: "2022-01-01",
      end_date: "2022-01-01",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isEditing = recruit;

    try {
      if (isEditing) {
        const { id } = recruit;

        setIsSubmitting(true);
        await RecruitApi.patch(id, formValues);
        updateRecruit(id, formValues);
      } else {
        setIsSubmitting(true);
        const recruit = await RecruitApi.post(formValues);
        addRecruit(recruit);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
      navigate(-1);
    }
  };

  const getFieldProps = useCallback(
    (field) => ({
      field,
      value: formValues[field.name],
      onChange: (e) => {
        setFormValues((state) => ({
          ...state,
          [field.name]: field.serializer
            ? field.serializer(e.target.value)
            : e.target.value,
        }));
      },
    }),
    [formValues]
  );

  if (location.pathname.split("/").pop() === "edit" && !recruit) {
    navigate(-1);
    return null;
  }

  return (
    <>
      <StyledRecruitForm onSubmit={handleSubmit}>
        {fields.map((fieldsRow, i) => (
          <div key={i}>
            {fieldsRow.map((field) => (
              <Field key={field.name} {...getFieldProps(field)} />
            ))}
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "creating..." : "등록"}
        </button>
      </StyledRecruitForm>
    </>
  );
}

const StyledRecruitForm = styled.form`
  border: 1px solid;
  padding: 10px;

  div {
    display: flex;
    flex-wrap: wrap;

    label {
      display: flex;
      width: calc(100% / 3 - 10px);
      justify-content: space-between;
      padding-right: 10px;

      span {
        min-width: 80px;
        text-align: center;
        border: 1px solid;
        padding: 4px;
      }

      input {
        width: 100%;
      }
    }

    margin-bottom: 10px;
  }

  button {
    width: 100%;
    padding: 4px;
  }
`;
