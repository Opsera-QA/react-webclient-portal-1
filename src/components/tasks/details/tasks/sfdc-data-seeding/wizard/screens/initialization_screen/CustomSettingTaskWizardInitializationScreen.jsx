import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { getMigrationTypeLabel } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import CustomSettingTaskWizardCreateNewRecordButton from "./CustomSettingTaskWizardCreateNewRecordButton";

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
          <CustomSettingTaskWizardCreateNewRecordButton
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            taskType={taskType}
            className={"mr-2"}
          />
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>{getBody()}</div>
    </div>
  );
};

CustomSettingTaskWizardInitializationScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingTaskWizardInitializationScreen;
