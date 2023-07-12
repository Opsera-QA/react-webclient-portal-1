import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import modelHelpers from "components/common/model/modelHelpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { DialogToastContext } from "contexts/DialogToastContext";
import { TASK_TYPES } from "components/tasks/task.types";
import DataSeedingTaskWizardInitializationScreen
  from "./screens/initialization_screen/DataSeedingTaskWizardInitializationScreen";
import CustomSettingTaskWizardConfigScreen
  from "./screens/custom_setting_selection_screen/CustomSettingTaskWizardConfigScreen";
import CustomSettingQueryBuilderScreen from "./screens/query_builder_screen/CustomSettingQueryBuilderScreen";
import CustomSettingTaskConfirmationScreen from "./screens/confirmation_screen/CustomSettingTaskConfirmationScreen";
import { DATA_SEEDING_WIZARD_SCREENS } from "./dataSeedingTaskWizard.constants";
import { dataSeedingTaskWizardMetadata } from "./dataSeedingWizard.metadata";
import DataSeedingFieldMappingScreen from "./screens/mapping_screen/DataSeedingFieldMappingScreen";

const SalesforceDataSeedingTaskWizard = ({ handleClose, taskModel }) => {
  const toastContext = useContext(DialogToastContext);
  const [currentScreen, setCurrentScreen] = useState(DATA_SEEDING_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [wizardModel, setWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    toastContext.removeInlineMessage();
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setWizardModel(undefined);

    if (isMongoDbId(taskModel?.getMongoDbId()) === true) {
      initializeWizardRecord();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskModel]);

  const initializeWizardRecord = () => {
    const newWizardModel = modelHelpers.parseObjectIntoModel({}, dataSeedingTaskWizardMetadata);
    newWizardModel.setDefaultValue("errorMessage");
    newWizardModel.setData("type", TASK_TYPES.SALESFORCE_DATA_SEEDING);
    newWizardModel.setData("taskId", taskModel?.getMongoDbId());

    const configuration = taskModel?.getData("configuration");
    const sfdc = configuration?.sfdc;
    if (dataParsingHelper.parseObject(sfdc)) {
      newWizardModel?.setData("sourceToolId", sfdc?.sourceToolId);
      newWizardModel?.setData("targetToolId", sfdc?.targetToolId);
    }

    const runCount = taskModel?.getData("run_count");

    if (runCount != null) {
      newWizardModel.setData("runCount", (runCount + 1));
    } else {
      newWizardModel.setData("runCount", 1);
    }

    setWizardModel({ ...newWizardModel });
  };

  const getBody = () => {
    switch (currentScreen) {
      case DATA_SEEDING_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <DataSeedingTaskWizardInitializationScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
          />
        );
      case DATA_SEEDING_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return (
          <CustomSettingTaskWizardConfigScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
            taskType={wizardModel?.getData("taskType")}
          />
        );
      case DATA_SEEDING_WIZARD_SCREENS.MAPPING_SCREEN:
        return (
          <DataSeedingFieldMappingScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
          />
        );
      case DATA_SEEDING_WIZARD_SCREENS.QUERY_BUILDER_SCREEN:
        return (
          <CustomSettingQueryBuilderScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
            taskType={wizardModel?.getData("taskType")}
          />
        );
      case DATA_SEEDING_WIZARD_SCREENS.CONFIRMATION_SCREEN:
        return (
          <CustomSettingTaskConfirmationScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
            taskType={wizardModel?.getData("taskType")}
          />
        );
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    switch (currentScreen) {
      case DATA_SEEDING_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return null;
      case DATA_SEEDING_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return null;
      case DATA_SEEDING_WIZARD_SCREENS.MAPPING_SCREEN:
      case DATA_SEEDING_WIZARD_SCREENS.QUERY_BUILDER_SCREEN:
      default:
        return null;
    }
  };

  if (wizardModel == null) {
    return (
      <LoadingDialog
        message={"Initializing Data Seeding Task Wizard"}
        size={"sm"}
      />
    );
  }

  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

SalesforceDataSeedingTaskWizard.propTypes = {
  handleClose: PropTypes.func,
  taskModel: PropTypes.object,
};

export default SalesforceDataSeedingTaskWizard;