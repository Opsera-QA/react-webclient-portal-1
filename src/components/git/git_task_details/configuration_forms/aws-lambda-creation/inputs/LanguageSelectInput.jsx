import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import AWSLambdaFunctionActions from "../aws-lambda-actions";

function LanguageSelectInput({
                               fieldName,
                               dataObject,
                               setDataObject,
                               disabled,
                               textField,
                               valueField,
                               toolConfigId,
                               pipelineId,
                             }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Language");
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
  }, [toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
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

  const loadTypes = async (cancelSource) => {
    try {
      setLanguages([]);
      let res = await AWSLambdaFunctionActions.getLanguages(getAccessToken, cancelSource, dataObject);
      if (res && res.status === 200) {
        res = res.data;
      } else {
        res = [];
      }
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Languages Found");
          return;
        }
        setPlaceholder("Select an Language");
        setLanguages(res.data);
        return;
      }
      setPlaceholder("No Languages Found");
      setLanguages([]);
    } catch (error) {
      setPlaceholder("No Languages Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={languages}
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (languages == null || languages.length === 0))}
    />
  );
}

LanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolConfigId: PropTypes.string,
  pipelineId: PropTypes.string,
};

LanguageSelectInput.defaultProps = {
  fieldName: "runtime",
};

export default LanguageSelectInput;
