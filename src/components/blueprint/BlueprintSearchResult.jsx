import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faFileCode,
  faTimesCircle,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "react-bootstrap/Tab";
import ReactJson from "react-json-view";


function BlueprintSearchResult({ searchResults }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  let completeInput = [];

  for (let item in searchResults.data) {
    if (searchResults.data.length > 0) {
      if (searchResults.data[item].api_response) {
        if (searchResults.data[item].api_response.jenkins_console_log) {
          completeInput.push(searchResults.data[item].api_response.jenkins_console_log);
        } else if (searchResults.data[item].api_response.status) {
          completeInput.push(searchResults.data[item].api_response.status);
        } else if (searchResults.data[item].api_response.buildLog) {
          completeInput.push(searchResults.data[item].api_response.buildLog);
        } else {
          if (searchResults.data[item].api_response) {
            completeInput.push(JSON.stringify(searchResults.data[item].api_response, undefined, 4));
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

  function renderStep(item) {
    if (item.start) {
      return (
        <>
          <div className="mb-1 mt-3 ml-1 bordered-content-block py-2 px-3 max-content-width">
            <Row>
              <Col>
                <strong>
                  <span className="blueprint-step-title">{makeUpper(item.start.step_type)}</span>
                </strong>
                {item.current.status === "pending" ? (
                  <FontAwesomeIcon className="float-right mr-2 mt-1 yellow" icon={faExclamationCircle} />
                ) : item.current.status !== "success" ? (
                  <FontAwesomeIcon className="float-right mr-2 mt-1 cell-icon red" icon={faTimesCircle} />
                ) : (
                  <FontAwesomeIcon className="float-right mr-2 mt-1 green" icon={faCheckCircle} />
                )}
              </Col>
            </Row>
            <hr style={{ margin: " 0.5em auto" }} />
            <Row>
              <Col lg className="py-1">
                <span className="text-muted mr-1">Step Name:</span>
                <span className="console-text-invert max-content-width">{makeUpper(item.start.step_name)}</span>
              </Col>
            </Row>
            {item.start.step_name === "approval" ? (
              <Row>
                <Col lg className="py-1">
                  <span className="text-muted mr-1">Requested At:</span>
                  <span className="console-text-invert max-content-width">{item.start.timestamp}</span>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Requested At:</span>
                    <span className="console-text-invert max-content-width">{item.current.timestamp}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Response Message:</span>
                    <span className="console-text-invert max-content-width">{item.current.message}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1.5} className="pt-1 ml-3">
                    <span className="text-muted mr-1">API Response:</span>
                  </Col>
                  <Col lg={5} className="pre my-2">
                    <ReactJson src={item.current.data} displayDataTypes={false} />
                  </Col>
                </Row>
              </>
            )}
            {item.start.step_name === "approval" && item.current.status === "success" && (
              <>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Approved At:</span>
                    <span className="console-text-invert max-content-width">{item.current.timestamp}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Approver:</span>
                    <span className="console-text-invert max-content-width">{item.current.approver}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Duration:</span>
                    <span className="console-text-invert max-content-width">{item.current.duration} hours</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg className="py-1">
                    <span className="text-muted mr-1">Approval Message:</span>
                    <span className="console-text-invert max-content-width">{item.current.message}</span>
                  </Col>
                </Row>
              </>
            )}
            {item.start.step_name === "approval" && item.current.status === "pending" && (
              <Row>
                <Col lg className="py-1">
                  <span className="text-muted mr-1">Time Since Request:</span>
                  <span className="console-text-invert max-content-width">{item.current.duration} hours</span>
                </Col>
              </Row>
            )}
          </div>
        </>
      );
    } else {
      return (
        <div className="pre">
          <ReactJson src={item.api_response} displayDataTypes={false} />
        </div>
      );
    }
  }

  return (
    <>
      <br></br>
      <div className="mb-1 mt-3 bordered-content-block p-3 max-content-width">
        {searchResults.xmlData && searchResults.xmlModal === "enabled" && (
          <Button
            variant="outline-dark mr-3"
            className="float-right mt-1 ml-1"
            size="sm"
            onClick={() => {
              handleClick(searchResults.xmlData);
            }}
          >
            <FontAwesomeIcon icon={faFileCode} fixedWidth />
            Package XML
          </Button>
        )}
        {searchResults.xmlData && searchResults.xmlModal === "disabled" && (
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                Package XML is currently only available for the latest pipeline run.
              </Tooltip>
            }
          >
            <span className="float-right mt-1 ml-1">
              <Button
                variant="outline-dark mr-3"
                className="float-right mt-1 ml-1"
                size="sm"
                disabled
                style={{ pointerEvents: "none" }}
                onClick={() => {
                  handleClick(searchResults.xmlData);
                }}
              >
                <FontAwesomeIcon icon={faFileCode} fixedWidth />
                Package XML
              </Button>
            </span>
          </OverlayTrigger>
        )}
        {searchResults.data.length > 0 && (
          <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row>
              <Col sm={2}>
                <div className="blueprint-title pl-3 mb-1">Steps</div>
                <Nav variant="pills" className="flex-column">
                  {searchResults.data.map((item, idx) => (
                    <>
                      <Nav.Item key={idx}>
                        <Nav.Link key={idx} eventKey={idx}>
                          {makeUpper(
                            item.step_configuration &&
                              item.step_configuration.configuration &&
                              item.step_configuration.configuration.jobType
                              ? item.step_configuration.configuration.jobType
                              : item.tool_identifier
                              ? item.tool_identifier
                              : item.step_name
                          )}
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  ))}

                  {completeInput.length > 0 && (
                    <Nav.Item>
                      <hr />
                      <Nav.Link eventKey="view_all">
                        <FontAwesomeIcon icon={faLayerGroup} fixedWidth /> View All
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>
              </Col>
              <Col sm={9}>
                <Row>
                  <div className="blueprint-title pl-3 mb-1 ml-2">Blueprint</div>
                </Row>
                <Tab.Content>
                  {searchResults.data.map((item, idx) => (
                    <Tab.Pane key={idx} eventKey={idx}>
                      {item.api_response.jenkins_console_log ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.jenkins_console_log}
                        </div>
                      ) : item.api_response.status ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.status}
                        </div>
                      ) : item.api_response.buildLog ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.buildLog}
                        </div>
                      ) : typeof item.api_response === "string" ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response}
                        </div>
                      ) : (
                        renderStep(item.api_response)
                      )}
                    </Tab.Pane>
                  ))}
                  {completeInput.length > 0 && (
                    <Tab.Pane eventKey="view_all">
                      <div className="console-text-invert">{completeInput}</div>
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
      </div>
      <ModalLogs
        header={modalMessage._index}
        size="lg"
        jsonMessage={modalMessage}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

BlueprintSearchResult.propTypes = {
  searchResults: PropTypes.object,
};

export default BlueprintSearchResult;
