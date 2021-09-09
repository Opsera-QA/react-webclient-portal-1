import React from "react";
import PropTypes from "prop-types";
import VanityVerticalTabContainer from "components/common/tabs/vertical_tabs/VanityVerticalTabContainer";
import VanityVerticalTab from "components/common/tabs/vertical_tabs/VanityVerticalTab";

function PipelineOverviewStepTree({ pipelineSteps }) {
  const getPipelineStepTabs = () => {
    if (Array.isArray(pipelineSteps) && pipelineSteps.length > 0) {
      return (
        pipelineSteps.map((pipelineStep, index) => (
          <VanityVerticalTab
            key={index + 1}
            tabText={`Step ${index + 1}: ${pipelineStep?.name}`}
            tabName={index + 1}
          />
        ))
      );
    }
  };


  return (
    <VanityVerticalTabContainer title={"Pipeline Steps"}>
      <VanityVerticalTab
        tabText={"Pipeline Settings"}
        tabName={0}
      />
      {getPipelineStepTabs()}
    </VanityVerticalTabContainer>
  );
}


PipelineOverviewStepTree.propTypes = {
  pipelineSteps: PropTypes.array,
};

export default PipelineOverviewStepTree;