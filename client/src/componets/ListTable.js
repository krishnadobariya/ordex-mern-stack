import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/index";
import { ThemeContext } from "../context/ThemeContext";
import { GetTeambyMember } from "../store/action/getData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MemberDelete } from "../store/action/deleteData";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from '@mui/icons-material/Edit';

const ListTable = ({ dispatch, res, del }) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState("");
  const nevigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    dispatch(GetTeambyMember(param.id));
  }, []);

  useEffect(() => {
    const data = res.data && res.data.data && res.data.data.data;
    setData(data);
  });

  const memberDelete = (id) => {
    dispatch(MemberDelete(id));
  };

  useEffect(() => {
    dispatch(GetTeambyMember(param.id));
  }, [del]);
  return (
    <>
      <Sidebar />

      <div
        className={`h-[100vh] overflow-x-auto ${
          theme === "light" ? " bg-white " : "bg-slate-900"
        }`}
      >
        <div className="w-[100%] flex  justify-end sm:px-40 py-2 ">
          <button
            className="bg-[#3DC0DF] text-[#fff] font-bold rounded px-3 py-1"
            onClick={() => {
              nevigate("/add-member");
              localStorage.setItem("addid", param.id);
            }}
          >
            Add Team Member
          </button>
        </div>
        <div className="w-[100%] overflow-y-auto my-5">
          <h1 className=" text-[30px] text-center py-4">Available Player</h1>
          <table className="table-auto mx-auto text-left border ">
            <thead>
              <tr className="bg-[#3DC0DF] text-white border border-white">
                <th className="px-4 py-2">id</th>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Performance</th>
                <th className="px-4 py-2">Country Flag</th>
                <th className="px-4 py-2">Country Name</th>
                <th className="px-4 py-2">Country Code</th>
                <th className="px-4 py-2">Strengths</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row, index) => (
                  <tr key={index}>
                    <td className=" px-4 py-2 border border-white">{row.id}</td>
                    <td className=" px-4 py-2 border border-white">
                      <img
                        src={row.memberprofile}
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      {row.name}
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      {row.performance}
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      {" "}
                      <img src={row.countryflag} alt="" className="h-8 w-14 " />
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      {row.countryname}
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      +{row.countrycode}
                    </td>
                    <td className=" px-4 py-2 border border-white">
                      {row.strengths}
                    </td>
                    <td className=" px-4 py-4 ">
                      <StarBorderIcon className="text-[#FF8C00]" />
                    </td>
                    <td>
                      <button onClick={() => memberDelete(row.id)}>
                        <DeleteIcon />
                      </button>
                      <Link to={`/update-member/${row.id}`}>
                      <EditIcon  />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.GetTeambyMember,
  del: state.MemberDelete,
});
export default connect(mapStateToProps)(ListTable);
