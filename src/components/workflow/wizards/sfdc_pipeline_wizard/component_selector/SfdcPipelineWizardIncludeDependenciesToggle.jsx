import React, {useContext} from 'react';
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import {AuthContext} from "contexts/AuthContext";

function SfdcPipelineWizardIncludeDependenciesToggle({pipelineWizardModel, setPipelineWizardModel}) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  if (
       pipelineWizardModel?.getData("isSfdx") !== true
    || pipelineWizardModel.getData("isProfiles") === true
    || pipelineWizardModel.getData("fromGitTasks") === true
    || featureFlagHideItemInProd() === true
  ) {
    return null;
  }

  return (
    <div>
      <BooleanToggleInput
        dataObject={pipelineWizardModel}
        setDataObject={setPipelineWizardModel}
        fieldName={"includeDependencies"}
      />
    </div>
  );
}

SfdcPipelineWizardIncludeDependenciesToggle.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
};

export default SfdcPipelineWizardIncludeDependenciesToggle;