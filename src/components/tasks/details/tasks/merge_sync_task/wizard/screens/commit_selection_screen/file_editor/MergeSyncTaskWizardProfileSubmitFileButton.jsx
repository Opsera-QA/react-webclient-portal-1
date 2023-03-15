import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faCheckSquare, faSave, faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function MergeSyncTaskWizardProfileSubmitFileButton(
  {
    saveFunction,
    disable,
    type,
    size,
    className,
    showToasts,
    icon,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const getLabel = () => {
    if (isSaving) {
      return ("Saving");
    }
    if (!disable) {
      return ("Unsaved Changes, Please click here to save.");
    }
    return ("Save");
  };

  const getIcon = () => {

    if (!disable) {
      return faExclamationTriangle;
    }
    return icon;
  };

  const getVariant = () => {
    if (!disable) {
      return "warning";
    }
    return "primary";
  };

  const persistRecord = async () => {
    try {
      setIsSaving(true);
      await saveFunction();

      if (showToasts !== false) {
        toastContext.showSaveSuccessToast(type);
      }
    }
    catch (error) {
      toastContext.showSaveFailureToast(type, error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className={className}>
      <Button
        size={size}
        variant={getVariant()}
        disabled={isSaving || disable}
        onClick={() => persistRecord()}
      >
        <span>
          <IconBase
            isLoading={isSaving}
            icon={getIcon()}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

MergeSyncTaskWizardProfileSubmitFileButton.propTypes = {
  saveFunction: PropTypes.func,
  disable: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  showToasts: PropTypes.bool,
  icon: PropTypes.object,
};

MergeSyncTaskWizardProfileSubmitFileButton.defaultProps = {
  size: "sm",
  showToasts: true,
  icon: faSave,
};

export default MergeSyncTaskWizardProfileSubmitFileButton;