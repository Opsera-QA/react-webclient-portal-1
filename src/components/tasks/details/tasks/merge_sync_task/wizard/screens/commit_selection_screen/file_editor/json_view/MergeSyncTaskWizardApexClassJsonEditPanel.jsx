import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./profile_editor_views/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";

const MergeSyncTaskWizardApexClassJsonEditPanel = ({
  wizardModel,
  // comparisonFileModel,
  // setComparisonFileModel,
  modifiedApexClassJson,
  originalApexClassJson,
  modifiedContentJson,
  originalContentJson,
  setModifiedContentJson,
  setOriginalContentJson,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading"}
      />
    );
  }
  const setApexClassJson = (modifiedValue) => {
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.classAccesses.find(
      (apexClassItem) => apexClassItem.apexClass === modifiedValue.apexClass,
    );
    if (modifiedItem) {
      modifiedItem.enabled = modifiedValue.enabled;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedApexClassEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {modifiedApexClassJson &&
          modifiedApexClassJson.map((apexclass, idx, { length }) => (
            <div key={idx}>
              <ApexClassProfleEditorView
                apexClassData={apexclass}
                setApexClassJson={setApexClassJson}
                isLoading={isLoading}
              />
              {idx + 1 !== length && (
                <DividerWithCenteredText className={"m-4"} />
              )}
            </div>
          ))}
      </Col>
    );
  };

  const originalApexClassEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalApexClassJson &&
          originalApexClassJson.map((apexclass, idx, { length }) => (
            <div key={idx}>
              <ApexClassProfleEditorView
                apexClassData={apexclass}
                setApexClassJson={setApexClassJson}
                isLoading={isLoading}
              />
              {idx + 1 !== length && (
                <DividerWithCenteredText className={"m-4"} />
              )}
            </div>
          ))}
      </Col>
    );
  };
  return (
    <div className={"mt-4"}>
      <Row>
        {originalApexClassEditView()}
        {modifiedApexClassEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardApexClassJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  // comparisonFileModel: PropTypes.object,
  // setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedApexClassJson: PropTypes.array,
  originalApexClassJson: PropTypes.array,
  modifiedContentJson: PropTypes.object,
  originalContentJson: PropTypes.object,
  setModifiedContentJson: PropTypes.func,
  setOriginalContentJson: PropTypes.func,
};

export default MergeSyncTaskWizardApexClassJsonEditPanel;
