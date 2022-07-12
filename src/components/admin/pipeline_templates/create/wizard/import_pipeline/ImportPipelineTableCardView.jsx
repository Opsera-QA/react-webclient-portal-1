import React from "react";
import PropTypes from "prop-types";
import InfoDialog from "components/common/status_notifications/info";
import PipelinesTableBase from "components/workflow/pipelines/pipeline_details/PipelinesTableBase";
import InformationDialog from "components/common/status_notifications/info";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableCardView from "components/common/table/TableCardView";
import PipelineVerticalTabContainer from "components/workflow/pipelines/PipelineVerticalTabContainer";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import ImportPipelineSelectionCardView
  from "components/admin/pipeline_templates/create/wizard/import_pipeline/ImportPipelineSelectionCardView";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {
  NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS
} from "components/admin/pipeline_templates/create/wizard/NewPipelineTemplateWizard";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

function ImportPipelineTableCardView(
  {
    pipelines,
    isLoading,
    pipelineFilterModel,
    setPipelineFilterModel,
    loadData,
    subscribedPipelineIds,
    pipelineTemplateModel,
    setPipelineTemplateModel,
    setPipelineTemplateWizardScreen,
  }) {
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

  const setDataFunction = (pipeline) => {
    pipelineTemplateModel.setData("name", pipeline?.name);
    pipelineTemplateModel.setData("tags", pipeline?.tags);
    pipelineTemplateModel.setData("plan", pipeline?.workflow?.plan || []);
    setPipelineTemplateModel({...pipelineTemplateModel});
    setPipelineTemplateWizardScreen(NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.PIPELINE_TEMPLATE_EDITOR_PANEL);
  };

  const onTableRowSelectFunction = (rowData) => {
    setDataFunction(rowData?.original);
  };

  const getCardView = () => {
    return (
      <div className={"scroll-y full-screen-overlay-selection-container hide-x-overflow"}>
        <ImportPipelineSelectionCardView
          pipelines={pipelines}
          onSelectFunction={setDataFunction}
          pipelineFilterModel={pipelineFilterModel}
          subscribedPipelineIds={subscribedPipelineIds}
          toolIdentifierMetadata={pipelineMetadata}
          isLoading={isLoading}
          loadData={loadData}
        />
      </div>
    );
  };

  const getTableView = () => {
    return (
      <div className={"full-screen-overlay-selection-container hide-x-overflow"}>
        <PipelinesTableBase
          isLoading={isLoading}
          paginationModel={pipelineFilterModel}
          setPaginationModel={setPipelineFilterModel}
          pipelines={pipelines}
          loadData={loadData}
          onRowClickFunction={onTableRowSelectFunction}
        />
      </div>
    );
  };

  const getTableCardView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0 makeup-tree-container"}>
          <PipelineVerticalTabContainer
            pipelineFilterModel={pipelineFilterModel}
            isLoading={isLoading}
            loadData={loadData}
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
      <InlineWarning
        className={"ml-2"}
        warningMessage={`
          WARNING: This action will only import the pipeline step settings, name and tags but it does not include the specific tools associated with a given pipeline step.  
          Customers will always have to first create their tools in Registry and then edit their pipeline to use the tools.
        `}
      />
      <InlineWarning
        className={"ml-2"}
        warningMessage={`
          Please note: This only pulls the Pipeline Name, Tags, and Plan into the new Template. 
        `}
      />
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineFilterModel}
        setFilterDto={setPipelineFilterModel}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={pipelineSummaryMetadata}
        type={"Pipeline"}
        className={"p-2"}
        body={getPipelinesBody()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faDraftingCompass}
        title={"Select a Pipeline to import its settings into a new Pipeline Template"}
      />
    </div>
  );
}

ImportPipelineTableCardView.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineFilterModel: PropTypes.object,
  setPipelineFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  subscribedPipelineIds: PropTypes.array,
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
  setPipelineTemplateWizardScreen: PropTypes.func,
};

export default ImportPipelineTableCardView;
