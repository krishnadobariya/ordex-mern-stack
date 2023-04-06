import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import GroupsIcon from "@mui/icons-material/Groups";
import { ThemeContext } from "../../context/ThemeContext";
import { connect } from "react-redux";
import { GetAllTeam } from "../../store/action/getData";
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const Index = ({ dispatch, res }) => {
  const [isOpen, setIsopen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [data, setData] = useState("");

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  useEffect(() => {
    dispatch(GetAllTeam());
  }, []);

  useEffect(() => {
    const data = res.data && res.data.data && res.data.data.data;
    data && setData(data);
  }, [res]);

  return (
    <>
      <div className={` m-0`}>
        <div
          className={`sidebar ${isOpen == true ? "active" : ""} ${
            theme === "light" ? "bg-white" : "bg-slate-900"
          }`}
        >
          <div className="sd-header">
            <h4 className="mb-0 text-gray-500 text-3xl">Team Builder</h4>
            <div
              className="btn bg-[#3DC0DF] text-[#fff]"
              onClick={ToggleSidebar}
            >
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sd-body">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="flex rounded-sm  hover:no-underline hover:bg-[#212A41] hover:text-[#fff] hover:font-bold">
                <div className="flex justify-start py-1">
                  <GroupsIcon />
                </div>
                <Link
                  to="/"
                  className="flex items-center p-2 space-x-3 rounded-md hover:no-underline hover:text-white"
                >
                  <span>All teams</span>
                </Link>
              </li>
              {data &&
                data.map((val, index) => {
                  return (
                    <>
                      <li className="flex rounded-sm  hover:no-underline hover:bg-[#212A41] hover:text-[#fff] hover:font-bold">
                      <div className="flex justify-start py-2">
                      <WorkspacesIcon/>
                      </div>
                        <Link
                          to={`/team-detail/${val.id}`}
                          className="flex items-center p-2 space-x-3 rounded-md hover:no-underline hover:text-white"
                        >
                          <span>{val.teamname}</span>
                        </Link>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></div>
        <nav
          className={`navbar navbar-expand-lg navbar-light ${
            theme === "light" ? " bg-gray-50" : "bg-slate-800"
          } `}
        >
          <div className="p-2 grid grid-flow-col">
            <div
              className=" w-[50%] bg-[#3DC0DF] text-[#fff] p-2 rounded xl:w-[200px]"
              onClick={ToggleSidebar}
            >
              <div>
                <div className="flex justify-center gap-2 items-center">
                  <MenuOpenIcon className="text-[30px] font-bold" />
                  <p className="self-center m-0 text-[20px] font-bold ">
                    Open Menu
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex gap-4 form-inline ml-auto">
              <button className="bg-[#3DC0DF] text-[#fff] font-bold rounded px-3 ">
                <Link to="/addteam">Add Team</Link>
              </button>
              <label className="relative inline-flex items-center mb-5 cursor-pointer mt-4">
                <input
                  type="checkbox"
                  name="toggle"
                  value=""
                  className="sr-only peer"
                  onClick={toggleTheme}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 items-center justify-center "></div>
              </label>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.GetAllTeam,
});
export default connect(mapStateToProps)(Index);
