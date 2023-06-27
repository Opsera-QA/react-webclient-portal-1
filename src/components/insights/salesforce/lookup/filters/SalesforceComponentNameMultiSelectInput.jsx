import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {formatDate} from "../../../../common/helpers/date/date.helpers";
import {insightsLookupActions} from "../insightsLookup.actions";

function SalesforceComponentNameMultiSelectInput(
    {
        fieldName,
        model,
        setModel,
        textField,
        valueField,
        placeholderText,
        projects,
        startDate,
        endDate
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
    }, [projects, startDate, endDate]);

    const disabled = model.getArrayData('selectedComponentFilterData').length === 0;
    if(disabled){ model?.setData("selectedComponentNames", []);}

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

    const loadComponentNames = async (newFilterModel = model) => {
        const DATE_STRING_FORMAT = "MM/dd/yyyy";
        const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
        const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);
        const response = await insightsLookupActions.getComponentNames(
            getAccessToken,
            cancelTokenSource,
            formattedStartDate,
            formattedEndDate,
            [],
            projects,
            [],
            [],
            newFilterModel
        );
        const names = response?.data?.data?.componentNames;

        if (isMounted?.current === true && Array.isArray(names)) {
            setSalesforceComponentNames(names);
        }
    };

    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={salesforceComponentNames}
            busy={isLoading}
            valueField={valueField}
            error={error}
            textField={textField}
            placeholderText={placeholderText}
            disabled={disabled || isLoading}
            pluralTopic={"Filters"}
        />
    );
}

SalesforceComponentNameMultiSelectInput.propTypes = {
    className: PropTypes.string,
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    formatDataFunction: PropTypes.func,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    data: PropTypes.any,
    projects: PropTypes.any,
    placeholderText: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
};

SalesforceComponentNameMultiSelectInput.defaultProps = {
    textField: "name",
};

export default SalesforceComponentNameMultiSelectInput;