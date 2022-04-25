import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput(
  {
    fieldName,
    ruleModel,
    setRuleModel,
    disabled,
    showLabel,
    className,
    pipelineStorageRecordId,
    ruleFieldName,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ruleValues, setRuleValues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setRuleValues([]);

    if (isMongoDbId(pipelineStorageRecordId) === true && hasStringValue(ruleFieldName) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineStorageRecordId, ruleFieldName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRuleValues(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(`Could not load values for the field ${ruleFieldName}.`);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRuleValues = async (cancelSource = cancelTokenSource) => {
      const response = await mergeSyncTaskWizardActions.pullSourceFileRuleValuesV2(
        getAccessToken,
        cancelSource,
        pipelineStorageRecordId,
        ruleFieldName
      );
      const newRuleValues = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(newRuleValues)) {
        setRuleValues(newRuleValues);
      }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Rule Values";
  };

  return (
    <MultiSelectInputBase
      showLabel={showLabel}
      className={className}
      selectOptions={[...ruleValues]}
      dataObject={ruleModel}
      setDataObject={setRuleModel}
      fieldName={fieldName}
      placeholderText={"Select Rule Values"}
      textField={"id"}
      valueField={"id"}
      busy={isLoading}
      placeholder={getPlaceholderText()}
      disabled={disabled || isLoading}
    />
  );
}

MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput.propTypes = {
  ruleModel: PropTypes.object,
  setRuleModel: PropTypes.func,
  fieldName: PropTypes.string,
  pipelineStorageRecordId: PropTypes.string,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ruleFieldName: PropTypes.string,
};

MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput.defaultProps = {
  fieldName: "values"
};

export default MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput;