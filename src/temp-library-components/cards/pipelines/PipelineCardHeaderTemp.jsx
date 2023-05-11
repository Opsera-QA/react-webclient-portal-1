import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {lightThemeConstants} from "temp-library-components/theme/light.theme.constants";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineCardHeaderTemp(
  {
    pipelineModel,
  }) {
  const orchestrationState = pipelineHelper.getPipelineModelOrchestrationState(pipelineModel);
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const isSubscribed = pipelineModel?.getData("isSubscribed");

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0) {
      return (
        <OrchestrationStateFieldBase
          orchestrationState={orchestrationState}
          type={"Pipeline"}
          showStoppedState={false}
          // className={"ml-auto"}
        />
      );
    }
  };

  const getSubscribedIcon = () => {
    if (isSubscribed === true) {
      return (
        <div className={"d-flex ml-auto"}>
          <OverlayIconBase
            icon={faStar}
            iconSize={"lg"}
            iconColor={lightThemeConstants.COLOR_PALETTE.OPSERA_GOLD}
            overlayBody={"You are following this Pipeline"}
            visible={isSubscribed === true}
            iconStyling={{ paddingBottom: "1px" }}
            iconClassName={"ml-auto"}
          />
          {/*<div className={"ml-1"}>Following</div>*/}
        </div>
      );
    }
  };

  return (
    <CardHeaderBase>
      <div className={"w-100 d-flex justify-content-between px-2 py-1 small"}>
        <div
          style={{
            minWidth: "90px",
            maxWidth: "90px",
          }}
        >
          <span>{runCount} Runs</span>
        </div>
        {/*{getSubscribedIcon()}*/}
        <div
          style={{
            minWidth: "90px",
            maxWidth: "90px",
          }}
          className={"d-flex"}
        >
          {/*{getOrchestrationStateFieldBase()}*/}
          {getSubscribedIcon()}
        </div>
      </div>
    </CardHeaderBase>
  );
}

PipelineCardHeaderTemp.propTypes = {
  pipelineModel: PropTypes.object,
};