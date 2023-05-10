import React from "react";
import PropTypes from "prop-types";
import {
    salesforceWorkflowFlowConstants
} from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardTaskInitializationScreen
    from "components/wizard/portal/workflows/flows/tasks/initialization/CreateWorkflowWizardTaskInitializationScreen";
import {
    CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import { SalesforceTaskHelper } from "components/tasks/salesforceTask.helper";
import {getTaskTypeLabel} from "../../../../../../../tasks/task.types";

export default function CreateSalesforceQuickDeployTaskInitializationScreen(
    {
        setTask,
        setCurrentScreen,
        salesforceToolId,
        flow,
        setButtonContainer
    }) {
    const setTaskFunction = (task) => {
        const updatedTask = SalesforceTaskHelper.configureSalesforceQuickDeployTask(
            task,
            flow,
            salesforceToolId
        );
        setTask({...updatedTask});
        setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT);
    };

    return (
        <CreateWorkflowWizardTaskInitializationScreen
            setTaskFunction={setTaskFunction}
            type={getTaskTypeLabel(flow)}
            templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.SALESFORCE_QUICK_DEPLOY}
            setButtonContainer={setButtonContainer}
        />
    );
}

CreateSalesforceQuickDeployTaskInitializationScreen.propTypes = {
    setTask: PropTypes.func,
    flow: PropTypes.string,
    setCurrentScreen: PropTypes.func,
    setButtonContainer: PropTypes.func,
    salesforceToolId: PropTypes.string
};

