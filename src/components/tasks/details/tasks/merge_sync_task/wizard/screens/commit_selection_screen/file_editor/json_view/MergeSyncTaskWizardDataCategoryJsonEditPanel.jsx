import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataCategoryProfileEditorView from "./profile_editor_views/DataCategoryProfileEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";

const MergeSyncTaskWizardDataCategoryJsonEditPanel = ({
  wizardModel,
  // comparisonFileModel,
  // setComparisonFileModel,
  modifiedDataCategoryJson,
  originalDataCategoryJson,
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
  const setDataCategoryJson = (modifiedValue) => {
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.categoryGroupVisibilities.find(
      (groupVisibility) =>
        groupVisibility.dataCategoryGroup === modifiedValue.dataCategoryGroup,
    );
    if (modifiedItem) {
      modifiedItem.visibility = modifiedValue.visibility;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedDataCategoryEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {modifiedDataCategoryJson &&
          modifiedDataCategoryJson.map((dataCategory, idx, { length }) => (
            <div key={idx}>
              <DataCategoryProfileEditorView
                dataCategory={dataCategory}
                setDataCategoryJson={setDataCategoryJson}
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

  const originalDataCategoryEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalDataCategoryJson &&
          originalDataCategoryJson.map((dataCategory, idx, { length }) => (
            <div key={idx}>
              <DataCategoryProfileEditorView
                dataCategory={dataCategory}
                setDataCategoryJson={setDataCategoryJson}
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
        {originalDataCategoryEditView()}
        {modifiedDataCategoryEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardDataCategoryJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  // comparisonFileModel: PropTypes.object,
  // setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedDataCategoryJson: PropTypes.array,
  originalDataCategoryJson: PropTypes.array,
  modifiedContentJson: PropTypes.object,
  originalContentJson: PropTypes.object,
  setModifiedContentJson: PropTypes.func,
  setOriginalContentJson: PropTypes.func,
};

export default MergeSyncTaskWizardDataCategoryJsonEditPanel;
