import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CustomSettingSelector from "./CustomSettingSelector";

const CustomSettingTaskWizardConfigScreen = ({
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
          message={`Loading`}
        />
      );
    }

    return (
      <div>
        <div className={"m-3"}>
          <CustomSettingSelector
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            handleClose={handleClose}
            setCurrentScreen={setCurrentScreen}
            taskType={taskType}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>{getBody()}</div>
    </div>
  );
};

CustomSettingTaskWizardConfigScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingTaskWizardConfigScreen;
