import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepReleaseSelectInput({ model, setModel, disabled, toolId, applicationId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Release");
  const [releaseList, setReleaseList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setErrorMessage("");
    if (applicationId) {
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
  }, [toolId, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setReleaseList([]);
      await fetchReleaseIds(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Releases");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReleaseIds = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getReleases(
      getAccessToken,
      cancelSource,
      toolId, 
      applicationId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setReleaseList(result);
      setPlaceholderText("Select Release");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Releases found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"releaseId"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={releaseList}
      textField={"releaseName"}
      valueField={"releaseId"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepReleaseSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
  applicationId: PropTypes.string,
};

export default FortifyStepReleaseSelectInput;
