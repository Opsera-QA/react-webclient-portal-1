import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";

function MetricFilterGitLabProjectSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
  setDataFunction,
  disabled,
}) {
    const [field] = useState(model?.getFieldById(fieldName));
    const { getAccessToken } = useContext(AuthContext);
    const [stages, setStages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
        loadData().catch((error) => {
            if (isMounted?.current === true) {
                setError(error);
            }
        });

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, []);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setError(undefined);
            setIsLoading(true);
            await loadStages(cancelSource);
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

    const loadStages = async (cancelSource = cancelTokenSource) => {
        const response = await chartsActions.parseConfigurationAndGetChartMetrics(
            getAccessToken,
            cancelSource,
            "gitlabProjectsList"
        );
        if (response.data != null) {
            setStages(response?.data?.data[0]?.gitlabProjectsList?.data);
        }
    };
    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            selectOptions={stages}
            busy={isLoading}
            valueField={valueField}
            error={error}
            textField={textField}
            placeholderText={placeholderText}
            disabled={disabled || isLoading}
            pluralTopic={"Projects"}
        />
    );
}

MetricFilterGitLabProjectSelectInput.propTypes = {
    placeholderText: PropTypes.string,
    fieldName: PropTypes.string,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    setDataFunction: PropTypes.func,
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
};

MetricFilterGitLabProjectSelectInput.defaultProps = {
    textField: "text",
    valueField: "value",
};

export default MetricFilterGitLabProjectSelectInput;
