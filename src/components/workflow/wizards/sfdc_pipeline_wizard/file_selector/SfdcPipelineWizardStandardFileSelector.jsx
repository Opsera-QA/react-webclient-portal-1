import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import {faCode,} from "@fortawesome/free-solid-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import SfdcPipelineWizardSfdcFileSelector from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSfdcFileSelector";
import SfdcPipelineWizardGitFileSelector from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardGitFileSelector";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import {parseError} from "components/common/helpers/error-helpers";

const SfdcPipelineWizardStandardFileSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filesPulled, setFilesPulled] = useState(false);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await pullSfdcFiles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        const prependMessage = "Service Error Pulling File List from Salesforce:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };


  const pullSfdcFiles = async (cancelSource = cancelTokenSource) => {
    const result = await sfdcPipelineActions.triggerSfdcFilesPullV2(getAccessToken, cancelSource, pipelineWizardModel);

    if (result?.data?.status === 500) {
      const message = result?.data?.message;
      toastContext.showInlineErrorMessage("Service Error Pulling File List from Salesforce: " + message);
    }
    else {
      setFilesPulled(true);
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (pipelineWizardModel.getData("modifiedFilesOrigin") !== tabSelection) {
      pipelineWizardModel.setData("modifiedFilesOrigin", tabSelection);
      setPipelineWizardModel({...pipelineWizardModel});
    }
  };

  const getView = () => {
    if (pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc") {
      return (
        <SfdcPipelineWizardSfdcFileSelector
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          handleClose={handleClose}
        />
      );
    }

    if (pipelineWizardModel.getData("modifiedFilesOrigin") === "git") {
      return (
        <SfdcPipelineWizardGitFileSelector
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          handleClose={handleClose}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={pipelineWizardModel.getData("modifiedFilesOrigin")}
          tabText={"SFDC Files"}
          handleTabClick={handleTabClick}
          tabName={"sfdc"}
          toolTipText={"SFDC Files"}
          icon={faSalesforce}
        />
        <CustomTab
          activeTab={pipelineWizardModel.getData("modifiedFilesOrigin")}
          tabText={"Git Files"}
          handleTabClick={handleTabClick}
          tabName={"git"}
          toolTipText={"Git Files"}
          icon={faCode}
        />
      </CustomTabContainer>
    );
  };

  if (isLoading) {
    return <LoadingDialog message={"Requesting Files"} />;
  }

  if (!filesPulled) {
    return <ErrorDialog message={"Service Error Pulling File List from Salesforce"} />;
  }

  return (
    <div>
      <div className="h5">Salesforce Pipeline Run: File Selection for {pipelineWizardModel?.getArrayData("selectedComponentTypes")?.length} Components</div>
      <div className="text-muted mb-2">
        Select which files will have changes impacted in this pipeline run by using filter rules.
      </div>
      {getTabContainer()}
      {getView()}
    </div>
  );
};

SfdcPipelineWizardStandardFileSelector.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default SfdcPipelineWizardStandardFileSelector;
