import React from 'react';
import PropTypes from 'prop-types';
import ArgoCdStepAwsToolSelectInput from "../inputs/ArgoCdStepAwsToolSelectInput";
import ArgoCdStepAwsRepoSelectInput from "../inputs/ArgoCdStepAwsRepoSelectInput";
import ArgoCdStepAwsRepositoryTagSelectInput from "../inputs/ArgoCdStepAwsRepositoryTagSelectInput";

function AwsCustomImageDetailsSubForm({ model, setModel }) {

  return (
    <>
      <ArgoCdStepAwsToolSelectInput
        model={model}
        setModel={setModel}        
      />
      <ArgoCdStepAwsRepoSelectInput 
        model={model}
        setModel={setModel}
        awsToolConfigId={model.getData("awsToolConfigId")}
      />
      <ArgoCdStepAwsRepositoryTagSelectInput 
        model={model}
        setModel={setModel}
        awsToolConfigId={model.getData("awsToolConfigId")}
        repoName={model.getData("ecrRepoName")}
      />
    </>
  );
}

AwsCustomImageDetailsSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default AwsCustomImageDetailsSubForm;
