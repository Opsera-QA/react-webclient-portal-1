import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import axios from "axios";
import PipelineCatalogCardView from "components/workflow/catalog/PipelineCatalogCardView";

function PipelineCatalog({source, activeTemplates}) {
  const { setAccessRoles, getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [workflowTemplates, setWorkflowTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessRoleData, setAccessRoleData] = useState(null);
  const [catalogFilterModel, setCatalogFilterModel] = useState(new Model({ ...catalogFilterMetadata.newObjectFields }, catalogFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setWorkflowTemplates([]);

    loadData(catalogFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [source]);

  const loadData = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await loadWorkflowTemplates(filterModel, cancelSource);
    }
  };

  const loadWorkflowTemplates = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getWorkflowTemplatesV2(getAccessToken, cancelSource, filterModel, source);
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

PipelineCatalog.propTypes = {
  source: PropTypes.string,
  activeTemplates: PropTypes.array
};

export default PipelineCatalog;
