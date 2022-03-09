import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import IconBase from "components/common/icons/IconBase";

function PipelineUsageToolSelectInput({ placeholderText, fieldName, dataObject, setDataObject, setDataFunction, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelineUsageTools, setPipelineUsageTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await loadToolIdentifiers(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadToolIdentifiers = async (cancelSource = cancelTokenSource) => {
    const response = await toolIdentifierActions.getPipelineUsageToolIdentifiersV2(getAccessToken, cancelSource);
    const identifiers  = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(identifiers)) {
      setPipelineUsageTools(identifiers);
    }
  };

  if (!isLoading && (pipelineUsageTools == null || pipelineUsageTools.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
        No tool identifiers are active and registered for Pipeline use.
      </div>
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={pipelineUsageTools}
      setDataFunction={setDataFunction}
      busy={isLoading}
      groupBy={(tool) => capitalizeFirstLetter(tool?.tool_type_name, " ", "Undefined Type")}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

PipelineUsageToolSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

PipelineUsageToolSelectInput.defaultProps = {
  textField: "name",
  valueField: "identifier"
};

export default PipelineUsageToolSelectInput;