import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { RecruitsContextProvider } from "./context/recruits";
import { RecruitsContext2Provider } from "./context/recruits2";

const Home = lazy(() => import("./pages/Home"));
const PropDrillingExample = lazy(() => import("./pages/PropDrillingExample"));
const ContextApiExample = lazy(() => import("./pages/ContextApiExample"));
const ContextApiExample2 = lazy(() => import("./pages/ContextApiExample2"));
const ReduxExample = lazy(() => import("./pages/ReduxExample"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
