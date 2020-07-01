import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Row, Col, Nav } from "react-bootstrap";
import TabContainer from "react-bootstrap/TabContainer";
import ModalLogs from "components/common/modalLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Tab from "react-bootstrap/Tab";

const Highlight = require("react-highlighter");

function BlueprintSearchResult({ searchResults }) {

  return (   
    <>
      <br></br>
      <div className="mb-1 mt-3 bordered-content-block p-3 max-content-width"> 
        { Object.keys(searchResults).length > 0 &&
          <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row>
              <Col sm={2}>
                <div className="blueprint-title pl-3 mb-1">Steps</div>
                <Nav variant="pills" className="flex-column">
                  {searchResults.map((item, idx) => (
                    <Nav.Item key={idx}>
                      <Nav.Link eventKey={idx} >{item._source.data.jobId.toString()}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <div className="blueprint-title pl-3 mb-1">Blueprint</div>
                <Tab.Content>
                  {searchResults.map((item, idx) => (
                    <Tab.Pane key={idx} eventKey={idx}>
                      <div className="console-text-invert">
                        {item._source.data.tool_output}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        }
      </div>
    </>
  );
}

BlueprintSearchResult.propTypes = {
  searchResults: PropTypes.array
};


export default BlueprintSearchResult;