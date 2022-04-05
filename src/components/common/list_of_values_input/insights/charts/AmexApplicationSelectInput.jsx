import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";

function AmexApplicationSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  groupsDataObject,
  groupsSetDataObject,
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
    // let response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, "servicenow");
    // const toolList = response?.data?.data;
    const toolList = ["Build", "Scan", "Test", "Deploy"];

    if (isMounted?.current === true && toolList) {
      setTools(toolList);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...dataObject };
    newModel.setData(fieldName, selectedOption?._id);
    setDataObject({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...dataObject };
    // newModel.setData(fieldName, "");
    newModel.setData("value", "");
    setDataObject({ ...newModel });

    let newGroupsModel = { ...groupsDataObject };
    newGroupsModel.setData("value", "");
    groupsSetDataObject({ ...newGroupsModel });
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={tools}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled}
    />
  );
}

AmexApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
  groupsDataObject: PropTypes.object,
  groupsSetDataObject: PropTypes.func,
};

AmexApplicationSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default AmexApplicationSelectInput;
