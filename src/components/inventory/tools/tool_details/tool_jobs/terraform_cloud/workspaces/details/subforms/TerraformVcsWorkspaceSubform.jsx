import React, { useState } from 'react';
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformTagSelectInput from "../inputs/TerraformTagSelectInput";
import TerraformVcsServiceSelectInput from "../inputs/TerraformVcsServiceSelectInput";
import TerraformProviderSelectInput from "../inputs/TerraformProviderSelectInput";
import TerraformRepositorySelectInput from "../inputs/TerraformRepositorySelectInput";

const TerraformVcsWorkspaceSubform = ({terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel, toolId}) => {

  const [ vcsProviders, setVcsProviders ] = useState([]);

  const getRepositoryFields = () => {
    if (terraformCloudWorkspacesModel.getData("provider") !== null && terraformCloudWorkspacesModel.getData("provider") !== "") {
      return (
        <>
          <TerraformRepositorySelectInput 
            dataObject={terraformCloudWorkspacesModel}
            setDataObject={setTerraformCloudWorkspacesModel}
            toolId={toolId}
          />      
          <TextInputBase
            dataObject={terraformCloudWorkspacesModel}
            setDataObject={setTerraformCloudWorkspacesModel}
            fieldName={"branch"}
          />
        </>
      );
    }
  };

  return (
    <>
      <TextInputBase
        dataObject={terraformCloudWorkspacesModel}
        setDataObject={setTerraformCloudWorkspacesModel}
        fieldName={"workingDirectory"}
      />
      <TerraformTagSelectInput 
        model={terraformCloudWorkspacesModel}
        setModel={setTerraformCloudWorkspacesModel}
      />
      <TerraformVcsServiceSelectInput 
        dataObject={terraformCloudWorkspacesModel}
        setDataObject={setTerraformCloudWorkspacesModel}
        setVcsProviders={setVcsProviders}
        toolId={toolId}
      />
      <TerraformProviderSelectInput 
        dataObject={terraformCloudWorkspacesModel}
        setDataObject={setTerraformCloudWorkspacesModel}
        vcsProviders={vcsProviders}
      />
      { getRepositoryFields() }      
    </>
  );
};

TerraformVcsWorkspaceSubform.propTypes = {
  terraformCloudWorkspacesModel: PropTypes.object,
  setTerraformCloudWorkspacesModel: PropTypes.func,
  toolId: PropTypes.string,
};

export default TerraformVcsWorkspaceSubform;
