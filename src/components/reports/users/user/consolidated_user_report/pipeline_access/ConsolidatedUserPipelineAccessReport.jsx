import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
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
import genericFilterMetadata from "components/common/filters/generic-filter-metadata";

function ConsolidatedUserPipelineAccessReport({ userEmailAddress }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(undefined);
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
    let newFilterDto = new Model({...genericFilterMetadata.newObjectFields}, genericFilterMetadata, false);
    loadData(newFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [userEmailAddress]);

  const loadData = async (newFilterDto = pipelineFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true && userEmailAddress) {
        setIsLoading(true);
        const response = await pipelineActions.getPipelinesAccessByEmailV2(getAccessToken, cancelSource, newFilterDto, userEmailAddress);
        const pipelines = response?.data?.data;

        if (Array.isArray(pipelines)) {
          setPipelines(pipelines);
          newFilterDto.setData("totalCount", response?.data?.count);
          newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
          setPipelineFilterModel({...newFilterDto});
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

  const getPipelineAccessTable = () => {
    return (
      <ConsolidatedUserReportPipelineAccessTable
        isLoading={isLoading}
        paginationModel={pipelineFilterModel}
        setPaginationModel={setPipelineFilterModel}
        data={pipelines}
        loadData={loadData}
      />
    );
  };

  if (!userEmailAddress) {
    return null;
  }

  return (
    <FilterContainer
      style={{minWidth: "505px"}}
      loadData={loadData}
      filterDto={pipelineFilterModel}
      setFilterDto={setPipelineFilterModel}
      supportSearch={true}
      isLoading={isLoading}
      metadata={pipelineSummaryMetadata}
      type={"Pipeline"}
      body={getPipelineAccessTable()}
      titleIcon={faDraftingCompass}
      title={"Pipelines"}
    />
  );
}

ConsolidatedUserPipelineAccessReport.propTypes = {
  userEmailAddress: PropTypes.string,
};

export default ConsolidatedUserPipelineAccessReport;
