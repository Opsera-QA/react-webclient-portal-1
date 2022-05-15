import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import cookieHelpers from "core/cookies/cookie-helpers";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import axios from "axios";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineTableCardView from "components/workflow/pipelines/PipelineTableCardView";
import PipelinesHelpDocumentation from "../../common/help/documentation/pipelines/PipelinesHelpDocumentation";

const unpackTab = (tab) => {
  if (tab != null) {
    return tab;
  } else {
    let storedTab = cookieHelpers.getCookie("pipelines", "selectedTab");
    return storedTab != null ? storedTab : "owner";
  }
};

function Pipelines() {
  const { tab } = useParams();
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

    getCookie(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [tab]);


  const getCookie = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    const newTab = unpackTab(tab);
    let newPipelineFilterModel = new PipelineFilterModel(getAccessToken, cancelTokenSource, loadData);
    newPipelineFilterModel?.setData("type", newTab);
    try {
      let storedSortOption = cookieHelpers.getCookie("pipelines-v2", "sortOption");
      let storedPageSize = cookieHelpers.getCookie("pipelines-v2", "pageSize");
      let storedViewType = cookieHelpers.getCookie("pipelines-v2", "viewType");

      if (isMounted?.current === true && storedSortOption != null) {
        newPipelineFilterModel.setData("sortOption", JSON.parse(storedSortOption));
      }

      if (isMounted?.current === true && storedPageSize != null) {
        newPipelineFilterModel.setData("pageSize", JSON.parse(storedPageSize));
      }

      if (isMounted?.current === true && storedViewType != null) {
        newPipelineFilterModel.setData("viewType", JSON.parse(storedViewType));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterModel.getData("sortOption")));
        cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterModel.getData("pageSize")));
        cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterModel.getData("viewType")));
        console.error("Error loading cookie. Setting to default");
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        await loadData(newPipelineFilterModel, cancelSource);
      }
    }
  };

  const saveCookies = (newPipelineFilterModel) => {
    cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterModel.getData("sortOption")));
    cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterModel.getData("pageSize")));
    cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterModel.getData("viewType")));
  };

  const loadData = async (newPipelineFilterModel = pipelineFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        setIsLoading(true);
        setPipelines([]);
        saveCookies(newPipelineFilterModel);
      }

      const pipelineFields = ["type", "_id", "name", "owner", "workflow.last_step", "workflow.run_count", "createdAt", "updatedAt"];
      const response = await pipelineActions.getPipelinesV2(getAccessToken, cancelSource, newPipelineFilterModel, newPipelineFilterModel?.getData("type"), pipelineFields);
      const pipelines = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(pipelines)) {
        setPipelines([...pipelines]);
        let newFilterDto = newPipelineFilterModel;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto?.getActiveFilters());
        setSubscribedPipelineIds(response?.data?.subscriptions);
        setPipelineFilterModel({...newFilterDto});
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
        saveCookies={saveCookies}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    </ScreenContainer>
  );

}

export default Pipelines;
