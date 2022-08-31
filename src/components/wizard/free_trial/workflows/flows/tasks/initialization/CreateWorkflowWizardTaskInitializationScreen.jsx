import React, { useEffect, useState } from "react";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PropTypes from "prop-types";
import { taskTemplateActions } from "components/admin/task_templates/taskTemplate.actions";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { dateHelpers } from "components/common/helpers/date/date.helpers";
import taskActions from "components/tasks/task.actions";

export default function CreateWorkflowWizardTaskInitializationScreen(
  {
    type,
    setTaskFunction,
    templateIdentifier,
    setButtonContainer,
  }) {
  const [status, setStatus] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
        />
      );
    }

    initializeSalesforceTaskTemplate().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);


  const initializeSalesforceTaskTemplate = async () => {
    try {
      setStatus(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await taskTemplateActions.deployTemplate(
          getAccessToken,
          cancelTokenSource,
          templateIdentifier,
      );
      const newTask = response?.data;

      if (isMongoDbId(newTask?._id)) {
        setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        const createDate = dateHelpers.getNowFormattedDateString();
        newTask.name = `${type} - ${createDate}`;
        await taskActions.updateTaskV2(getAccessToken, cancelTokenSource, newTask);
        setTaskFunction({...newTask});
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        setStatus(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(error, `Error Initializing ${type} Workflow:`);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      status,
      `Initializing ${type} Workflow`,
      `Initializing ${type} Workflow`,
      `Initialized ${type} Workflow!`,
      `Error Initializing ${type} Workflow!`,
    );
  };

  if (setTaskFunction == null) {
    return null;
  }

  return (
    <div
      style={{
        height: "500px",
      }}
    >
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardTaskInitializationScreen.propTypes = {
  type: PropTypes.string,
  setTaskFunction: PropTypes.func,
  templateIdentifier: PropTypes.string,
  setButtonContainer: PropTypes.func,
};

