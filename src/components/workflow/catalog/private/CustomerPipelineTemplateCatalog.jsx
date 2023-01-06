import React from "react";
import PropTypes from "prop-types";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import CustomerPipelineTemplateCardView from "components/workflow/catalog/private/CustomerPipelineTemplateCardView";
import useGetCustomerPipelineTemplates from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplates";
import CustomerTagFilter from "components/common/filters/tags/tag/CustomerTagFilter";

export default function CustomerPipelineTemplateCatalog({activeTemplates}) {
  const {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel,
    isLoading,
    loadData,
    error,
  } = useGetCustomerPipelineTemplates();

  const getPipelineCardView = () => {
    return (
      <CustomerPipelineTemplateCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelineTemplates={pipelineTemplates}
        pipelineTemplateFilterModel={pipelineTemplateFilterModel}
        setPipelineTemplateFilterModel={setPipelineTemplateFilterModel}
        activeTemplates={activeTemplates}
        error={error}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <CustomerTagFilter
        filterModel={pipelineTemplateFilterModel}
        setFilterModel={setPipelineTemplateFilterModel}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineTypeFilter
        isLoading={isLoading}
        loadData={loadData}
        filterModel={pipelineTemplateFilterModel}
        setFilterModel={setPipelineTemplateFilterModel}
        className={"mr-2"}
      />
    );
  };

  return (
    <div style={{minWidth: "660px"}}>
      <div className={"p-2"}>
        {`
         This is your organization’s private catalog of pipeline templates. These are accessible to you and your organization only.
          To share a pipeline template with your organization, publish it to this catalog in Pipeline Summary.      
        `}
      </div>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineTemplateFilterModel}
        setFilterDto={setPipelineTemplateFilterModel}
        supportSearch={true}
        isLoading={isLoading}
        body={getPipelineCardView()}
        // dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faOctagon}
        title={"Pipeline Templates"}
        className={"pb-2"}
      />
    </div>
  );
}

CustomerPipelineTemplateCatalog.propTypes = {
  activeTemplates: PropTypes.array
};
