import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepDetailsOverview from "components/workflow/pipelines/overview/PipelineStepDetailsOverview";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import PipelineOverviewStepTree from "components/workflow/pipelines/overview/PipelineOverviewStepTree";
import PipelineSourceRepositoryOverview from "components/workflow/pipelines/overview/PipelineSourceRepositoryOverview";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";

function PipelineOverviewContainer({ pipeline }) {
  const [pipelineSteps, setPipelineSteps] = useState([]);

  useEffect(() => {
    const steps = pipeline?.workflow?.plan;
    setPipelineSteps([]);

    if (Array.isArray(steps)) {
      setPipelineSteps(steps);
    }
  }, [JSON.stringify(pipeline)]);

  const getPipelineStepTabPanes = () => {
    if (Array.isArray(pipelineSteps) && pipelineSteps.length > 0) {
      return (
        pipelineSteps.map((pipelineStep, index) => (
          <VanitySetTabView key={index + 1} tabKey={index + 1}>
            <PipelineStepDetailsOverview pipelineStep={pipelineStep} index={index} />
          </VanitySetTabView>
        ))
      );
    }
  };

  // TODO: Make own component. Perhaps, make container for tree and tab content and don't put tab content in this component.
  const getPipelineOverStepTabContent = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView tabKey={0}>
          <PipelineSourceRepositoryOverview pipeline={pipeline} />
        </VanitySetTabView>
        {getPipelineStepTabPanes()}
      </VanitySetTabViewContainer>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faDraftingCompass}
      title={`${pipeline?.name}`}
      defaultActiveKey={0}
      verticalTabContainer={<PipelineOverviewStepTree pipelineSteps={pipelineSteps} />}
      currentView={getPipelineOverStepTabContent()}
    />
  );
}

PipelineOverviewContainer.propTypes = {
  pipeline: PropTypes.object,
};

export default PipelineOverviewContainer;