import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import PipelineHelpers from "../pipelineHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import PipelineActionBar from "./PipelineActionBar";
import PipelineStatus from "./PipelineStatus";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import {
  faDiceD20, faBracketsCurly, faMicrochip, faClock, faFlag, faPause,
  faSearch,
  faSpinner, faStop,
  faTimesCircle, faCheckCircle,
} from "@fortawesome/pro-light-svg-icons";

const PipelineItem = ({ item }) => {
  let history = useHistory();

  const handleDetailsClick = param => e => {
    e.preventDefault();
    history.push(`/workflow/details/${param}/summary`);
  };

  const getPendingApprovalField = () => {
    let pendingApproval = PipelineHelpers.getPendingApprovalStep(item);

    if (pendingApproval) {
      return (
        <TooltipWrapper innerText={`Pending Approval`}>
          <FontAwesomeIcon icon={faFlag} className="ml-2 danger-red"/>
        </TooltipWrapper>
      );
    }
  };

  const getPipelineStatusField = () => {
    let pipelineStatus = PipelineHelpers.getPipelineStatus(item);

    switch (pipelineStatus) {
    case "failed":
      return (
        <div className="red">
          <PipelineStatus className="red"
                          innerText={"An error has occurred in this pipeline.  See activity logs for details."}
                          icon={faTimesCircle} statusText={"Failed"}/>
        </div>
      );
    case "running":
      return (
        <div className="green">
          <PipelineStatus innerText={"A pipeline operation is currently in progress."} icon={faSpinner}
                          statusText={"Running"}/>
        </div>
      );
    case "paused":
      return (
        <div className="yellow">
          <PipelineStatus innerText={"The pipeline operation is currently paused."} icon={faPause}
                          statusText={"Paused"}/>
        </div>
      );
    case "success":
      return (
        <div className="green">
          <PipelineStatus innerText={"The most recent run of this pipeline was successful."} icon={faCheckCircle}
                          statusText={"Successful"}/>
        </div>
      );
    default:
      return (
        <PipelineStatus innerText={"This pipeline is not currently running."} icon={faStop}
                        statusText={"Stopped"}/>
      );
    }
  };

  const getFormattedDescription = () => {
    let description = item.description;

    if (description && description.length > 275) {
      return description.slice(0, 275).split(" ").slice(0, -1).join(" ") + "...";
    }

    return description;
  };

  // TODO: Deal with multiple categories when we get there
  const getFirstCategory = () => {
    const type = item.type;
    switch (type[0]) {
    case "sfdc":
      return (
        <TooltipWrapper innerText={`SalesForce`}>
          <FontAwesomeIcon icon={faSalesforce} className="ml-1 pipeline-blue-text" size="lg"/>
        </TooltipWrapper>
      );
    case "ai-ml":
      return (
        <TooltipWrapper innerText={"Machine Learning (AI)"}>
          <FontAwesomeIcon icon={faMicrochip} className="ml-1 pipeline-blue-text" size="lg"/>
        </TooltipWrapper>
      );
    case "sdlc":
      return (
        <TooltipWrapper innerText={"Software Development"}>
          <FontAwesomeIcon icon={faBracketsCurly} className="ml-1 pipeline-blue-text" size="lg"/>
        </TooltipWrapper>
      );
    default:
      return (
        <TooltipWrapper innerText={"No Pipeline Type Assigned"}>
          <FontAwesomeIcon icon={faDiceD20} className="ml-1 pipeline-blue-text" size="lg"/>
        </TooltipWrapper>
      );
    }
  };

  return (
    <>
      <Card style={{ height: "100%" }}>
        <Card.Title className="pb-0">
          <div className="d-flex pipeline-card-title p-2">
            <div>
              {item.name}
            </div>
            <div className="ml-auto mt-1 mr-1 text-muted small upper-case-first">
              {getFirstCategory()}
              {getPendingApprovalField()}
            </div>
          </div>

        </Card.Title>
        <Card.Body className="pt-0 pb-2 pipeline-card-text">
          <Row className="mb-2">
            <Col className="pb-1">
              <div className="text-muted">Owner: {item.owner_name}</div>
            </Col>
            <Col xs={2} className="">
              <div className="text-right small">
                {getPipelineStatusField()}
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="pb-1">
              <div className="text-muted">{getFormattedDescription()}</div>
            </Col>
          </Row>

          <Row>
            <Col className="mt-auto">
              <Button variant="primary" size="sm" className="pl-2 mb-1 btn-block w-50"
                      onClick={handleDetailsClick(item._id)}>
                <FontAwesomeIcon icon={faSearch} className="mr-1"/>View</Button>
            </Col>
            <Col>
              <div className="text-right">
                {item.workflow.schedule !== undefined && item.workflow.schedule.start_date !== null &&
                <div className="small">
                  <span className="text-muted mr-2 pb-1"><FontAwesomeIcon icon={faClock} size="sm" fixedWidth
                                                                          className="mr-1"/> Scheduled: </span>
                  {format(new Date(item.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</div>
                }
                <div><small><span className="text-muted mr-2 pb-1">Updated:</span><span
                  className="">{item.updatedAt && format(new Date(item.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
                <div><small><span className="text-muted mr-2 pb-1">Created:</span><span
                  className="">{item.updatedAt && format(new Date(item.createdAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {/*TODO: Note, if you want the action icons to show up, pass in functions related and wire them up*/}
          <PipelineActionBar item={item} handleViewClick={handleDetailsClick}/>
        </Card.Footer>
      </Card>
    </>
  );
};

PipelineItem.propTypes = {
  item: PropTypes.object,
};

export default PipelineItem;