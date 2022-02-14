import { useCallback, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import s from "csd";
import Field from "./Field";

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

export default function RecruitForm({ recruit, onSubmit }) {
  const [submitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(
    recruit ?? {
      title: "default title",
      recruit_type: "default recruit_type",
      job: "default job",
      career: "default career",
      start_date: "2022-01-01",
      end_date: "2022-01-01",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    onSubmit(formValues, setIsSubmitting);
  };

  const getFieldProps = useCallback(
    ({ type, label, name, serializer }) => ({
      type,
      label,
      value: formValues[name],
      onChange: (e) => {
        setFormValues((state) => ({
          ...state,
          [name]: serializer ? serializer(e.target.value) : e.target.value,
        }));
      },
    }),
    [formValues]
  );

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        {fields.map((fieldsRow, i) => (
          <div key={i}>
            {fieldsRow.map((field) => (
              <Field key={field.name} {...getFieldProps(field)} />
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitting}>
          등록
        </button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  border: 1px solid;
  padding: 10px;

  div {
    ${s.row};
    ${s.mb1};
  }

  button {
    ${s.fluid}
    padding: 4px;
  }
`;
