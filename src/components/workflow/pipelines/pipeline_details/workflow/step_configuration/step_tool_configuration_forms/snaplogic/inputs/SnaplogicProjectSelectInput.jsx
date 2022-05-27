import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import snaplogicStepActions from "../snaplogic-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function SnaplogicProjectSelectInput({ model, setModel, disabled, toolConfigId, projectSpace }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Snaplogic Project");
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");

    if (hasStringValue(toolConfigId) === true && hasStringValue(projectSpace) === true) {
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
  }, [toolConfigId, projectSpace]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setProjectsList([]);
      await fetchSnaplogicProjects(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Snaplogic Projects");
        setErrorMessage(`An Error Occurred Pulling Snaplogic Projects: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSnaplogicProjects = async (cancelSource = cancelTokenSource) => {

    const response = await snaplogicStepActions.getProjects(
      getAccessToken,
      cancelSource,
      toolConfigId,
      projectSpace
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setProjectsList(result);
      setPlaceholderText("Select Snaplogic Project");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Snaplogic Projects found");
      setErrorMessage("No Snaplogic Projects found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"project"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={projectsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled || !toolConfigId || !projectSpace}
    />
  );
}

SnaplogicProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
  projectSpace: PropTypes.string,
};

export default SnaplogicProjectSelectInput;
