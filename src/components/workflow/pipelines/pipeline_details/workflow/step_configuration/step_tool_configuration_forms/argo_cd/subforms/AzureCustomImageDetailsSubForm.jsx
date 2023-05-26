import React from 'react';
import PropTypes from 'prop-types';
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ArgoCdStepAzureToolConfigIdSelectInput from "../inputs/ArgoCdStepAzureToolConfigIdSelectInput";
import ArgoCdStepAzureCredentialIdSelectInput from "../inputs/ArgoCdStepAzureCredentialIdSelectInput";
import ArgoCdStepAzureRegistryNameSelectInput from "../inputs/ArgoCdStepAzureRegistryNameSelectInput";
import ArgoCdStepAzureRepositoryNameSelectInput from "../inputs/ArgoCdStepAzureRepositoryNameSelectInput";
import ArgoCdStepAzureRepositoryTagSelectInput from "../inputs/ArgoCdStepAzureRepositoryTagSelectInput";

function AzureCustomImageDetailsSubForm({ model, setModel }) {

  return (
    <>
      <ArgoCdStepAzureToolConfigIdSelectInput
        model={model}
        setModel={setModel}
        service={model?.getData("platform")}
      />
      <ArgoCdStepAzureCredentialIdSelectInput
        model={model}
        setModel={setModel}
      />
      <TextInputBase
        fieldName={"resource"}
        dataObject={model}
        setDataObject={setModel}
      />
      <ArgoCdStepAzureRegistryNameSelectInput
        model={model}
        setModel={setModel}
        azureToolConfigId={model.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
        resource={model.getData("resource")}
      />
      <ArgoCdStepAzureRepositoryNameSelectInput
        model={model}
        setModel={setModel}
        acrLoginUrl={model.getData("acrLoginUrl")}
        azureToolId={model.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
      />
      <ArgoCdStepAzureRepositoryTagSelectInput
        fieldName={"repositoryTag"}
        model={model}
        setModel={setModel}
        acrLoginUrl={model.getData("acrLoginUrl")}
        azureToolId={model.getData("azureToolConfigId")}
        repoName={model.getData("azureRepoName")}
        applicationId={model?.getData("azureCredentialId")}
      />
    </>
  );
}

AzureCustomImageDetailsSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default AzureCustomImageDetailsSubForm;
