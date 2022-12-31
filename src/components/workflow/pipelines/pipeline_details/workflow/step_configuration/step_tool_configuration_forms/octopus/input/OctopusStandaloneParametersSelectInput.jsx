import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const OctopusStandaloneParametersSelectInput = ({ value, setDataFunction, disabled }) => {
    
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [parametersList, setParametersList] = useState([]);
  const [placeholder, setPlaceholder] = useState("Select Parameters");


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
      setIsLoading(false);
    }
  };

  const fetchParametersDetails = async (cancelSource) => {
    try {
      let results = await parametersActions.getParameters(getAccessToken, cancelSource);
      if (isMounted?.current === true && results?.data?.data) {
        setParametersList(results.data.data);
        return;
      }
    } catch (error) {
      if (parametersList.length === 0) {
        setPlaceholder("No Parameters Found");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (    
    <StandaloneSelectInput
      selectOptions={parametersList ? parametersList : []}
      valueField={"_id"}
      textField={"name"}
      value={value}
      busy={isLoading}
      placeholderText={placeholder}
      setDataFunction={(data) => setDataFunction(data)}
      disabled={isLoading || (!isLoading && (parametersList == null || parametersList.length === 0))}
    />
  );
};

OctopusStandaloneParametersSelectInput.propTypes = {
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default OctopusStandaloneParametersSelectInput;
