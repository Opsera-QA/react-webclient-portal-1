import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import Model from "core/data_model/model";
import sfdcPipelineWizardMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import SalesforceBulkMigrationWizardInitializationScreen
  from "components/workflow/wizards/salesforce_bulk_migration/initialization_screen/SalesforceBulkMigrationWizardInitializationScreen";
import SalesforceBulkMigrationWizardComponentSelectionScreen
  from "components/workflow/wizards/salesforce_bulk_migration/component_selector/SalesforceBulkMigrationWizardComponentSelectionScreen";
import SalesforceBulkMigrationWizardConfirmationScreen
  from "components/workflow/wizards/salesforce_bulk_migration/confirmation_screen/SalesforceBulkMigrationWizardConfirmationScreen";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  CONFIGURATION_SCREEN: "CONFIGURATION_SCREEN",
  FILE_SELECTION_SCREEN: "FILE_SELECTION_SCREEN",
};

const GitToGitMergeSyncTaskWizard = ({ handleClose, taskModel }) => {
  const [error, setError] = useState("");
  const [currentScreen, setCurrentScreen] = useState(GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [wizardModel, setWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    let newWizardModel = new Model(sfdcPipelineWizardMetadata?.newObjectFields, sfdcPipelineWizardMetadata, false);
    newWizardModel.setData("selectedComponentTypes", []);
    setWizardModel({...newWizardModel});

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getBody = () => {
    switch (currentScreen) {
      case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <SalesforceBulkMigrationWizardInitializationScreen
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setCurrentScreen}
            handleClose={handleClose}
            taskModel={taskModel}
            setError={setError}
          />
        );
      case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return (
          <SalesforceBulkMigrationWizardComponentSelectionScreen
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setCurrentScreen}
            handleClose={handleClose}
          />
        );
      case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN:
        return (
          <SalesforceBulkMigrationWizardConfirmationScreen
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setCurrentScreen}
            handleClose={handleClose}
            setError={setError}
          />
        );
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    switch (currentScreen) {
      // case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN:
      //   return (
      //     <SfdcWizardInitializationHelpDocumentation
      //       closeHelpPanel={() => setHelpIsShown(false)}
      //     />
      //   );
      // case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN:
      //   return (
      //     <SfdcWizardComponentTypeSelectionHelpDocumentation
      //       closeHelpPanel={() => setHelpIsShown(false)}
      //     />
      //   );
      // case GIT_TO_GIT_MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN:
      //   return (
      //     <SfdcWizardComponentTypeSelectionHelpDocumentation
      //       closeHelpPanel={() => setHelpIsShown(false)}
      //     />
      //   );
      default:
        return null;
    }
  };

  if (wizardModel == null) {
    return (
      <LoadingDialog
        message={"Initializing Salesforce Bulk Migration Wizard"}
        size={"sm"}
      />
    );
  }

  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
      isLoading={isMongoDbId(wizardModel?.getData("recordId")) !== true}
    >
      <div>
        <ErrorDialog error={error} />
      </div>
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

GitToGitMergeSyncTaskWizard.propTypes = {
  handleClose: PropTypes.func,
  taskModel: PropTypes.object,
};

export default GitToGitMergeSyncTaskWizard;
