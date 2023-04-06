import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/index";
import { ThemeContext } from "../../context/ThemeContext";
import { AddTeamMember } from "../../store/action/addData";
import { connect } from "react-redux";
import { code } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addmembers = ({ dispatch, res }) => {
  const { theme } = useContext(ThemeContext);
  const netigate = useNavigate()
  const [name, setName] = useState();
  const [performance, setPerformance] = useState();
  const [countryName, setCountryName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [strengths, setStrengths] = useState();
  const [available, setAvailable] = useState();
  const [image, setImages] = useState([]);
  const teamid = localStorage.getItem("addid");
  const formData = new FormData();
  formData.append("teamid", teamid);
  formData.append("name", name);
  formData.append("performance", performance);
  formData.append("countryname", countryName);
  formData.append("countrycode", countryCode);
  formData.append("strengths", strengths);
  formData.append("available", available);
  formData.append("image", image);

  const onSubmit = () => {
    dispatch(AddTeamMember(formData));
  };

  const handleInput = (e) => {
    setImages(e.target.files[0]);
  };

  useEffect(() => {
    const data = res.data && res.data.data;
    data && toast.success(data.message);
  }, []);

  return (
    <>
      <Sidebar />
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
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2 "
                    for="file_input"
                  >
                    Member Profile
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-full cursor-pointer  dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400 bg-white"
                    id="file_input"
                    type="file"
                    name="image"
                    onChange={handleInput}
                  />
                </div>

                <div className=" mr-1 w-[100%] mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2">
                     Name
                  </label>
                  <input
                    className="appearance-none border rounded-full w-full py-2 px-3 text-grey-darker"
                    type="text"
                    placeholder="Member Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] ml-1 mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="last_name"
                  >
                    Performance
                  </label>
                  <input
                    className="appearance-none border rounded-full w-full py-2 px-3 text-grey-darker"
                    type="number"
                    placeholder="your performance"
                    name="performance"
                    value={performance}
                    onChange={(e) => setPerformance(e.target.value)}
                  />
                </div>
                <div className=" mr-1 w-[100%] mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2 "
                    for="file_input"
                  >
                    Counrty flug
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-full cursor-pointer  dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400 bg-white"
                    id="file_input"
                    type="file"
                    name="image"
                    onChange={handleInput}
                  />
                </div>
                <div className="xl:flex items-center ">
                  <div>
                    <label
                      for="countries_multiple"
                      className="block  text-grey-darker text-sm font-bold mb-4 "
                    >
                      Select Country Name
                    </label>
                    <select
                      id="countries_multiple"
                      className=" rounded-full w-full py-2 px-3"
                      name="CountryName"
                      value={countryName}
                      onChange={(e) => setCountryName(e.target.value)}
                    >
                      {code.map((val, index) => {
                        return (
                          <option value={val.country}>{val.country}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="xl:ml-[2rem] mb-2">
                    <label
                      for="countries_multiple"
                      className="block text-grey-darker text-sm font-bold mb-4 mt-2"
                    >
                      Select Country Code
                    </label>
                    <select
                      id="countries_multiple"
                      className=" rounded-full"
                      name="CountryCode"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {code.map((val, index) => (
                        <option key={index} value={val.code}>
                          {val.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2 mt-2"
                    for="email text-[#212A41]"
                  >
                    Strengths
                  </label>
                  <input
                    className="appearance-none border rounded-full w-full py-2 px-3 text-grey-darker"
                    type="text"
                    placeholder="Your Strengths"
                    name="strengths"
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="radio"
                      name="available"
                      value="1"
                      onChange={(e) => setAvailable(e.target.value)}
                    />
                    <label>Available</label>
                    <input
                      type="radio"
                      name="available"
                      value="0"
                      onChange={(e) => setAvailable(e.target.value)}
                    />
                    <label>Not-available</label>
                  </div>
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
  res: state.AddTeamMember,
});
export default connect(mapStateToProps)(Addmembers);
