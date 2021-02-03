import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../workflows.css";
import PipelinesView from "./PipelinesView";
import WorkflowCatalog from "../catalog/WorkflowCatalog";
import cookieHelpers from "../../../core/cookies/cookie-helpers";
import { useHistory } from "react-router-dom";
import { faDiceD20, faMicrochip, faBracketsCurly, faHexagon, faUser  } from "@fortawesome/pro-light-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

const unpackTab = (tab) => {
  if (tab != null) {
    return tab;
  }
  else {
    let storedTab = cookieHelpers.getCookie("pipelines", "selectedTab");
    return storedTab != null ? storedTab : "owner";
  }
};

function Pipelines() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(unpackTab(tab));
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
    history.push(`/workflow/${tabSelection}`);

    if (tabSelection !== "catalog") {
      cookieHelpers.setCookie("pipelines", "selectedTab", tabSelection);
    }
  };

  const getCurrentView = () => {
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
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case "catalog":
        return "Create a new Pipeline from this catalog of templates. Select a template to get started.";
      case "all":
      case "owner":
      case "sdlc":
      case "ai-ml":
      case "sfdc":
        return null
      default:
        return null;
    }
  };

  const getDynamicTabs = () => {
    if (process.env.REACT_APP_STACK !== "free-trial") {
      return (
        <>
          <NavigationTab activeTab={activeTab} tabText={"My Pipelines"} handleTabClick={handleTabClick} tabName={"owner"} toolTipText={"My Pipelines"} icon={faUser} />
          <NavigationTab activeTab={activeTab} tabText={"Software Development"} handleTabClick={handleTabClick} tabName={"sdlc"} toolTipText={"Software Development Pipelines"} icon={faBracketsCurly} />
          <NavigationTab activeTab={activeTab} tabText={"Machine Learning"} handleTabClick={handleTabClick} tabName={"ai-ml"} toolTipText={"Machine Learning (AI) Pipelines"} icon={faMicrochip} />
          <NavigationTab activeTab={activeTab} tabText={"SalesForce Pipelines"} handleTabClick={handleTabClick} tabName={"sfdc"} toolTipText={"SalesForce Pipelines"} icon={faSalesforce} />
        </>
      )
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab} tabText={"Template Catalog"} handleTabClick={handleTabClick} tabName={"catalog"} toolTipText={"Template Catalog"} icon={faHexagon} />
        <NavigationTab activeTab={activeTab} tabText={"All Pipelines"} handleTabClick={handleTabClick} tabName={"all"} toolTipText={"All Pipelines"} icon={faDiceD20} />
        {getDynamicTabs()}
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={getPageDescription()}
    >
      {getCurrentView()}
    </ScreenContainer>
  );

}

export default Pipelines;
