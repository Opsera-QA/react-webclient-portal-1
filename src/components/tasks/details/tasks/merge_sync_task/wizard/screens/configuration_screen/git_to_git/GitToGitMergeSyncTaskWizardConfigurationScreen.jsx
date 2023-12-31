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

const GitToGitMergeSyncTaskWizardConfigurationScreen = ({
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
        Git to Git Merge Sync Task Wizard: Commit Configuration Selection
      </div>
      <Row className="my-3">
        <Col xs={0} sm={3} />
        <Col xs={12} sm={6} md={6}>
          <DateTimeInputBase
            dataObject={wizardModel}
            setDataObject={setWizardModel}
            fieldName={"fromDate"}
          />
        </Col>
        <Col xs={0} sm={3} />
        <Col xs={0} sm={3} />
        <Col xs={12} sm={6}>
          <DateTimeInputBase
            dataObject={wizardModel}
            setDataObject={setWizardModel}
            fieldName={"toDate"}
          />
        </Col>
        <Col xs={0} sm={3} />
      </Row>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {
            setCurrentScreen(
              MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN,
            );
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

GitToGitMergeSyncTaskWizardConfigurationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default GitToGitMergeSyncTaskWizardConfigurationScreen;
