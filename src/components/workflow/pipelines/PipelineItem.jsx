import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {Button, Card, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PipelineHelpers from "../pipelineHelpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faClock, faPause,
  faSearch,
  faSpinner, faStop,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";
import React from "react";
import PipelineActionBar from "./PipelineActionBar";
import PipelineStatus from "./PipelineStatus";

const PipelineItem = ({item}) => {
  let history = useHistory();

  const handleDetailsClick = param => e => {
    e.preventDefault();
    history.push(`/workflow/${param}`);
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
      default:
        return (
          <PipelineStatus innerText={"This pipeline is not currently running."} icon={faStop}
                          statusText={"Stopped"}/>
        );
    }
  }

  const getFormattedDescription = () => {
    let description = item.description;

    if (description && description.length > 275) {
      return description.slice(0,275).split(' ').slice(0, -1).join(' ') + "...";
    }

    return description;
  }

  // TODO: Deal with multiple categories when we get there
  const getFirstCategory = () => {
    const type = item.type;
    return type != null && type.length > 0 ? type[0] : "Generic Pipeline";
  }

  return (
    <>
      <Card style={{height: "100%"}}>
        <Card.Title className="pb-0">
          <div className="d-flex pipeline-card-title p-2">
            <div>
              {item.name}
            </div>
            <div className="ml-auto mr-1">
              {getFirstCategory()}
            </div>
          </div>

        </Card.Title>
        <Card.Body className="pt-0 pb-2">
          <Row className="pipeline-card-text">
            <Col lg={9} className="my-auto pb-1">
              <div>{getFormattedDescription()}</div>
            </Col>
            <Col lg={3} className="my-auto">
              <div className="text-right">
                {getPipelineStatusField()}
              </div>
            </Col>
          </Row>
          <Row className="d-flex">
            <Col lg={3} className="mt-auto">
              <Button variant="primary" size="sm" className="pl-2 mb-1 btn-block" onClick={handleDetailsClick(item._id)}>
                <FontAwesomeIcon icon={faSearch} className="mr-1"/>View</Button>
            </Col>
            <Col lg={5} className="mt-auto">
              <div className="text-right">
                {item.workflow.schedule !== undefined && item.workflow.schedule.start_date !== null &&
                <small className="text-muted">
                  <FontAwesomeIcon icon={faClock} size="sm" fixedWidth className="mr-1"/> Scheduled for  &nbsp;
                  {format(new Date(item.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</small>
                }
              </div>
            </Col>
            <Col lg={4}>
              <div className="mt-auto text-right">
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
  item: PropTypes.object
};

export default PipelineItem;