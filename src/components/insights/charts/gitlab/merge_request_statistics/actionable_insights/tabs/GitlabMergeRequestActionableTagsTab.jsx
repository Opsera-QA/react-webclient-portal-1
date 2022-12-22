import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import GitlabMergeRequestActionableTagsOverlay from "../GitlabMergeRequestActionableTagsOverlay";

function GitlabMergeRequestActionableTagsTab({dashboardData, kpiConfiguration,}) {
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
        <GitlabMergeRequestActionableTagsOverlay
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
        />
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabContentContainer>
      {getTabContentContainer()}
    </VanitySetTabContentContainer>
  );

}
GitlabMergeRequestActionableTagsTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};
export default GitlabMergeRequestActionableTagsTab;

