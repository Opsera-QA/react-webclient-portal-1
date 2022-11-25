import React from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";

export default function PipelineTemplatePlanOverviewStepVerticalTabContainer(
  {
    plan,
  }) {
  const getPipelineStepTabs = () => {
    if (Array.isArray(plan) && plan.length > 0) {
      return (
        plan.map((pipelineStep, index) => (
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
      {getPipelineStepTabs()}
    </VanitySetVerticalTabContainer>
  );
}

PipelineTemplatePlanOverviewStepVerticalTabContainer.propTypes = {
  plan: PropTypes.array,
};