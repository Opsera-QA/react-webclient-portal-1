import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function JenkinsBuildJobSummaryPanel({ dataObject }) {
  const getDynamicBuildTypeFields = () => {
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
      case "msbuild":
        return (
          <Col lg={6}>
            <TextFieldBase dataObject={dataObject} fieldName={"commandLineArgs"} />
          </Col>
        );
    }
  };

  return (
    <>
      <Col lg={6}>
        <TextFieldBase dataObject={dataObject} fieldName="buildType" />
      </Col>
      {getDynamicBuildTypeFields()}
    </>
  );
}

JenkinsBuildJobSummaryPanel.propTypes = {
  dataObject: PropTypes.object,
};

export default JenkinsBuildJobSummaryPanel;