import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardComponentSelector from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardComponentSelector";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import Model from "core/data_model/model";
import sfdcPipelineWizardMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import SalesforceBulkMigrationWizardInitializationScreen
  from "components/workflow/wizards/salesforce_bulk_migration/initialization_screen/SalesforceBulkMigrationWizardInitializationScreen";

export const BULK_MIGRATION_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  COMPONENT_SELECTOR: "COMPONENT_SELECTOR",
};

const SalesforceBulkMigrationWizard = ({ handlePipelineWizardRequest, handleClose, gitTaskData, pipelineOrientation }) => {
  const [error, setError] = useState("");
  const [bulkMigrationWizardScreen, setBulkMigrationWizardScreen] = useState(BULK_MIGRATION_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [wizardModel, setWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [helpIsShown, setHelpIsShown] = useState(false);

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
    switch (bulkMigrationWizardScreen) {
      case BULK_MIGRATION_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <SalesforceBulkMigrationWizardInitializationScreen
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setBulkMigrationWizardScreen}
            handleClose={handleClose}
            gitTaskData={gitTaskData}
            setError={setError}
          />
        );
      case BULK_MIGRATION_WIZARD_SCREENS.COMPONENT_SELECTOR:
        return (
          <SfdcPipelineWizardComponentSelector
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setBulkMigrationWizardScreen}
            handleClose={handleClose}
          />
        );
    }
  };

  const getHelpComponent = () => {
    switch (bulkMigrationWizardScreen) {
      // case BULK_MIGRATION_WIZARD_SCREENS.INITIALIZATION_SCREEN:
      //   return (
      //     <SfdcWizardInitializationHelpDocumentation
      //       closeHelpPanel={() => setHelpIsShown(false)}
      //     />
      //   );
      // case BULK_MIGRATION_WIZARD_SCREENS.COMPONENT_SELECTOR:
      //   return (
      //     <SfdcWizardComponentTypeSelectionHelpDocumentation
      //       closeHelpPanel={() => setHelpIsShown(false)}
      //     />
      //   );
      default:
        return null;
    }
  };

  const getWarningMessage = () => {
    if (pipelineOrientation === "middle") {
      return (
        <div className="warning-text p-0">
          Warning! This Task is in a failed or incomplete state and is no longer running.
          If you proceed, this will clear the current state of the Task and begin a brand new run.
        </div>
      );
    }
  };

  if (wizardModel == null) {
    return (
      <LoadingDialog message={"Initializing Salesforce Bulk Migration Wizard"} size={"sm"} />
    );
  }

  if (error && error !== "") {
    return (
      <div className="mt-5">
        <ErrorDialog error={error} />
      </div>
    );
  }

  return (
    <OverlayPanelBodyContainer
      helpComponent={getHelpComponent()}
      helpIsShown={helpIsShown}
      setHelpIsShown={setHelpIsShown}
      hideCloseButton={true}
      leftSideItems={getWarningMessage()}
      isLoading={wizardModel?.getData("recordId")?.length === ""}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

SalesforceBulkMigrationWizard.propTypes = {
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
  gitTaskData: PropTypes.object,
  pipelineOrientation: PropTypes.string,
};

export default SalesforceBulkMigrationWizard;
