import React from "react";
import PropTypes from "prop-types";
import { Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardUpdateConfigurationButton
from "components/tasks/details/tasks/merge_sync_task/wizard/screens/configuration_screen/MergeSyncTaskWizardUpdateConfigurationButton";
import SfdcComponentListInput
from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcComponentListInput";

const SalesforceToGitMergeSyncTaskWizardConfigurationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
}) => {
  if (wizardModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">
        Salesforce to Git Merge Sync Task Wizard: Commit Configuration Selection
      </div>
      <Row className="my-3">
        <Col xs={12}>
          <SfdcComponentListInput
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            selectedComponents={[
              ...wizardModel.getArrayData("selectedComponentTypes"),
            ]}
          />
        </Col>
        {!wizardModel.getData("isProfiles") &&
          <>
            <Col xs={6}>
              <DateTimeInputBase
                dataObject={wizardModel}
                setDataObject={setWizardModel}
                fieldName={"fromDate"}
                dropUp={true}
              />
            </Col>
            <Col xs={6}>
              <DateTimeInputBase
                dataObject={wizardModel}
                setDataObject={setWizardModel}
                fieldName={"toDate"}
                dropUp={true}
              />
            </Col>
          </>
        }
      </Row>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {
            setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN);
          }}
        />
        <MergeSyncTaskWizardUpdateConfigurationButton
          wizardModel={wizardModel}
          setCurrentScreen={setCurrentScreen}
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

SalesforceToGitMergeSyncTaskWizardConfigurationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default SalesforceToGitMergeSyncTaskWizardConfigurationScreen;
