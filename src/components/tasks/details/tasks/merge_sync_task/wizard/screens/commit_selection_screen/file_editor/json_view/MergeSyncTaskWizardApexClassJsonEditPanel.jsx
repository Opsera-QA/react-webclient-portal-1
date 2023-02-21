import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MergeSyncTaskWizardApexClassJsonEditPanel = (
  {
    wizardModel,
    comparisonFileModel,
    setComparisonFileModel,
    modifiedApexClassJson,
    originalApexClassJson,
    isLoading
  }) => {

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading"} />);
  }

  return (
    <div className={"m-2"}>
      <Row>
        <Col>
          {JSON.stringify(modifiedApexClassJson, null, 2)}
        </Col>
        <Col>
          {JSON.stringify(originalApexClassJson, null, 2)}
        </Col>
      </Row>
      </div>
  );
};

MergeSyncTaskWizardApexClassJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedApexClassJson: PropTypes.array,
  originalApexClassJson: PropTypes.array,
};

export default MergeSyncTaskWizardApexClassJsonEditPanel;