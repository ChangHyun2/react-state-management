import { Link } from "react-router-dom";
import styled from "styled-components";
import s from "csd";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 3px 7px;
  background-color: ${s.colors.indigo[600]};
  color: ${s.colors.white};
  border-radius: ${s.round.xs};
  ${s.bold}
`;

export default StyledLink;
