import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Row, Col, Nav } from "react-bootstrap";
import TabContainer from "react-bootstrap/TabContainer";
import ModalLogs from "components/common/modalLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Tab from "react-bootstrap/Tab";

const Highlight = require("react-highlighter");

function BlueprintSearchResult({ searchResults }) {

  let completeInput = [];

  for (let item in searchResults) {
    if (searchResults.length > 0) {
      if (searchResults[item].api_response) {
        if (searchResults[item].api_response.jenkins_console_log) {
          completeInput.push(searchResults[item].api_response.jenkins_console_log);
        } else if (searchResults[item].api_response.status) {
          completeInput.push(searchResults[item].api_response.status); 
        } else if (searchResults[item].api_response.buildLog) {
          completeInput.push(searchResults[item].api_response.buildLog); 
        } else {
          if (searchResults[item].api_response) {
            completeInput.push(searchResults[item].api_response); 
          }
        }
      }
    }
  }
  
  function makeUpper(item) {
    let stringSplit = item.toLowerCase().split(" ");
    for (let i = 0; i < stringSplit.length; i++) {
      stringSplit[i] = stringSplit[i].charAt(0).toUpperCase() + stringSplit[i].substring(1);     
    }
    return stringSplit.join(" "); 
  }
 
  return (   
    <>
      <br></br>
      <div className="mb-1 mt-3 bordered-content-block p-3 max-content-width"> 
        { searchResults.length > 0 &&
          <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row>
              <Col sm={2}>
                <div className="blueprint-title pl-3 mb-1">Steps</div>
                <Nav variant="pills" className="flex-column">
                  {searchResults.map((item, idx) => (
                    <>
                      <Nav.Item key={idx}>
                        <Nav.Link eventKey={idx} >{makeUpper(item.step_name)}</Nav.Link>
                      </Nav.Item>
                    </>
                  ))}
                  
                  { completeInput.length > 0 && 
                  
                    <Nav.Item>
                      <hr />
                      <Nav.Link eventKey="view_all"><FontAwesomeIcon icon={faLayerGroup} fixedWidth/> View All</Nav.Link>
                    </Nav.Item>
                  }
                </Nav>
              </Col>
              <Col sm={9}>
                <div className="blueprint-title pl-3 mb-1">Blueprint</div>
                <Tab.Content>
                  {searchResults.map((item, idx) => (
                    <Tab.Pane key={idx} eventKey={idx}>
                      <div className="console-text-invert">
                        {item.api_response.jenkins_console_log ? item.api_response.jenkins_console_log : (item.api_response.status ? item.api_response.status : (item.api_response.buildLog) ? item.api_response.buildLog : (item.api_response) ? item.api_response : "")}
                      </div>
                    </Tab.Pane>
                  ))}
                  { completeInput.length > 0 && 
                  <Tab.Pane eventKey="view_all">
                    <div className="console-text-invert">
                      {completeInput}
                    </div>
                  </Tab.Pane>
                  }
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