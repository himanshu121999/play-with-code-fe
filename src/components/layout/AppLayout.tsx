import { IconPower } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { authTokenKeyName } from "../../utils/configs/authConfig";

const AppLayout = () => {
  const { userData } = useSelector((state: RootState) => state?.auth);

  const navigate = useNavigate();

  if (!localStorage.getItem(authTokenKeyName)) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* App Bar */}

      <div className="flex items-center justify-between p-4 bg-[#005f73]">
        <div className="font-mono text-xl font-bold text-white">
          {" "}
          PlayWithCode{" "}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="flex gap-1 px-3 py-1 font-semibold text-white bg-red-400 border border-red-400 rounded"
          >
            <IconPower />
            Logout{" "}
          </button>
          <div className="size-[30px] rounded-full capitalize bg-white flex justify-center items-center text-[#0a0a0a] font-semibold">
            {" "}
            {userData?.name?.[0]}{" "}
          </div>
        </div>
      </div>

      {/* Outlet */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
