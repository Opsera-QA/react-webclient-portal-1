import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./profile_editor_views/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import CustomMetadataProfileEditorView from "./profile_editor_views/CustomMetadataProfileEditorView";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CustomPermissionsProfileEditorView from "./profile_editor_views/CustomPermissionsProfileEditorView";
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import InlineWarning from "../../../../../../../../../common/status_notifications/inline/InlineWarning";
import StandaloneSaveButton from "../../../../../../../../../common/buttons/saving/StandaloneSaveButton";

const MergeSyncTaskWizardCustomPermissionsJsonEditPanel = ({
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
  const [searchText, setSearchText] = useState("");
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] = useState(false);

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
        "CustomPermission",
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
  const saveModifiedContent = async () => {
    try {
      const response = await mergeSyncTaskWizardActions.saveComponentConvertViewJson(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
        fileName,
        modifiedContentJson,
        "CustomPermission",
      );
      console.log(response);
      if(response && response.status === 200){
        setShowUnsavedChangesMessage(false);
        return;
      }
      return;
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return <InlineWarning warningMessage={"You must hit save before changes will take effect"} />;
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
  const setCustomPermissionJson = (modifiedValue) => {
    setShowUnsavedChangesMessage(true);
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.customPermissions.find(
      (customPermissionsData) =>
        customPermissionsData.name === modifiedValue.name,
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
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.customPermissions
            ?.filter((obj) => {
              return obj?.name
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((customPermissionsData, idx, { length }) => (
              <div key={idx}>
                <CustomPermissionsProfileEditorView
                  customPermissionsData={customPermissionsData}
                  setCustomPermissionJson={setCustomPermissionJson}
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
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.customPermissions
            ?.filter((obj) => {
              return obj?.name
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((customPermissionsData, idx, { length }) => (
              <div key={idx}>
                <CustomPermissionsProfileEditorView
                  customPermissionsData={customPermissionsData}
                  setCustomPermissionJson={setCustomPermissionJson}
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
    <div>
      <Row className={"ml-2"}>{getWarningMessage()}</Row>
      <Row>
        {getButtonContainer()}
      </Row>
      <Row>
        {originalCustomMetaEditView()}
        {modifiedCustomMetaEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCustomPermissionsJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardCustomPermissionsJsonEditPanel;
