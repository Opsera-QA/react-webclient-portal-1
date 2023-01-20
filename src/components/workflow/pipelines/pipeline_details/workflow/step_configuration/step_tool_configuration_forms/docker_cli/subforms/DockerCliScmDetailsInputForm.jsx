import React from "react";
import PropTypes from "prop-types";
import DockerCliScmToolTypeSelectInput from "../inputs/DockerCliScmToolTypeSelectInput";
import DockerCliScmToolSelectInput from "../inputs/DockerCliScmToolSelectInput";
import DockerCliBitbucketWorkspaceInput from "../inputs/DockerCliBitbucketWorkspaceInput";
import DockerCliGitRepositoryInput from "../inputs/DockerCliGitRepositoryInput";
import DockerCliGitBranchInput from "../inputs/DockerCliGitBranchInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function DockerCliScmDetailsInputForm({ model, setModel }) {

  const getScmInputs = () => {
    if (model?.getData("service") == undefined || model?.getData("service") === "") {
      return null;
    }
    return (
      <>
        <DockerCliScmToolSelectInput
          model={model}
          setModel={setModel}
        />
        <DockerCliBitbucketWorkspaceInput
          model={model}
          setModel={setModel}
          disabled={hasStringValue(model?.getData("gitToolId")) !== true}
        />
        <DockerCliGitRepositoryInput
          model={model}
          setModel={setModel}
          disabled={hasStringValue(model?.getData("gitToolId")) !== true}
        />
        <DockerCliGitBranchInput
          model={model}
          setModel={setModel}
          disabled={hasStringValue(model?.getData("gitRepository")) !== true}
        />
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"gitFilePath"}
        />
      </>
    );
  };

  return (
    <>
      <DockerCliScmToolTypeSelectInput
        model={model}
        setModel={setModel}
      />
      {getScmInputs()}
    </>
  );
}

DockerCliScmDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DockerCliScmDetailsInputForm;
