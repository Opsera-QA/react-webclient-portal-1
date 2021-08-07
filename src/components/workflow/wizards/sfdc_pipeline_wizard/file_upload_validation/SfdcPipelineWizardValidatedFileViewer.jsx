import React from 'react';
import PropTypes from "prop-types";
import SfdcPipelineWizardValidatedGitFileViewer
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/git/SfdcPipelineWizardValidatedGitFileViewer";

const SfdcPipelineWizardValidatedFileViewer = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
  const getView = () => {
    // if (pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc") {
    //   return (
    //     <SfdcPipelineWizardSfdcFileSelector
    //       pipelineWizardModel={pipelineWizardModel}
    //       setPipelineWizardModel={setPipelineWizardModel}
    //       setPipelineWizardScreen={setPipelineWizardScreen}
    //       handleClose={handleClose}
    //     />
    //   );
    // }

    if (pipelineWizardModel.getData("modifiedFilesOrigin") === "git") {
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
      <div className="h5">SalesForce Pipeline Run: Validated File Viewer</div>
      <div className="text-muted mb-2">
        View validation results for the uploaded CSV.
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