import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {insightsLookupActions} from "components/insights/lookup/insightsLookup.actions";
import {capitalizeFirstLetter} from "../../../common/helpers/string-helpers";

function PipelineSelectInput(
    {
        fieldName,
        model,
        setModel,
        disabled,
        formatDataFunction,
        textField,
        valueField,
        setDataFunction,
        clearDataFunction,
        className,
    }) {
    const [salesforceComponentNames, setSalesforceComponentNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const {isMounted, cancelTokenSource, getAccessToken} =
        useComponentStateReference();

    useEffect(() => {
        setSalesforceComponentNames([]);

        loadData().catch((error) => {
            if (isMounted?.current === true) {
                throw error;
            }
        });
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(undefined);
            await loadComponentNames();
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

    const loadComponentNames = async () => {
        const pipelinesResponse = await insightsLookupActions.getPipelines(
            getAccessToken,
            cancelTokenSource,
        );

        const pipelines = pipelinesResponse?.data?.results;

        if (
            isMounted?.current === true &&
            Array.isArray(pipelines) &&
            Array.isArray(pipelines)
        ) {
            const resultArray = [...pipelines];
            setSalesforceComponentNames(resultArray);
        }
    };

    return (
        <MultiSelectInputBase
            className={className}
            setDataFunction={setDataFunction}
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={salesforceComponentNames}
            formatDataFunction={formatDataFunction}
            clearDataFunction={clearDataFunction}
            // groupBy={(filterOption) =>
            //     capitalizeFirstLetter(filterOption?.type, " ", "Undefined Type")
            // }
            textField={(data) =>
                capitalizeFirstLetter(data["type"]) +
                ": " +
                capitalizeFirstLetter(data["name"])
            }
            busy={isLoading}
            valueField={valueField}
            disabled={disabled}
            error={error}
            pluralTopic={"Filters"}
        />
    );
}

PipelineSelectInput.propTypes = {
    className: PropTypes.string,
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    formatDataFunction: PropTypes.func,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
};

PipelineSelectInput.defaultProps = {
    textField: "name",
};

export default PipelineSelectInput;
