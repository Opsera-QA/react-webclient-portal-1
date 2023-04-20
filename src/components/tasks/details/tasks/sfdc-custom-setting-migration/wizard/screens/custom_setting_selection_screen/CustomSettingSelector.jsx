import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { parseError } from "components/common/helpers/error-helpers";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const CustomSettingSelector = ({ wizardModel, setWizardModel }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [customSettingsList, setCustomSettingsList] = useState([]);
  // const [customSettingsList, setCustomSettingsList] = useState([
  //   {
  //     committedFile: "String",
  //     committedFileId: "String",
  //   },
  // ]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setCustomSettingsList([]);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await handleCustomSettingListPolling(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleCustomSettingListPolling = async (
    cancelSource = cancelTokenSource,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const newFileList = await getCustomSettingsList(cancelSource);

    if (
      !Array.isArray(newFileList) &&
      count <= 5 &&
      filePullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await handleCustomSettingListPolling(cancelSource, count + 1);
    }
  };

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const getCustomSettingsList = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    const response =
      await customSettingMigrationTaskWizardActions.pullCustomSettingsList(
        getAccessToken,
        cancelSource,
        wizardModel,
      );
    const errorMessage = response?.data?.data?.errorMessage;
    const customSettingsList = response?.data?.data?.objectList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Custom Settings List: ${parsedError}`,
        );
      }

      if (Array.isArray(customSettingsList)) {
        setCustomSettingsList(customSettingsList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return customSettingsList;
  };

  const setSelectedCustomSettingFunc = (fieldName, selectedOption) => {
    let newWizardModel = { ...wizardModel };
    newWizardModel.setData(fieldName, selectedOption);
    setWizardModel({ ...newWizardModel });
  };

  console.log(customSettingsList);

  const getSelectView = () => {
    // if (wizardModel?.getData("selectedCustomSetting")) {
    //   return (
    //     <>
    //       Selected Custom Object :{" "}
    //       {wizardModel?.getData("selectedCustomSetting")?.committedFile}
    //     </>
    //   );
    // }
    return (
      <SelectInputBase
        fieldName={"selectedCustomSetting"}
        selectOptions={customSettingsList}
        dataObject={wizardModel}
        setDataObject={setWizardModel}
        setDataFunction={setSelectedCustomSettingFunc}
        textField={"componentName"}
        busy={isLoading}
        placeholderText={"Select a Custom Setting"}
        disabled={isLoading}
      />
    );
  };

  return <div>{getSelectView()}</div>;
};

CustomSettingSelector.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingSelector;
