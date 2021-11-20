import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Nav } from "react-bootstrap";
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
import ExportBlueprintLogButton from "components/common/buttons/export/blueprints/ExportBlueprintLogButton";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import {useHistory} from "react-router-dom";
import ShowSecurityReportButton from "components/blueprint/security_reports/ShowSecurityReportButton";
import ShowPackageXmlButton from "components/blueprint/ShowPackageXmlButton";

function BlueprintSearchResult({ logData, closeModal }) {
  const history = useHistory();

  let completeInput = [];

  if (Array.isArray(logData?.data) && logData.data.length > 0) {
    for (let item in logData.data) {
      if (logData.data.length > 0) {
        if (logData.data[item].api_response) {
          if (logData.data[item].api_response.jenkinsConsoleLog) {
            completeInput.push(logData.data[item].api_response.jenkinsConsoleLog);
          } else if (logData.data[item].api_response.jenkins_console_log) {
            completeInput.push(logData.data[item].api_response.jenkins_console_log);
          } else if (logData.data[item].step_configuration?.topic === "opsera.pipeline.octopus.console.log") {
            completeInput.push(logData.data[item].api_response.message);
          } else if (logData.data[item].api_response.status) {
            completeInput.push(logData.data[item].api_response.status);
          } else if (logData.data[item].api_response.buildLog) {
            completeInput.push(logData.data[item].api_response.buildLog);
          } else {
            if (logData.data[item].api_response) {
              completeInput.push(JSON.stringify(logData.data[item].api_response, undefined, 4));
            }
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

  // TODO: Make component?
  const getStatusIcon = (item) => {
    switch (item?.current?.status) {
      case "pending":
        return <FontAwesomeIcon className="float-right mr-2 mt-1 yellow" icon={faExclamationCircle} />;
      case "success":
        return <FontAwesomeIcon className="float-right mr-2 mt-1 green" icon={faCheckCircle} />;
      default:
        return <FontAwesomeIcon className="float-right mr-2 mt-1 cell-icon red" icon={faTimesCircle} />;
    }
  };

  const getRow = (title, text) => {
    return (
      <Row>
        <Col lg className="py-1">
          <span className="text-muted mr-1">{title}:</span>
          <span className="console-text-invert-modal w-100">{text}</span>
        </Col>
      </Row>
    );
  };

  // TODO: Should this be a summary panel? Either way refactor
  function renderStep(item) {
    if (item.start) {
      return (
        <>
          <div className="ml-1 bordered-content-block px-3 py-2">
            <Row>
              <Col>
                <strong>
                  <span className="blueprint-step-title">{makeUpper(item.start.step_type)}</span>
                </strong>
                {getStatusIcon(item)}
              </Col>
            </Row>
            <hr style={{ margin: " 0.5em auto" }} />
            {getRow("Step Name", makeUpper(item?.start?.step_name))}
            {item?.start?.step_name === "approval" ? (
              <>{getRow("Requested At", makeUpper(item?.start?.timestamp))}</>
            ) : (
              <>
                {getRow("Requested At", makeUpper(item?.current?.timestamp))}
                {getRow("Response Message", makeUpper(item?.current?.message))}
                <div className={"py-1"}>
                  <div className="text-muted mb-2">API Response</div>
                  <div><ReactJson src={item.current.data} displayDataTypes={false}  /></div>
                </div>
              </>
            )}
            {item?.start?.step_name === "approval" && item?.current?.status === "success" && (
              <>
                {getRow("Approved At", item?.current?.timestamp)}
                {getRow("Approver", item?.current?.approver)}
                {getRow("Duration", `${item?.current?.duration} hours`)}
                {getRow("Approval Message", item?.current?.message)}
              </>
            )}
            {getRow("Status", makeUpper(item.current.status))}
          </div>
        </>
      );
    } else {
      return (
        <div className="mt-2">
          <ReactJson src={item} displayDataTypes={false} />
        </div>
      );
    }
  }

  const goToPipeline = () => {
    if (closeModal) {
      closeModal();
    }

    history.push(`/workflow/details/${logData?.pipelineId}/summary`);
  };

  // TODO: Work to have this be a part of the bottom with a container. Just separating for now.
  const getTitleBar = () => {
    return (
      <div className="mt-3 bordered-content-block p-3">
        <Row>
          <Col>
            <strong>
              <div className="blueprint-title">
                {logData?.title}
              </div>
            </strong>
          </Col>
          {!closeModal &&
            <Button variant="outline-dark mr-3" size="sm" onClick={() => { goToPipeline();}}>
              <FontAwesomeIcon icon={faDraftingCompass} fixedWidth/>
              View Pipeline
            </Button>
          }
        </Row>
        <hr/>
        <Row className="mt-1">
          <Col lg>
            <StandaloneTextFieldBase label={"Pipeline ID"} text={"" + logData?.pipelineId} />
          </Col>
          <Col lg>
            <StandaloneTextFieldBase label={"Run Number"} text={"" + logData?.runNumber} />
          </Col>
          <Col lg className="my-2">
            <span className="text-muted mr-1">Number of Steps:</span> {logData?.data?.length ? logData?.data?.length : "N/A"}
          </Col>
        </Row>
      </div>
    );
  };

  // TODO: Refactor, add more defensive programming
  const getBody = () => {
    if (Array.isArray(logData?.data) && logData.data.length > 0) {
      return (
        <div className="mb-1 mt-3 bordered-content-block p-3 w-100">
          <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row>
              <Col sm={2} className={"pr-0"}>
                <div className="blueprint-title mb-3">Steps</div>
                <Nav variant="pills" className="flex-column">
                  {logData.data.map((item, idx) => (
                    <>
                      <Nav.Item key={idx}>
                        <Nav.Link key={idx} eventKey={idx}>
                          {makeUpper(
                            item?.step_name
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
              <Col sm={10}>
                <Row className={"mx-0 mb-2"}>
                  <div className={"justify-content-between d-flex w-100"}>
                    <div className="ml-1 blueprint-title">Blueprint</div>
                    <div className={"d-flex"}>
                      <ShowSecurityReportButton logData={logData} />
                      {!closeModal && <ShowPackageXmlButton logData={logData} />}
                      {/*// TODO: Just pass in logData to ExportBlueprintLogButton*/}
                      {!closeModal && completeInput &&
                      <ExportBlueprintLogButton
                        className="mr-2"
                        blueprintLog={completeInput}
                        pipelineId={logData?.data[0]?.pipeline_id ? logData.data[0].pipeline_id : "N/A" }
                        runCount={logData?.data[0]?.run_count ? logData.data[0].run_count : "N/A"}
                        blueprintName={logData?.title ? logData?.title : "N/A"}
                        numberOfSteps={logData?.data?.length ? logData?.data?.length : "N/A"}
                        logData={logData.data}
                      />
                      }
                    </div>
                  </div>
                </Row>
                <Tab.Content>
                  {logData.data.map((item, idx) => (
                    <Tab.Pane key={idx} eventKey={idx}>
                      {item.api_response.jenkinsConsoleLog ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.jenkinsConsoleLog}
                        </div>
                      ) : item.api_response.jenkins_console_log ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.jenkins_console_log}
                        </div>
                      ) : item.step_configuration?.topic === "opsera.pipeline.octopus.console.log" ? (
                        <div key={idx} className="console-text-invert">
                          {item.api_response.message}
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
        </div>
      );
    }
  };

  // TODO: Refactor
  return (
    <>
      {getTitleBar()}
      {getBody()}
    </>
  );
}

BlueprintSearchResult.propTypes = {
  logData: PropTypes.object,
  closeModal: PropTypes.func,
};

export default BlueprintSearchResult;
