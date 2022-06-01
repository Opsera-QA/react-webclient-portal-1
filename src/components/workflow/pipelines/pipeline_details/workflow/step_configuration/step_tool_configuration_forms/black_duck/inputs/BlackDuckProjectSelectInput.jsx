import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import BlackDuckStepActions from "../blackduck-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function BlackDuckProjectSelectInput({ model, setModel, disabled, blackDuckToolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select BlackDuck Project");
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");

    if (hasStringValue(blackDuckToolId) === true) {
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
  }, [blackDuckToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setProjectsList([]);
      await fetchBlackduckProjects(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull BlackDuck Projects");
        setErrorMessage(`An Error Occurred Pulling BlackDuck Projects: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlackduckProjects = async (cancelSource = cancelTokenSource) => {

    const response = await BlackDuckStepActions.getProjects(
      getAccessToken,
      cancelSource,
      blackDuckToolId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setProjectsList(result);
      setPlaceholderText("Select BlackDuck Project");
    }

    if (result?.length === 0) {
      setPlaceholderText("No BlackDuck Projects found");
      setErrorMessage("No BlackDuck Projects found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"projectName"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={projectsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled || !blackDuckToolId}
    />
  );
}

BlackDuckProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  blackDuckToolId: PropTypes.string,
};

export default BlackDuckProjectSelectInput;
