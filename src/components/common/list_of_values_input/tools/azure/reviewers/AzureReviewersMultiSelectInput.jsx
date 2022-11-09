import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import azureActions from "components/inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import MultiSelectInputBase from "../../../../inputs/multi_select/MultiSelectInputBase";
import {hasStringValue} from "../../../../helpers/string-helpers";

function AzureReviewersMultiSelectInput(
    {
        fieldName,
        model,
        setModel,
        toolId,
        projectId,
        disabled,
        setDataFunction,
        clearDataFunction,
        valueField,
        textField,
    }) {
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [azureReviewers, setAzureReviewers] = useState([]);
    const [error, setError] = useState(undefined);
    const isMounted = useRef(false);
    const {getAccessToken} = useContext(AuthContext);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        isMounted.current = true;
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        setAzureReviewers([]);
        setError(undefined);

        if (isMongoDbId(toolId) === true && hasStringValue(projectId) && projectId.length > 0) {
            loadData(source).catch((error) => {
                throw error;
            });
        }

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [toolId, projectId]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadAzureReviewers(cancelSource);
        } catch (error) {
            if (isMounted?.current === true) {
                setError(error);
            }
        } finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };

    const loadAzureReviewers = async (cancelSource = cancelTokenSource) => {
        const response = await azureActions.getReviewers(getAccessToken, cancelSource, toolId, projectId);
        const reviewers = response?.data?.data?.reviewers;

        if (isMounted?.current === true && Array.isArray(reviewers)) {
            setAzureReviewers([...reviewers]);
        }
    };

    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={azureReviewers}
            busy={isLoading}
            setDataFunction={setDataFunction}
            clearDataFunction={clearDataFunction}
            valueField={valueField}
            textField={textField}
            disabled={disabled}
            pluralTopic={"Reviewers"}
            singularTopic={"Reviewers"}
            error={error}
        />
    );
}

AzureReviewersMultiSelectInput.propTypes = {
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    toolId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    valueField: PropTypes.string,
    textField: PropTypes.string,
};

AzureReviewersMultiSelectInput.defaultProps = {
    valueField: "value",
    textField: "name",
};

export default AzureReviewersMultiSelectInput;
