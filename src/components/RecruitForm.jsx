import { useCallback, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
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

    onSubmit(formValues);
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
        <button type="submit">등록</button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  border: 1px solid;
  padding: 10px;

  div {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    padding: 4px;
  }
`;
