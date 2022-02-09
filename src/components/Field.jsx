import styled from "styled-components";

export default function Field({ label, type, value, onChange }) {
  return (
    <StyledField>
      <span>{label}</span>
      <input type={type} onChange={onChange} value={value} />
    </StyledField>
  );
}

const StyledField = styled.label`
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
`;
