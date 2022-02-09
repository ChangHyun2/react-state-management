import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { RecruitsContextProvider } from "./contextApiExample/context/recruits";
import { RecruitsContext2Provider } from "./contextApiExample2/context/recruits";

const PropDrillingExample = lazy(() => import("./propDrillingExample/pages"));
const ContextApiExample = lazy(() => import("./contextApiExample/pages"));
const ContextApiExample2 = lazy(() => import("./contextApiExample2/pages"));
const ReduxExample = lazy(() => import("./reduxExample/pages"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>react state management</div>} />
          <Route path="prop-drilling/*" element={<PropDrillingExample />} />
          <Route
            path="context-api/*"
            element={
              <RecruitsContextProvider>
                <ContextApiExample />
              </RecruitsContextProvider>
            }
          />
          <Route
            path="context-api2/*"
            element={
              <RecruitsContext2Provider>
                <ContextApiExample2 />
              </RecruitsContext2Provider>
            }
          />
          <Route path="redux/*" element={<ReduxExample />} />
        </Route>
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
