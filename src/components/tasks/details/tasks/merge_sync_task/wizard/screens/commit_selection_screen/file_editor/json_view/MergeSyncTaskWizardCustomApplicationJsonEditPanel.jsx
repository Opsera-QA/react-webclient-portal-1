import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./profile_editor_views/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import CustomApplicationProfleEditorView from "./profile_editor_views/CustomApplicationProfleEditorView";

const MergeSyncTaskWizardCustomApplicationJsonEditPanel = ({
  wizardModel,
  // comparisonFileModel,
  // setComparisonFileModel,
  modifiedCustomAppJson,
  originalCustomAppJson,
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
  const setCustomAppJson = (modifiedValue) => {
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.applicationVisibilities.find(
      (appVisibility) =>
        appVisibility.application === modifiedValue.application,
    );
    if (modifiedItem) {
      modifiedItem.default = modifiedValue.default;
      modifiedItem.visible = modifiedValue.visible;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedAppVisibilityEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {modifiedCustomAppJson &&
          modifiedCustomAppJson.map((customApp, idx, { length }) => (
            <div key={idx}>
              <CustomApplicationProfleEditorView
                customAppData={customApp}
                setCustomAppJson={setCustomAppJson}
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

  const originalAppVisibilityEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalCustomAppJson &&
          originalCustomAppJson.map((customApp, idx, { length }) => (
            <div key={idx}>
              <CustomApplicationProfleEditorView
                customAppData={customApp}
                setCustomAppJson={setCustomAppJson}
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
        {originalAppVisibilityEditView()}
        {modifiedAppVisibilityEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCustomApplicationJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  // comparisonFileModel: PropTypes.object,
  // setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedCustomAppJson: PropTypes.array,
  originalCustomAppJson: PropTypes.array,
  modifiedContentJson: PropTypes.object,
  originalContentJson: PropTypes.object,
  setModifiedContentJson: PropTypes.func,
  setOriginalContentJson: PropTypes.func,
};

export default MergeSyncTaskWizardCustomApplicationJsonEditPanel;
