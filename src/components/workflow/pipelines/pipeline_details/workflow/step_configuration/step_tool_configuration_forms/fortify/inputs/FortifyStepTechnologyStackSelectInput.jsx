import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepTechnologyStackSelectInput({ model, setModel, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Technology Stack");
  const [technologyStackList, setTechnologyStackList] = useState([]);

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
      setTechnologyStackList([]);
      await fetchTechnologyStacks(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Technology Stacks");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTechnologyStacks = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getTechnologyStack(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setTechnologyStackList(result);
      setPlaceholderText("Select Technology Stack");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Technology Stacks found");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {    
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.name);
    newModel.setDefaultValue("languageLevelId");    
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      fieldName={"technologyStackId"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={technologyStackList}
      setDataFunction={setDataFunction}
      textField={"name"}
      valueField={"name"}  
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepTechnologyStackSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FortifyStepTechnologyStackSelectInput;
