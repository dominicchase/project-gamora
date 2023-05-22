import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Admin } from "./pages/admin";
import { Games } from "./pages/games";
import { Auth } from "./pages/auth";

const App = () => {
  return (
    <div>
      {/* <Admin /> */}
      {/* <Games /> */}
      <Auth />
    </div>
  );
};

export default App;
