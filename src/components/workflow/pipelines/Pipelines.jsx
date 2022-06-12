import React, {useContext, useEffect, useRef, useState} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import axios from "axios";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineTableCardView from "components/workflow/pipelines/PipelineTableCardView";
import PipelinesHelpDocumentation from "../../common/help/documentation/pipelines/PipelinesHelpDocumentation";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";

function Pipelines() {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(undefined);
  const [subscribedPipelineIds, setSubscribedPipelineIds] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    const newPipelineFilterModel = new PipelineFilterModel(getAccessToken, source, loadData);

    loadData(newPipelineFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newPipelineFilterModel = pipelineFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        setIsLoading(true);
        setPipelines([]);
      }

      const pipelineFields = ["type", "_id", "name", "owner", "workflow.last_step", "workflow.run_count", "createdAt", "updatedAt"];
      const response = await pipelineActions.getPipelinesV2(getAccessToken, cancelSource, newPipelineFilterModel, newPipelineFilterModel?.getData("type"), pipelineFields);
      const pipelines = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(pipelines)) {
        setPipelines([...pipelines]);
        newPipelineFilterModel.updateTotalCount(response?.data?.count);
        newPipelineFilterModel.updateActiveFilters();
        setSubscribedPipelineIds(response?.data?.subscriptions);
        setPipelineFilterModel({...newPipelineFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelines"} />}
      pageDescription={"Select a Pipeline to view details."}
      helpComponent={
        <PipelinesHelpDocumentation/>
      }
    >
      <PipelineTableCardView
        pipelines={pipelines}
        isLoading={isLoading}
        pipelineFilterModel={pipelineFilterModel}
        setPipelineFilterModel={setPipelineFilterModel}
        loadData={loadData}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    </ScreenContainer>
  );

}

export default Pipelines;
