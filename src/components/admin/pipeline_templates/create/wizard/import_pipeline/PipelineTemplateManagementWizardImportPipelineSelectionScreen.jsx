import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import ImportPipelineTableCardView
  from "components/admin/pipeline_templates/create/wizard/import_pipeline/ImportPipelineTableCardView";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineTemplateManagementWizardImportPipelineSelectionScreen(
  {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    setPipelineTemplateWizardScreen,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [pipelines, setPipelines] = useState([]);
  const [subscribedPipelineIds, setSubscribedPipelineIds] = useState([]);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(undefined);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    const newPipelineFilterModel = new PipelineFilterModel(false);
    setPipelineFilterModel(newPipelineFilterModel);

    loadData(newPipelineFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newPipelineFilterModel = pipelineFilterModel) => {
    try {
      setLoading(true);
      await getPipelines(newPipelineFilterModel);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getPipelines = async (newPipelineFilterModel = pipelineFilterModel) => {
    const response = await pipelineActions.getPipelinesV2(
      getAccessToken,
      cancelTokenSource,
      newPipelineFilterModel,
      newPipelineFilterModel?.getData("type"),
    );
    const newPipelines = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newPipelines)) {
      setSubscribedPipelineIds(response?.data?.subscriptions);
      setPipelines([...newPipelines]);
      newPipelineFilterModel.updateTotalCount(response?.data?.count);
      newPipelineFilterModel.updateActiveFilters();
      setPipelineFilterModel({...newPipelineFilterModel});
    }
  };

  return (
    <ImportPipelineTableCardView
      pipelines={pipelines}
      subscribedPipelineIds={subscribedPipelineIds}
      pipelineFilterModel={pipelineFilterModel}
      setPipelineFilterModel={setPipelineFilterModel}
      isLoading={isLoading}
      loadData={loadData}
      pipelineTemplateModel={pipelineTemplateModel}
      setPipelineTemplateModel={setPipelineTemplateModel}
      setPipelineTemplateWizardScreen={setPipelineTemplateWizardScreen}
    />
  );
}

PipelineTemplateManagementWizardImportPipelineSelectionScreen.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
  setPipelineTemplateWizardScreen: PropTypes.func,
};

export default PipelineTemplateManagementWizardImportPipelineSelectionScreen;