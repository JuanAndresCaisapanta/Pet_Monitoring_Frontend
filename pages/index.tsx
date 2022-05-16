import React from "react";
import Router from "next/router";

const IndexPage = () => {
  React.useEffect(() => {
    Router.push("/users");
  });

  return <div />;
};

export default IndexPage;
