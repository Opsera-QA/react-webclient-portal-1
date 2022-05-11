import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faCheckSquare, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import axios from "axios";

function MergeSyncTaskWizardSelectDeltaVersionButton(
  {
    selectDeltaFunction,
    disabled,
    size,
    className,
    icon,
    isLoading,
    selected,
    buttonText,
    savingButtonText,
    savedButtonText,
  }) {
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

  const getLabel = () => {
    if (selected) {
      return (savedButtonText);
    }

    if (isSaving) {
      return (savingButtonText);
    }

    return (buttonText);
  };

  if (selectDeltaFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={selected === true ? "success" : "primary"}
          disabled={disabled === true || isLoading === true || selected === true}
          onClick={selectDeltaFunction}
        >
          <span>
            <IconBase
              isLoading={isSaving}
              icon={selected === true ? faCheckSquare : icon}
              className={"mr-2"}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSelectDeltaVersionButton.propTypes = {
  selectDeltaFunction: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  selected: PropTypes.bool,
  buttonText: PropTypes.string,
  savingButtonText: PropTypes.string,
  savedButtonText: PropTypes.string,
};

MergeSyncTaskWizardSelectDeltaVersionButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardSelectDeltaVersionButton;