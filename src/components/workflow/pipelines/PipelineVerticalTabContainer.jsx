import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faBracketsCurly, faDraftingCompass, faMicrochip, faUser} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import FollowingVerticalTab from "temp-library-components/tabs/FollowingVerticalTab";

function PipelineVerticalTabContainer({ isLoading, pipelineFilterModel, loadData }) {
  const handleTabClick = (tab) => {
    pipelineFilterModel?.setData("type", tab);
    pipelineFilterModel?.setData("currentPage", 1);
    loadData({...pipelineFilterModel});
  };

  return (
    <VanitySetVerticalTabContainer
      className={"w-100"}
    >
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"All Pipelines"}
        tabName={""}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View all Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faUser}
        tabText={"My Pipelines"}
        tabName={"owner"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Pipelines that you are the owner of."}
      />
      <VanitySetVerticalTab
        icon={faBracketsCurly}
        tabText={"Software Development"}
        tabName={"sdlc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Software Development Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faMicrochip}
        tabText={"Machine Learning"}
        tabName={"ai-ml"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Machine Learning Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faSalesforce}
        tabText={"Salesforce"}
        tabName={"sfdc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Salesforce Pipelines that you have access to."}
      />
      <FollowingVerticalTab
        isLoading={isLoading}
        handleTabClickFunction={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        pluralResourceType={"Pipelines"}
      />
    </VanitySetVerticalTabContainer>
  );
}

PipelineVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default PipelineVerticalTabContainer;