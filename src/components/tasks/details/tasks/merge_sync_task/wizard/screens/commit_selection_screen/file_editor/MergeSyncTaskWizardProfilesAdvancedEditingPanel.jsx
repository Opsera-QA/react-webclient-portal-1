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
import MergeSyncTaskWizardDataCategoryJsonEditPanel from "./json_view/MergeSyncTaskWizardDataCategoryJsonEditPanel";
import CustomMetadataProfileEditorView from "./json_view/profile_editor_views/CustomMetadataProfileEditorView";
import MergeSyncTaskWizardCustomMetadataJsonEditPanel from "./json_view/MergeSyncTaskWizardCustomMetadataJsonEditPanel";

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

      // if(hasStringValue(originalContent)){
      //   const jsonForOriginalContent = await mergeSyncTaskWizardActions.fileConvertView(
      //     getAccessToken,
      //     cancelTokenSource,
      //     wizardModel,
      //     originalContent,
      //   );
      //   console.log(jsonForOriginalContent);
      //   setOriginalContentJson(DataParsingHelper.safeObjectPropertyParser(jsonForOriginalContent, "data.message"));
      // }
      //
      // if(hasStringValue(modifiedContent)) {
      //   const jsonForModifiedContent = await mergeSyncTaskWizardActions.fileConvertView(
      //     getAccessToken,
      //     cancelTokenSource,
      //     wizardModel,
      //     modifiedContent,
      //   );
      //   console.log(jsonForModifiedContent);
      //   setModifiedContentJson(DataParsingHelper.safeObjectPropertyParser(jsonForModifiedContent, "data.message"));
      // }

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

  const mockData = {
    "applicationVisibilities": [{
      "application": "new__Content",
      "default": "false",
      "visible": "true"
    },
      {
        "application": "new__Content1",
        "default": "false",
        "visible": "true"
      },
      {
        "application": "new__Content2",
        "default": "false",
        "visible": "true"
      },{
        "application": "new__Content3",
        "default": "false",
        "visible": "true"
      },{
        "application": "new__Content4",
        "default": "false",
        "visible": "true"
      }],
    "categoryGroupVisibilities": [{
      "dataCategoryGroup": "new_User_Roles",
      "visibility": "ALL"
    },
      {
        "dataCategoryGroup": "new_User_Roles1",
        "visibility": "NONE"
      },
      {
        "dataCategoryGroup": "new_User_Roles2",
        "visibility": "ALL"
      },
      {
        "dataCategoryGroup": "new_User_Roles3",
        "visibility": "CUSTOM"
      },{
        "dataCategoryGroup": "new_User_Roles4",
        "visibility": "ALL"
      }],
    "classAccesses": [{
      "apexClass": "newcreatePartnerLibraryTest",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTest1",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTest2",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTest3",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTes4t",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTest5",
      "enabled": "false"
    },{
      "apexClass": "newcreatePartnerLibraryTest6",
      "enabled": "false"
    }],
    "customMetadataTypeAccesses": [{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt"
    },{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt1"
    },{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt2"
    },{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt3"
    },{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt4"
    },{
      "enabled": "true",
      "name": "Nokia_CPQ_Maintenance_new__mdt5"
    }],
    "customPermissions": [{
      "enabled": "true",
      "name": "ZZZSWX_CCRE_Proposal_Manager"
    },{
      "enabled": "true",
      "name": "ZZZSWX_CCRE_Proposal_Manager1"
    },{
      "enabled": "true",
      "name": "ZZZSWX_CCRE_Proposal_Manager2"
    },{
      "enabled": "true",
      "name": "ZZZSWX_CCRE_Proposal_Manager3"
    }],
    "customSettingAccesses": [{
      "enabled": "true",
      "name": "1Account_Market__c"
    },{
      "enabled": "true",
      "name": "1Account_Market__c1"
    },{
      "enabled": "true",
      "name": "1Account_Market__c2"
    },{
      "enabled": "true",
      "name": "1Account_Market__c3"
    },{
      "enabled": "true",
      "name": "1Account_Market__c4"
    }],
    "externalDataSourceAccesses": [{
      "enabled": "true",
      "externalDataSource": "XYZQuip"
    },{
      "enabled": "true",
      "externalDataSource": "XYZQuip1"
    },{
      "enabled": "true",
      "externalDataSource": "XYZQuip2"
    },{
      "enabled": "true",
      "externalDataSource": "XYZQuip3"
    },{
      "enabled": "true",
      "externalDataSource": "XYZQuip4"
    }],
    "fieldPermissions": [{
      "editable": "false",
      "field": "Case.LE_GEOLevel2Name__c",
      "readable": "false"
    },{
      "editable": "false",
      "field": "Case.LE_GEOLevel2Name__c1",
      "readable": "false"
    },{
      "editable": "false",
      "field": "Case.LE_GEOLevel2Name__c2",
      "readable": "false"
    },{
      "editable": "false",
      "field": "Case.LE_GEOLevel2Name__c3",
      "readable": "false"
    },{
      "editable": "false",
      "field": "Case.LE_GEOLevel2Name__c4",
      "readable": "false"
    }],
    "layoutAssignments": [{
      "layout": "Accreditation__c-Accreditation 1 Layout",
      "recordType": "Accreditation__c.Distributor_GPP_0_0"
    },{
      "layout": "Accreditation__c-Accreditation 1 Layout1",
      "recordType": "Accreditation__c.Distributor_GPP_0_0"
    },{
      "layout": "Accreditation__c-Accreditation 1 Layout2",
      "recordType": "Accreditation__c.Distributor_GPP_0_0"
    },{
      "layout": "Accreditation__c-Accreditation 1 Layout3",
      "recordType": "Accreditation__c.Distributor_GPP_0_0"
    },{
      "layout": "Accreditation__c-Accreditation 1 Layout4",
      "recordType": "Accreditation__c.Distributor_GPP_0_0"
    }],
    "objectPermissions": [{
      "allowCreate": "false",
      "allowDelete": "false",
      "allowEdit": "false",
      "allowRead": "true",
      "modifyAllRecords": "false",
      "object": "NewAbs_Role_History__c1",
      "viewAllRecords": "false"
    },{
      "allowCreate": "false",
      "allowDelete": "false",
      "allowEdit": "false",
      "allowRead": "true",
      "modifyAllRecords": "false",
      "object": "NewAbs_Role_History__c2",
      "viewAllRecords": "false"
    },{
      "allowCreate": "false",
      "allowDelete": "false",
      "allowEdit": "false",
      "allowRead": "true",
      "modifyAllRecords": "false",
      "object": "NewAbs_Role_History__c3",
      "viewAllRecords": "false"
    },{
      "allowCreate": "false",
      "allowDelete": "false",
      "allowEdit": "false",
      "allowRead": "true",
      "modifyAllRecords": "false",
      "object": "NewAbs_Role_History__c4",
      "viewAllRecords": "false"
    },{
      "allowCreate": "false",
      "allowDelete": "false",
      "allowEdit": "false",
      "allowRead": "true",
      "modifyAllRecords": "false",
      "object": "NewAbs_Role_History__c5",
      "viewAllRecords": "false"
    }],
    "pageAccesses": [{
      "apexPage": "ABCCustomMetadataLoader",
      "enabled": "false"
    },{
      "apexPage": "ABCCustomMetadataLoader1",
      "enabled": "false"
    },{
      "apexPage": "ABCCustomMetadataLoader2",
      "enabled": "false"
    },{
      "apexPage": "ABCCustomMetadataLoader3",
      "enabled": "false"
    },{
      "apexPage": "ABCCustomMetadataLoader4",
      "enabled": "false"
    },{
      "apexPage": "ABCCustomMetadataLoader5",
      "enabled": "false"
    }],
    "recordTypeVisibilities": [{
      "default": "false",
      "recordType": "ZZSurround_CQ_Reporting__c.Surround_CQ_Reporting_Record_Type",
      "visible": "false"
    },{
      "default": "false",
      "recordType": "ZZSurround_CQ_Reporting__c.Surround_CQ_Reporting_Record_Type1",
      "visible": "false"
    },{
      "default": "false",
      "recordType": "ZZSurround_CQ_Reporting__c.Surround_CQ_Reporting_Record_Type2",
      "visible": "false"
    },{
      "default": "false",
      "recordType": "ZZSurround_CQ_Reporting__c.Surround_CQ_Reporting_Record_Type3",
      "visible": "false"
    },{
      "default": "false",
      "recordType": "ZZSurround_CQ_Reporting__c.Surround_CQ_Reporting_Record_Type4",
      "visible": "false"
    }],
    "tabVisibilities": [{
      "tab": "NewUser_Story__c",
      "visibility": "Hidden"
    },{
      "tab": "NewUser_Story__c1",
      "visibility": "Hidden"
    },{
      "tab": "NewUser_Story__c2",
      "visibility": "Hidden"
    },{
      "tab": "NewUser_Story__c3",
      "visibility": "Hidden"
    },{
      "tab": "NewUser_Story__c4",
      "visibility": "Hidden"
    },{
      "tab": "NewUser_Story__c5",
      "visibility": "Hidden"
    }]
  };

  const getJsonDiffView = () => {
    switch (jsonViewModel?.getData("componentType")) {
      case "applicationVisibilities":
        return (
          <MergeSyncTaskWizardCustomApplicationJsonEditPanel
            wizardModel={wizardModel}
            comparisonFileModel={comparisonFileModel}
            setComparisonFileModel={setComparisonFileModel}
            fileName ={comparisonFileModel?.getData("file")}
          />
        );
      case "categoryGroupVisibilities":
        return (
          <MergeSyncTaskWizardDataCategoryJsonEditPanel
            wizardModel={wizardModel}
            comparisonFileModel={comparisonFileModel}
            setComparisonFileModel={setComparisonFileModel}
            fileName ={comparisonFileModel?.getData("file")}
          />
        );
      case "classAccesses":
        return (
          <MergeSyncTaskWizardApexClassJsonEditPanel
            wizardModel={wizardModel}
            comparisonFileModel={comparisonFileModel}
            setComparisonFileModel={setComparisonFileModel}
            fileName ={comparisonFileModel?.getData("file")}
          />
        );
      case "customMetadataTypeAccesses":
        return (
          <MergeSyncTaskWizardCustomMetadataJsonEditPanel
            wizardModel={wizardModel}
            comparisonFileModel={comparisonFileModel}
            setComparisonFileModel={setComparisonFileModel}
            fileName ={comparisonFileModel?.getData("file")}
          />
        );
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
      <div className={"justify-content-md-center"}>
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