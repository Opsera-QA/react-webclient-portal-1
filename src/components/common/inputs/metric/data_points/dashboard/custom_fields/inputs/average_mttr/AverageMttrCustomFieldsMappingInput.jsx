import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import averageMttrCustomFieldsMappingMetadata from "./averageMttrCustomFieldsMapping.metadata";
import customFieldsStepActions from "../../customFields-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function AverageMttrCustomFieldsMappingInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [mappedFieldsModel, setMappedFieldsModel] = useState(undefined);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Mapping Field");
  const [customFieldList, setCustomFieldList] = useState([]);

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

  useEffect(() => {
    if (model) {
      const mappedFields = model?.getData(fieldName);
      const newModel = modelHelpers.parseObjectIntoModel(mappedFields, averageMttrCustomFieldsMappingMetadata);
      setMappedFieldsModel({ ...newModel });
    }
  }, [model]);

  const loadData = async (cancelSource = cancelTokenSource) => {    
    try {
      setIsLoading(true);
      setCustomFieldList([]);
      await fetchCustomFields(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Custom Fields");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomFields = async (cancelSource = cancelTokenSource) => {

    const response = await customFieldsStepActions.getJiraCustomFields(
      getAccessToken,
      cancelSource
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setCustomFieldList(result);
      setPlaceholderText("Select Mapping Field");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Custom Fields found");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {    
    let newMappedFieldsModel = { ...mappedFieldsModel };
    newMappedFieldsModel.setData(fieldName, selectedOption);    
    setMappedFieldsModel({ ...newMappedFieldsModel });
    let newModel = {...model};
    newModel.setData("mappedFields", newMappedFieldsModel.getPersistData());
    setModel({...newModel});
  };

  if (model == null || mappedFieldsModel == null) {
    return null;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={"startTimestamp"}
        selectOptions={customFieldList}
        dataObject={mappedFieldsModel}
        setDataObject={setMappedFieldsModel}
        valueField={"key"}
        textField={"name"}
        setDataFunction={setDataFunction}
        busy={isLoading}
        placeholderText={placeholderText}
        error={errorMessage}
      />
      <SelectInputBase
        fieldName={"endTimestamp"}
        selectOptions={customFieldList}
        dataObject={mappedFieldsModel}
        setDataObject={setMappedFieldsModel}
        valueField={"key"}
        textField={"name"}
        setDataFunction={setDataFunction}
        busy={isLoading}
        placeholderText={placeholderText}
        error={errorMessage}
      />
    </div>
  );
}

AverageMttrCustomFieldsMappingInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AverageMttrCustomFieldsMappingInput.defaultProps = {
  fieldName: "mappedFields",
};

export default AverageMttrCustomFieldsMappingInput;
