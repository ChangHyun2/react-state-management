import { useNavigate } from "react-router";
import styled from "styled-components";
import s from "csd";

import RecruitTableItem from "./recruitsTable/RecruitTableItem";

export default function RecruitsTable({
  recruits,
  setRecruits,
  isLoadingRecruits,
}) {
  const navigate = useNavigate();

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
        {isLoadingRecruits ? (
          <tr>
            <td colSpan="8">loading ...</td>
          </tr>
        ) : (
          recruits.map((recruit) => (
            <RecruitTableItem
              key={recruit.id}
              recruit={recruit}
              setRecruits={setRecruits}
              onClick={() => navigate(`detail/${recruit.id}`)}
            />
          ))
        )}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  ${s.fluid};
  ${s.h14};
  word-break: break-all;
  border-collapse: collapse;

  th,
  td {
    width: calc(100% / 8);
    border: 1px solid;
    padding: 10px;
    text-align: center;
  }
`;
