import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faPencil, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function MergeSyncTaskWizardAdvancedFileEditingButton(
  {
    comparisonFileModel,
    inEditingMode,
    setInEditingMode,
    disabled,
    size,
    className,
    isLoading,
  }) {
  const getButtonText = () => {
    if (inEditingMode === true) {
      return "Cancel Advanced Editing Mode";
    }

    return "Advanced Editing Mode";
  };

  if (comparisonFileModel == null || setInEditingMode == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={"outline-secondary"}
          disabled={
            comparisonFileModel?.getData("whitelisted") === true // TODO: Change whitelisted to check if whitelisting is false to properly disable when support is added in the microservice
            || disabled === true
            || isLoading === true
          }
          onClick={() => setInEditingMode(!inEditingMode)}
        >
          <span>
            <IconBase
              isLoading={isLoading}
              icon={faPencil}
              className={"mr-2"}
            />
            {getButtonText()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardAdvancedFileEditingButton.propTypes = {
  comparisonFileModel: PropTypes.object,
  inEditingMode: PropTypes.bool,
  setInEditingMode: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

MergeSyncTaskWizardAdvancedFileEditingButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardAdvancedFileEditingButton;