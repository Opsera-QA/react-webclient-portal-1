import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import azureFunctionsActions from "../azure-functions-step-actions";


function AzureFunctionsSelectInput(
    {
        fieldName,
        dataObject,
        setDataObject,
        azureToolConfigId,
        applicationId,
        resourceGroup
    }) {
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [azureRegionList, setAzureRegionList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [placeholder, setPlaceholderText] = useState("Select Azure Function");
    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        setAzureRegionList([]);
        if (hasStringValue(applicationId) === true && hasStringValue(azureToolConfigId) === true && hasStringValue(resourceGroup) === true) {
            loadData(source).catch((error) => {
                throw error;
            });
        }
    }, [azureToolConfigId, applicationId, resourceGroup]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadFunctionsSelects(cancelSource);
        } catch (error) {
            setPlaceholderText("There was an error pulling Azure Functions");
            setErrorMessage("No Azure Functions available.");
            toastContext.showErrorDialog(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadFunctionsSelects = async (cancelSource = cancelTokenSource) => {
        const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
        const tool = response?.data?.data;

        if (tool == null) {
            setPlaceholderText("Error Pulling Azure Functions!");
            setErrorMessage("Could not find Tool to grab Azure Functions.");
            return;
        }

        const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
        const applicationData = applicationResponse?.data?.data;

        if (applicationData == null) {
            setPlaceholderText("Error Pulling Azure Functions!");
            setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
            return;
        }

        const azureResponse = await azureFunctionsActions.getAzureFunctions(
            getAccessToken,
            cancelSource,
            tool,
            applicationData?.configuration,
            resourceGroup
        );

        const result = azureResponse?.data?.data;
        if (Array.isArray(result) && result?.length > 0) {
            setErrorMessage("");
            setAzureRegionList(result);
        }

        if (result?.length === 0) {
            setPlaceholderText("No azure functions found with this azure configuration");
            setErrorMessage("No Azure Functions found");
        }
    };

    return (
        <SelectInputBase
            fieldName={fieldName}
            dataObject={dataObject}
            textField={"name"}
            valueField={"name"}
            setDataObject={setDataObject}
            selectOptions={azureRegionList}
            busy={isLoading}
            disabled={isLoading}
            placeholder={placeholder}
            errorMessage={errorMessage}
        />
    );
}

AzureFunctionsSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    azureToolConfigId: PropTypes.string,
    applicationId: PropTypes.string,
    resourceGroup: PropTypes.string,
};

AzureFunctionsSelectInput.defaultProps = {
    fieldName: "azureFunctionName",
};

export default AzureFunctionsSelectInput;
