import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalDataSourceProfileEditorView from "./profile_editor_views/ExternalDataSourceProfileEditorView";
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import InlineWarning from "../../../../../../../../../common/status_notifications/inline/InlineWarning";
import StandaloneSaveButton from "../../../../../../../../../common/buttons/saving/StandaloneSaveButton";
import { getUniqueListBy } from "../../../../../../../../../common/helpers/array-helpers";
import ToolNameFieldDisplayer from "../../../../../../../../../common/fields/inventory/name/ToolNameFieldDisplayer";
import MergeSyncTaskWizardProfileSubmitFileButton from "../MergeSyncTaskWizardProfileSubmitFileButton";

const MergeSyncTaskWizardExternalDataSourceJsonEditPanel = ({
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

      const jsonContent =
        await mergeSyncTaskWizardActions.componentTypeConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          "ExternalDataSource",
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
        message={"Fetching Permissions"}
      />
    );
  }
  const saveModifiedContent = async () => {
    try {
      const modifiedFileContent = {
        externalDataSourceAccesses: [
          ...modifiedContentJson?.externalDataSourceAccesses,
        ],
      };
      const response =
        await mergeSyncTaskWizardActions.saveComponentConvertViewJson(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          modifiedFileContent,
          "ExternalDataSource",
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
        <Col sm={3}></Col>
        <Col
          sm={6}
          className="col-xs-12 col-sm-5"
        >
          {getSearchBar()}
        </Col>
        <Col sm={3}>
          <MergeSyncTaskWizardProfileSubmitFileButton
            saveFunction={saveModifiedContent}
            type={"Profile"}
            showToasts={false}
            disable={!showUnsavedChangesMessage}
          />
        </Col>
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
  const setExternalSourceDataJson = (modifiedValue) => {
    setShowUnsavedChangesMessage(true);
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.externalDataSourceAccesses.find(
      (externalDataSourceData) =>
        externalDataSourceData.externalDataSource ===
        modifiedValue.externalDataSource,
    );
    if (modifiedItem) {
      modifiedItem.enabled = modifiedValue.enabled;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedCustomMetaEditView = () => {
    let filteredData =
      modifiedContentJson &&
      Object.keys(modifiedContentJson).length > 0 &&
      modifiedContentJson?.externalDataSourceAccesses?.filter((obj) => {
        return obj?.externalDataSource
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
      });
    return (
      <Col>
        <span className="h5">
          Source Salesforce Org (
          <ToolNameFieldDisplayer
            toolId={wizardModel?.getData("sfdcToolId")}
            loadToolInNewWindow={true}
          />
          )
        </span>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((externalDataSourceData, idx, { length }) => (
            <div key={idx}>
              <ExternalDataSourceProfileEditorView
                externalDataSourceData={externalDataSourceData}
                setExternalSourceDataJson={setExternalSourceDataJson}
                isLoading={isLoading}
              />
              {idx + 1 !== length && <DividerWithCenteredText />}
            </div>
          ))
        ) : (
          <small className={"text-muted form-text mt-4"}>
            <div>No permissions available for the selected Metadata Type</div>
          </small>
        )}
      </Col>
    );
  };

  const originalCustomMetaEditView = () => {
    let filteredData =
      originalContentJson &&
      Object.keys(originalContentJson).length > 0 &&
      originalContentJson?.externalDataSourceAccesses?.filter((obj) => {
        return obj?.externalDataSource
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
      });
    return (
      <Col>
        <span className="h5">
          Target Git Branch ({wizardModel?.getData("targetBranch")})
        </span>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((externalDataSourceData, idx, { length }) => (
            <div key={idx}>
              <ExternalDataSourceProfileEditorView
                externalDataSourceData={externalDataSourceData}
                setExternalSourceDataJson={setExternalSourceDataJson}
                isLoading={isLoading}
                disabled={true}
              />
              {idx + 1 !== length && <DividerWithCenteredText />}
            </div>
          ))
        ) : (
          <small className={"text-muted form-text mt-4"}>
            <div>No permissions available for the selected Metadata Type</div>
          </small>
        )}
      </Col>
    );
  };
  return (
    <div>
      {/*<Row className={"ml-2"}>{getWarningMessage()}</Row>*/}
      <Row
        style={{ backgroundColor: "white" }}
        className={"sticky-top"}
      >
        {getButtonContainer()}
      </Row>
      <Row>
        {originalCustomMetaEditView()}
        {modifiedCustomMetaEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardExternalDataSourceJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardExternalDataSourceJsonEditPanel;
