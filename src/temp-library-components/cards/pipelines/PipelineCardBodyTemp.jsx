import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {Col} from "react-bootstrap";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import IconBase from "components/common/icons/IconBase";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {lightThemeConstants} from "temp-library-components/theme/light.theme.constants";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import OrchestrationStateField from "temp-library-components/fields/orchestration/state/OrchestrationStateField";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";

const getLastRunDetails = (pipelineModel) => {
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {/*{`This Pipeline has not been run yet`}*/}&nbsp;
        </div>
      </div>
    );
  }

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex text-muted"}>
        <div>
          Last run {DateHelper.formatDistanceToNow(lastRunCompletionDate, undefined, false, true)}
        </div>
      </div>
    );
  }

  return (
    <div className={"d-flex"}>
      <div className={"text-muted m-auto"}>
        {/*{`No metrics captured for last run`}*/}&nbsp;
      </div>
    </div>
  );
};

const getIcon = (isSalesforce, isSubscribed) => {
  if (isSubscribed === true) {
    return (
      <OverlayIconBase
        icon={faStar}
        iconColor={lightThemeConstants.COLOR_PALETTE.OPSERA_GOLD}
        iconSize={"2x"}
        overlayBody={"You are following this Pipeline"}
      />
    );
  }

  if (isSalesforce === true) {
    return (
      <IconBase
        icon={faSalesforce}
        iconColor={lightThemeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
        iconSize={"3x"}
      />
    );
  }

  return (
    <IconBase
      icon={faSalesforce}
      iconColor={"white"}
      iconSize={"3x"}
    />
  );
};

export default function PipelineCardBodyTemp(
  {
    pipelineModel,
  }) {
  const orchestrationState = pipelineHelper.getPipelineModelOrchestrationState(pipelineModel);
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);

  if (pipelineModel == null || orchestrationState == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        <Col xs={12}>
          <div
            className={"w-100 d-flex mt-2"}
            style={{
              minHeight: "39px",
              maxHeight: "39px",
            }}
          >
            <div className={"mt-auto w-100 d-flex justify-content-between"}>
              {/*<OrchestrationStateFieldBase*/}
              {/*  showStatusText={false}*/}
              {/*  showStoppedState={false}*/}
              {/*  type={"Pipeline"}*/}
              {/*  orchestrationState={orchestrationState}*/}
              {/*/>*/}
              <div>
                {orchestrationHelper.getLastRunCardSummary(pipelineHelper.getLastRunCompletionTime(pipelineModel?.getOriginalData()), pipelineHelper.getPipelineModelOrchestrationState(pipelineModel))}
              </div>
              <div>
                <span>{runCount} Runs</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

PipelineCardBodyTemp.propTypes = {
  pipelineModel: PropTypes.object,
};