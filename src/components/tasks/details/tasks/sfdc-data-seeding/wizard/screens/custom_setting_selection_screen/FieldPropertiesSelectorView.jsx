import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { parseError } from "components/common/helpers/error-helpers";
import dataSeedingTaskWizardActions from "../../dataSeedingTaskWizard.actions";
import CenterLoadingIndicator from "../../../../../../../common/loading/CenterLoadingIndicator";
import FieldSelectorBasePanel from "./panels/FieldSelectorBasePanel";

const FieldPropertiesSelectorView = ({ wizardModel, setWizardModel, handleClose, setCurrentScreen }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dependentObjectList, setDependentObjectList] = useState([]);
  const [selectedDependentList, setSelectedDependentList] = useState(wizardModel?.getData("selectedDependentObjectList"));
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
    setDependentObjectList([]);

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
  }, [wizardModel?.getData("selectedCustomSetting")]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await handleFieldPropertiesListPolling(cancelSource);
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

  const handleFieldPropertiesListPolling = async (
    cancelSource = cancelTokenSource,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const newFileList = await getFieldPropertiesList(cancelSource);

    if (
      !Array.isArray(newFileList) &&
      count <= 5 &&
      filePullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await handleFieldPropertiesListPolling(cancelSource, count + 1);
    }
  };

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const getFieldPropertiesList = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    const response =
      await dataSeedingTaskWizardActions.pullDependentObjectList(
        getAccessToken,
        cancelSource,
        wizardModel,
      );
    const errorMessage = response?.data?.data?.errorMessage;
    const dependentObjectList = response?.data?.data?.dependentObjectList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Fields: ${parsedError}`,
        );
      }

      if (Array.isArray(dependentObjectList)) {
        setDependentObjectList(dependentObjectList);
        wizardModel?.setData("dependentObjectList", dependentObjectList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return dependentObjectList;
  };

  // console.log(fieldsPropertiesList);

  if (isLoading === true) {
    return <CenterLoadingIndicator />;
  }

  return (
    <div>
      <FieldSelectorBasePanel
        recordId={wizardModel?.getData("recordId")}
        reload={loadData}
        selectedFields={selectedDependentList}
        setSelectedFields={setSelectedDependentList}
        fieldList={dependentObjectList}
        isLoading={isLoading}
        wizardModel={wizardModel}
        setWizardModel={setWizardModel}
        handleClose={handleClose}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  );
};

FieldPropertiesSelectorView.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default FieldPropertiesSelectorView;
