import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {lightThemeConstants} from "temp-library-components/theme/light.theme.constants";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function TaskCardHeader(
  {
    taskModel,
  }) {
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
  const isSubscribed = taskModel?.getData("isSubscribed");

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0) {
      return (
        <OrchestrationStateFieldBase
          orchestrationState={taskModel?.getData("status")}
          type={"Task"}
          showStoppedState={false}
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
            overlayBody={"You are following this Task"}
            visible={isSubscribed === true}
            iconStyling={{ paddingBottom: "1px" }}
            iconClassName={"ml-auto"}
          />
        </div>
      );
    }
  };

  return (
    <CardHeaderBase>
      <div className={"w-100 d-flex justify-content-between px-2 py-1 small"}>
        <div>
          {getOrchestrationStateFieldBase()}
        </div>
        <div className={"d-flex"}>
          {getSubscribedIcon()}
        </div>
      </div>
    </CardHeaderBase>
  );
}

TaskCardHeader.propTypes = {
  taskModel: PropTypes.object,
};