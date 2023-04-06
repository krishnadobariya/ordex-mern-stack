import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/index";
import { ThemeContext } from "../context/ThemeContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import { GetAllTeam } from "../store/action/getData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {deleteTeam} from "../store/action/deleteData"

const TeamUpdate = ({ dispatch, res ,del}) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState("");

  useEffect(() => {
    
    dispatch(GetAllTeam());
  }, []);

  useEffect(() => {
    const data = res.data && res.data.data && res.data.data.data;
    data && setData(data);
  }, [res]);

  const Deleteteams= (id)=>{
    dispatch(deleteTeam(id))
  }

  useEffect(()=>{
   const data = del.data && del.data.data
     setTimeout(() => {
      dispatch(GetAllTeam());
     }, 1000);
  },[del])

  return (
    <>
      <Sidebar />
     
      <div
        className={`h-[100vh] overflow-x-auto py-10 ${
          theme === "light" ? " bg-white " : "bg-slate-900"
        }`}
      >
        <table className="table-auto mx-auto w-[40%] text-left border ">
          <thead>
            <tr className="bg-[#3DC0DF] text-white  w-[100%]">
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Team Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((val, index) => (
                <tr key={index}>
                  <td className=" px-4 py-2 ">{index}</td>
                  <td className="flex justify-center">
                    <img src={val.teamprofile} alt={val.teamprofile} className="w-[30px] h-[30px] rounded-full"/>
                  </td>
                  <td className=" px-4 py-2 ">{val.teamname}</td>

                  <td>
                    <div className="flex justify-center gap-4">
                      <Link
                        to="/update-data"
                        className="mx-auto bg-[#3DC0DF] hover:bg-blue-dark text-white font-bold py-2 px-4 rounded items-center justify-center"
                        type="submit"
                        onClick={()=>localStorage.setItem("id",val.id)}>
                        <EditIcon />
                      </Link>
                      <button
                        className="mx-auto bg-[#3DC0DF] hover:bg-blue-dark text-white font-bold py-2 px-4 rounded items-center justify-center"
                        type="submit" onClick={()=>Deleteteams(val.id)}
                      >
                       <DeleteIcon/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.GetAllTeam,
  del:state.deleteTeam
});

export default connect(mapStateToProps)(TeamUpdate);
