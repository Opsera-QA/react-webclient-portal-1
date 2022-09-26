import React, { useState } from "react";
import PropTypes from "prop-types";
import EnvironmentSelectInput from "../inputs/EnvironmentSelectInput";
import BoomiMigrationScmDetailsToggleInput from "../inputs/BoomiMigrationScmDetailsToggleInput";
import BoomiSCMToolTypeSelectInput from "../inputs/BoomiSCMToolTypeSelectInput";
import ProvarSourceControlManagementToolSelectInput from "../inputs/BoomiStepSourceControlManagementToolSelectInput";
import BoomiBitbucketWorkspaceInput from "../inputs/BoomiBitbucketWorkspaceInput";
import BoomiGitRepositoryInput from "../inputs/BoomiGitRepositoryInput";
import BoomiGitBranchInput from "../inputs/BoomiGitBranchInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BoomiSCMRepoFilesSelectInput from "../inputs/BoomiSCMRepoFiles";

function MigratePackageSubform({ model, setModel, plan, stepId }) {
    if (
        !model?.getData("jobType") ||
        model?.getData("jobType") !== "MIGRATE_PACKAGE_COMPONENT"
    ) {
        return null;
    }

    const getScmFields = () => {
        if (model?.getData("fetchComponentsFromGit") === true) {
            return (
                <>
                    <BoomiSCMToolTypeSelectInput
                        dataObject={model}
                        setDataObject={setModel}
                    />
                    <ProvarSourceControlManagementToolSelectInput
                        model={model}
                        setModel={setModel}
                        disabled={model.getData("service").length === 0}
                    />
                    <BoomiBitbucketWorkspaceInput
                        dataObject={model}
                        setDataObject={setModel}
                    />
                    <BoomiGitRepositoryInput
                        dataObject={model}
                        setDataObject={setModel}
                    />
                    <BoomiGitBranchInput
                        dataObject={model}
                        setDataObject={setModel}
                    />
                    <TextInputBase
                        dataObject={model}
                        setDataObject={setModel}
                        fieldName={"filePath"}
                    />
                    <BoomiSCMRepoFilesSelectInput
                        setDataObject={setModel}
                        dataObject={model}
                        disabled={
                            model && model.getData("filePath")
                                ? model.getData("filePath").length === 0
                                : true
                        }
                        tool_prop={
                            model && model.getData("boomiToolId")
                                ? model.getData("boomiToolId")
                                : ""
                        }
                    />
                </>
            );
        }
    };

    return (
        <>
            <EnvironmentSelectInput
                dataObject={model}
                setDataObject={setModel}
                idField={"sourceEnvironmentId"}
                fieldName={"sourceEnvironmentName"}
                disabled={model?.getData("boomiToolId")?.length === 0}
                tool={model?.getData("boomiToolId")}
            />
            <EnvironmentSelectInput
                dataObject={model}
                setDataObject={setModel}
                idField={"targetEnvironmentId"}
                fieldName={"targetEnvironmentName"}
                disabled={model?.getData("boomiToolId")?.length === 0}
                tool={model?.getData("boomiToolId")}
            />
            <BoomiMigrationScmDetailsToggleInput
                model={model}
                setModel={setModel}
            />
            { getScmFields() }
        </>
    );
}

MigratePackageSubform.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    plan: PropTypes.array,
    stepId: PropTypes.string,
};

export default MigratePackageSubform;
