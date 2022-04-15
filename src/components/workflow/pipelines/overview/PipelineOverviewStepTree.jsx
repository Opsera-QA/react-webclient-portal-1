import React from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";

// TODO: Rename Vertical Tab Container
function PipelineOverviewStepTree({ pipelineSteps }) {
  const getPipelineStepTabs = () => {
    if (Array.isArray(pipelineSteps) && pipelineSteps.length > 0) {
      return (
        pipelineSteps.map((pipelineStep, index) => (
          <VanitySetVerticalTab
            key={index + 1}
            tabText={`Step ${index + 1}: ${pipelineStep?.name}`}
            tabName={index + 1}
          />
        ))
      );
    }
  };


  return (
    <VanitySetVerticalTabContainer
      title={`Pipeline Steps`}
    >
      <VanitySetVerticalTab
        tabText={"Pipeline Settings"}
        tabName={0}
      />
      {getPipelineStepTabs()}
    </VanitySetVerticalTabContainer>
  );
}


PipelineOverviewStepTree.propTypes = {
  pipelineSteps: PropTypes.array,
};

export default PipelineOverviewStepTree;