import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorDialog from "components/common/status_notifications/error";
import "../workflows.css";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelinesView from "./PipelinesView";
import WorkflowCatalog from "../catalog/WorkflowCatalog";
import cookieHelpers from "../../../core/cookies/cookie-helpers";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import { useHistory } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly, faHexagon, faServer, faUser} from "@fortawesome/pro-regular-svg-icons";
import {faMicrochip} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
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
  const getTab = (handleTabClick, tabName, icon, text) => {
    return (
      <li className="nav-item">
        <TooltipWrapper innerText={text}>
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} href="#"
           onClick={handleTabClick(tabName)}><FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{text}</span></a>
        </TooltipWrapper>
      </li>
    );
  }

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  } else if (errors) {
    return (<ErrorDialog error={errors}/>);
  } else {
    return (
      <>
        <div className="max-content-width">
          <BreadcrumbTrail destination={"pipelines"}/>
          <>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                {getTab(handleTabClick,"catalog", faHexagon, "Catalog")}
                {getTab(handleTabClick,"all", faServer, "All")}
                {getTab(handleTabClick,"owner", faUser, "My Pipelines")}
                {getTab(handleTabClick,"sdlc", faBracketsCurly, "Software Development")}
                {getTab(handleTabClick,"ai-ml", faMicrochip, "Machine Learning (AI)")}
                {getTab(handleTabClick,"sfdc", faSalesforce, "SalesForce")}
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
