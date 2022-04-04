import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faBracketsCurly, faDraftingCompass, faMicrochip, faUser} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import cookieHelpers from "core/cookies/cookie-helpers";
import {useHistory} from "react-router-dom";

function PipelineVerticalTabContainer({ isLoading, pipelineFilterModel }) {
  const history = useHistory();

  const handleTabClick = (tab) => {
    cookieHelpers.setCookie("pipelines", "selectedTab", tab);
    history.push(`/workflow/${tab}`);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"All Pipelines"}
        tabName={"all"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faUser}
        tabText={"My Pipelines"}
        tabName={"owner"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faBracketsCurly}
        tabText={"Software Development"}
        tabName={"sdlc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faMicrochip}
        tabText={"Machine Learning"}
        tabName={"ai-ml"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faSalesforce}
        tabText={"Salesforce"}
        tabName={"sfdc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
      />
    </VanitySetVerticalTabContainer>
  );
}

PipelineVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  pipelineFilterModel: PropTypes.object,
};

export default PipelineVerticalTabContainer;