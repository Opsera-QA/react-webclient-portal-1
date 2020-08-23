import React, { useContext, useState, useEffect } from "react";
import ErrorDialog from "../../common/status_notifications/error";
import "../workflows.css";
import LoadingDialog from "../../common/status_notifications/loading";
import PipelinesView from "./PipelinesView";

function MyPipelines() {
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setCurrentTab(tabSelection);
  };

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (errors) {
    return (<ErrorDialog error={errors} />);
  } else {
    return (
      <>        
        <div className="px-2 max-content-width">
          <>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (currentTab === "all" ? "active" : "")} href="#"
                     onClick={handleTabClick("all")}>All</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (currentTab === "owner" ? "active" : "")} href="#"
                     onClick={handleTabClick("owner")}>My Pipelines</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (currentTab === "sdlc" ? "active" : "")} href="#"
                     onClick={handleTabClick("sdlc")}>Software Development</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (currentTab === "ai-ml" ? "active" : "")} href="#"
                     onClick={handleTabClick("ai-ml")}>AI/ML</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (currentTab === "sfdc" ? "active" : "")} href="#"
                     onClick={handleTabClick("sfdc")}>SalesForce</a>
                </li>
              </ul>
            </div>
            <div className="content-block-collapse px-3 pt-2">
              <PipelinesView currentTab={currentTab}/>
            </div>
          </>
        </div>
      </>
    );
  }
}

export default MyPipelines;
