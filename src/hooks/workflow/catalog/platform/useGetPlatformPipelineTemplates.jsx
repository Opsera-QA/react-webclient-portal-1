import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {
  platformPipelineTemplateCatalogActions
} from "components/workflow/catalog/platform/platformPipelineTemplateCatalog.actions";
import pipelineTemplateCatalogFilterMetadata from "components/workflow/catalog/pipelineTemplateCatalogFilter.metadata";
import FilterModelBase from "core/data_model/filterModel.base";

export default function useGetPlatformPipelineTemplates(
  handleErrorFunction,
) {
  const [pipelineTemplates, setPipelineTemplates] = useState([]);
  const [pipelineTemplateFilterModel, setPipelineTemplateFilterModel] = useState(new FilterModelBase(pipelineTemplateCatalogFilterMetadata));
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPipelineTemplates([]);
    loadData(getPipelineTemplates, handleErrorFunction).catch(() => {
    });
  }, []);

  const getPipelineTemplates = async (newFilterModel = pipelineTemplateFilterModel) => {
    const response = await platformPipelineTemplateCatalogActions.getPlatformCatalogPipelineTemplates(
      getAccessToken,
      cancelTokenSource,
      newFilterModel,
    );
    const newPipelineTemplates = DataParsingHelper.parseArray(response?.data?.data, []);
    setPipelineTemplates([...newPipelineTemplates]);
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.setData("activeFilters", pipelineTemplateCatalogFilterMetadata.getActiveFilters(newFilterModel));
    setPipelineTemplateFilterModel({...newFilterModel});
  };

  return ({
    pipelineTemplates: pipelineTemplates,
    setPipelineTemplates: setPipelineTemplates,
    pipelineTemplateFilterModel: pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel: setPipelineTemplateFilterModel,
    loadData: () => loadData(getPipelineTemplates, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
