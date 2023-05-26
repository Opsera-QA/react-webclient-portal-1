import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateJenkinsToolButton(
    {
        onSuccessFunction,
        jenkinsToolModel,
        setJenkinsToolId,
        jenkinsToolId,
        customLabel,
        icon,
        variant,
        currentCount,
    }) {
    const {
        getAccessToken,
        cancelTokenSource,
        isMounted,
        toastContext
    } = useComponentStateReference();

    const saveConnectionDetails = async (toolId) => {
        try {
            const configuration = jenkinsToolModel?.getPersistData();

            const jAuthToken = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}-jAuthToken`;
            configuration.jAuthToken = await toolsActions.saveToolValueToVaultV2(
                getAccessToken,
                cancelTokenSource,
                toolId,
                jAuthToken,
                configuration?.jAuthToken,
            );

            const jPassword = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}-jPassword`;
            configuration.jPassword = await toolsActions.saveToolValueToVaultV2(
                getAccessToken,
                cancelTokenSource,
                toolId,
                jPassword,
                configuration?.jPassword,
            );

            const proxyPassword = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}-proxyPassword`;
            configuration.proxyPassword = await toolsActions.saveToolValueToVaultV2(
                getAccessToken,
                cancelTokenSource,
                toolId,
                proxyPassword,
                configuration?.proxyPassword,
            );

            return await toolsActions.updateToolConnectionDetails(
                getAccessToken,
                cancelTokenSource,
                toolId,
                configuration,
            );
        } catch (error) {
            if (isMounted?.current === true) {
                toastContext.showInlineErrorMessage(error, "Error Saving Jenkins Tool Details:");
            }
        }
    };

    const handleToolCreation = async () => {
        let toolId = jenkinsToolId;

        if (isMongoDbId(jenkinsToolId) !== true) {
            const currentToolCount = DataParsingHelper.parseInteger(currentCount, 0);
            const newTool = {
                name: `Jenkins Tool ${currentToolCount + 1}`,
                tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS,
                tool_type_identifier: "build",
                active: true,
            };

            const response = await toolsActions.createStandaloneTool(
                getAccessToken,
                cancelTokenSource,
                newTool,
            );

            toolId = response?.data?._id;
        }

        await saveConnectionDetails(toolId);
        setJenkinsToolId(toolId);

        onSuccessFunction();
    };

    return (
        <CreateButton
            showSuccessToasts={false}
            addAnotherOption={false}
            customLabel={customLabel}
            variant={variant}
            icon={icon}
            createRecord={handleToolCreation}
            recordDto={jenkinsToolModel}
            disable={jenkinsToolModel?.checkCurrentValidity() !== true}
        />
    );
}

CreateJenkinsToolButton.propTypes = {
    onSuccessFunction: PropTypes.func,
    jenkinsToolModel: PropTypes.object,
    jenkinsToolId: PropTypes.string,
    setJenkinsToolId: PropTypes.func,
    icon: PropTypes.object,
    customLabel: PropTypes.string,
    variant: PropTypes.string,
    currentCount: PropTypes.number,
};


