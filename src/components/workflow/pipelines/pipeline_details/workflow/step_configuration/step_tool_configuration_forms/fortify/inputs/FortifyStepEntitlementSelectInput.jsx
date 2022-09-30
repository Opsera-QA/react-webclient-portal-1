import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepEntitlementSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Entitlement");
  const [entitlementsList, setEntitlementsList] = useState([]);

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
      setEntitlementsList([]);
      await fetchFortifyEntitlements(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Entitlements");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFortifyEntitlements = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getEntitlements(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setEntitlementsList(result);
      setPlaceholderText("Select Entitlement");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Entitlements found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"entitlementPreferenceType"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={entitlementsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepEntitlementSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FortifyStepEntitlementSelectInput;
