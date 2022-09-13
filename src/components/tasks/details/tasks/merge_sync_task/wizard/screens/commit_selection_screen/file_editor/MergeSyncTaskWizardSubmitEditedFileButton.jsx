import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faCheckSquare, faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { xmlHelpers } from "utils/xml.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";

function MergeSyncTaskWizardSubmitEditedFileButton(
  {
    wizardModel,
    comparisonFileModel,
    fileName,
    fileContent,
    disabled,
    size,
    className,
    icon,
    isLoading,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setIsSaving(false);
    setIsSubmitted(false);
  }, [fileContent, fileName]);

  const submitSelectedFile = async () => {
    try {
      setIsSaving(true);

      if (comparisonFileModel?.getData("language") === "xml") {
        const isXmlValid = xmlHelpers.isXmlValid(fileContent);

        if (isXmlValid !== true) {
          toastContext.showInlineErrorMessage("The XML is Invalid. Cannot proceed.");
          setIsSubmitted(false);
          setIsSaving(false);
          return;
        }
      }

      const response = await mergeSyncTaskWizardActions.updateSelectedFileContent(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        fileName,
        fileContent,
      );
      if (isMounted?.current === true && response) {
        setIsSubmitted(true);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  if (comparisonFileModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSubmitted) {
      return ("Saved Edited File");
    }

    if (isSaving) {
      return ("Saving Edited File");
    }

    return ("Validate and Submit Edited File");
  };

  if (hasStringValue(fileName) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button
          size={size}
          variant={isSubmitted === true ? "success" : "primary"}
          disabled={isSubmitted === true || disabled === true || isSaving === true || isLoading === true}
          onClick={submitSelectedFile}
        >
          <span>
            <IconBase
              isLoading={isSaving}
              icon={isSubmitted === true ? faCheckSquare : icon}
              className={"mr-2"}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSubmitEditedFileButton.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  fileName: PropTypes.string,
  fileContent: PropTypes.string,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

MergeSyncTaskWizardSubmitEditedFileButton.defaultProps = {
  size: "sm",
  icon: faQuestionCircle,
};

export default MergeSyncTaskWizardSubmitEditedFileButton;