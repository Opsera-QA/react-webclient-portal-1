import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import JenkinsBuildJobSummaryPanel from "./inputs/build/JenkinsBuildJobSummaryPanel";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JenkinsUnitTestingJobSummaryPanel from "./inputs/unit_testing/JenkinsUnitTestingJobSummaryPanel";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import modelHelpers from "components/common/model/modelHelpers";
import {
  getJenkinsJobConfigurationMetadata
} from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobSubEditorPanel";

function JenkinsJobSummaryPanel({ jenkinsJobData, jenkinsJobType, setActiveTab, handleClose }) {
  const [jenkinsJobConfigurationModel, setJenkinsJobConfigurationModel] = useState(null);

  useEffect(() => {
    const buildType = jenkinsJobData?.getData("configuration.buildType");
    const jenkinsJobConfiguration = jenkinsJobData?.getData("configuration");
    const metadata = getJenkinsJobConfigurationMetadata(jenkinsJobType, buildType);
    const parsedModel = modelHelpers.parseObjectIntoModel(jenkinsJobConfiguration, metadata);
    setJenkinsJobConfigurationModel({...parsedModel});
  }, [jenkinsJobType]);

  const getDynamicJobTypeSummaryPanel = () => {
    switch (jenkinsJobData?.getArrayData("type", 0)) {
      case "BUILD":
        return <JenkinsBuildJobSummaryPanel dataObject={jenkinsJobConfigurationModel} />;
      case "UNIT TESTING":
      case "FUNCTIONAL TESTING":
        return <JenkinsUnitTestingJobSummaryPanel dataObject={jenkinsJobConfigurationModel}/>;
      case "SHELL SCRIPT":
      case "DOCKER PUSH":
      case "COVERITY":
      case "ARTIFACTORY_DOCKER_PUSH":
        return (
          <>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobConfigurationModel} fieldName={"buildType"}/>
            </Col>
          </>
        );
      case "SFDC":
        return (
          <>
            <Col lg={6}>
              <TextFieldBase dataObject={jenkinsJobConfigurationModel} fieldName={"jobType"}/>
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
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsJobConfigurationModel} fieldName={"agentLabels"}/>
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
  jenkinsJobType: PropTypes.string,
  setActiveTab: PropTypes.func,
  handleClose: PropTypes.func,
};

export default JenkinsJobSummaryPanel;
