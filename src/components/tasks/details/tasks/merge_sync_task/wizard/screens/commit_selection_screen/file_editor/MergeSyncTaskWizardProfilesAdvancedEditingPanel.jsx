import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "../../../../../../../../common/model/modelHelpers";
import { comparisonFileMetadata } from "../comparisonFile.metadata";
import { jsonViewFileMetadata } from "../jsonViewFile.metadata";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";
import MergeSyncTaskWizardApexClassJsonEditPanel from "./json_view/MergeSyncTaskWizardApexClassJsonEditPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import MergeSyncTaskWizardCustomApplicationJsonEditPanel
  from "./json_view/MergeSyncTaskWizardCustomApplicationJsonEditPanel";

const componentTypeOptions =[
  {name: "CustomApplication", value: "applicationVisibilities"},
  {name: "DataCategoryGroup", value: "categoryGroupVisibilities"},
  {name: "ApexClass", value: "classAccesses"},
  {name: "CustomMetadata", value: "customMetadataTypeAccesses"},
  {name: "CustomPermission", value: "customPermissions"},
  {name: "CustomSetting (CustomObject)", value: "customSettingAccesses"},
  {name: "ExternalDataSource", value: "externalDataSourceAccesses"},
  {name: "CustomField", value: "fieldPermissions"},
  {name: "Flow", value: "flowAccesses"},
  {name: "Layout", value: "layoutAssignments"},
  {name: "CustomObject/ArticleType", value: "objectPermissions"},
  {name: "ApexPage", value: "pageAccesses"},
  {name: "RecordType", value: "recordTypeVisibilities"},
  {name: "CustomTab", value: "tabVisibilities"},
];

const MergeSyncTaskWizardProfilesAdvancedEditingPanel = (
  {
    wizardModel,
    comparisonFileModel,
    setComparisonFileModel,
    originalContent,
    modifiedContent,
    isLoading
  }) => {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const [modifiedContentJson, setModifiedContentJson] = useState(undefined);
  const [originalContentJson, setOriginalContentJson] = useState(undefined);
  const [jsonViewModel, setJsonViewModel] = useState(undefined);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {

    // if (hasStringValue(originalContent) && hasStringValue(modifiedContent) ) {
      loadJsonData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    // }
  }, [originalContent, modifiedContent]);

  const loadJsonData = async () => {
    try {
      setIsJsonLoading(true);
      // TODO : Convert both original and modified contents to JSON

      if(hasStringValue(originalContent)){
        const jsonForOriginalContent = await mergeSyncTaskWizardActions.fileConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          originalContent,
        );
        console.log(jsonForOriginalContent);
        setOriginalContentJson(DataParsingHelper.safeObjectPropertyParser(jsonForOriginalContent, "data.message"));
      }

      if(hasStringValue(modifiedContent)) {
        const jsonForModifiedContent = await mergeSyncTaskWizardActions.fileConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          modifiedContent,
        );
        console.log(jsonForModifiedContent);
        setModifiedContentJson(DataParsingHelper.safeObjectPropertyParser(jsonForModifiedContent, "data.message"));
      }

      if (isMounted?.current === true) {
        const newJsonView = modelHelpers.parseObjectIntoModel(
          {},
          jsonViewFileMetadata,
        );
        setJsonViewModel(newJsonView);
      }

    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsJsonLoading(false);
      }
    }
  };

  const getJsonDiffView = () => {
    switch (jsonViewModel?.getData("componentType")) {
      case "applicationVisibilities":
        return (
          <MergeSyncTaskWizardCustomApplicationJsonEditPanel
            modifiedCustomAppJson={modifiedContentJson?.applicationVisibilities}
            originalCustomAppJson={originalContentJson?.applicationVisibilities}
            modifiedContentJson={modifiedContentJson}
            originalContentJson={originalContentJson}
            setModifiedContentJson={setModifiedContentJson}
            setOriginalContentJson={setOriginalContentJson}
          />
        );
      case "categoryGroupVisibilities":
        return <>categoryGroupVisibilities</>;
      case "classAccesses":
        return (
          <MergeSyncTaskWizardApexClassJsonEditPanel
            wizardModel={wizardModel}
            // comparisonFileModel={comparisonFileModel}
            // setComparisonFileModel={setComparisonFileModel}
            modifiedApexClassJson={modifiedContentJson?.classAccesses}
            originalApexClassJson={originalContentJson?.classAccesses}
            modifiedContentJson={modifiedContentJson}
            originalContentJson={originalContentJson}
            setModifiedContentJson={setModifiedContentJson}
            setOriginalContentJson={setOriginalContentJson}
          />
        );
      case "customMetadataTypeAccesses":
        return <>customMetadataTypeAccesses</>;
      case "customPermissions":
        return <>customPermissions</>;
      case "customSettingAccesses":
        return <>customSettingAccesses</>;
      case "externalDataSourceAccesses":
        return <>externalDataSourceAccesses</>;
      case "fieldPermissions":
        return <>fieldPermissions</>;
      case "flowAccesses":
        return <>flowAccesses</>;
      case "layoutAssignments":
        return <>layoutAssignments</>;
      case "objectPermissions":
        return <>objectPermissions</>;
      case "pageAccesses":
        return <>pageAccesses</>;
      case "recordTypeVisibilities":
        return <>recordTypeVisibilities</>;
      case "tabVisibilities":
        return <>tabVisibilities</>;

      default:
        return <>Please select a component type</>;
    }
  };

  if (isJsonLoading || isLoading) {
    return (<LoadingDialog size={"sm"} message={"Conversion in progress"} />);
  }

    return (
      // TODO : Create a new view for json selections
      <div className={"m-2"}>
        <SelectInputBase
          fieldName={"componentType"}
          selectOptions={componentTypeOptions}
          dataObject={jsonViewModel}
          setDataObject={setJsonViewModel}
          valueField={"value"}
          textField={"name"}
          busy={isJsonLoading || isLoading}
          placeholderText={"Select Component Type"}
        />
        {getJsonDiffView()}
      </div>
  );
};

MergeSyncTaskWizardProfilesAdvancedEditingPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  originalContent: PropTypes.string,
  modifiedContent: PropTypes.string,
};

export default MergeSyncTaskWizardProfilesAdvancedEditingPanel;