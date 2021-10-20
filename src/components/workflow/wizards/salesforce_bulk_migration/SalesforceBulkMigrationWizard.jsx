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
import SalesforceBulkMigrationWizardComponentSelector
  from "components/workflow/wizards/salesforce_bulk_migration/component_selector/SalesforceBulkMigrationWizardComponentSelector";

export const BULK_MIGRATION_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  COMPONENT_SELECTION_SCREEN: "COMPONENT_SELECTION_SCREEN",
  CONFIRMATION_SCREEN: "COMPONENT_SELECTOR",
};

const SalesforceBulkMigrationWizard = ({ handleClose, taskModel }) => {
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
            taskModel={taskModel}
            setError={setError}
          />
        );
      case BULK_MIGRATION_WIZARD_SCREENS.COMPONENT_SELECTION_SCREEN:
        return (
          <SalesforceBulkMigrationWizardComponentSelector
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
      isLoading={wizardModel?.getData("recordId")?.length === ""}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

SalesforceBulkMigrationWizard.propTypes = {
  handleClose: PropTypes.func,
  taskModel: PropTypes.object,
};

export default SalesforceBulkMigrationWizard;
