import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import { hasStringValue } from "../../../../../../../../common/helpers/string-helpers";
import dataSeedingTaskWizardActions from "../../../dataSeedingTaskWizard.actions";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";
import NameSpacePrefixListView from "../panels/NameSpacePrefixListView";

function DataSeedingManagedPackageListSelectInput({
  wizardModel,
  setWizardModel,
  customObject,
  disabled
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [managedPackageList, setManagedPackageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setManagedPackageList([]);
    setError(undefined);

    if (hasStringValue(customObject) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [customObject]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadManagedPackageList(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadManagedPackageList = async (cancelSource = cancelTokenSource) => {
    const response = await dataSeedingTaskWizardActions.getManagedPackageList(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("taskId"),
      wizardModel,
      customObject,
    );
    const managedPackageList = response?.data?.message;
    const filteredArray = managedPackageList.filter(
      (obj) =>
        !wizardModel
          ?.getData("selectedCustomSetting")
          ?.componentName?.startsWith(obj.namespacePrefix),
    );
    const uniqueManagedPackageList = [
      ...new Set(filteredArray.map((item) => item.name)),
    ];

    if (isMounted?.current === true && Array.isArray(managedPackageList)) {

      let newWizardModel = { ...wizardModel };
      newWizardModel.setData("selectedFieldList", []);
      newWizardModel.setData("filterQuery", "");
      newWizardModel.setData("selectedManagedPackageList", []);
      newWizardModel.setData("managedPackageList", managedPackageList);
      setWizardModel({ ...newWizardModel });
      setManagedPackageList(uniqueManagedPackageList);
    }
  };

  const setSelectedManagedPackageKey = (field, selectedOption) => {
    let newWizardModel = { ...wizardModel };
    newWizardModel.setData("selectedManagedPackageKey", selectedOption);
    setWizardModel({ ...newWizardModel });
  };

  const setClearManagedPackageKey = (field, selectedOption) => {
    let newWizardModel = { ...wizardModel };
    newWizardModel.setData("selectedManagedPackageKey", "");
    newWizardModel.setData("selectedManagedPackageList", []);
    setWizardModel({ ...newWizardModel });
  };

  return (
    <>
      <SelectInputBase
        fieldName={"selectedManagedPackageKey"}
        selectOptions={managedPackageList}
        dataObject={wizardModel}
        setDataObject={setWizardModel}
        setDataFunction={setSelectedManagedPackageKey}
        clearDataFunction={setClearManagedPackageKey}
        valueField={"name"}
        textField={"name"}
        placeholderText={"Select Managed Package"}
        busy={isLoading}
        disabled={disabled}
      />
      {wizardModel?.getData("selectedManagedPackageKey") &&
      wizardModel?.getData("selectedManagedPackageKey")?.length > 0 ? (
          <>
            <NameSpacePrefixListView
              wizardModel={wizardModel}
              setWizardModel={setWizardModel}
            />
          </>
        ) : null}
    </>
  );
}

DataSeedingManagedPackageListSelectInput.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  customObject: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DataSeedingManagedPackageListSelectInput;
