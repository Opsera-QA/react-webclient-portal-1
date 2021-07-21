import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import pipelineFilterMetadata from "components/workflow/pipelines/pipeline_details/workflow/pipeline-filter-metadata";
import LimitedFieldsTable from "components/reports/users/user/LimitedFieldsTable";
import InformationDialog from "components/common/status_notifications/info";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import Model from "core/data_model/model";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
  import accountsActions from "components/admin/accounts/accounts-actions";

function ConsolidatedUserReportPipelineOwnershipTable({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterDto, setPipelineFilterDto] = useState(new Model({ ...pipelineFilterMetadata.newObjectFields }, pipelineFilterMetadata, false));
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

    let newFilterDto = pipelineFilterDto;
    newFilterDto.resetData();
    setPipelineFilterDto(newFilterDto);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser){
        const userId = await getUserId();
        const owner = {
          value: userId, 
          text: `${selectedUser?.name} (${selectedUser.emailAddress})`
        };

        if (owner?.value) {
          let newPipelineFilterDto = pipelineFilterDto;
          newPipelineFilterDto.setData("viewType", "list");
          newPipelineFilterDto.setData("owner", owner);
          setPipelineFilterDto(newPipelineFilterDto);

          const response = await pipelineActions.getPipelinesV2(getAccessToken, cancelSource, pipelineFilterDto);

          if (Array.isArray(response?.data?.response)) {
            setPipelines(response.data.response);

            let newFilterDto = pipelineFilterDto;
            newFilterDto.setData("totalCount", response.data.count);
            newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      
            setPipelineFilterDto({...newFilterDto});
          }
        }
    }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        console.log(error.error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUserId = async () => {
    const response = await accountsActions.getAccountUsers(getAccessToken);
    const users = response?.data;
    
    if (!users) {
      return undefined;
    }

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === selectedUser.emailAddress) {
        return user._id;
      }
    }
  };

  const getView = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading pipelines..."/>);
    }

    if (pipelineFilterDto?.getData("viewType") === "list") {
      return (showList());
    }

    return (
      <PipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        data={pipelines}
        pipelineFilterDto={pipelineFilterDto}
        setPipelineFilterDto={setPipelineFilterDto}
      />
    );
  };

  const showList = () => {
    return (
        <LimitedFieldsTable
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
    if (pipelines && pipelines.length === 0 && !isLoading) {
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

  if (!pipelines && !isLoading || !Array.isArray(pipelines)) {
    return (
      <div className="px-2 max-content-width" >
        <div className="my-5">
          <InformationDialog message="Could not load pipelines."/>
        </div>
      </div>
    );
  }

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

ConsolidatedUserReportPipelineOwnershipTable.propTypes = {
  selectedUser: PropTypes.object,
};

export default ConsolidatedUserReportPipelineOwnershipTable;
