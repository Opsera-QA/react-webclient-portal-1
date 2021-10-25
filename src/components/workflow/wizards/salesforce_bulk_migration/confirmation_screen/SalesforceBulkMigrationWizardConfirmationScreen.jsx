import React from "react";
import PropTypes from "prop-types";
import { Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS} from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";
import BackButton from "components/common/buttons/back/BackButton";
import SalesforceBulkMigrationTriggerTaskButton
  from "components/workflow/wizards/salesforce_bulk_migration/confirmation_screen/SalesforceBulkMigrationTriggerTaskButton";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import ListInputBase from "components/common/inputs/list/ListInputBase";

const SalesforceBulkMigrationWizardConfirmationScreen = (
  {
    pipelineWizardModel,
    setPipelineWizardModel,
    setPipelineWizardScreen,
    handleClose,
    setError,
  }) => {
  const getFormattedComponentTypes = () => {
    let componentTypes = [];
    const selectedComponentTypes = pipelineWizardModel?.getArrayData("selectedComponentTypes");

    if (Array.isArray(selectedComponentTypes) && selectedComponentTypes.length > 0) {
      selectedComponentTypes.forEach((component) => {
        componentTypes.push({
          name: component,
        });
      });
    }

    return componentTypes;
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Salesforce Bulk Migration Wizard: Confirmation Screen</div>
      <div className="text-muted">Would you like to trigger Bulk Migration for {pipelineWizardModel?.getArrayData("selectedComponentTypes").length} Components?</div>
      <Row className="my-3">
        <Col xs={6}>
          <ListInputBase
            height={"70vh"}
            fieldName={"selectedComponentTypes"}
            selectOptions={getFormattedComponentTypes()}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            icon={faSalesforce}
            valueField={"name"}
            textField={"name"}
            disabled={true}
            noDataMessage={"No Component Types Selected"}
          />
        </Col>
      </Row>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {setPipelineWizardScreen(SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS.COMPONENT_SELECTION_SCREEN);}}
        />
        <SalesforceBulkMigrationTriggerTaskButton
          pipelineWizardModel={pipelineWizardModel}
          handleClose={handleClose}
          setError={setError}
        />
        <CancelButton
          className={"ml-2"}
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
        />
      </SaveButtonContainer>
    </div>
  );
};

SalesforceBulkMigrationWizardConfirmationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setError: PropTypes.func,
};

export default SalesforceBulkMigrationWizardConfirmationScreen;
