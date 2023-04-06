import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/index";
import { ThemeContext } from "../context/ThemeContext";
import { TeamUpadte } from "../store/action/getData"
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Baseurl } from "../BaseUrl";

const Update = ({ dispatch, res }) => {

  const { theme } = useContext(ThemeContext);
  const [teamname, setTeamname] = useState();
  const [image, setImage] = useState("");
  const [id,setId] = useState("")
  const formData = new FormData();
  formData.append("teamname", teamname);
  formData.append("image", image);

  const handleInput = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = () => {
    dispatch(TeamUpadte(id,formData));
  };

  useEffect(() => {
    const data =res &&  res.data && res.data.data;
    data && toast.success(data.message);
  }, [res]);

  useEffect(() => {
    const id =localStorage.getItem("id")
    setId(id)
      GetData(id)
  }, []);

  const GetData=async(id)=>{
    const data = await axios.get(`${Baseurl}/admin/team/view/${id}`)
    setImage(data.data.data.teamprofile)
    setTeamname(data.data.data.teamname)

  }


  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="font-sans antialiased bg-grey-lightest">
        <div className="w-full">
          <div
            className={`container mx-auto  ${
              theme === "light" ? " bg-white " : "bg-slate-900"
            }`}
          >
            <div className=" w-5/6 lg:w-1/2 mx-auto ">
              <div className="py-4 px-8 text-[2rem] text-center font-bold text-[#3DC0DF] border-b border-grey-lighter">
                Team Builder
              </div>
              <div className="py-4 px-8 border">
                <div className=" mr-1 w-[100%] mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2 ">
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-full cursor-pointer  dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400 bg-white"
                    id="file_input"
                    type="file"
                    name="image"
                    multiple="multiple"
                    onChange={handleInput}
                  />
                </div>

                <div className=" mr-1 w-[100%] mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="first_name"
                  >
                    Team Name
                  </label>
                  <input
                    className="appearance-none border rounded-full w-full py-2 px-3 text-grey-darker"
                    type="text"
                    placeholder="Your teamname"
                    name="teamname"
                    value={teamname}
                    onChange={(e) => setTeamname(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="mx-auto bg-[#3DC0DF] hover:bg-blue-dark text-white font-bold py-2 px-4 rounded items-center justify-center"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.TeamUpadte,

});
export default connect(mapStateToProps)(Update);
