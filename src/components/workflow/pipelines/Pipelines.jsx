import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../workflows.css";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelinesView from "./PipelinesView";
import WorkflowCatalog from "../catalog/WorkflowCatalog";
import cookieHelpers from "../../../core/cookies/cookie-helpers";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import { useHistory } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly, faHexagon, faUser} from "@fortawesome/pro-regular-svg-icons";
import {faMicrochip} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {faInfinity} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";

function Pipelines() {
  const { tab } = useParams();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    initializeComponent();
  }, []);

  const initializeComponent = async () => {
    setLoading(true);
    if (tab != null) {
      setActiveTab(tab);
    }
    else {
      let storedTab = cookieHelpers.getCookie("pipelines", "selectedTab");

      if (storedTab != null) {
        console.log("Got cookie: " + storedTab);
        setActiveTab(storedTab);
      }
      else {
        setActiveTab("owner");
      }
    }
    setLoading(false);
  }

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
      <li className="nav-item" style={{minWidth:"5em", textAlign:"center"}}>
        <TooltipWrapper innerText={hover_text}>
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} href="#"
           onClick={handleTabClick(tabName)}><FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{text}</span></a>
        </TooltipWrapper>
      </li>
    );
  }

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        <div className="max-content-width">
          {/*<BreadcrumbTrail destination={"pipelines"}/>*/}
          <div className="title-text-5 mb-2">Pipelines</div>
          <>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                {getTab(handleTabClick,"catalog", faHexagon, "Catalog", "Catalog Templates")}
                {getTab(handleTabClick,"all", faInfinity, "All", "All Pipelines")}
                {getTab(handleTabClick,"owner", faUser, "My Pipelines", "My Pipelines")}
                {getTab(handleTabClick,"sdlc", faBracketsCurly, "Software Development", "Software Development Pipelines")}
                {getTab(handleTabClick,"ai-ml", faMicrochip, "Machine Learning (AI)", "Machine Learning (AI) Pipelines")}
                {getTab(handleTabClick,"sfdc", faSalesforce, "SalesForce", "SalesForce Pipelines")}
              </ul>
            </div>
            <div className="content-block-collapse px-3 pt-2">
              {activeTab && <PipelinesTabView activeTab={activeTab} setActiveTab={setActiveTab}/>}
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

export default Pipelines;
