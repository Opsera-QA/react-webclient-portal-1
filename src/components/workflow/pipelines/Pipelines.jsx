import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { faBracketsCurly, faDraftingCompass, faHexagon, faMicrochip, faUser } from "@fortawesome/pro-light-svg-icons";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import cookieHelpers from "core/cookies/cookie-helpers";
import PipelinesView from "components/workflow/pipelines/PipelinesView";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CatalogHelpDocumentation from "../../common/help/documentation/pipelines/catalog/CatalogHelpDocumentation";

const unpackTab = (tab) => {
  if (tab != null) {
    return tab;
  } else {
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
      return <PipelineCatalogLibrary/>;
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

  const getCurrentBreadcrumbDestination = () => {
    switch (activeTab) {
    case "catalog":
      return "catalog";
    case "all":
    case "owner":
    case "sdlc":
    case "ai-ml":
    case "sfdc":
      return "pipelines";
    default:
      return null;
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
    case "catalog":
      return "To begin building your pipeline, choose one of the pipeline templates provided in the Marketplace or Private Catalogs. ";
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
    );
  };

  const getPipelineTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"All Pipelines"} handleTabClick={handleTabClick} tabName={"all"}
                   toolTipText={"All Pipelines"} icon={faDraftingCompass}/>
        <CustomTab activeTab={activeTab} tabText={"My Pipelines"} handleTabClick={handleTabClick} tabName={"owner"}
                   toolTipText={"My Pipelines"} icon={faUser}/>
        <CustomTab activeTab={activeTab} tabText={"Software Development"} handleTabClick={handleTabClick}
                   tabName={"sdlc"} toolTipText={"Software Development Pipelines"} icon={faBracketsCurly}/>
        <CustomTab activeTab={activeTab} tabText={"Machine Learning"} handleTabClick={handleTabClick}
                   tabName={"ai-ml"} toolTipText={"Machine Learning (AI) Pipelines"} icon={faMicrochip}/>
        <CustomTab activeTab={activeTab} tabText={"SalesForce"} handleTabClick={handleTabClick}
                   tabName={"sfdc"} toolTipText={"SalesForce Pipelines"} icon={faSalesforce}/>
      </CustomTabContainer>
    );
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab !== "catalog" ? "all" : activeTab} tabText={"Pipelines"}
                       handleTabClick={handleTabClick} tabName={"all"} toolTipText={"Pipelines"} icon={faDraftingCompass}/>
        <NavigationTab activeTab={activeTab} tabText={"Catalog"} handleTabClick={handleTabClick} tabName={"catalog"}
                       toolTipText={"Catalog"} icon={faHexagon}/>
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={getCurrentBreadcrumbDestination()}
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={getPageDescription()}
      hasTabContainer={activeTab !== "catalog"}
      helpComponent={activeTab !== "catalog" ? <undefined/> : <CatalogHelpDocumentation/>}
    >
      {getCurrentView()}
    </ScreenContainer>
  );

}

export default Pipelines;
