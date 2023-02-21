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
    modifiedContentJson,
    originalContentJson,
    isLoading
  }) => {

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading"} />);
  }

  return (
    <div className={"m-2"}>
      {/*{JSON.stringify(originalContentJson?.classAccesses, null, 2)}*/}
      {/*<br></br>*/}
      {/*{JSON.stringify(modifiedContentJson?.classAccesses, null, 2)}*/}
      <Row>
        <Col>

        </Col>
        <Col>

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
  modifiedContentJson: PropTypes.object,
  originalContentJson: PropTypes.object,
};

export default MergeSyncTaskWizardApexClassJsonEditPanel;