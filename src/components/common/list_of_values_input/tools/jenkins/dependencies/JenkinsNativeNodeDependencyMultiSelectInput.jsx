import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const itemArray = [
  {
    name: "Node Version 16.19",
    dependencyType: "nodejs",
    version: "16.19",
  },
  {
    name: "Node Version 17.1",
    dependencyType: "nodejs",
    version: "17.1",
  },
  {
    name: "Node Version 18.12",
    dependencyType: "nodejs",
    version: "18.12",
  },
  {
    name: "Node Version 19.3",
    dependencyType: "nodejs",
    version: "19.3",
  },
];

// TODO: This code should be cleaned up.
//  If we need to support having dependencyType and version with a dash, make that an object property.
//  Stop constructing and deconstructing static objects-- these don't change so we can just make a constant out of it.
function JenkinsNativeNodeDependencyMultiSelectInput({
  fieldName,
  model,
  setModel,
  setDataFunction,
  clearDataFunction,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
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
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDependencyItemDisabled = () => {
    let disabledObj = [];
    if (model.getData(fieldName) && model.getData(fieldName).length > 0) {
      const selectedDependencyTypes = getSelectedDependencyTypes();
      itemArray.map((item) => {
        if (selectedDependencyTypes.includes(item.dependencyType)) {
          disabledObj.push(item);
        }
      });
      // remove selected items from this list and push
      let finalList = disabledObj.filter(
        ({ name, dependencyType, version }) =>
          !model
            .getData(fieldName)
            .some(
              (x) =>
                x.name === name &&
                x.dependencyType === dependencyType &&
                x.version === version,
            ),
      );
      setDisabledItems(finalList);
      return;
    }
    setDisabledItems(disabledObj);
  };

  const getSelectedDependencyTypes = () => {
    return model
      .getData(fieldName)
      .map((dependency) => dependency.dependencyType);
  };

  const getFilteredItems = () => {
    const currentData = DataParsingHelper.parseArray(
      model.getData(fieldName),
      [],
    );
    const selectedDependencyTypes = currentData.map(
      (dependency) => dependency.dependencyType,
    );
    const filteredArr = itemArray.filter(
        (dependency) =>
            !selectedDependencyTypes.includes(dependency.dependencyType),
    );
    return [...filteredArr, ...currentData];
  };

  const setFormatDataFunction = (fieldName, selectedOption) => {
    const dependenciesObject = {};
    const uniqueTypes = [
      ...new Map(selectedOption.map((item) => [item["name"], item])).values(),
    ];
    selectedOption.map((item) => {
      dependenciesObject[item.dependencyType] =
        item.dependencyType + "-" + item.version;
    });

    const finalObject = {
      dependencies: dependenciesObject,
      dependencyType: uniqueTypes,
    };

    if (setDataFunction) {
      setDataFunction(fieldName, finalObject);
    } else {
      model.setData(fieldName, finalObject);
      setModel({ ...model });
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      clearDataFunction={clearDataFunction}
      selectOptions={getFilteredItems()}
      setDataFunction={setFormatDataFunction}
      groupBy={"dependencyType"}
      // valueField={"version"}
      textField={"name"}
    />
  );
}

JenkinsNativeNodeDependencyMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default JenkinsNativeNodeDependencyMultiSelectInput;
