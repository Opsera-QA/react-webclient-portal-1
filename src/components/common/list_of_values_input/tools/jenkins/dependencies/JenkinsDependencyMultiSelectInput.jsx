import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

export const itemArray = [
  {
    "name": "Java openJDK Version 7",
    "dependencyType" : "java",
    "version": "7",
  },
  {
    "name": "Java openJDK Version 8",
    "dependencyType" : "java",
    "version": "8",
  },
  {
    "name": "Java openJDK Version 9",
    "dependencyType" : "java",
    "version": "9",
  },
  {
    "name": "Java openJDK Version 10",
    "dependencyType" : "java",
    "version": "10",
  },
  {
    "name": "Java openJDK Version 11",
    "dependencyType" : "java",
    "version": "11",
  },
  {
    "name": "Maven Version 3.0.5",
    "dependencyType" : "maven",
    "version": "3.0.5",
  }, 
  {
    "name": "Maven Version 3.1.1",
    "dependencyType" : "maven",
    "version": "3.1.1",
  },
  {
    "name": "Maven Version 3.2.5",
    "dependencyType" : "maven",
    "version": "3.2.5",
  },
  {
    "name": "Maven Version 3.3.9",
    "dependencyType" : "maven",
    "version": "3.3.9",
  },
  {
    "name": "Maven Version 3.5.0",
    "dependencyType" : "maven",
    "version": "3.5.0",
  },
  {
    "name": "Maven Version 3.5.2",
    "dependencyType" : "maven",
    "version": "3.5.2",
  },
  {
    "name": "Maven Version 3.5.3",
    "dependencyType" : "maven",
    "version": "3.5.3",
  },
  {
    "name": "Maven Version 3.5.4",
    "dependencyType" : "maven",
    "version": "3.5.4",
  },
  {
    "name": "Maven Version 3.6.0",
    "dependencyType" : "maven",
    "version": "3.6.0",
  },
  {
    "name": "Maven Version 3.6.1",
    "dependencyType" : "maven",
    "version": "3.6.1",
  },
  {
    "name": "Maven Version 3.6.2",
    "dependencyType" : "maven",
    "version": "3.6.2",
  },
  {
    "name": "Maven Version 3.6.3",
    "dependencyType" : "maven",
    "version": "3.6.3",
  },
  {
    "name": "Maven Version 3.8.2",
    "dependencyType" : "maven",
    "version": "3.8.2",
  },

];

// TODO: This code should be cleaned up.
//  If we need to support having dependencyType and version with a dash, make that an object property.
//  Stop constructing and deconstructing static objects-- these don't change so we can just make a constant out of it.
function JenkinsDependencyMultiSelectInput({ fieldName, model, setModel, setDataFunction }) {
  const toastContext = useContext(DialogToastContext);
  const [disabledItems, setDisabledItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [model.getData(fieldName)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
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
    if (model.getData(fieldName) && model.getData(fieldName).length > 0) {
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
    return model?.getData(fieldName).map((dependency) => dependency.dependencyType);
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={itemArray}
      setDataFunction={setDataFunction}
      groupBy="dependencyType"
      // valueField="version"
      textField="name"
      disabled={disabledItems}
    />
  );
}

JenkinsDependencyMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default JenkinsDependencyMultiSelectInput;