import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CancelButton from "components/common/buttons/CancelButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import SfdcPipelineWizardGitFilesTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardGitFilesTable";
import SfdcPipelineWizardSubmitGitFilesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardSubmitGitFilesButton";
import SfdcPipelineWizardGitRollbackModeButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardGitRollbackModeButton";

const SfdcPipelineWizardGitFileSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitFiles, setGitFiles] = useState([]);
  const [gitFilterDto, setGitFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [isLoading, setIsLoading] = useState(false);
  const [gitWarningMessage, setGitWarningMessage] = useState("");
  const [filePullCompleted, setFilesPullCompleted] = useState(false);

  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(gitFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, [JSON.stringify(pipelineWizardModel.getData("gitModifiedRuleList"))]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const loadData = async (newFilterDto = gitFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setGitWarningMessage("");
      await gitPolling(cancelSource, newFilterDto);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const gitPolling = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const gitResponse = await getModifiedFiles(cancelSource, newFilterDto);
    
    if (!Array.isArray(gitResponse) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await gitPolling(cancelSource, newFilterDto, count + 1);
    }
  };

  const getModifiedFiles = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto) => {
    const response = await sfdcPipelineActions.getGitFilesV2(getAccessToken, cancelSource, pipelineWizardModel, newFilterDto);
    const data = response?.data;

    if (isMounted?.current === true && data) {
      if(data.gitErrorMessage){
        toastContext.showInlineErrorMessage("Error Pulling Files from SFDC: "+ data.gitErrorMessage);
      }

      const fileArray = data.data;

      if (Array.isArray(fileArray)) {
        setFilesPullCompleted(true);
        let newGitFilterDto = newFilterDto;
        newGitFilterDto.setData("totalCount", data.count);
        newGitFilterDto.setData("activeFilters", newGitFilterDto.getActiveFilters());
        setGitFilterDto({ ...newGitFilterDto });
        setGitFiles(fileArray);
        setPipelineWizardModel({...pipelineWizardModel});
      }
    }

    return data?.data;
  };

  return (
    <div>
      <SfdcPipelineWizardGitFilesTable
        loadData={loadData}
        gitFilesPaginationModel={gitFilterDto}
        setGitFilesPaginationModel={setGitFilterDto}
        isLoading={isLoading}
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        filePullCompleted={filePullCompleted}
        gitFiles={gitFiles}
      />
      <InlineWarning warningMessage={gitWarningMessage} className="pl-3" />
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);}}>
          <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back
        </Button>
        <SfdcPipelineWizardGitRollbackModeButton
          className={"mr-2"}
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
        />
        <SfdcPipelineWizardSubmitGitFilesButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          filteredFileCount={gitFiles.length}
          isLoading={isLoading}
        />
        <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose} />
      </SaveButtonContainer>
    </div>
  );
};

SfdcPipelineWizardGitFileSelector.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  isSaving: PropTypes.bool
};

export default SfdcPipelineWizardGitFileSelector;