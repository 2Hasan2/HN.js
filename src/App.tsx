// App.js

import React, { useState, useEffect } from "react";
import NavBar from "./panels/NavBar";
import LeftBar from "./panels/LeftBar";
import RightBar from "./panels/RightBar";
import Main from "./panels/Main";

function App() {
  const [page, setPage] = useState([]);

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/page");
      const data = await response.json();
      setPage(data);
    } catch (error) {
      console.error("Error fetching page:", error);
    }
  };

  const savePage = async (updatedPage: any) => {
    try {
      await fetch("http://localhost:5000/api/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPage),
      });
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const handlePageChange = (updatedPage: any) => {
    setPage(updatedPage);
    savePage(updatedPage);
  };

  return (
    <div className="flex bg-gray-100 font-sans text-gray-900">
      <LeftBar />
      <div className="flex h-screen bg-gray-300 flex-1 flex-col">
        <NavBar />
        {/* if page is not empty show main */}
        {page.length > 0 && <Main Page={page} handlePageChange={handlePageChange} />}
      </div>
      <RightBar />
    </div>
  );
}

export default App;
