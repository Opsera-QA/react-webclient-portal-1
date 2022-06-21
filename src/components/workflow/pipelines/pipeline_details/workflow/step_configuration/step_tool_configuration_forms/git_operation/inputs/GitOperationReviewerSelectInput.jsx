import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import GitActionsHelper
    from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";
import axios from "axios";
import MultiSelectInputBase from "../../../../../../../../common/inputs/multi_select/MultiSelectInputBase";

function GitOperationReviewerSelectInput({ dataObject, setDataObject, disabled }) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [reviewers, setReviewers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const isMounted = useRef(false);

    useEffect(() => {

        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;

        setReviewers([]);

        if (!dataObject.getData("repository") || dataObject.getData("repository") === "") {
            return;
        }

        loadData(source).catch((error) => {
            if (isMounted.current === true) {
                throw error;
            }
        });

        return (() => {
            source.cancel();
            isMounted.current = false;
        });

    }, [dataObject.getData("repository")]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await getReviewers(cancelSource);
        }
        catch (error) {
            console.error(error);
            toastContext.showInlineErrorMessage(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const getReviewers = async (cancelSource) => {
        const response = await GitActionsHelper
            .getReviewersV2(
                getAccessToken,
                cancelSource,
                dataObject.getData("service"),
                dataObject.getData("gitToolId"),
                dataObject.getData("repoId"),
                dataObject.getData("workspace")
            );

        if (response && response?.data?.status === 200 && Array.isArray(response?.data?.data?.reviewers)) {
            setReviewers(response.data.data.reviewers);
           }
    };

    const setReviewerName = (fieldName, selectedOption) => {
        console.log(selectedOption);
        let newDataObject = { ...dataObject };
        newDataObject.setData(fieldName, selectedOption);
        setDataObject({ ...newDataObject });
    };

    const getNoReviewersMessage = () => {
        if (!isLoading && (reviewers == null || reviewers.length === 0) && dataObject.getData("repository")) {
            return ("No Reviewers found for the given details!");
        }
    };

    return (
        <MultiSelectInputBase
            fieldName={"prReviewers"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            setDataFunction={setReviewerName}
            selectOptions={reviewers}
            busy={isLoading}
            placeholderText={getNoReviewersMessage()}
            valueField="value"
            textField="name"
            disabled={disabled || isLoading || reviewers.length === 0}
        />
    );
}

GitOperationReviewerSelectInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    existingReviewers: PropTypes.array,
};

export default GitOperationReviewerSelectInput;
