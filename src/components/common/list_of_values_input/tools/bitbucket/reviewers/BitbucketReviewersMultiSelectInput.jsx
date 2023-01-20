import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "../../../../../inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import MultiSelectInputBase from "../../../../inputs/multi_select/MultiSelectInputBase";

function BitbucketReviewersMultiSelectInput(
    {
        fieldName,
        model,
        setModel,
        toolId,
        repository,
        workspace,
        disabled,
        setDataFunction,
        clearDataFunction,
        valueField,
        textField,
    }) {
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [bitbucketReviewers, setBitbucketReviewers] = useState([]);
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
        setBitbucketReviewers([]);
        setError(undefined);

        if (isMongoDbId(toolId) === true) {
            loadData(source).catch((error) => {
                throw error;
            });
        }

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [toolId, workspace, repository]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadReviewers(cancelSource);
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

    const loadReviewers = async (cancelSource = cancelTokenSource) => {
        const response = await bitbucketActions.getReviewers(getAccessToken, cancelSource, toolId, workspace, repository);
        const reviewers = response?.data?.data;

        if (isMounted?.current === true && Array.isArray(reviewers)) {
            setBitbucketReviewers([...reviewers]);
        }
    };

    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={bitbucketReviewers}
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

BitbucketReviewersMultiSelectInput.propTypes = {
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    toolId: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    workspace: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    valueField: PropTypes.string,
    textField: PropTypes.string,
};

BitbucketReviewersMultiSelectInput.defaultProps = {
    valueField: "value",
    textField: "name",
};

export default BitbucketReviewersMultiSelectInput;
