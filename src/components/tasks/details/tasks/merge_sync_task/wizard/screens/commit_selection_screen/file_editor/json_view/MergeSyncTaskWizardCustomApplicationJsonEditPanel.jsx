import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import CustomApplicationProfileEditorView from "./profile_editor_views/CustomApplicationProfileEditorView";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const MergeSyncTaskWizardCustomApplicationJsonEditPanel = ({
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

      const jsonContent =
        await mergeSyncTaskWizardActions.componentTypeConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          "CustomApplication",
        );

      if (isMounted?.current === true) {
        setModifiedContentJson(
          JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.sourceContent",
            ),
          ),
        );
        setOriginalContentJson(
          JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.destinationContent",
            ),
          ),
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

  const setCustomAppJson = (modifiedValue) => {
    console.log(modifiedValue);
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
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.applicationVisibilities?.map(
            (customApp, idx, { length }) => (
              <div key={idx}>
                <CustomApplicationProfileEditorView
                  customAppData={customApp}
                  setCustomAppJson={setCustomAppJson}
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

  const originalAppVisibilityEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.applicationVisibilities?.map(
            (customApp, idx, { length }) => (
              <div key={idx}>
                <CustomApplicationProfileEditorView
                  customAppData={customApp}
                  setCustomAppJson={setCustomAppJson}
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
        {originalAppVisibilityEditView()}
        {modifiedAppVisibilityEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCustomApplicationJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardCustomApplicationJsonEditPanel;
