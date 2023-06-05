import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import MultiSelectInputBase from 'components/common/inputs/multi_select/MultiSelectInputBase';
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function GithubProductionStageMultiSelectInput({
                                                           fieldName,
                                                           model,
                                                           setModel,
                                                           disabled,
                                                           setDataFunction,
                                                           clearDataFunction,
                                                           repoId,
                                                       }) {
    const [isLoading, setIsLoading] = useState(true);
    const [deploymentStages, setDeploymentStages] = useState([]);
    const [error, setError] = useState(undefined);
    const {
        cancelTokenSource,
        isMounted,
        getAccessToken,
    } = useComponentStateReference();

    useEffect(() => {
        setDeploymentStages([]);
        if (hasStringValue(repoId) === true) {
            loadData().catch((error) => {
                setError(error);
                if (isMounted?.current === true) {
                    throw error;
                }
            });
        }
    }, [repoId]);

    const loadData = async () => {
        try {
            setError(undefined);
            setIsLoading(true);
            await loadDeployementStages();
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

    const loadDeployementStages = async () => {
        const response = await dataMappingActions.getGithubDataMappingStages(getAccessToken, cancelTokenSource);
        const stages = DataParsingHelper.parseNestedArray(response, "data.data.gitlabDeploymentStagesList.data", []);
        setDeploymentStages([...stages]);
    };

    if (model.getData("isGithubActions") === false) {
        return null;
    }

    return (
        <MultiSelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={deploymentStages}
            disabled={disabled}
            setDataFunction={setDataFunction}
            clearDataFunction={clearDataFunction}
            singularTopic={"Pipeline Stage"}
            pluralTopic={"Pipeline Stages"}
            error={error}
            busy={isLoading}
            loadDataFunction={loadData}
            textField={"text"}
            valueField={"value"}
        />
    );
}

GithubProductionStageMultiSelectInput.propTypes = {
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
    setDataFunction: PropTypes.func,
    clearDataFunction: PropTypes.func,
    repoId: PropTypes.string,
};
