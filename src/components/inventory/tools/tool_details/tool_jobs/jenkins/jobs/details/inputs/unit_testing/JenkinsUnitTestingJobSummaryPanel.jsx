import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"; 
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function JenkinsUnitTestingJobSummaryPanel({ dataObject }) {
  const getBuildTypeFields = () => {
    switch (dataObject?.getData("buildType")) {
      case "gradle":
        return (
          <Col lg={6}>
            <TextFieldBase dataObject={dataObject} fieldName={"gradleTask"} />
          </Col>
        );
      case "maven":
        return (
          <Col lg={6}>
            <TextFieldBase dataObject={dataObject} fieldName={"mavenTask"} />
          </Col>
        );
    }
  };

  return (
    <>
      <Col lg={6}>
        <TextFieldBase dataObject={dataObject} fieldName="buildType" />
      </Col>
      {getBuildTypeFields()}
    </>
  );
}

JenkinsUnitTestingJobSummaryPanel.propTypes = {
  dataObject: PropTypes.object,
};

export default JenkinsUnitTestingJobSummaryPanel;