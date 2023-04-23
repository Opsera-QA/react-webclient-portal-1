import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { parseError } from "components/common/helpers/error-helpers";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import CenterLoadingIndicator from "../../../../../../../common/loading/CenterLoadingIndicator";
import FieldSelectorBasePanel from "./panels/FieldSelectorBasePanel";

const FieldPropertiesSelectorView = ({ wizardModel, setWizardModel }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fieldsPropertiesList, setFieldsPropertiesList] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
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
    setFieldsPropertiesList([]);

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
      await customSettingMigrationTaskWizardActions.pullFieldList(
        getAccessToken,
        cancelSource,
        wizardModel,
      );
    const errorMessage = response?.data?.data?.errorMessage;
    const fieldList = response?.data?.data?.fieldList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Fields: ${parsedError}`,
        );
      }

      if (Array.isArray(fieldList)) {
        setFieldsPropertiesList(fieldList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fieldList;
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
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        fieldList={fieldsPropertiesList}
        isLoading={isLoading}
        wizardModel={wizardModel}
        setWizardModel={setWizardModel}
      />
    </div>
  );
};

FieldPropertiesSelectorView.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default FieldPropertiesSelectorView;
