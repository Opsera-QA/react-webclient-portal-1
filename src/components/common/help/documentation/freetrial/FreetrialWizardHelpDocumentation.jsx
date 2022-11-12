import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FreetrialWizardHelpDocumentation() {
  return (
    <div className={"m-4"}>
      <div className={"mb-2"}>
        <div><b>Freetrial Pipeline Configuration</b></div>
        <div>Short overview of how to setup a workflow on Opsera.</div>

          <Row>
            <Col lg={6}>
              <div className={"m-3"}><b>Choosing a Salesforce Template</b></div>
              <div className={"video-responsive"}>
                <iframe src="https://www.youtube.com/embed/-k6jyHaJLCE"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
              </div>
            </Col>
            <Col lg={6}>
              <div className={"m-3"}><b>Register Git Repository</b></div>
              <div className={"video-responsive"}>
                <iframe src="https://www.youtube.com/embed/-kDG-550j-U"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
              </div>
            </Col>
            <Col lg={6}>
              <div className={"m-3"}><b>Pipeline Workflow Creation</b></div>
              <div className={"video-responsive"}>
                <iframe src="https://www.youtube.com/embed/9otE3Z4LuTM"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
              </div>
            </Col>
            <Col lg={6}>
              <div className={"m-3"}><b>Task Workflow Creation</b></div>
              <div className={"video-responsive"}>
                <iframe src="https://www.youtube.com/embed/_nYnj8JVs7g"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
              </div>
            </Col>
          </Row>
      </div>
    </div>
  );
}

export default React.memo(FreetrialWizardHelpDocumentation);