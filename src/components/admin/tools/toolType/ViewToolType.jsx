import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";

import "components/inventory/tools/tools.css";

function ViewToolType(props) {
  const { toolData } = props;

  return (
    <>
      { Object.keys(toolData).length > 0  && <>
        <div className="tool-content-block m-3 pt-2">
          <Row>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Tool Type Name: </span>
                  {toolData.name}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">ID: </span>
                  {toolData._id}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Created:</span>
                  {toolData.createdAt && format(new Date(toolData.createdAt), "yyyy-MM-dd")}
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Description: </span>
                  {toolData.description}
                </li>
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Tool: </span>
                  {toolData.identifier}
                </li>
                <li className="list-group-item">
                  <span className="pr-1 text-muted">State: </span>
                  {toolData.active ? "Active" : "Disabled"}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Tags: </span>
                  {toolData.tags.toString().split(",").join(", ")}
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </>}
    </>
  );
}

ViewToolType.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object
};


export default ViewToolType;
