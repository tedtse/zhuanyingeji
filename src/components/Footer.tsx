import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Dragger from "./Dragger";

const { Footer } = Layout;

export default () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? (
        <Footer>
          <Dragger />
        </Footer>
      ) : null}
    </>
  );
};
