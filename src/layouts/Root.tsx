import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div className="mx-10 py-5">
        <NavBar />
      </div>
      <div className="mx-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
