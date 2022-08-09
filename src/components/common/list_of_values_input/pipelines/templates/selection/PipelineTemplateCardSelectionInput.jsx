import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineTemplateCardSelectionView
  from "components/common/list_of_values_input/pipelines/templates/selection/PipelineTemplateCardSelectionView";

export default function PipelineTemplateCardSelectionInput(
  {
    className,
    type,
    selectedPipelineTemplate,
    setDataFunction,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [salesforcePipelineTemplates, setSalesforcePipelineTemplates] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setSalesforcePipelineTemplates([]);

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadWorkflowTemplates();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadWorkflowTemplates = async () => {
    const response = await pipelineActions.getPipelineTemplatesByType(
      getAccessToken,
      cancelTokenSource,
      type,
    );
    const workflowTemplates = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(workflowTemplates)) {
      setSalesforcePipelineTemplates([...workflowTemplates]);
    }
  };

  return (
    <div className={className}>
      <PipelineTemplateCardSelectionView
        selectedPipelineTemplate={selectedPipelineTemplate}
        pipelineTemplates={salesforcePipelineTemplates}
        className={"m-2"}
        setDataFunction={setDataFunction}
        isLoading={isLoading}
      />
    </div>
  );
}

PipelineTemplateCardSelectionInput.propTypes = {
  selectedPipelineTemplate: PropTypes.object,
  setDataFunction: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};


