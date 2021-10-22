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
import {SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS} from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";

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
  }, [pipelineWizardModel]);

  const updateSelectedComponentTypes = async () => {
    try {
      setIsSaving(true);
      await salesforceBulkMigrationWizardActions.updateSelectedComponentTypesV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
      setPipelineWizardScreen(SALESFORCE_BULK_MIGRATION_WIZARD_SCREENS.CONFIRMATION_SCREEN);
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

    return true;
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