import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../workflows.css";
import PipelinesView from "./PipelinesView";
import WorkflowCatalog from "../catalog/WorkflowCatalog";
import cookieHelpers from "../../../core/cookies/cookie-helpers";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20, faMicrochip, faBracketsCurly, faHexagon, faUser  } from "@fortawesome/pro-light-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function Pipelines() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    initializeComponent();
  }, []);

  const initializeComponent = async () => {

    if (tab != null) {
      setActiveTab(tab);
    } else {
      let storedTab = cookieHelpers.getCookie("pipelines", "selectedTab");

      if (storedTab != null) {
        console.log("Got cookie: " + storedTab);
        setActiveTab(storedTab);
      } else {
        setActiveTab("owner");
      }
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
    history.push(`/workflow/${tabSelection}`);

    if (tabSelection !== "catalog") {
      cookieHelpers.setCookie("pipelines", "selectedTab", tabSelection);
    }
  };

  // TODO: make tab component
  const getTab = (handleTabClick, tabName, icon, text, hover_text) => {
    return (
      <li className="nav-item" style={{ minWidth: "5em", textAlign: "center" }}>
        <TooltipWrapper innerText={hover_text}>
          <a className={"nav-link " + (activeTab === tabName ? "active" : "")} href="#"
             onClick={handleTabClick(tabName)}><FontAwesomeIcon icon={icon} fixedWidth size="lg"/><span
            className="ml-1 d-none d-lg-inline">{text}</span></a>
        </TooltipWrapper>
      </li>
    );
  };

  return (
    <>
      <div className="max-content-width">
        <div className="h4 mt-3 mb-4">Pipelines</div>
        <>
          <div className="alternate-tabs">
            <ul className="nav nav-tabs">
              {getTab(handleTabClick, "catalog", faHexagon, "Template Catalog", "Catalog Templates")}
              {getTab(handleTabClick, "all", faDiceD20, "All Pipelines", "All Pipelines")}
              {(process.env.REACT_APP_STACK !== "free-trial") && <>
                {getTab(handleTabClick, "owner", faUser, "My Pipelines", "My Pipelines")}
                {getTab(handleTabClick, "sdlc", faBracketsCurly, "Software Development", "Software Development Pipelines")}
                {getTab(handleTabClick, "ai-ml", faMicrochip, "Machine Learning", "Machine Learning (AI) Pipelines")}
                {getTab(handleTabClick, "sfdc", faSalesforce, "SalesForce", "SalesForce Pipelines")}
              </>}
            </ul>
          </div>
          <div className="content-block-collapse pt-2">
            {activeTab && <PipelinesTabView activeTab={activeTab} setActiveTab={setActiveTab}/>}
          </div>
        </>
      </div>
    </>
  );

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

export default Pipelines;
