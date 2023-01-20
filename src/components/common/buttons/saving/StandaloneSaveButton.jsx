import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import axios from "axios";
import useComponentStateReference from "hooks/useComponentStateReference";

// Note: this should only be used in special cases where Model-Wrapped objects don't make sense
function StandaloneSaveButton(
  {
    saveFunction,
    disable,
    type,
    size,
    className,
    showToasts,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

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

  const getLabel = () => {
    return isSaving === true ? "Saving" : "Save";
  };

  return (
    <div className={className}>
      <Button
        size={size}
        disabled={isSaving || disable}
        onClick={() => persistRecord()}
      >
        <span>
          <IconBase
            isLoading={isSaving}
            icon={faSave}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

StandaloneSaveButton.propTypes = {
  saveFunction: PropTypes.func,
  disable: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  showToasts: PropTypes.bool,
};

StandaloneSaveButton.defaultProps = {
  size: "sm",
  showToasts: true,
};

export default StandaloneSaveButton;