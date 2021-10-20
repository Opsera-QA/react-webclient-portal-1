import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepForward} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import salesforceBulkMigrationWizardActions
  from "components/workflow/wizards/salesforce_bulk_migration/salesforceBulkMigrationWizard.actions";

function SalesforceBulkMigrationWizardSubmitComponentTypesButton({pipelineWizardModel, setPipelineWizardScreen, disable, size, className, icon}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setIsSaving(false);

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const updateSelectedComponentTypes = async () => {
    try {
      setIsSaving(true);
      const result = await salesforceBulkMigrationWizardActions.updateSelectedComponentTypesV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
      // TODO: Wire up confirmation screen

        // if (pipelineWizardModel.getData("fromGitTasks") === true) {
        //   setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR);
        // }
        // else if (pipelineWizardModel.getData("isOrgToOrg") === true) {
        //   setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR);
        // }
        // else {
        //   setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR);
        // }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setIsSaving(false);
    }
  };

  // TODO: Add showing info messages based on status
  const checkValidity = () => {
    if (isSaving) {
      return false;
    }

    if (pipelineWizardModel.getArrayData("selectedComponentTypes").length === 0) {
      return false;
    }
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return ("Saving Component Type List");
    }

    return ("Proceed with Selected Components");
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant="success"
          disabled={!checkValidity() || disable}
          onClick={() => updateSelectedComponentTypes()}
        >
          <span>
            <IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

SalesforceBulkMigrationWizardSubmitComponentTypesButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  disable: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

SalesforceBulkMigrationWizardSubmitComponentTypesButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SalesforceBulkMigrationWizardSubmitComponentTypesButton;