import React from "react";
import PropTypes from "prop-types";
import PipelineStepDetailsOverview from "components/workflow/pipelines/overview/PipelineStepDetailsOverview";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineTemplatePlanOverviewStepVerticalTabContainer
  from "components/workflow/catalog/overview/PipelineTemplatePlanOverviewStepVerticalTabContainer";

export default function PipelineTemplatePlanOverviewContainer(
  {
    pipelineTemplateModel,
    className,
  }) {
  const plan = DataParsingHelper.parseArray(pipelineTemplateModel?.getData("plan"), []);

  const getPipelineStepTabPanes = () => {
    if (Array.isArray(plan) && plan.length > 0) {
      return (
        plan.map((pipelineStep, index) => (
          <VanitySetTabView key={index + 1} tabKey={index + 1}>
            <PipelineStepDetailsOverview pipelineStep={pipelineStep} index={index} />
          </VanitySetTabView>
        ))
      );
    }
  };

  const getPipelineOverStepTabContent = () => {
    return (
      <VanitySetTabViewContainer>
        {getPipelineStepTabPanes()}
      </VanitySetTabViewContainer>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      className={className}
      icon={faDraftingCompass}
      title={`${pipelineTemplateModel.getData("name")} Pipeline Steps`}
      defaultActiveKey={1}
      verticalTabContainer={<PipelineTemplatePlanOverviewStepVerticalTabContainer plan={plan} />}
      currentView={getPipelineOverStepTabContent()}
    />
  );
}

PipelineTemplatePlanOverviewContainer.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
};