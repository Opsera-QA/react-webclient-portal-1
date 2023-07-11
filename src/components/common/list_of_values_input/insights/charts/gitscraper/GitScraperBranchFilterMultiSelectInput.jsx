import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import githubAction from "../../../../../insights/charts/github/github.action";
import gitscaperActions from "../../../../../insights/charts/gitscrapper/gitscrapper.action";

// This is used for gitlab kpis
function GitScraperBranchFilterMultiSelectInput({
                                                    placeholderText,
                                                    valueField,
                                                    textField,
                                                    fieldName,
                                                    model,
                                                    setModel,
                                                    disabled,
                                                    setDataFunction,
                                                    clearDataFunction,
    tags
                                                }) {
    const { getAccessToken } = useContext(AuthContext);
    const [repositories, setRepositories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
        setRepositories([]);
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
        loadData(source).catch((error) => {
            if (isMounted?.current === true) {
                setError(error);
            }
        });

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [tags]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setError(undefined);
            setIsLoading(true);
            await loadBranches(cancelSource);
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

    const loadBranches = async (cancelSource = cancelTokenSource) => {
        const response = await gitscaperActions.gitScraperBranchList(
            getAccessToken,
            cancelSource,
            tags
        );
        console.log("response", response);
        if (response.data != null) {
            setRepositories(response?.data?.data?.data);
        }
    };

    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={repositories}
            busy={isLoading}
            valueField={valueField}
            error={error}
            textField={textField}
            placeholderText={placeholderText}
            disabled={disabled}
            setDataFunction={setDataFunction}
            clearDataFunction={clearDataFunction}
        />
    );
}

GitScraperBranchFilterMultiSelectInput.propTypes = {
    placeholderText: PropTypes.string,
    fieldName: PropTypes.string,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    visible: PropTypes.bool,
    project: PropTypes.array,
    disabled: PropTypes.bool,
    tags: PropTypes.array
};

GitScraperBranchFilterMultiSelectInput.defaultProps = {
    textField: "text",
    valueField: "value",
};

export default GitScraperBranchFilterMultiSelectInput;
