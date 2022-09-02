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
import { getPipelineStateFieldBase } from "components/common/fields/pipelines/state/PipelineStateField";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";

const getLastRunEntry = (pipelineModel) => {
  const lastRun = pipelineModel?.getData("workflow.last_run");
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (lastRunCompletionDate != null) {
    return (
      <div className={"mx-auto mt-2 mb-1"}>
        <span>Last Run</span>
        <div className={"d-flex justify-content-between"}>
          {getFormattedTimestamp(lastRunCompletionDate)}
          <div>{getPipelineStateFieldBase(lastRun?.status)}</div>
        </div>
      </div>
    );
  }
};

const getPipelineStatusField = (pipelineModel) => {
  const pipelineState = pipelineModel?.getData("state");

  return (getPipelineStateFieldBase(pipelineState));
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
  const runCount = pipelineModel?.getData("workflow.run_count");
  const formattedLastRun = getLastRunEntry(pipelineModel);
  const pipelineStatusField = getPipelineStatusField(pipelineModel);
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
          {getRunFields()}
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

  const getRunFields = () => {
    if (runCount === 0 || runCount == null) {
      return (
        <Col xs={12} className={"d-flex"}>
          <div className={"text-muted m-auto"}>
            {"This pipeline hasn't been run yet"}
          </div>
        </Col>
      );
    }

    return (
      <>
        <Col xs={6}>
          {pipelineStatusField}
        </Col>
        <Col xs={6}>
          <span>{runCount} Runs</span>
        </Col>
        <Col xs={12}>
          <span>{formattedLastRun}</span>
        </Col>
      </>
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