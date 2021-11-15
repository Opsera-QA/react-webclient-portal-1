import React from "react";
import PropTypes from "prop-types";
import InfoDialog from "components/common/status_notifications/info";
import PipelineWelcomeView from "./PipelineWelcomeView";
import PipelinesTable from "./pipeline_details/PipelinesTable";
import InformationDialog from "components/common/status_notifications/info";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableCardView from "components/common/table/TableCardView";
import {useHistory} from "react-router-dom";
import PipelineVerticalTabContainer from "components/workflow/pipelines/PipelineVerticalTabContainer";

function PipelineTableCardView({ pipelines, isLoading, pipelineFilterModel, setPipelineFilterModel, loadData, saveCookies }) {
  const history = useHistory();

  const getDynamicFilter = () => {
    if (pipelineFilterModel?.getData("type") !== "owner") {
      return (<LdapOwnerFilter filterDto={pipelineFilterModel} setFilterDto={setPipelineFilterModel} className={"mt-2"}/>);
    }
  };

  const getDropdownFilters = () => {
    return (
      <>
        <PipelineStatusFilter filterModel={pipelineFilterModel} setFilterModel={setPipelineFilterModel} className={"mb-2"} />
        <TagFilter filterDto={pipelineFilterModel} setFilterDto={setPipelineFilterModel}/>
        {getDynamicFilter()}
      </>
    );
  };

  const addPipeline = () => {
    history.push(`/workflow/catalog`);
  };

  const getCardView = () => {
    return (
      <PipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        data={pipelines}
        pipelineFilterModel={pipelineFilterModel}
      />
    );
  };

  const getTableView = () => {
    if (Array.isArray(pipelines) && pipelines.count === 0 && pipelineFilterModel?.getData("type") === "owner" && (pipelineFilterModel?.getActiveFilters() == null || pipelineFilterModel?.getActiveFilters()?.length === 0) ) {
      return (<PipelineWelcomeView />);
    }

    return (
      <PipelinesTable
        isLoading={isLoading}
        paginationModel={pipelineFilterModel}
        setPaginationModel={setPipelineFilterModel}
        data={pipelines}
        loadData={loadData}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          <PipelineVerticalTabContainer
            pipelineFilterModel={pipelineFilterModel}
            isLoading={isLoading}
          />
        </Col>
        <Col sm={10} className={"px-0"}>
          <TableCardView
            filterModel={pipelineFilterModel}
            data={pipelines}
            isLoading={isLoading}
            cardView={getCardView()}
            tableView={getTableView()}
          />
        </Col>
      </Row>
    );
  };

  const getPipelinesBody = () => {
    if (!Array.isArray(pipelines) && pipelines.length === 0) {
      const activeFilters = pipelineFilterModel?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
            <div className="my-5"><InfoDialog message="No pipelines meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
          <div className="my-5"><InfoDialog message="No pipelines are available for this view at this time."/></div>
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
        saveCookies={saveCookies}
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
  saveCookies: PropTypes.func,
};

export default PipelineTableCardView;
