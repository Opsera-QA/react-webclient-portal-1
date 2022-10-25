import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import {persistUpdatedRecord} from "./saving-helpers-v2";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

function VanitySaveButtonBase({model, disable, size, showSuccessToasts, className, customLabel, showTypeOnLabel}) {
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistUpdatedRecord(model, toastContext, showSuccessToasts);

    if (isMounted.current === true) {
      setIsSaving(false);
    }
  };

  const getLabel = () => {
    if (isSaving) {
      return ("Saving");
    }

    if (customLabel) {
      return (customLabel);
    }

    if (showTypeOnLabel) {
      return (`Save ${model.getType()}`);
    }

    return ("Save");
  };

  if (model == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        size={size}
        variant={"primary"}
        disabled={
          isSaving === true
            || disable === true
            || model?.canUpdate() !== true
            || (model.isLenient() !== true && (model.isChanged() === false || model.checkCurrentValidity() === false))
        }
        onClick={() => persistRecord()}
      >
        <span><IconBase isLoading={isSaving} icon={faSave} fixedWidth className="mr-2"/>{getLabel()}</span>
      </Button>
    </div>
  );
}

VanitySaveButtonBase.propTypes = {
  model: PropTypes.object,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool
};

VanitySaveButtonBase.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true
};

export default VanitySaveButtonBase;