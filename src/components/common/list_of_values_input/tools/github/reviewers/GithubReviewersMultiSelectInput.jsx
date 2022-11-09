import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import MultiSelectInputBase from "../../../../inputs/multi_select/MultiSelectInputBase";
import {githubActions} from "../../../../../inventory/tools/tool_details/tool_jobs/github/github.actions";

function GithubReviewersMultiSelectInput(
    {
        fieldName,
        model,
        setModel,
        toolId,
        repositoryId,
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
    }, [toolId, repositoryId]);

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
        const response = await githubActions.getReviewers(getAccessToken, cancelSource, toolId, repositoryId);
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

GithubReviewersMultiSelectInput.propTypes = {
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    toolId: PropTypes.string.isRequired,
    repositoryId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    valueField: PropTypes.string,
    textField: PropTypes.string,
};

GithubReviewersMultiSelectInput.defaultProps = {
    valueField: "value",
    textField: "name",
};

export default GithubReviewersMultiSelectInput;
