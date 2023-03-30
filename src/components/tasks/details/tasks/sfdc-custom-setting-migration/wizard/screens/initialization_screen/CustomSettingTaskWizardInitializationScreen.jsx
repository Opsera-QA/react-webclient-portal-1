import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import MergeSyncTaskWizardCreateNewRecordButton from "components/tasks/details/tasks/merge_sync_task/wizard/screens/initialization_screen/MergeSyncTaskWizardCreateNewRecordButton";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import { Row, Col } from "react-bootstrap";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import TaskMigrationTypeField from "../../../../../../../common/fields/tasks/TaskMigrationTypeField";
import { getMigrationTypeLabel } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";

const CustomSettingTaskWizardInitializationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const getBody = () => {
    if (wizardModel == null) {
      return (
        <CenterLoadingIndicator
          minHeight={"500px"}
          message={`Initializing ${taskType} Custom Setting Migration Wizard`}
        />
      );
    }

    return (
      <div>
        <div className={"m-3"}>
          <div className={"mb-4"}>
            <CenteredContentWrapper>
              <div className={"mx-auto"}>
                <OpseraInfinityLogo />
              </div>
            </CenteredContentWrapper>
            <CenteredContentWrapper>
              <div className={"mx-auto mt-3"}>
                <H5FieldSubHeader
                  subheaderText={`${getMigrationTypeLabel(
                    taskType,
                  )} : Initialization`}
                />
                <div className={"focusText"}>
                  {`Would you like to start a new ${getMigrationTypeLabel(
                    taskType,
                  )} Task Wizard Instance?`}
                </div>
              </div>
            </CenteredContentWrapper>
          </div>
        </div>
        <SaveButtonContainer>
          {/* TODO : Create a create record button */}
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
    return (
      <div>
        <div className={"my-3"}>{getBody()}</div>
      </div>
    );
  };

  return <div>{getMainView()}</div>;
};

CustomSettingTaskWizardInitializationScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingTaskWizardInitializationScreen;
