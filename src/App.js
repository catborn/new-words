import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Table from "./components/table";
// import Footer from "./components/footer";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WordsProvider } from "./components/WordStore";

function App() {
  return (
    <div className="App">
      <Header />
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
            <Route
              path="/"
              element={
                <WordsProvider>
                  <Table />
                </WordsProvider>
              }
            />
            <Route
              path="/main"
              element={
                <WordsProvider>
                  <Main />
                </WordsProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
