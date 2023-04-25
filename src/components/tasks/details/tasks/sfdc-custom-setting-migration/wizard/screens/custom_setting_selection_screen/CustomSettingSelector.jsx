import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { parseError } from "components/common/helpers/error-helpers";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import IconBase from "../../../../../../../common/icons/IconBase";
import { Button, Row } from "react-bootstrap";
import SaveButtonContainer from "../../../../../../../common/buttons/saving/containers/SaveButtonContainer";
import FieldPropertiesSelectorView from "./FieldPropertiesSelectorView";
import EnableEditingIcon from "../../../../../../../common/icons/enable/EnableEditingIcon";
import MessageFieldBase from "../../../../../../../common/fields/text/MessageFieldBase";
import DetailPanelContainer from "../../../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import { getMigrationTypeLabel } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import H5FieldSubHeader from "../../../../../../../common/fields/subheader/H5FieldSubHeader";

const CustomSettingSelector = ({ wizardModel, setWizardModel, handleClose, setCurrentScreen }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);
  const [customSettingsList, setCustomSettingsList] = useState([]);
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
    newWizardModel.setData("selectedFieldList", []);
    newWizardModel.setData("filterQuery", "");
    newWizardModel.setData("queryFilters", []);
    setWizardModel({ ...newWizardModel });
  };

  const saveAndTriggerFieldsPull = async () => {
    try {
      setIsSaving(true);
      await customSettingMigrationTaskWizardActions.setSelectedObjectList(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );
      await customSettingMigrationTaskWizardActions.triggerFieldPropertiesPull(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        wizardModel,
        wizardModel?.getData("selectedCustomSetting")?.componentName,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
        setEnableEdit(false);
      }
    }
  };

  const getSelectView = () => {
    if (!enableEdit && wizardModel?.getData("selectedCustomSetting")) {
      return (
        <div className={"d-flex mx-1 my-3 w-100"}>
          Selected Custom Object :{" "}
          {wizardModel?.getData("selectedCustomSetting")?.componentName}
          <EnableEditingIcon
            enableEditingFunction={() => {
              setEnableEdit(true);
            }}
            className={"ml-2 my-auto"}
          />
        </div>
      );
    }

    return (
      <>
        <SelectInputBase
          fieldName={"selectedCustomSetting"}
          selectOptions={customSettingsList}
          dataObject={wizardModel}
          setDataObject={setWizardModel}
          setDataFunction={setSelectedCustomSettingFunc}
          textField={"componentName"}
          busy={isLoading}
          placeholderText={"Select a Custom Setting"}
          disabled={isLoading || isSaving}
        />
        <SaveButtonContainer>
          <Button
            className={"mr-2"}
            size="sm"
            variant="primary"
            onClick={saveAndTriggerFieldsPull}
            disabled={isLoading || isSaving}
          >
            <span>
              <IconBase
                icon={faArrowRight}
                fixedWidth
                isLoading={isSaving}
                className="mr-2"
              />
              {isSaving ? "Saving" : "Save and Proceed"}
            </span>
          </Button>
        </SaveButtonContainer>
      </>
    );
  };

  const getFieldSelectionView = () => {
    if(!enableEdit) {
      return(
        <FieldPropertiesSelectorView
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          handleClose={handleClose}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <Row className="mx-1">
        <H5FieldSubHeader
          subheaderText={`${getMigrationTypeLabel(
            wizardModel?.getData("taskType"),
          )} : Custom Setting Selection Screen`}
        />
      </Row>
      {getSelectView()}
      {getFieldSelectionView()}
    </div>
  );
};

CustomSettingSelector.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default CustomSettingSelector;
