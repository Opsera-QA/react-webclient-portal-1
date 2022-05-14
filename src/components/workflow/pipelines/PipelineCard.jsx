import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import PipelineHelpers from "../pipelineHelpers";
import { format } from "date-fns";
import React from "react";
import PipelineActionBar from "./PipelineActionBar";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import {
  faDraftingCompass, faBracketsCurly, faMicrochip, faFlag,
  faSearch,
} from "@fortawesome/pro-light-svg-icons";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import {getPipelineStateFieldBase} from "components/common/fields/pipelines/state/PipelineStateField";
import IconBase from "components/common/icons/IconBase";

// TODO: Rewrite
const PipelineCard = ({ pipeline, pipelineModel }) => {
  let history = useHistory();

  const handleDetailsClick = param => e => {
    e.preventDefault();
    history.push(`/workflow/details/${param}/summary`);
  };

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

  // TODO: Deal with multiple categories when we get there
  const getFirstCategory = () => {
    const pipelineTypes = pipeline?.type;

    if (!Array.isArray(pipelineTypes) || pipelineTypes?.length === 0) {
      return (
        <TooltipWrapper innerText={"No Pipeline Type Assigned"}>
          <IconBase icon={faDraftingCompass} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
        </TooltipWrapper>
      );
    }

    const firstType = pipelineTypes[0];

    switch (firstType) {
    case "sfdc":
      return (
        <TooltipWrapper innerText={`SalesForce`}>
          <IconBase icon={faSalesforce} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
        </TooltipWrapper>
      );
    case "ai-ml":
      return (
        <TooltipWrapper innerText={"Machine Learning (AI)"}>
          <IconBase icon={faMicrochip} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
        </TooltipWrapper>
      );
    case "sdlc":
      return (
        <TooltipWrapper innerText={"Software Development"}>
          <IconBase icon={faBracketsCurly} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
        </TooltipWrapper>
      );
    default:
      return (
        <TooltipWrapper innerText={"No Pipeline Type Assigned"}>
          <IconBase icon={faDraftingCompass} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
        </TooltipWrapper>
      );
    }
  };

  return (
      <Card className={"h-100"}>
        <Card.Title className="pb-0">
          <div className={"d-flex pipeline-card-title p-2"}>
            <div className={"d-flex"}>
              {getFirstCategory()}
              {pipeline?.name}
            </div>
            <div className={"d-flex ml-auto my-auto small"}>
              <PipelineSubscriptionIcon
                pipelineModel={pipelineModel}
                pipelineId={pipelineModel?.getData("_id")}
                className={"ml-2"}
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
              <span className="text-muted mr-2 pb-1">Created:</span><span
              className="">{pipeline?.updatedAt && format(new Date(pipeline?.createdAt), "yyyy-MM-dd'")}</span>
            </Col>
            <Col className="py-1">
              {pipeline?.workflow?.last_run?.completed ?
                <><span className="text-muted mr-2 pb-1">Last Run:</span><span
                  className="">{format(new Date(pipeline?.workflow?.last_run?.completed), "yyyy-MM-dd'")}</span>
                </>
                :
                <><span className="text-muted mr-2 pb-1">Updated:</span><span
                  className="">{pipeline?.updatedAt && format(new Date(pipeline?.updatedAt), "yyyy-MM-dd'")}</span>
                </>
              }
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
              <Button variant="primary" size="sm" className="w-50"
                      onClick={handleDetailsClick(pipeline?._id)}>
                <IconBase icon={faSearch} className={"mr-1"}/>View</Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {/*TODO: Note, if you want the action icons to show up, pass in functions related and wire them up*/}
          <PipelineActionBar pipeline={pipeline} handleViewClick={handleDetailsClick}/>
        </Card.Footer>
      </Card>
  );
};

PipelineCard.propTypes = {
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object
};

export default PipelineCard;