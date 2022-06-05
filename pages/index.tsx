import Router from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  useEffect(() => {
    Router.push("/auth/login");
  });

  return <div />;
};

export default IndexPage;
