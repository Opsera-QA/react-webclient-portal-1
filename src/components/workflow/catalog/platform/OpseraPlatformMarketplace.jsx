import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import PlatformPipelineTemplateCardView from "components/workflow/catalog/platform/PlatformPipelineTemplateCardView";
import useGetPlatformPipelineTemplates from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplates";
import PlatformTagFilter from "components/common/filters/tags/tag/PlatformTagFilter";
import OverlayWizardButtonContainerBase
  from "../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {ACCESS_ROLE_TYPES} from "../../../common/inputs/roles/StandaloneRoleAccessTypeInput";
import wizardHelper from "components/workflow/wizards/updated_pipeline_wizard/helpers/wizard-helpers";

export default function OpseraPipelineMarketplace({activeTemplates, selectTemplateFunction, setupMode }) {
  const {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel,
    isLoading,
    loadData,
    error,
  } = useGetPlatformPipelineTemplates();
  const [templates, setTemplates] = useState(pipelineTemplates);

  // TODO - Update template route and move to node
  useEffect(() => {
    if (setupMode && pipelineTemplates?.length > 0) {
      wizardHelper.filterTemplateByCategory(
          pipelineTemplates,
          setupMode,
          setTemplates,
          setPipelineTemplateFilterModel,
          pipelineTemplateFilterModel,
      );
    } else {
      setTemplates(pipelineTemplates);
    }
  }, [pipelineTemplates]);

  const getPipelineCardView = () => {
    return (
      <PlatformPipelineTemplateCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelineTemplates={templates}
        pipelineTemplateFilterModel={pipelineTemplateFilterModel}
        setPipelineTemplateFilterModel={setPipelineTemplateFilterModel}
        activeTemplates={activeTemplates}
        error={error}
        selectTemplateFunction={selectTemplateFunction}
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
    <div style={{ minWidth: "660px" }}>
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
        // dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faOctagon}
        title={"Pipeline Templates"}
        className={"pb-2"}
      />
    </div>
  );
}

OpseraPipelineMarketplace.propTypes = {
  activeTemplates: PropTypes.array,
  selectTemplateFunction: PropTypes.func,
  setupMode: PropTypes.string
};
