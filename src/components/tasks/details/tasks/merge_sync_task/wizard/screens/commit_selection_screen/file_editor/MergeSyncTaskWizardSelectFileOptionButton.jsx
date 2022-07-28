import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faPencil, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

function MergeSyncTaskWizardSelectFileOptionButton(
  {
    comparisonFileModel,
    setComparisonFileModel,
    fileContentFieldName,
    buttonText,
    disabled,
    size,
    className,
    isLoading,
  }) {
  const setSelectedFileContent = () => {
    const fileContent = comparisonFileModel?.getData(fileContentFieldName);
    comparisonFileModel?.setData("manualContent", fileContent);
    comparisonFileModel?.setData("fileContentFieldName", fileContentFieldName);
    setComparisonFileModel({...comparisonFileModel});
  };

  if (hasStringValue(fileContentFieldName) !== true || comparisonFileModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={"primary"}
          disabled={disabled || hasStringValue(comparisonFileModel?.getData(fileContentFieldName)) !== true}
          onClick={setSelectedFileContent}
        >
          <span>
            <IconBase
              isLoading={isLoading}
              icon={faPencil}
              className={"mr-2"}
            />
            {buttonText}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSelectFileOptionButton.propTypes = {
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileContentFieldName: PropTypes.string,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

MergeSyncTaskWizardSelectFileOptionButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardSelectFileOptionButton;