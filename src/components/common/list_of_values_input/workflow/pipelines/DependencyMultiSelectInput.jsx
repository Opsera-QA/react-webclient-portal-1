import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

export const itemArray = [
  {
    "name": "Node Version 10",
    "dependencyType" : "node",
    "version": "10",
  },
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
  },

  {
    "name": "Terraform Version 0.11.14",
    "dependencyType" : "terraform",
    "version": "0.11.14",
  },
  {
    "name": "Terraform Version 0.12.30",
    "dependencyType" : "terraform",
    "version": "0.12.30",
  },
  {
    "name": "Terraform Version 0.13.6",
    "dependencyType" : "terraform",
    "version": "0.13.6",
  },
  {
    "name": "Terraform Version 0.14.6",
    "dependencyType" : "terraform",
    "version": "0.14.6",
  },

  {
    "name": "Terrascan Version 1.4.0",
    "dependencyType" : "terrascan",
    "version": "1.4.0",
  },
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
    "name": "Java openJDK Version 12",
    "dependencyType" : "java",
    "version": "12",
  },
  {
    "name": "Java openJDK Version 13",
    "dependencyType" : "java",
    "version": "13",
  },
  {
    "name": "Java openJDK Version 14",
    "dependencyType" : "java",
    "version": "14",
  },
  {
    "name": "Java openJDK Version 15",
    "dependencyType" : "java",
    "version": "15",
  },

  {
    "name": "Gradle Version 1.0",
    "dependencyType" : "gradle",
    "version": "1.0",
  },
  {
    "name": "Gradle Version 2.14.1",
    "dependencyType" : "gradle",
    "version": "2.14.1",
  },
  {
    "name": "Gradle Version 3.5",
    "dependencyType" : "gradle",
    "version": "3.5",
  },
  {
    "name": "Gradle Version 4.10.2",
    "dependencyType" : "gradle",
    "version": "4.10.2",
  },
  {
    "name": "Gradle Version 5.6",
    "dependencyType" : "gradle",
    "version": "5.6",
  },
  {
    "name": "Gradle Version 6.7",
    "dependencyType" : "gradle",
    "version": "6.7",
  },
  {
    "name": "Gradle Version 6.8",
    "dependencyType" : "gradle",
    "version": "6.8",
  },
  {
    "name": "Gradle Version 6.8.1",
    "dependencyType" : "gradle",
    "version": "6.8.1",
  },
  {
    "name": "Gradle Version 6.8.2",
    "dependencyType" : "gradle",
    "version": "6.8.2",
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
    "name": "Ant Version 1.9.7",
    "dependencyType" : "ant",
    "version": "1.9.7",
  }, {
    "name": "Ant Version 1.9.8",
    "dependencyType" : "ant",
    "version": "1.9.8",
  }, {
    "name": "Ant Version 1.9.9",
    "dependencyType" : "ant",
    "version": "1.9.9",
  }, {
    "name": "Ant Version 1.9.10",
    "dependencyType" : "ant",
    "version": "1.9.10",
  }, {
    "name": "Ant Version 1.9.11",
    "dependencyType" : "ant",
    "version": "1.9.11",
  }, {
    "name": "Ant Version 1.9.12",
    "dependencyType" : "ant",
    "version": "1.9.12",
  }, {
    "name": "Ant Version 1.9.13",
    "dependencyType" : "ant",
    "version": "1.9.13",
  }, {
    "name": "Ant Version 1.9.14",
    "dependencyType" : "ant",
    "version": "1.9.14",
  }, {
    "name": "Ant Version 1.9.15",
    "dependencyType" : "ant",
    "version": "1.9.15",
  }, {
    "name": "Ant Version 1.10.0",
    "dependencyType" : "ant",
    "version": "1.10.0",
  }, {
    "name": "Ant Version 1.10.1",
    "dependencyType" : "ant",
    "version": "1.10.1",
  }, {
    "name": "Ant Version 1.10.2",
    "dependencyType" : "ant",
    "version": "1.10.2",
  }, {
    "name": "Ant Version 1.10.3",
    "dependencyType" : "ant",
    "version": "1.10.3",
  }, {
    "name": "Ant Version 1.10.4",
    "dependencyType" : "ant",
    "version": "1.10.4",
  }, {
    "name": "Ant Version 1.10.5",
    "dependencyType" : "ant",
    "version": "1.10.5",
  }, {
    "name": "Ant Version 1.10.6",
    "dependencyType" : "ant",
    "version": "1.10.6",
  }, {
    "name": "Ant Version 1.10.7",
    "dependencyType" : "ant",
    "version": "1.10.7",
  },
  {
    "name": "Ant Version 1.10.8",
    "dependencyType" : "ant",
    "version": "1.10.8",
  },

  {
    "name": ".NET Version 2.1",
    "dependencyType" : "dotnet",
    "version": "2.1",
  },
  {
    "name": ".NET Version 3.1",
    "dependencyType" : "dotnet",
    "version": "3.1",
  },
  {
    "name": ".NET Version 5.0",
    "dependencyType" : "dotnet",
    "version": "5.0",
  },
  {
    "name": ".NET Version 6.0",
    "dependencyType" : "dotnet",
    "version": "6.0",
  },
  {
    "name": "Python 2",
    "dependencyType" : "python",
    "version": "2.0",
  },
  {
    "name": "Python 3",
    "dependencyType" : "python",
    "version": "3.0",
  },

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
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={itemArray}
      setDataFunction={setDataFunction}
      groupBy="dependencyType"
      // valueField="version"
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