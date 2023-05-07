import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import { getMigrationTypeLabel } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";

const CustomSettingUploadScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleBackButton = () => {
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };
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
        <Row className="mx-1">
          <H5FieldSubHeader
            subheaderText={`${getMigrationTypeLabel(
              wizardModel?.getData("taskType"),
            )} : Custom Setting File Upload Screen`}
          />
        </Row>
        <div className={"m-3"}>Upload Screen</div>
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>{getBody()}</div>
      <SaveButtonContainer>
        <Button
          variant="secondary"
          size="sm"
          className="mr-2"
          onClick={() => {
            handleBackButton();
          }}
        >
          <IconBase
            icon={faArrowLeft}
            fixedWidth
            className="mr-2"
          />
          Back
        </Button>
        <Button
          className={"mr-2"}
          size="sm"
          variant="primary"
          onClick={()=> {
            console.log("clicked next");
          }}
          disabled={isLoading || isSaving || wizardModel?.getData("selectedCustomSetting").length < 1}
        >
            <span>
              <IconBase
                icon={faArrowRight}
                fixedWidth
                isLoading={isSaving}
                className="mr-2"
              />
              {isSaving ? "Saving" : "Save and Proceed"}
            </span>
        </Button>
        <CancelButton
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
          size={"sm"}
        />
      </SaveButtonContainer>
    </div>
  );
};

CustomSettingUploadScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingUploadScreen;
