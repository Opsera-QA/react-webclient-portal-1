import React, { useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";
import azureFunctionsStepActions from "../azureZipDeployment.actions";

function AzureResourceGroupSelectInput(
    {
        fieldName,
        dataObject,
        setDataObject,
        azureToolConfigId,
        applicationId,
        textField,
        valueField,
        disabled
    }) {
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [azureRegionList, setAzureRegionList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [placeholder, setPlaceholderText] = useState("Select Cluster");
    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        setAzureRegionList([]);

        if (hasStringValue(azureToolConfigId) && hasStringValue(applicationId)) {
            loadData(source).catch((error) => {
                throw error;
            });
        }
    }, [azureToolConfigId, applicationId]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadAzureRegistries(cancelSource);
        } catch (error) {
            setPlaceholderText("There was an error pulling Resource Groups");
            setErrorMessage("No Resource Groups available.");
            toastContext.showErrorDialog(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
    //  and return the resource groups instead of constructing the complex query here on React
    const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
        const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
        const tool = response?.data?.data;

        if (tool == null) {
            setPlaceholderText("Error Pulling Clusters!");
            setErrorMessage("Could not find Tool to grab Clusters.");
            return;
        }

        const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
        const applicationData = applicationResponse?.data?.data;

        if (applicationData == null) {
            setPlaceholderText("Error Pulling Clusters!");
            setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
            return;
        }

        const resourceGroupResponse = await azureFunctionsStepActions.getAzureResourceGroups(
            getAccessToken,
            cancelSource,
            tool,
            applicationData?.configuration
        );
        const result = resourceGroupResponse?.data?.data;

        if (Array.isArray(result) && result.length > 0) {
            setErrorMessage("");
            setAzureRegionList(result);
        }

        if (result?.length === 0) {
            setPlaceholderText("No resource groups found with this azure configuration");
            setErrorMessage("No Resource Groups found");
        }
    };

    const getInfoText = () => {
        if (dataObject?.getData("resource")?.length > 0) {
            return (
                <small>
                    <IconBase icon={faSync} className={"pr-1"} />
                    Click here to refresh Resource Groups
                </small>
            );
        }
    };

    return (
        <>
            <SelectInputBase
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                selectOptions={azureRegionList}
                busy={isLoading}
                disabled={isLoading || disabled}
                placeholder={placeholder}
                textField={textField}
                valueField={valueField}
                errorMessage={errorMessage}
            />
            <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
                {getInfoText()}
            </div>
        </>
    );
}

AzureResourceGroupSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    azureToolConfigId: PropTypes.string,
    applicationId: PropTypes.string,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    disabled: PropTypes.bool
};

AzureResourceGroupSelectInput.defaultProps = {
    fieldName: "resourceGroup",
    textField: "name",
    valueField: "name",
};

export default AzureResourceGroupSelectInput;
