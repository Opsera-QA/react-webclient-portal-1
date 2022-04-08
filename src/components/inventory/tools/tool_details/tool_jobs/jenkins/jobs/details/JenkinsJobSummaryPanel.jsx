import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import JenkinsBuildJobSummaryPanel from "./inputs/build/JenkinsBuildJobSummaryPanel";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JenkinsUnitTestingJobSummaryPanel from "./inputs/unit_testing/JenkinsUnitTestingJobSummaryPanel";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";

function JenkinsJobSummaryPanel({ jenkinsJobData, jenkinsJobTypeData, setActiveTab, handleClose }) {
  const getDynamicJobTypeSummaryPanel = () => {
    switch (jenkinsJobData?.getArrayData("type", 0)) {
      case "BUILD":
        return <JenkinsBuildJobSummaryPanel dataObject={jenkinsJobTypeData} />;
      case "UNIT TESTING":
      case "FUNCTIONAL TESTING":
        return <JenkinsUnitTestingJobSummaryPanel dataObject={jenkinsJobTypeData}/>;
      case "SHELL SCRIPT":
      case "DOCKER PUSH":
      case "COVERITY":
      case "ARTIFACTORY_DOCKER_PUSH":
        return (
          <>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobTypeData} fieldName={"buildType"}/>
            </Col>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobTypeData} fieldName={"agentLabels"}/>
            </Col>
          </>
        );
      case "SFDC":
        return (
          <>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobTypeData} fieldName={"jobType"}/>
            </Col>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobTypeData} fieldName={"agentLabels"}/>
            </Col>
          </>
        );
      default:
        return null;
    }
  };

  if (jenkinsJobData == null) {
    return null;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} className={"p-0"}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsJobData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsJobData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsJobData} fieldName={"description"}/>
        </Col>
        {getDynamicJobTypeSummaryPanel()}
      </Row>
      <SaveButtonContainer>
        <CloseButton size={"sm"} showUnsavedChangesMessage={false} closeEditorCallback={handleClose} />
      </SaveButtonContainer>
    </SummaryPanelContainer>
  );
}

JenkinsJobSummaryPanel.propTypes = {
  jenkinsJobData: PropTypes.object,
  jenkinsJobTypeData: PropTypes.object,
  setActiveTab: PropTypes.func,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default JenkinsJobSummaryPanel;
