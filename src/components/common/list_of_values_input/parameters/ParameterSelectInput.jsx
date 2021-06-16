import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import axios from "axios";
import parametersActions from "../../../inventory/parameters/parameters-actions";
import MultiSelectInputBase from "../../inputs/select/MultiSelectInputBase";
import SelectInputBase from "../../inputs/select/SelectInputBase";

function ParameterSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop, pipelineId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [parameters, setParameters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Parameters");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchParametersDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const fetchParametersDetails = async (cancelSource) => {
    try {
      let results = await parametersActions.getParameters(getAccessToken, cancelSource);
      if (isMounted?.current === true && results?.data?.data) {
        let parameterResult = [];
        for (let item in results.data.data) {
          parameterResult.push(
            {
              parameterName: results.data.data[item].name,
              parameterId: results.data.data[item]._id
            }
          );
        }
        console.log(parameterResult);
        setParameters(parameterResult);
        return;
      }
    } catch (error) {
      if (parameters.length === 0) {
        setPlaceholder("No Parameters Found");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };


  return (
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={parameters}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (parameters == null || parameters.length === 0))}
      />
  );
}

ParameterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string
};

ParameterSelectInput.defaultProps = {
  valueField: "parameterId",
  textField: "parameterName",
  disabled: false
};

export default ParameterSelectInput;