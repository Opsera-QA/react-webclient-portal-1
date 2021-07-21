import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import pipelineFilterMetadata from "components/workflow/pipelines/pipeline_details/workflow/pipeline-filter-metadata";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import ConsolidatedUserReportPipelineAccessTable
  from "components/reports/users/user/consolidated_user_report/pipeline_access/ConsolidatedUserReportPipelineAccessTable";

function ConsolidatedUserPipelineAccessReport({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterDto, setPipelineFilterDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setPipelines([]);

    let newFilterDto = new Model({ ...pipelineFilterMetadata.newObjectFields }, pipelineFilterMetadata, false);
    loadData(newFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const loadData = async (newFilterDto = pipelineFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser) {
        const response = await pipelineActions.getPipelinesAccessByEmailV2(getAccessToken, cancelSource, pipelineFilterDto, selectedUser?.emailAddress);
        const pipelines = response?.data?.data;

        if (Array.isArray(pipelines)) {
          setPipelines(pipelines);
          newFilterDto.setData("totalCount", response?.data?.count);
          newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
          setPipelineFilterDto({...newFilterDto});
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getView = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading pipelines..."/>);
    }

    return (
      <ConsolidatedUserReportPipelineAccessTable
        isLoading={isLoading}
        paginationModel={pipelineFilterDto}
        setPaginationModel={setPipelineFilterDto}
        data={pipelines}
        loadData={loadData}
        type={"pipeline"}
      />
    );
  };

  const getPipelinesBody = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading pipelines..."/>);
    }

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      const activeFilters = pipelineFilterDto?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" >
            <div className="my-5"><InfoDialog message="No pipelines meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" >
          <div className="my-5"><InfoDialog message="No pipelines are available for this view at this time."/></div>
        </div>
      );
    }

    return (getView());
  };

  if (!selectedUser) {
    return null;
  }

  return (
      <FilterContainer
        style={{minWidth: "505px"}}
        loadData={loadData}
        filterDto={pipelineFilterDto}
        setFilterDto={setPipelineFilterDto}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={pipelineSummaryMetadata}
        type={"Pipeline"}
        body={getPipelinesBody()}
        titleIcon={faDraftingCompass}
        title={"Pipelines"}
      />
  );
}

ConsolidatedUserPipelineAccessReport.propTypes = {
  selectedUser: PropTypes.object,
};

export default ConsolidatedUserPipelineAccessReport;
