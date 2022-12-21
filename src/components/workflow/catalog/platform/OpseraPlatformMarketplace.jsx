import React from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import PlatformPipelineTemplateCardView from "components/workflow/catalog/platform/PlatformPipelineTemplateCardView";
import useGetPlatformPipelineTemplates from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplates";
import PlatformTagFilter from "components/common/filters/tags/tag/PlatformTagFilter";

export default function OpseraPipelineMarketplace({activeTemplates}) {
  const {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel,
    isLoading,
    loadData,
    error,
  } = useGetPlatformPipelineTemplates();

  const getPipelineCardView = () => {
    return (
      <PlatformPipelineTemplateCardView
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
      <PlatformTagFilter
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
           These are publicly available pipeline templates provided by Opsera. All users have access to them.
        `}
      </div>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineTemplateFilterModel}
        setFilterDto={setPipelineTemplateFilterModel}
        supportSearch={true}
        isLoading={isLoading}
        body={getPipelineCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faOctagon}
        title={"Pipeline Templates"}
        className={"pb-2"}
      />
    </div>
  );
}

OpseraPipelineMarketplace.propTypes = {
  activeTemplates: PropTypes.array
};
