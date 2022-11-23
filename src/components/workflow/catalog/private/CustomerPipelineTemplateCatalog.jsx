import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import PipelineCatalogCardView from "components/workflow/catalog/PipelineCatalogCardView";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";

export default function CustomerPipelineTemplateCatalog({activeTemplates}) {
  const [workflowTemplates, setWorkflowTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [catalogFilterModel, setCatalogFilterModel] = useState(new Model({ ...catalogFilterMetadata.newObjectFields }, catalogFilterMetadata, false));
  const {
    getAccessToken,
    cancelTokenSource,
    accessRoleData,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(catalogFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterModel = catalogFilterModel) => {
    try {
      setIsLoading(true);
      await loadWorkflowTemplates(filterModel);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadWorkflowTemplates = async (filterModel = catalogFilterModel) => {
    const response = await customerPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplates(getAccessToken, cancelTokenSource, filterModel);
    const workflowTemplates = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(workflowTemplates)) {
      setWorkflowTemplates(workflowTemplates);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setCatalogFilterModel({ ...newFilterDto });
    }
  };

  const getPipelineCardView = () => {
    return (
      <PipelineCatalogCardView
        isLoading={isLoading}
        loadData={loadData}
        data={workflowTemplates}
        catalogFilterModel={catalogFilterModel}
        setCatalogFilterModel={setCatalogFilterModel}
        accessRoleData={accessRoleData}
        activeTemplates={activeTemplates}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <TagFilter filterDto={catalogFilterModel} setFilterDto={setCatalogFilterModel} />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineTypeFilter isLoading={isLoading} loadData={loadData} filterModel={catalogFilterModel} setFilterModel={setCatalogFilterModel} className={"mr-2"} />
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
        filterDto={catalogFilterModel}
        setFilterDto={setCatalogFilterModel}
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

CustomerPipelineTemplateCatalog.propTypes = {
  activeTemplates: PropTypes.array
};
