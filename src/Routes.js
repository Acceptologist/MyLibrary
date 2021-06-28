import React from "react";
import Search from "./Search";
import Library from "./Library";
const routes = {
  "/": () => <Library />,
  "/search": () => <Search />
};
export default routes;