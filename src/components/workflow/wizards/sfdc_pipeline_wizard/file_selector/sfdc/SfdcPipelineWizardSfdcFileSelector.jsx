import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import SfdcPipelineWizardSubmitSfdcFilesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSubmitSfdcFilesButton";
import SfdcPipelineWizardSfdcFilesTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSfdcFilesTable";
import {parseError} from "components/common/helpers/error-helpers";
import IconBase from "components/common/icons/IconBase";

const SfdcPipelineWizardSfdcFileSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
  const [sfdcFilterDto, setSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [sfdcFiles, setSfdcFiles] = useState([]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalFileCount, setTotalFileCount] = useState(0);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    const newSfdcFilterDto = new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false);
    setSfdcFilterDto({...newSfdcFilterDto});
    loadData(newSfdcFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, [JSON.stringify(pipelineWizardModel.getData("sfdcModifiedRuleList"))]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const loadData = async (newFilterDto = sfdcFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setSfdcWarningMessage("");
      await sfdcPolling(cancelSource, newFilterDto);
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getModifiedFiles = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto) => {
    const response = await sfdcPipelineActions.getSfdcFilesV2(getAccessToken, cancelSource, pipelineWizardModel, newFilterDto);
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(`Service Error Fetching File List From SFDC: ${parsedError}`);
      }

      if (data.warning) {
        setSfdcWarningMessage(data.warning);
      }

      if (Array.isArray(files)) {
        let newSfdcFilterDto = {...newFilterDto};
        newSfdcFilterDto.setData("totalCount", data.count);
        newSfdcFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setTotalFileCount(data.count);
        setSfdcFilterDto({...newSfdcFilterDto});
        setPipelineWizardModel({...pipelineWizardModel});
        setSfdcFiles(files);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return data?.data;
  };

  const sfdcPolling = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getModifiedFiles(cancelSource, newFilterDto);

    if (!Array.isArray(sfdcCommitList) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await sfdcPolling(cancelSource, newFilterDto, count + 1);
    }
  };

  return (
    <div>
      <SfdcPipelineWizardSfdcFilesTable
        sfdcFiles={sfdcFiles}
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardScreen={setPipelineWizardScreen}
        isLoading={isLoading}
        loadData={loadData}
        sfdcFilesPaginationModel={sfdcFilterDto}
        setSfdcFilesPaginationModel={setSfdcFilterDto}
        filePullCompleted={filePullCompleted}
        setPipelineWizardModel={setPipelineWizardModel}
      />
      <InlineWarning warningMessage={sfdcWarningMessage} className="pl-3" />
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);}}>
          <IconBase icon={faStepBackward} className={"mr-1"}/>Back
        </Button>
        <SfdcPipelineWizardSubmitSfdcFilesButton
          setPipelineWizardScreen={setPipelineWizardScreen}
          pipelineWizardModel={pipelineWizardModel}
          filteredFileCount={totalFileCount}
          isLoading={isLoading}
        />
        <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose} />
      </SaveButtonContainer>
    </div>
  );
};

SfdcPipelineWizardSfdcFileSelector.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardSfdcFileSelector;