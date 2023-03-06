import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataCategoryProfileEditorView from "./profile_editor_views/DataCategoryProfileEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";

const MergeSyncTaskWizardDataCategoryJsonEditPanel = ({
  wizardModel,
  comparisonFileModel,
  setComparisonFileModel,
  fileName,
  isLoading,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  const [modifiedContentJson, setModifiedContentJson] = useState(undefined);
  const [originalContentJson, setOriginalContentJson] = useState(undefined);

  useEffect(() => {
    if (hasStringValue(fileName)) {
      loadJsonData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [fileName]);

  const loadJsonData = async () => {
    try {
      setIsJsonLoading(true);
      // TODO : Convert both original and modified contents to JSON

      const jsonContent = mockData;
        // await mergeSyncTaskWizardActions.componentTypeConvertView(
        //   getAccessToken,
        //   cancelTokenSource,
        //   wizardModel,
        //   fileName,
        //   "DataCategoryGroup",
        // );

      if (isMounted?.current === true) {
        setModifiedContentJson(
          // JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.sourceContent",
            ),
          // ),
        );
        setOriginalContentJson(
          // JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.destinationContent",
            ),
          // ),
        );
      }
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsJsonLoading(false);
      }
    }
  };

  if (isJsonLoading || isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Conversion in progress"}
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
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.categoryGroupVisibilities?.map(
            (dataCategory, idx, { length }) => (
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
            ),
          )}
      </Col>
    );
  };

  const originalDataCategoryEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.categoryGroupVisibilities?.map(
            (dataCategory, idx, { length }) => (
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
            ),
          )}
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
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardDataCategoryJsonEditPanel;
