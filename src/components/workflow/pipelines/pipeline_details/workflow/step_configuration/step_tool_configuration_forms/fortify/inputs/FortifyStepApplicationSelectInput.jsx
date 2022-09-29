import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepApplicationSelectInput({ model, setModel, disabled, toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Application");
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setErrorMessage("");

    if (toolId) {
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
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setApplicationList([]);
      await fetchApplications(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Applications");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getApplications(
      getAccessToken,
      cancelSource,
      toolId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setApplicationList(result);
      setPlaceholderText("Select Application");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Applications found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"applicationId"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={applicationList}
      textField={"applicationName"}
      valueField={"applicationId"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepApplicationSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
};

export default FortifyStepApplicationSelectInput;
