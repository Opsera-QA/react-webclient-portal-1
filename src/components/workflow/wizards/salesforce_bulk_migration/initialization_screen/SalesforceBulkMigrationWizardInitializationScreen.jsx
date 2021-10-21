import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS} from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";
import salesforceBulkMigrationWizardActions
  from "components/workflow/wizards/salesforce_bulk_migration/salesforceBulkMigrationWizard.actions";

const SalesforceBulkMigrationWizardInitializationScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, taskModel, setError }) => {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingNewRecord, setCreatingNewRecord] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskModel]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let newPipelineWizardRecord = loadGitTaskInformation(pipelineWizardModel);
      setPipelineWizardModel({...newPipelineWizardRecord});
    }
    catch (error) {
      console.error(error);
      setError("Could not initialize Salesforce Bulk Migration Wizard");
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadGitTaskInformation = (newPipelineWizardModel) => {
    const taskId = taskModel.getData("_id");
    const sfdcToolId = taskModel.getData("configuration")?.sfdcToolId;
    const gitToolId = taskModel.getData("configuration")?.gitToolId;
    const sfdcDestToolId = taskModel.getData("configuration")?.sfdcDestToolId;
    const accountUsername = taskModel.getData("configuration")?.accountUsername;
    const gitBranch = taskModel.getData("configuration")?.gitBranch;


    if (taskId == null || taskId === "") {
      setError("Could not find Task");
    }

    if (sfdcToolId == null || sfdcToolId === "") {
      setError("No Salesforce Tool is associated with this Task");
    }

    newPipelineWizardModel.setData("accountUsername", accountUsername);
    newPipelineWizardModel.setData("gitBranch", gitBranch);
    newPipelineWizardModel.setData("fromGitTasks", true);
    newPipelineWizardModel.setData("sfdcDestToolId", sfdcDestToolId);
    newPipelineWizardModel.setData("gitTaskId", taskId);
    newPipelineWizardModel.setData("sfdcToolId", sfdcToolId);
    newPipelineWizardModel.setData("gitToolId", gitToolId);
    setPipelineWizardModel({...newPipelineWizardModel});
    return newPipelineWizardModel;
  };

  const createNewBulkMigrationRecord = async () => {
    try {
      setCreatingNewRecord(true);
      const response = await salesforceBulkMigrationWizardActions.createNewRecordV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
      const newRecord = response?.data;

      if (isMounted?.current === true && newRecord != null) {
        pipelineWizardModel?.setData("recordId", newRecord._id);
        setPipelineWizardModel({...pipelineWizardModel});
        setPipelineWizardScreen(SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS.COMPONENT_SELECTION_SCREEN);
      }
    }
    catch (error) {
      console.error(error);
      setError("Could not create new Salesforce Bulk Migration Wizard record");
    }
    finally {
      if (isMounted?.current === true) {
        setCreatingNewRecord(false);
      }
    }
  };

  const getBody = () => {
    if (isLoading || pipelineWizardModel == null) {
      return (
        <LoadingDialog message={"Initializing Salesforce Bulk Migration Wizard"} size={"sm"} />
      );
    }

    return (
      <div>
        <div className={"mt-2"}>
          {`Would you like to start a new Salesforce Bulk Migration Wizard Instance?`}
        </div>
        <SaveButtonContainer>
          <Button
            className={"mr-2"}
            size={"sm"}
            variant="primary"
            disabled={isLoading}
            onClick={createNewBulkMigrationRecord}
          >
            <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
          </Button>
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const getMainView = () => {
    if (creatingNewRecord) {
      return (
        <LoadingDialog message={"Starting a new Salesforce Bulk Migration Wizard Instance"} size={"sm"} />
      );
    }

    return (
      <div>
        <div className="h5">Salesforce Bulk Migration: Initialization</div>
        <div className="my-3">
          {getBody()}
        </div>
      </div>
    );
  };

  return (
    <div>
      {getMainView()}
    </div>
  );
};

SalesforceBulkMigrationWizardInitializationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  taskModel: PropTypes.object,
  setError: PropTypes.func
};

export default SalesforceBulkMigrationWizardInitializationScreen;
