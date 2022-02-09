import { useSelector } from "react-redux";
import styled from "styled-components";

import RecruitTableItem from "./recruitsTable/RecruitTableItem";

export default function RecruitsTable() {
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
