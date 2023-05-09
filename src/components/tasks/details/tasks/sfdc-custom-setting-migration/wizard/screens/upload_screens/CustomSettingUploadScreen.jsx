import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import { getMigrationTypeLabel, MIGRATION_TYPES } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import CustomSettingFileUploadComponent from "./CustomSettingFileUploadComponent";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import useAxiosCancelToken from "../../../../../../../../hooks/useAxiosCancelToken";

const CustomSettingUploadScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { cancelTokenSource } = useAxiosCancelToken();
  const isMounted = useRef(false);

  const handleBackButton = () => {
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };

  const saveAndMoveToNextScreen = async () => {
    try {
      setIsSaving(true);
      await customSettingMigrationTaskWizardActions.setCsvFieldsList(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );
      setCurrentScreen(CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.MAPPING_SCREEN);
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
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
        <CustomSettingFileUploadComponent
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          setIsUploaded={setIsUploaded}
          isUploaded={isUploaded}
        />
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
          disabled={!isUploaded || isSaving || wizardModel?.getData("csvFields").length < 1}
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
