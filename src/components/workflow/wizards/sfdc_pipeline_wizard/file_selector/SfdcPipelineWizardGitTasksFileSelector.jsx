import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import SfdcPipelineWizardSfdcFileSelector from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSfdcFileSelector";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";

const SfdcPipelineWizardGitTasksFileSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [filesPulled, setFilesPulled] = useState(false);

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
      await pullGitTaskFiles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error("Service Error Pulling File List from Salesforce: " + error);
        toastContext.showInlineErrorMessage("Service Error Pulling File List from SalefForce: " + error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const pullGitTaskFiles = async (cancelSource = cancelTokenSource) => {
    console.log("in pullGitTaskFiles");
    const result = await sfdcPipelineActions.triggerGitTaskFilesPullV2(getAccessToken, cancelSource, pipelineWizardModel);

    console.log("in pullGitTaskFiles result: " + JSON.stringify(result));
    if (result?.data?.status === 500) {
      const message = result?.data?.message;
      console.error("Service Error Pulling File List from Salesforce: " + message);
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
      <SfdcPipelineWizardSfdcFileSelector
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        setPipelineWizardScreen={setPipelineWizardScreen}
        handleClose={handleClose}
      />
    </div>
  );
};

SfdcPipelineWizardGitTasksFileSelector.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default SfdcPipelineWizardGitTasksFileSelector;
