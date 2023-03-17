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

export default function CreateSalesforceCertificateGenerationTaskInitializationScreen(
    {
        setTask,
        setCurrentScreen,
        flow,
        setButtonContainer,
        jenkinsToolId
    }) {
    const setTaskFunction = (task) => {
        const updatedTask = SalesforceTaskHelper.configureSalesforceCertificateGenerationSyncTask(
            task,
            flow,
            jenkinsToolId
        );
        setTask({...updatedTask});
        setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
    };

    return (
        <CreateWorkflowWizardTaskInitializationScreen
            setTaskFunction={setTaskFunction}
            type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
            templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.SALESFORCE_CERTIFICATE_GENERATION}
            setButtonContainer={setButtonContainer}
        />
    );
}

CreateSalesforceCertificateGenerationTaskInitializationScreen.propTypes = {
    setTask: PropTypes.func,
    flow: PropTypes.string,
    setCurrentScreen: PropTypes.func,
    setButtonContainer: PropTypes.func,
    jenkinsToolId: PropTypes.string,
};

