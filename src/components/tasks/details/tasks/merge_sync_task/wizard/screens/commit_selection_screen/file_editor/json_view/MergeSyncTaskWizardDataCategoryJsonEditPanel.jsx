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
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import InlineWarning from "../../../../../../../../../common/status_notifications/inline/InlineWarning";
import StandaloneSaveButton from "../../../../../../../../../common/buttons/saving/StandaloneSaveButton";
import { getUniqueListBy } from "../../../../../../../../../common/helpers/array-helpers";
import ToolNameFieldDisplayer from "../../../../../../../../../common/fields/inventory/name/ToolNameFieldDisplayer";
import MergeSyncTaskWizardProfileSubmitFileButton from "../MergeSyncTaskWizardProfileSubmitFileButton";

const MergeSyncTaskWizardDataCategoryJsonEditPanel = ({
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
          "DataCategoryGroup",
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
        categoryGroupVisibilities: [
          ...modifiedContentJson?.categoryGroupVisibilities,
        ],
      };
      const response =
        await mergeSyncTaskWizardActions.saveComponentConvertViewJson(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          modifiedFileContent,
          "DataCategoryGroup",
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
  const setDataCategoryJson = (modifiedValue) => {
    setShowUnsavedChangesMessage(true);
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
    let filteredData =
      modifiedContentJson &&
      Object.keys(modifiedContentJson).length > 0 &&
      modifiedContentJson?.categoryGroupVisibilities?.filter((obj) => {
        return obj?.dataCategoryGroup
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
          filteredData.map((dataCategory, idx, { length }) => (
            <div key={idx}>
              <DataCategoryProfileEditorView
                dataCategory={dataCategory}
                setDataCategoryJson={setDataCategoryJson}
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

  const originalDataCategoryEditView = () => {
    let filteredData =
      originalContentJson &&
      Object.keys(originalContentJson).length > 0 &&
      originalContentJson?.categoryGroupVisibilities?.filter((obj) => {
        return obj?.dataCategoryGroup
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
      });
    return (
      <Col>
        <span className="h5">
          Target Git Branch ({wizardModel?.getData("targetBranch")})
        </span>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((dataCategory, idx, { length }) => (
            <div key={idx}>
              <DataCategoryProfileEditorView
                dataCategory={dataCategory}
                setDataCategoryJson={setDataCategoryJson}
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
        {originalDataCategoryEditView()}
        {modifiedDataCategoryEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardDataCategoryJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardDataCategoryJsonEditPanel;
