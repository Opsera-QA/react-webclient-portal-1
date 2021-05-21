import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faCode,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import "components/workflow/workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import Model from "core/data_model/model";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import SfdcModifiedFilesTabView from "components/workflow/wizards/sfdc_pipeline_wizard/tab_views/SfdcModifiedFilesTabView";
import GitModifiedFilesTabView from "components/workflow/wizards/sfdc_pipeline_wizard/tab_views/GitModifiedFilesTabView";
import SfdcProfileSelectionView from "components/workflow/wizards/sfdc_pipeline_wizard/tab_views/SfdcProfileSelectionView";
import CancelButton from "components/common/buttons/CancelButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcRulesInputContainer from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRulesInputContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineWizardHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/PipelineWizardHelpDocumentation";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";

// TODO: All of these steps should be broken up into separate versions based on whether it's a git task/pipeline run/etc.
//  It'll be too difficult to maintain if we keep adding onto it like this.
//  This will be easier to fix after the entire wizard is refactored.
const SfdcPipelineModifiedFiles = ({
  pipelineId,
  stepId,
  handleClose,
  setView,
  isProfiles,
  isOrgToOrg,
  fromSFDC,
  fromGit,
  fromDestinationSFDC,
  setFromSFDC,
  setFromGit,
  setFromDestinationSFDC,
  selectedComponentTypes,
  recordId,
  setRecordId,
  unitTestSteps,
  selectedComp,
  gitTaskData,
  gitTaskId,
  modifiedFilesRuleList,
  setModifiedFilesRuleList,
  activeTab,
  setActiveTab
}) => {
  const { getAccessToken, featureFlagHideItemInProd } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [componentType, setComponentType] = useState([]);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);
  
  const loadData = async () => {
    setLoading(true);
    let componentTypesArr = [];
    let uniqueComponentTypes = isProfiles ? [...new Set(selectedComp.map(item => item))] : [...new Set(selectedComponentTypes.map(item => item))];
    uniqueComponentTypes.map(item => componentTypesArr.push({"text": item, "value": item}));
    setComponentType(componentTypesArr);
    setLoading(false);
    setFromSFDC(true);
  };

  const handleApproveChanges = async () => {
    // TODO: This needs to be handled differently
    let selectedList = [];
    setSave(true);
    let typeOfSelection;

    // TODO: Use ENUM, wire up as switch statement
    if (fromSFDC) {
      typeOfSelection = "sfdcCommitList";
    }
    
    if (fromDestinationSFDC) {
      typeOfSelection = "sfdcCommitList";
    }

    if (fromGit) {
      typeOfSelection = "gitCommitList";
    }

    // saving selected files to mongo before calling generate xml func
    try {
      if (isProfiles) {
        await saveSelectedList(selectedList, typeOfSelection);
      } else {
        const postBody = {
          recordId: recordId,
          pipelineId: gitTaskData ? "N/A" : pipelineId,
          stepId: gitTaskData ? "N/A" : stepId,
          dataType: gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
          gitTaskId: gitTaskData ? gitTaskId : false,
          updateAttribute: "selectedFileList",
          typeOfSelection: typeOfSelection,
          rules: modifiedFilesRuleList
        };

        await sfdcPipelineActions.setListToPipelineStorageV2(getAccessToken, cancelTokenSource, postBody);
        await generateXML();
      }
    } catch (error) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  const saveSelectedList = async (selectedList, typeOfSelection) => {
    try {
      const postBody = {
        recordId: recordId,
        pipelineId: pipelineId,
        stepId: stepId,
        dataType: "sfdc-packageXml",
        updateAttribute: "profilesList",
        typeOfSelection : typeOfSelection,
        rules: modifiedFilesRuleList
      };

      await sfdcPipelineActions.setListToPipelineStorageV2(getAccessToken, cancelTokenSource, postBody);
      await getProfileComponentList();
    } catch (error) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  // TODO: These functions should be put in the individual areas and tailored specifically for them
  // TODO: WHy are we pulling data here that is not used?
  const getProfileComponentList = async () => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      isProfiles: isProfiles,
      componentTypes: isProfiles ? selectedComponentTypes : [],
      // commitList: selectedList,
      isSfdc: !!(fromSFDC || fromDestinationSFDC),
    };

    try {
      let getProfileComponentListRes = await sfdcPipelineActions.getProfileComponentList(postBody, getAccessToken);

      if (getProfileComponentListRes?.data?.status !== 200) {
        console.error("Error getting API Data: ", getProfileComponentListRes?.data?.message);
        setSave(false);
        // setError(result.data.message);
        toastContext.showInlineErrorMessage("Error getting API Data: ", getProfileComponentListRes?.data?.message);
      } else {
        setView(3);
      }
    } catch (error) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  // TODO: These functions should be put in the individual areas and tailored specifically for them
  const generateXML = async () => {
    try {
      const postBody = {
        pipelineId: gitTaskData ? "N/A" : pipelineId,
        stepId: gitTaskData ? "N/A" : stepId,
        gitTaskId: gitTaskData ? gitTaskId : false,
        isProfiles: isProfiles,
        componentTypes: isProfiles ? selectedComponentTypes : [],
        isSfdc: !!(fromSFDC || fromDestinationSFDC),
      };

      const result = await sfdcPipelineActions.generateXML(postBody, getAccessToken);

      if (result.data.status !== 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        // setError(result.data.message);
        toastContext.showInlineErrorMessage(error);
      } else {
        // setXML(result.data.message); // not saving anything from response here
        // setView(4); //move to next view
         if(unitTestSteps.length > 0) {
            setView(5);
            return;
          }
          setView(4);
      }
    } catch (err) {
      console.error(err.message);
      toastContext.showInlineErrorMessage(error);
      setSave(false);
    }
  };

  // TODO: We should be handling this with an ENUM
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab !== tabSelection) {
      setModifiedFilesRuleList([]);
      setActiveTab(tabSelection);
      if(tabSelection === 'sfdc'){
        setFromSFDC(true);
        setFromDestinationSFDC(false);
        setFromGit(false);
      }else if(tabSelection === 'git'){
        setFromGit(true);
        setFromDestinationSFDC(false);
        setFromSFDC(false);
      }else if(tabSelection === 'destsfdc'){
        setFromDestinationSFDC(true);
        setFromSFDC(false);
        setFromGit(false);
      }
    }
  };

  const getView = () => {
    if (activeTab === "sfdc") {
      if (isOrgToOrg) {
        return (
          <SfdcProfileSelectionView
            componentType={componentType}
            recordId={recordId}
            updateAttribute= {isProfiles ? "profilesList" : "selectedFileList"}
            callbackFunc={isProfiles ? getProfileComponentList : generateXML}
            fromGit={fromGit}
            fromSFDC={fromSFDC}
            fromDestinationSFDC={fromDestinationSFDC}
            fromProfileComponents={false}
            gitTaskData={gitTaskData}
            setRecordId={setRecordId}
            setRuleList={setModifiedFilesRuleList}
            pipelineId={pipelineId}
            stepId={stepId}
            gitTaskId={gitTaskId}
            ruleList={modifiedFilesRuleList}
            setView={setView}
            handleApproveChanges={handleApproveChanges}
            handleClose={handleClose}
            save={save}
          />
        );
      }

      return (
        <SfdcModifiedFilesTabView
          componentType={componentType}
          recordId={recordId}
          updateAttribute={isProfiles ? "profilesList" : "selectedFileList"}
          callbackFunc={isProfiles ? getProfileComponentList : generateXML}
          fromGit={fromGit}
          fromSFDC={fromSFDC}
          fromDestinationSFDC={fromDestinationSFDC}
          fromProfileComponents={false}
          gitTaskData={gitTaskData}
          pipelineId={pipelineId}
          stepId={stepId}
          gitTaskId={gitTaskId}
          ruleList={modifiedFilesRuleList}
          setRecordId={setRecordId}
          setRuleList={setModifiedFilesRuleList}
          setView={setView}
          handleApproveChanges={handleApproveChanges}
          handleClose={handleClose}
          save={save}
        />
      );
    }

    if (activeTab === "git") {
      return (
        <GitModifiedFilesTabView
          componentType={componentType}
          setRecordId={setRecordId}
          pipelineId={pipelineId}
          stepId={stepId}
          gitTaskId={gitTaskId}
          ruleList={modifiedFilesRuleList}
          setRuleList={setModifiedFilesRuleList}
          setView={setView}
          handleApproveChanges={handleApproveChanges}
          handleClose={handleClose}
          save={save}
        />
      );
    }
  };

  const getExtraTabs = () => {
    if (!isOrgToOrg && gitTaskData == null) {
      return (
        <CustomTab activeTab={activeTab} tabText={"Git Files"} handleTabClick={handleTabClick} tabName={"git"} disabled={gitTaskData != null}
                   toolTipText={"Git Files"} icon={faCode} />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"SFDC Files"} handleTabClick={handleTabClick} tabName={"sfdc"}
                   toolTipText={"SFDC Files"} icon={faSalesforce} />
        {getExtraTabs()}
      </CustomTabContainer>
    );
  };

  if (error) {
    return (<div className="mt-3">
      <ErrorDialog error={error}/>
    </div>);
  }

  if (save || loading ) {
    return (<LoadingDialog size="sm" message="Loading Files..."/>);
  }

  return (
    <div>
      <div className="h5">SalesForce Pipeline Run: File Comparison</div>
      <div className="text-muted mb-2">
        Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
        proceed with this operation.
      </div>
      {getTabContainer()}
      {getView()}
    </div>
  );
};

SfdcPipelineModifiedFiles.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isOrgToOrg: PropTypes.bool,
  isProfiles: PropTypes.bool,
  setFromSFDC: PropTypes.func,
  fromSFDC: PropTypes.bool,
  selectedComponentTypes: PropTypes.array,
  setFromDestinationSFDC: PropTypes.func,
  fromDestinationSFDC: PropTypes.bool,
  setFromGit: PropTypes.func,
  fromGit: PropTypes.bool,
  handleClose: PropTypes.func,
  recordId: PropTypes.string,
  setRecordId: PropTypes.func,
  unitTestSteps: PropTypes.array,
  selectedComp: PropTypes.array,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
  modifiedFilesRuleList: PropTypes.array,
  setModifiedFilesRuleList: PropTypes.func,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
};

export default SfdcPipelineModifiedFiles;
