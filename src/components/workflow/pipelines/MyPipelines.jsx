import React, { useContext, useState, useEffect } from "react";
import ErrorDialog from "components/common/status_notifications/error";
import "../workflows.css";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelinesView from "./PipelinesView";
import PropTypes from "prop-types";
import WorkflowCatalog from "../catalog/WorkflowCatalog";

function MyPipelines({ view }) {
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("owner");

  useEffect(() => {
    if (view === "catalog") {
      setActiveTab(view);
    } else {
      setActiveTab("owner");
    }
  }, []);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (errors) {
    return (<ErrorDialog error={errors}/>);
  } else {
    return (
      <>
        <div className="px-2 max-content-width">
          <>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "catalog" ? "active" : "")} href="#"
                     onClick={handleTabClick("catalog")}>Catalog</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "all" ? "active" : "")} href="#"
                     onClick={handleTabClick("all")}>All</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "owner" ? "active" : "")} href="#"
                     onClick={handleTabClick("owner")}>My Pipelines</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "sdlc" ? "active" : "")} href="#"
                     onClick={handleTabClick("sdlc")}>Software Development</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "ai-ml" ? "active" : "")} href="#"
                     onClick={handleTabClick("ai-ml")}>AI/ML</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "sfdc" ? "active" : "")} href="#"
                     onClick={handleTabClick("sfdc")}>SalesForce</a>
                </li>
              </ul>
            </div>
            <div className="content-block-collapse px-3 pt-2">
              <PipelinesTabView activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
          </>
        </div>
      </>
    );
  }
}

function PipelinesTabView({ activeTab, setActiveTab }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
    case "catalog":
      return <WorkflowCatalog/>;
    case "all":
    case "owner":
    case "sdlc":
    case "ai-ml":
    case "sfdc":
      return <PipelinesView currentTab={activeTab} setActiveTab={setActiveTab}/>;
    default:
      return null;
    }
  }
}

MyPipelines.propTypes = {
  view: PropTypes.string,
};

export default MyPipelines;
