import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineActions from "components/workflow/pipeline-actions";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";

function ServiceNowToolsSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  disabled,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

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
      await getTools(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTools = async (cancelSource = cancelTokenSource) => {
    let response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, "servicenow");
    const toolList = response?.data;

    if (isMounted?.current === true && toolList) {
      setTools(toolList);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...dataObject};
    newModel.setData(fieldName, selectedOption?._id);
    // TODO: Harsha, you need to set the value here.
    // newModel.setData("", "");
    setDataObject({...newModel});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={tools}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled}
    />
  );
}

ServiceNowToolsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
};

ServiceNowToolsSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowToolsSelectInput;
