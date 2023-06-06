import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GithubPipelineStageMultiSelectInput from "../inputs/GithubDevStageMultiSelectInput";

function GithubDataMappingSubform({ model, setModel }) {

    const setDataFunction = (fieldName, newValue) => {
        const newModel = {...model};
        newModel?.setData(fieldName, newValue);
        newModel?.setDefaultValue("devStageNameFilter");
        newModel?.setDefaultValue("deployQAStageNameFilter");
        newModel?.setDefaultValue("deployProductionStageNameFilter");
        newModel?.setDefaultValue("securityStageNameFilter");
        newModel?.setDefaultValue("qualityStageNameFilter");
        setModel({...newModel});
    };

    return (
        <>
            <BooleanToggleInput
                fieldName={"isGithubActions"}
                dataObject={model}
                setDataObject={setModel}
                setDataFunction={setDataFunction}
            />
            <GithubPipelineStageMultiSelectInput
                fieldName={"devStageNameFilter"}
                model={model}
                setModel={setModel}
                repoId={model?.getData("repoId")}
            />
            <GithubPipelineStageMultiSelectInput
                fieldName={"deployQAStageNameFilter"}
                model={model}
                setModel={setModel}
                repoId={model?.getData("repoId")}
            />
            <GithubPipelineStageMultiSelectInput
                fieldName={"deployProductionStageNameFilter"}
                model={model}
                setModel={setModel}
                repoId={model?.getData("repoId")}
            />
            <GithubPipelineStageMultiSelectInput
                fieldName={"securityStageNameFilter"}
                model={model}
                setModel={setModel}
                repoId={model?.getData("repoId")}
            />
            <GithubPipelineStageMultiSelectInput
                fieldName={"qualityStageNameFilter"}
                model={model}
                setModel={setModel}
                repoId={model?.getData("repoId")}
            />
        </>
    );
}

GithubDataMappingSubform.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    repoId: PropTypes.string
};

export default GithubDataMappingSubform;
