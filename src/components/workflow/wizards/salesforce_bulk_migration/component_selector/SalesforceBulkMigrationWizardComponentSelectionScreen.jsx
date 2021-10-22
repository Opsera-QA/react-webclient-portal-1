import React from "react";
import PropTypes from "prop-types";
import { Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SalesforceBulkMigrationWizardComponentListInput
  from "components/workflow/wizards/salesforce_bulk_migration/component_selector/SalesforceBulkMigrationWizardComponentListInput";
import {SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS} from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";
import BackButton from "components/common/buttons/back/BackButton";
import SalesforceBulkMigrationWizardSubmitComponentTypesButton
  from "components/workflow/wizards/salesforce_bulk_migration/component_selector/SalesforceBulkMigrationWizardSubmitComponentTypesButton";

const SalesforceBulkMigrationWizardComponentSelectionScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
  if (pipelineWizardModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Salesforce Bulk Migration Wizard: Component Type Selection</div>
      <div className="text-muted">Select which component types to include in the Bulk Migration.</div>
      <Row className="my-3">
        <Col xs={12}>
          <SalesforceBulkMigrationWizardComponentListInput
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            selectedComponents={[...pipelineWizardModel.getArrayData("selectedComponentTypes")]}
          />
        </Col>
      </Row>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {setPipelineWizardScreen(SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS.INITIALIZATION_SCREEN);}}
        />
        <SalesforceBulkMigrationWizardSubmitComponentTypesButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
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

SalesforceBulkMigrationWizardComponentSelectionScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default SalesforceBulkMigrationWizardComponentSelectionScreen;
