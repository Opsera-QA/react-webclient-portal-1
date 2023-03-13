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
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import InlineWarning from "../../../../../../../../../common/status_notifications/inline/InlineWarning";
import StandaloneSaveButton from "../../../../../../../../../common/buttons/saving/StandaloneSaveButton";
import { getUniqueListBy } from "../../../../../../../../../common/helpers/array-helpers";
import ToolNameFieldDisplayer from "../../../../../../../../../common/fields/inventory/name/ToolNameFieldDisplayer";

const MergeSyncTaskWizardCustomApplicationJsonEditPanel = ({
  wizardModel,
  setWizardModel,
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
  const [searchText, setSearchText] = useState("");
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] =
    useState(false);

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
        //   "CustomApplication",
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

  const saveModifiedContent = async () => {
    try {
      const modifiedFileContent = {"applicationVisibilities": [...modifiedContentJson?.applicationVisibilities]};
      const response =
        await mergeSyncTaskWizardActions.saveComponentConvertViewJson(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          modifiedFileContent,
          "CustomApplication",
        );
      console.log(response);
      if (response && response.status !== 200) {
        toastContext.showLoadingErrorDialog(response?.data?.message);
        return;
      }

      const newWizardModel = { ...wizardModel };
      let newFileList = newWizardModel.getData("updatedFileList");
      newFileList.push({ fileName: fileName });
      newWizardModel?.setData(
        "updatedFileList",
        getUniqueListBy(newFileList, "fileName"),
      );
      setWizardModel({ ...newWizardModel });
      setShowUnsavedChangesMessage(false);
      return;
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return (
        <InlineWarning
          warningMessage={"You must hit save before changes will take effect"}
        />
      );
    }
  };

  const getButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-4">
        <div></div>
        <div>{getSearchBar()}</div>
        <div>
          <StandaloneSaveButton
            saveFunction={saveModifiedContent}
            type={"Profile"}
            showToasts={false}
            disable={!showUnsavedChangesMessage}
          />
        </div>
      </div>
    );
  };
  const updateSearchText = (value) => {
    setSearchText(value);
  };
  const getSearchBar = () => {
    return (
      <div className="membership-search d-flex mx-auto">
        <IconBase
          icon={faSearch}
          iconClassName={"mr-2 opsera-dark-purple h-100"}
        />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control"
          onChange={(event) => updateSearchText(event.target.value)}
        />
      </div>
    );
  };

  const setCustomAppJson = (modifiedValue) => {
    setShowUnsavedChangesMessage(true);
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
        <span className="h5">
          Source Profiles (
          <ToolNameFieldDisplayer
            toolId={wizardModel?.getData("sfdcToolId")}
            loadToolInNewWindow={true}
          />
          )
        </span>
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.applicationVisibilities
            ?.filter((obj) => {
              return obj?.application
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((customApp, idx, { length }) => (
              <div key={idx}>
                <CustomApplicationProfileEditorView
                  customAppData={customApp}
                  setCustomAppJson={setCustomAppJson}
                  isLoading={isLoading}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText />
                )}
              </div>
            ))}
      </Col>
    );
  };

  const originalAppVisibilityEditView = () => {
    return (
      <Col>
        <span className="h5">Target Branch ({wizardModel?.getData("targetBranch")})</span>
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.applicationVisibilities
            ?.filter((obj) => {
              return obj?.application
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((customApp, idx, { length }) => (
              <div key={idx}>
                <CustomApplicationProfileEditorView
                  customAppData={customApp}
                  setCustomAppJson={setCustomAppJson}
                  isLoading={isLoading}
                  disabled={true}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText />
                )}
              </div>
            ))}
      </Col>
    );
  };

  return (
    <div>
      <Row className={"ml-2"}>{getWarningMessage()}</Row>
      <Row>{getButtonContainer()}</Row>
      <Row>
        {originalAppVisibilityEditView()}
        {modifiedAppVisibilityEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCustomApplicationJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardCustomApplicationJsonEditPanel;
