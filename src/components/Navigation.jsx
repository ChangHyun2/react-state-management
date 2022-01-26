import { NavLink } from "react-router-dom";
import styled from "styled-components";
import s from "csd";

const pages = [
  {
    title: "react state management",
    to: "/",
  },
  {
    title: "prop drilling",
    to: "/prop-drilling",
  },
  {
    title: "context api",
    to: "/context-api",
  },
  {
    title: "context api2",
    to: "/context-api2",
  },
  {
    title: "redux",
    to: "/redux",
  },
];

export default function Navigation() {
  return (
    <StyledNavigation>
      {pages.map(({ title, to }) => (
        <StyledNavItem key={to}>
          <NavLink
            to={to}
            style={({ isActive }) =>
              isActive ? { color: s.colors.red[500] } : undefined
            }
          >
            {title}
          </NavLink>
        </StyledNavItem>
      ))}
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  ${s.rowCenter};
  margin-bottom: 20px;
`;

const StyledNavItem = styled.li`
  list-style: none;

  :not(:last-child) {
    padding-right: 20px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
