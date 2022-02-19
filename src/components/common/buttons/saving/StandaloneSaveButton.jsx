import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

// Note: this should only be used in special cases where Model-Wrapped objects don't make sense
function StandaloneSaveButton(
  {
    saveFunction,
    disable,
    type,
    size,
    className,
  }) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    try {
      setIsSaving(true);
      await saveFunction();
      toastContext.showSaveSuccessToast(type);
    }
    catch (error) {
      toastContext.showSaveFailureToast(type, error);
    }
    finally {
      setIsSaving(false);
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
};

StandaloneSaveButton.defaultProps = {
  size: "sm",
};

export default StandaloneSaveButton;