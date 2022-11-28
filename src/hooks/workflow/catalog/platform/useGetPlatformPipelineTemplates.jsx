import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {
  platformPipelineTemplateCatalogActions
} from "components/workflow/catalog/platform/platformPipelineTemplateCatalog.actions";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";

export default function useGetPlatformPipelineTemplates(
  handleErrorFunction,
) {
  const [pipelineTemplates, setPipelineTemplates] = useState([]);
  const [pipelineTemplateFilterModel, setPipelineTemplateFilterModel] = useState(new Model({...catalogFilterMetadata.newObjectFields}, catalogFilterMetadata, false));
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

  const getPipelineTemplates = async () => {
    const response = await platformPipelineTemplateCatalogActions.getPlatformCatalogPipelineTemplates(
      getAccessToken,
      cancelTokenSource,
      pipelineTemplateFilterModel,
    );
    const newPipelineTemplates = DataParsingHelper.parseArray(response?.data?.data, []);
    setPipelineTemplates([...newPipelineTemplates]);
    pipelineTemplateFilterModel.setData("totalCount", response?.data?.count);
    pipelineTemplateFilterModel.setData("activeFilters", pipelineTemplateFilterModel.getActiveFilters());
    setPipelineTemplateFilterModel({...pipelineTemplateFilterModel});
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
