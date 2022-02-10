import styled from "styled-components";
import s from "csd";

export default function Field({ label, type, value, onChange }) {
  return (
    <StyledField>
      <span>{label}</span>
      <input type={type} onChange={onChange} value={value} />
    </StyledField>
  );
}

const StyledField = styled.label`
  ${s.rowSpaceBetween};

  width: calc(100% / 3 - 10px);
  padding-right: 10px;

  span {
    width: 80px;
    text-align: center;
    border: 1px solid;
    padding: 4px;
  }

  input {
    ${s.grid}
  }
`;
