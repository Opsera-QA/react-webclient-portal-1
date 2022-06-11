import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import snaplogicStepActions from "../snaplogic-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";

function SnaplogicProjectSpaceSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Snaplogic Project Space");
  const [projectSpacesList, setProjectSpacesList] = useState([]);

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
      setProjectSpacesList([]);
      await fetchSnaplogicProjectSpaces(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Snaplogic Project Spaces");
        setErrorMessage(`An Error Occurred Pulling Snaplogic Project Spaces: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSnaplogicProjectSpaces = async (cancelSource = cancelTokenSource) => {

    const {toolConfigId} = model.getPersistData();

    const response = await snaplogicStepActions.getProjectSpaces(
      getAccessToken,
      cancelSource,
      toolConfigId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setProjectSpacesList(result);
      setPlaceholderText("Select Snaplogic Project Space");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Snaplogic Project Spaces found");
      setErrorMessage("No Snaplogic Project Spaces found");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption.name);
    newModel.setData("project", "");
    setModel({ ...newModel });
  };

  const clearDataFunction = (fieldName) => {
    let newModel = { ...model };
    newModel.setData("projectSpace", "");
    newModel.setData("project", "");
    setModel({ ...newModel });
  };

  return (
    <SelectInputBase
      fieldName={"projectSpace"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={projectSpacesList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

SnaplogicProjectSpaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
};

export default SnaplogicProjectSpaceSelectInput;
