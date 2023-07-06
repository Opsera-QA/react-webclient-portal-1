import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import VanityTwoLineDataBlockBase from "temp-library-components/metric/data_block/VanityTwoLineDataBlockBase";
import {
  externalRestApiIntegrationStepHelper
} from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/externalRestApiIntegrationStep.helper";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import {IconBase} from "@opsera/react-vanity-set";
import {VanityFocusTextBase} from "temp-library-components/label/VanityFocusTextBase";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

// TODO: Write metadata rather than constructing standalone components
export default function ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary(
  {
    ruleEvaluation,
    latestStatusCheckTime,
    className,
  }) {
  const parsedRuleEvaluation = DataParsingHelper.parseObject(ruleEvaluation);

  const getStatusCheckTimeDataBlock = () => {
    const parsedFormattedDate = DateFormatHelper.formatDate(latestStatusCheckTime, DateFormatHelper.DATE_FORMATS.TIMESTAMP);

    if (parsedFormattedDate) {
      return (
        <WidgetDataBlockBase
          widthSize={8}
          className={"mr-2 mb-2"}
        >
          <div className={"p-2 w-100"}>
            <VanityFocusTextBase
              text={`${parsedFormattedDate}`}
            />
            <VanityLabelBase
              label={"Latest Status Check"}
            />
          </div>
        </WidgetDataBlockBase>
      );
    }
  };

  if (parsedRuleEvaluation == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex w-100"}>
        {getStatusCheckTimeDataBlock()}
        <WidgetDataBlockBase className={"mb-2"}>
          <div className={"p-2 w-100"}>
            <div className={"d-flex"}>
              <IconBase
                icon={externalRestApiIntegrationStepHelper.getStatusIcon(parsedRuleEvaluation?.status)}
                className={"mr-2 my-auto"}
                iconSize={"xl"}
                isLoading={parsedRuleEvaluation?.status === "running"}
              />
              <VanityFocusTextBase
                text={externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus(parsedRuleEvaluation?.status)}
              />
            </div>
            <div className={"ml-1"}>
              <VanityLabelBase
                label={parsedRuleEvaluation?.message}
              />
            </div>
          </div>
        </WidgetDataBlockBase>
      </div>
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary.propTypes = {
  ruleEvaluation: PropTypes.object,
  latestStatusCheckTime: PropTypes.string,
  className: PropTypes.string,
};
