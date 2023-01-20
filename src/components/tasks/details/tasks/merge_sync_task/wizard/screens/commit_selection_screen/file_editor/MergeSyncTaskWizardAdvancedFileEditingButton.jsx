import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faPencil, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function MergeSyncTaskWizardAdvancedFileEditingButton(
  {
    comparisonFileModel,
    setComparisonFileModel,
    inEditingMode,
    setInEditingMode,
    disabled,
    size,
    className,
    isLoading,
  }) {
  const destinationContent = comparisonFileModel?.getData("destinationContent");
  const fileIsDeleted = hasStringValue(destinationContent) !== true;

  const getButtonText = () => {
    if (inEditingMode === true) {
      return "Cancel Advanced Editing Mode";
    }

    return "Advanced Editing Mode";
  };

  const triggerInlineEditingFunction = () => {
    setInEditingMode(!inEditingMode);
    const fileContent = comparisonFileModel?.getData("destinationContent");
    comparisonFileModel?.setData("manualContent", fileContent);
    comparisonFileModel?.setData("fileContentFieldName", "destinationContent");
    setComparisonFileModel({ ...comparisonFileModel });
  };

  if (comparisonFileModel == null || setInEditingMode == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <TooltipWrapper
          innerText={fileIsDeleted === true ? "Cannot edit files that have been deleted." : undefined}
        >
          <div>
            <Button
              size={size}
              variant={"outline-secondary"}
              disabled={
                // comparisonFileModel?.getData("whitelisted") !== true // TODO: Change whitelisted to check if whitelisting is false to properly disable when support is added in the microservice
                // ||
                disabled === true
                || isLoading === true
                || fileIsDeleted === true
              }
              onClick={triggerInlineEditingFunction}
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
        </TooltipWrapper>
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
  setComparisonFileModel: PropTypes.func,
};

MergeSyncTaskWizardAdvancedFileEditingButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};