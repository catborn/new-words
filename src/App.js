import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Table from "./components/table";
// import Footer from "./components/footer";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Main /> */}
      {/* <Table /> */}
      {/* <Footer /> */}
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Table</Link>
              </li>
              <li>
                <Link to="/main">Game</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
