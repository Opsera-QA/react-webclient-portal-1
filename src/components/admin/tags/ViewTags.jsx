import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";

import "components/inventory/tools/tools.css";

function ViewTags(props) {
  const { tagId, tagData } = props;

  return (
    <>
      { Object.keys(tagData).length > 0  && <>
        <Row>
          <Col>
            <ul className="list-group my-1">
              <li className="list-group-item">
                <span className="pr-2 text-muted">Tag Key:</span>
                {tagData.key}
              </li>
              <li className="list-group-item">
                <span className="pr-2 text-muted">Tag ID:</span>
                {tagData.id}
              </li>
              <li className="list-group-item">
                <span className="pr-2 text-muted">Account:</span>
                {tagData.account}
              </li>
              <li className="list-group-item">
                <span className="pr-2 text-muted">Created:</span>
                {tagData.createdAt && format(new Date(tagData.createdAt), "yyyy-MM-dd")}
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="list-group my-1">
              <li className="list-group-item">
                <span className="pr-2 text-muted">Value:</span>
                {tagData.value}
              </li>
              {/* TODO: Implement owner name when Todd finishes coding */}
              <li className="list-group-item">
                <span className="pr-2 text-muted">Owner:</span>
                {tagData.owner_name}
              </li>
              <li className="list-group-item">
                <span className="pr-2 text-muted">State: </span>
                {tagData.active ? "Active" : "Disabled"}
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className="list-group my-2">
              <li className="list-group-item">
                <span style={{ width: "100%" }} className="text-muted text-center">Configuration</span>
                <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "50%" }}>Name</th>
                      <th className="text-center" style={{ width: "50%" }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tagData.configuration && Object.keys(tagData.configuration).length > 0 && Object.keys(tagData.configuration).map((item, i) => 
                      <tr key={i} >
                        <td className="text-center">{item}</td>
                        <td className="text-center">{tagData.configuration[item]}</td>
                      </tr>
                    )}
                    {console.log("tag config: " + JSON.stringify(tagData.configuration))}
                    {tagData.configuration.length == 0 && <tr><td colSpan="8" className="text-center p-5">No configurations are assigned to this tag.</td></tr>}
                  </tbody>
                </Table>
              </li>
            </ul>
          </Col>
        </Row>
      </>}
    </>
  );
}

ViewTags.propTypes = {
  tagId: PropTypes.string,
  tagData: PropTypes.object
};


export default ViewTags;
