import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AddteamForm from "./componets/AddteamForm";
import ListTable from "./componets/ListTable";
import Footer from "./componets/Footer";
import TeamUpdate from "./componets/TeamUpdate";
import Update from "./componets/Update";
import Addmembers from "./componets/members/Addmembers";
import Updatemember from "./componets/members/Updatemember";

function App() {
  return (
    <ThemeProvider>
        <Routes>
        <Route path="/" element={<TeamUpdate />} />
          <Route path="/addteam" element={<AddteamForm />}></Route>
          <Route path="/team-detail/:id" element={<ListTable />}></Route>
          <Route path="/update-data" element={<Update />} />
          <Route path="/update-member/:id" element={<Updatemember />} />
          <Route path="/add-member" element={<Addmembers />} />
        </Routes>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
