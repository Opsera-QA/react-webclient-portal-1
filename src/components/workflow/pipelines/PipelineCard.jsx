import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import PipelineHelpers from "../pipelineHelpers";
import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {
   faFlag,
} from "@fortawesome/pro-light-svg-icons";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import {getPipelineStateFieldBase} from "components/common/fields/pipelines/state/PipelineStateField";
import IconBase from "components/common/icons/IconBase";
import PipelineTypeIcon from "components/common/fields/pipelines/types/PipelineTypeIcon";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {truncateString} from "components/common/helpers/string-helpers";

// TODO: Rewrite
const PipelineCard = (
  {
    pipeline,
    pipelineModel,
    subscribedPipelineIds,
    getSelectButtonFunction,
  }) => {

  const getPendingApprovalField = () => {
    let pendingApproval = PipelineHelpers.getPendingApprovalStep(pipeline);

    if (pendingApproval) {
      return (
        <TooltipWrapper innerText={`Pending Approval`}>
          <IconBase icon={faFlag} className={"ml-2 danger-red"}/>
        </TooltipWrapper>
      );
    }
  };

  const getPipelineStatusField = () => {
    let pipelineStatus = pipeline?.state;

    return (
      <div className={"text-muted d-flex justify-content-end"}>
        {getPipelineStateFieldBase(pipelineStatus)}
      </div>
    );
  };

  const getFormattedDescription = () => {
    let description = pipeline?.description;

    if (description && description.length > 275) {
      return description.slice(0, 275).split(" ").slice(0, -1).join(" ") + "...";
    }

    return description;
  };

  const getLastRunEntry = () => {
    const lastRunCompletionDate = pipeline?.workflow?.last_run?.completed;

    if (lastRunCompletionDate != null) {
      return getFormattedTimestamp(lastRunCompletionDate);
    }
  };

  const getTitle = () => {
    const name = DataParsingHelper.parseString(pipeline?.name);

    if (name) {
      return truncateString(name, 50);
    }
  };

  return (
      <Card className={"h-100"}>
        <Card.Title className="pb-0">
          <div className={"d-flex pipeline-card-title p-2"}>
            <div className={"d-flex"}>
              <PipelineTypeIcon model={pipelineModel} className={"mr-2"} />
              {getTitle()}
            </div>
            <div className={"d-flex ml-auto my-auto small"}>
              <PipelineSubscriptionIcon
                pipelineModel={pipelineModel}
                pipelineId={pipelineModel?.getData("_id")}
                className={"ml-2"}
                pullSubscriptionStatus={false}
                subscribedPipelineIds={subscribedPipelineIds}
              />
              {getPendingApprovalField()}
            </div>
          </div>

        </Card.Title>
        <Card.Body className="pt-0 pb-2 pipeline-card-text">
          <Row>
            <Col className="py-1"><span className="text-muted mr-1">ID:</span> {pipeline?._id}</Col>
            <Col className="py-1 small">
              {getPipelineStatusField()}
            </Col>
          </Row>
          <Row>
            <Col className="py-1"><span className="text-muted mr-1">Owner:</span> {pipeline?.owner_name}</Col>
            <Col className="py-1">
              <span className="text-muted mr-1">Run Count:</span> {pipeline?.workflow?.run_count}
            </Col>
          </Row>
          <Row>
            <Col className="py-1">
              <span className="text-muted mr-2 pb-1">Last Run:</span>
              <span>{getLastRunEntry()}</span>
            </Col>
          </Row>
          <Row>
            <Col className="pt-2 text-muted">
              {getFormattedDescription()}
            </Col>
          </Row>

          <Row>
            <Col />
            <Col className="text-right p-2">
              {getSelectButtonFunction(pipeline)}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {/*TODO: Note, if you want the action icons to show up, pass in functions related and wire them up*/}
          {/*<PipelineActionBar pipeline={pipeline} />*/}
        </Card.Footer>
      </Card>
  );
};

PipelineCard.propTypes = {
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object,
  subscribedPipelineIds: PropTypes.array,
  getSelectButtonFunction: PropTypes.func,
};

export default PipelineCard;