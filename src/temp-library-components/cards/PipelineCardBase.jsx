import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import IconBase from "components/common/icons/IconBase";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import DescriptionField from "components/common/fields/text/DescriptionField";
import {
  PIPELINE_TYPES,
  pipelineTypeConstants,
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import { getPipelineStateFieldBase } from "components/common/fields/pipelines/state/PipelineStateField";
import FieldContainer from "components/common/fields/FieldContainer";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";

const getLastRunEntry = (pipelineModel) => {
  const lastRun = pipelineModel?.getData("workflow.last_run");
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex justify-content-between"}>
        {getFormattedTimestamp(lastRunCompletionDate)}
        <div>{getPipelineStateFieldBase(lastRun?.status)}</div>
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
        icon={
          <div className={"d-flex w-100 h-100 mt-2 mb-4"}>
            <div className={"my-auto tool-title-text"}>
              <IconBase
                icon={icon}
                iconSize={"2x"}
                iconColor={pipelineType === PIPELINE_TYPES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
              />
            </div>
          </div>
        }
        title={`${pipelineModel?.getData("name")}`}
      />
    );
  };


  const getDescription = () => {
    return (
      <div>
        <div className={"small pl-1"}>
          <DescriptionField dataObject={pipelineModel} className={"description-height"} />
          {getRunFields()}
        </div>
      </div>
    );
  };

  const getTypeHeader = () => {
    return (
      <CardFooterBase
        backgroundColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
        color={themeConstants.COLOR_PALETTE.WHITE}
        icon={faDraftingCompass}
        text={"Pipeline"}
      />
    );
  };

  const getRunFields = () => {
    if (runCount === 0 || runCount == null) {
      return (
        <Row>
          <Col xs={12} className={"mx-auto"}>
            <div className={"text-muted mx-auto"}>
              {"This pipeline hasn't been run yet"}
            </div>
          </Col>
        </Row>
      );
    }

    return (
      <>
        <Row>
          <Col xs={6}>
            {pipelineStatusField}
          </Col>
          <Col xs={6}>
            <span className="mr-2">Runs:</span> {runCount}
          </Col>
          <Col xs={12} className={"mt-2 mb-1"}>
            <div className={"mx-auto"}>
              <span>Last Run</span>
              <span>{formattedLastRun}</span>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  if (pipelineModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      header={getTypeHeader()}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      className={"vertical-selection-card"}
      tooltip={tooltip}
      style={{
        // boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        cursor: mouseHelper.getMouseCursor(onClickFunction),
      }}
    />
  );
}

PipelineCardBase.propTypes = {
  pipelineModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};