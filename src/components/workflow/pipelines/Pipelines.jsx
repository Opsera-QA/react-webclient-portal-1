import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { faBracketsCurly, faDraftingCompass, faMicrochip, faUser } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import cookieHelpers from "core/cookies/cookie-helpers";
import PipelinesView from "components/workflow/pipelines/PipelinesView";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";

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
    cookieHelpers.setCookie("pipelines", "selectedTab", tabSelection);
    history.push(`/workflow/${tabSelection}`);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelines"} />}
      pageDescription={"Select a Pipeline to view details."}
      hasTabContainer={true}
    >
      {getPipelinesView()}
    </ScreenContainer>
  );

}

export default Pipelines;
