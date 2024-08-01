import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Swap from "./Swap";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="main-container">
        <Header />
        <Swap />
        <Footer />
      </div>
    </>
  );
}

export default App;
