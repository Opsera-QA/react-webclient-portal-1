import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import Model from "core/data_model/model";
import pipelineTemplateCatalogFilterMetadata from "components/workflow/catalog/pipelineTemplateCatalogFilter.metadata";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";

export default function useGetCustomerPipelineTemplates(
  handleErrorFunction,
) {
  const [pipelineTemplates, setPipelineTemplates] = useState([]);
  const [pipelineTemplateFilterModel, setPipelineTemplateFilterModel] = useState(new Model({...pipelineTemplateCatalogFilterMetadata.newObjectFields}, pipelineTemplateCatalogFilterMetadata, false));
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
    const response = await customerPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplates(
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
