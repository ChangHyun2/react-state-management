import { Suspense } from "react";
import styled from "styled-components";
import { useLocation, Outlet } from "react-router-dom";
import s from "csd";
import Navigation from "./Navigation";

export default function Layout() {
  const location = useLocation();

  const pathRegex = /\/(?<page>[\w-]+)(\/\w*)?/;
  const page = location.pathname.match(pathRegex)?.groups.page;

  return (
    <>
      <StyledHeader>
        <h1>{page ?? "react state management"}</h1>
        <Navigation />
      </StyledHeader>
      <StyledMain>
        <Suspense fallback={<>...</>}>
          <Outlet />
        </Suspense>
      </StyledMain>
    </>
  );
}

const StyledHeader = styled.header`
  h1 {
    ${s.textCenter}
  }
`;

const StyledMain = styled.main`
  padding: ${s.pad.xs};
  border: 1px solid;
`;
