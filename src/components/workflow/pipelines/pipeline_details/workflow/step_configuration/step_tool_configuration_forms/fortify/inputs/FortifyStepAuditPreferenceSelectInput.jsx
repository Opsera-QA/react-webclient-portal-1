import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepAuditPreferenceSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Audit Preference");
  const [auditPreferenceList, setAuditPreferenceList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setErrorMessage("");

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
      setAuditPreferenceList([]);
      await fetchAuditPreferences(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Audit Preferences");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuditPreferences = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getAuditPreference(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setAuditPreferenceList(result);
      setPlaceholderText("Select Audit Preference");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Audit Preferences found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"auditPreferenceId"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={auditPreferenceList}      
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepAuditPreferenceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FortifyStepAuditPreferenceSelectInput;
