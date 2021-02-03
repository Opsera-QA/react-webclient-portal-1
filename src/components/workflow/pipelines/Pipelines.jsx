import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {faBracketsCurly, faDiceD20, faHexagon, faMicrochip, faUser} from "@fortawesome/pro-light-svg-icons";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkflowCatalog from "components/workflow/catalog/WorkflowCatalog";
import cookieHelpers from "core/cookies/cookie-helpers";
import PipelinesView from "components/workflow/pipelines/PipelinesView";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

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
        return getPipelinesView();
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
      default:
        return "Select a Pipeline to view details.";
    }
  };

  const getPipelinesView = () => {
    if (process.env.REACT_APP_STACK === "free-trial") {
      return (<PipelinesView currentTab={activeTab} setActiveTab={setActiveTab}/>);
    }

    return (
      <DetailTabPanelContainer
        detailView={<PipelinesView currentTab={activeTab} setActiveTab={setActiveTab}/>}
        tabContainer={getPipelineTabContainer()}
      />
    )
  }

  const getPipelineTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"All Pipelines"} handleTabClick={handleTabClick} tabName={"all"} toolTipText={"All Pipelines"} icon={faDiceD20} />
        <CustomTab activeTab={activeTab} tabText={"My Pipelines"} handleTabClick={handleTabClick} tabName={"owner"} toolTipText={"My Pipelines"} icon={faUser} />
        <CustomTab activeTab={activeTab} tabText={"Software Development"} handleTabClick={handleTabClick} tabName={"sdlc"} toolTipText={"Software Development Pipelines"} icon={faBracketsCurly} />
        <CustomTab activeTab={activeTab} tabText={"Machine Learning"} handleTabClick={handleTabClick} tabName={"ai-ml"} toolTipText={"Machine Learning (AI) Pipelines"} icon={faMicrochip} />
        <CustomTab activeTab={activeTab} tabText={"SalesForce Pipelines"} handleTabClick={handleTabClick} tabName={"sfdc"} toolTipText={"SalesForce Pipelines"} icon={faSalesforce} />
      </CustomTabContainer>
    );
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab} tabText={"Template Catalog"} handleTabClick={handleTabClick} tabName={"catalog"} toolTipText={"Template Catalog"} icon={faHexagon} />
        <NavigationTab activeTab={activeTab !== "catalog" ? "all" : activeTab} tabText={"Pipelines"} handleTabClick={handleTabClick} tabName={"all"} toolTipText={"Pipelines"} icon={faDiceD20} />
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
