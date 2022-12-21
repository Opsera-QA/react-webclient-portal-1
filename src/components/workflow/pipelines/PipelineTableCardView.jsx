import React from "react";
import PropTypes from "prop-types";
import PipelineWelcomeView from "./PipelineWelcomeView";
import PipelinesTableBase from "components/workflow/pipelines/pipeline_details/PipelinesTableBase";
import InformationDialog from "components/common/status_notifications/info";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import TableCardView from "components/common/table/TableCardView";
import {useHistory} from "react-router-dom";
import PipelineVerticalTabContainer from "components/workflow/pipelines/PipelineVerticalTabContainer";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";

function PipelineTableCardView(
  {
    pipelines,
    isLoading,
    pipelineFilterModel,
    setPipelineFilterModel,
    loadData,
    subscribedPipelineIds,
  }) {
  const history = useHistory();

  const getDropdownFilters = () => {
    return (
      <>
        <PipelineStatusFilter
          filterModel={pipelineFilterModel}
          setFilterModel={setPipelineFilterModel}
          className={"mb-2"}
        />
        <TagFilter
          filterDto={pipelineFilterModel}
          setFilterDto={setPipelineFilterModel}
        />
        <OwnerFilter
          filterModel={pipelineFilterModel}
          setFilterModel={setPipelineFilterModel}
          className={"mt-2"}
          visible={pipelineFilterModel?.getData("type") !== "owner"}
        />
      </>
    );
  };

  const addPipeline = () => {
    history.push(`/workflow/catalog/library`);
  };

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const getCardView = () => {
    return (
      <PipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelines={pipelines}
        pipelineFilterModel={pipelineFilterModel}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    );
  };

  const getTableView = () => {
    return (
      <PipelinesTableBase
        isLoading={isLoading}
        paginationModel={pipelineFilterModel}
        setPaginationModel={setPipelineFilterModel}
        pipelines={pipelines}
        loadData={loadData}
        onRowClickFunction={onRowSelect}
      />
    );
  };

  const getTableCardView = () => {
    if (Array.isArray(pipelines) && pipelines.count === 0 && pipelineFilterModel?.getData("type") === "owner" && (pipelineFilterModel?.getActiveFilters() == null || pipelineFilterModel?.getActiveFilters()?.length === 0)) {
      return (
        <div className={"p-3"}>
          <PipelineWelcomeView />
        </div>
      );
    }

    return (
      <TabAndViewContainer
        verticalTabContainer={
          <PipelineVerticalTabContainer
            pipelineFilterModel={pipelineFilterModel}
            isLoading={isLoading}
            loadData={loadData}
          />
        }
        currentView={
          <TableCardView
            filterModel={pipelineFilterModel}
            data={pipelines}
            isLoading={isLoading}
            cardView={getCardView()}
            tableView={getTableView()}
          />
        }
      />
    );
  };

  const getPipelinesBody = () => {
    if (!Array.isArray(pipelines) && pipelines.length === 0) {
      const activeFilters = pipelineFilterModel?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
            <div className="my-5"><InformationDialog message="No pipelines meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
          <div className="my-5"><InformationDialog message="No pipelines are available for this view at this time."/></div>
        </div>
      );
    }

    return (getTableCardView());
  };

  if (!Array.isArray(pipelines) && !isLoading) {
    return (
      <div className="px-2 max-content-width" style={{minWidth: "505px"}}>
        <div className="my-5">
          <InformationDialog message="Could not load pipelines."/>
        </div>
      </div>
    );
  }

  return (
    <div style={{minWidth: "505px"}}>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineFilterModel}
        setFilterDto={setPipelineFilterModel}
        addRecordFunction={addPipeline}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={pipelineSummaryMetadata}
        type={"Pipeline"}
        className={"px-2 pb-2"}
        body={getPipelinesBody()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faDraftingCompass}
        title={"Pipelines"}
      />
    </div>
  );
}

PipelineTableCardView.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineFilterModel: PropTypes.object,
  setPipelineFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  subscribedPipelineIds: PropTypes.array,
};

export default PipelineTableCardView;
