import React from "react";
import Router from "next/router";

const IndexPage = () => {
  React.useEffect(() => {
    Router.push("/auth/login");
  });

  return <div />;
};

export default IndexPage;
