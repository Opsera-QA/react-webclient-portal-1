import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyToolActions from "../fortify-tool-actions";

function FortifyPortalSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Fortify Portal");
  const [scanToolsList, setScanToolsList] = useState([]);

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
      setScanToolsList([]);
      await fetchFortifyScanTools(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Fortify Portals");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFortifyScanTools = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyToolActions.getPortals(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;
    if (Array.isArray(result) && result.length > 0) {
      setScanToolsList(result);
      setPlaceholderText("Select Fortify Portal");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Fortify Portals found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"url"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={scanToolsList}
      textField={"name"}
      valueField={"id"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyPortalSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FortifyPortalSelectInput;
