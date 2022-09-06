import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  PIPELINE_TYPES,
  pipelineTypeConstants,
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import PipelineCardHeader from "temp-library-components/cards/pipelines/PipelineCardHeader";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getLastRunDetails = (pipelineModel) => {
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const lastRun = pipelineModel?.getData("workflow.last_run");
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {`This pipeline hasn't been run yet`}
        </div>
      </div>
    );
  }

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex justify-content-between"}>
        {getFormattedTimestamp(lastRunCompletionDate)}
        <div>
          <OrchestrationStateFieldBase
            orchestrationState={lastRun?.status}
            type={"Pipeline"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={"d-flex"}>
      <div className={"text-muted m-auto"}>
        {`No metrics captured for last run`}
      </div>
    </div>
  );
};

const getLastRunEntry = (pipelineModel) => {
  return (
    <Col xs={12}>
      <div className={"mt-2"}>
        <div className={"d-flex"}>
          <div className={"mx-auto"}>Last Run</div>
        </div>
        {getLastRunDetails(pipelineModel)}
      </div>
    </Col>
  );
};

// TODO: Rewrite
export default function PipelineCardBase(
  {
    pipelineModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const formattedLastRun = getLastRunEntry(pipelineModel);
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const pipelineType = pipelineModel?.getArrayData("type", 0);
    const icon = pipelineTypeConstants.getIconForPipelineType(pipelineType);

    return (
      <IconTitleBar
        icon={icon}
        iconSize={"4x"}
        iconColor={pipelineType === PIPELINE_TYPES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
        title={`${pipelineModel?.getData("name")}`}
        className={"mx-1"}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className={"mx-1 mb-1"}>
        <Row className={"small"}>
          {getTemplateIdentifierField()}
          {/*<Col xs={12}>*/}
          {/*  <DescriptionField dataObject={pipelineModel} className={"description-height mb-2"} />*/}
          {/*</Col>*/}
          {formattedLastRun}
        </Row>
      </div>
    );
  };

  const getTemplateIdentifierField = () => {
    return (
      <Col xs={12}>
        {pipelineTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(pipelineModel?.getData("templateIdentifier"))}
      </Col>
    );
  };

  if (pipelineModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCardBase
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      cardHeader={<PipelineCardHeader pipelineModel={pipelineModel} />}
      cardFooter={<PipelineCardFooter />}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
    />
  );
}

PipelineCardBase.propTypes = {
  pipelineModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};