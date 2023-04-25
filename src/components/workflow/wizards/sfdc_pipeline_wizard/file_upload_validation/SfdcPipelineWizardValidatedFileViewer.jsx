import React from 'react';
import PropTypes from "prop-types";
import SfdcPipelineWizardValidatedGitFileViewer
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/git/SfdcPipelineWizardValidatedGitFileViewer";
import SfdcPipelineWizardValidatedSfdcFileViewer
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/sfdc/SfdcPipelineWizardValidatedSfdcFileViewer";

const SfdcPipelineWizardValidatedFileViewer = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
  const getPipelineOrTaskText = () => pipelineWizardModel.getData('fromGitTasks') ? 'Task' : 'Pipeline';

  const getView = () => {
    if (pipelineWizardModel.getData("isOrgToOrg") === true) {
      return (
        <SfdcPipelineWizardValidatedSfdcFileViewer
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          handleClose={handleClose}
        />
      );
    }

    if (pipelineWizardModel.getData("fromGitTasks") === true) {
      return (
        <SfdcPipelineWizardValidatedSfdcFileViewer
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          handleClose={handleClose}
        />
      );
    }

    if (pipelineWizardModel.getData("isOrgToOrg") === false) {
      return (
        <SfdcPipelineWizardValidatedGitFileViewer
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          handleClose={handleClose}
        />
      );
    }
  };

  return (
    <div>
      <div className="h5">Salesforce {getPipelineOrTaskText()} Run: Validated File Viewer</div>
      <div className="text-muted mb-2">
        View validation results for the uploaded file.
      </div>
      {getView()}
    </div>
  );
};

SfdcPipelineWizardValidatedFileViewer.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardValidatedFileViewer;