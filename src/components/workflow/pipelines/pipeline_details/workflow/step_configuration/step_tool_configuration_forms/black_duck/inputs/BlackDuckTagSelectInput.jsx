import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import BlackDuckStepActions from "../blackduck-step-actions";

function BlackDuckTagSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select BlackDuck Tag");
  const [tagsList, setTagsList] = useState([]);

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
      setTagsList([]);
      await fetchBlackDuckTags(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull BlackDuck Tags");
        setErrorMessage(`An Error Occurred Pulling BlackDuck Tags: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlackDuckTags = async (cancelSource = cancelTokenSource) => {

    const response = await BlackDuckStepActions.getTags(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setTagsList(result);
      setPlaceholderText("Select BlackDuck Tag");
    }

    if (result?.length === 0) {
      setPlaceholderText("No BlackDuck Tags found");
      setErrorMessage("No BlackDuck Tags found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"tag"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={tagsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

BlackDuckTagSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BlackDuckTagSelectInput;
