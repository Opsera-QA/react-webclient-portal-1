import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

export const itemArray = [
  {
    "name": "Node Version 12",
    "dependencyType" : "node",
    "version": "12",
  },
  {
    "name": "Node Version 14",
    "dependencyType" : "node",
    "version": "14",
  },
  {
    "name": "Node Version 15",
    "dependencyType" : "node",
    "version": "15",
  }
];

function DependencyMultiSelectInput({ fieldName, dataObject, setDataObject, setDataFunction }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [disabledItems, setDisabledItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [dataObject.getData(fieldName)]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      // await loadDependencies();
      isDependencyItemDisabled();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const isDependencyItemDisabled = () => {
    let disabledObj = [];
    if (dataObject.getData(fieldName) && dataObject.getData(fieldName).length > 0) {
      const selectedDependencyTypes = getSelectedDependencyTypes();
      itemArray.map(item => {
        if(selectedDependencyTypes.includes(item.dependencyType)){
          disabledObj.push(item);
        }
      });
      // remove selected items from this list and push
      let finalList = disabledObj.filter(({name, dependencyType, version}) => !dataObject.getData(fieldName).some(x => x.name === name && x.dependencyType === dependencyType && x.version === version));
      setDisabledItems(finalList);
      return;
    }
    setDisabledItems(disabledObj);
  };

  const getSelectedDependencyTypes = () => {
    return dataObject.getData(fieldName).map((dependency) => dependency.dependencyType);
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={itemArray}
      setDataFunction={setDataFunction}
      groupBy="dependencyType"
      valueField="version"
      textField="name"
      disabled={disabledItems}
    />
  );
}

DependencyMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default DependencyMultiSelectInput;