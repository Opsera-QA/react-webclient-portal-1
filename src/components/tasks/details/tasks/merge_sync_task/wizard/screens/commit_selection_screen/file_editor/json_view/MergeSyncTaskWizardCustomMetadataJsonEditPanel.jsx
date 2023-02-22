import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./profile_editor_views/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import CustomMetadataProfileEditorView from "./profile_editor_views/CustomMetadataProfileEditorView";

const MergeSyncTaskWizardCustomMetadataJsonEditPanel = ({
  wizardModel,
  // comparisonFileModel,
  // setComparisonFileModel,
  modifiedCustomMetaJson,
  originalCustomMetaJson,
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
  const setCustomMetaJson = (modifiedValue) => {
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.customMetadataTypeAccesses.find(
      (apexClassItem) => apexClassItem.name === modifiedValue.name,
    );
    if (modifiedItem) {
      modifiedItem.enabled = modifiedValue.enabled;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {modifiedCustomMetaJson &&
          modifiedCustomMetaJson.map((customMetaData, idx, { length }) => (
            <div key={idx}>
              <CustomMetadataProfileEditorView
                customMetadataData={customMetaData}
                setCustomMetaJson={setCustomMetaJson}
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

  const originalCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalCustomMetaJson &&
          originalCustomMetaJson.map((customMetaData, idx, { length }) => (
            <div key={idx}>
              <CustomMetadataProfileEditorView
                customMetadataData={customMetaData}
                setCustomMetaJson={setCustomMetaJson}
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
        {originalCustomMetaEditView()}
        {modifiedCustomMetaEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCustomMetadataJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  // comparisonFileModel: PropTypes.object,
  // setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedCustomMetaJson: PropTypes.array,
  originalCustomMetaJson: PropTypes.array,
  modifiedContentJson: PropTypes.object,
  originalContentJson: PropTypes.object,
  setModifiedContentJson: PropTypes.func,
  setOriginalContentJson: PropTypes.func,
};

export default MergeSyncTaskWizardCustomMetadataJsonEditPanel;
