import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";

export default function useGetCustomerPipelineTemplates(
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
    loadData(getPipelineTemplate, handleErrorFunction).catch(() => {
    });
  }, []);

  const getPipelineTemplate = async () => {
    const response = await customerPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplates(
      getAccessToken,
      cancelTokenSource,
    );
    const newPipelineTemplate = DataParsingHelper.parseArray(response?.data?.data, []);

    setPipelineTemplates([...newPipelineTemplate]);
    pipelineTemplateFilterModel.setData("totalCount", response?.data?.count);
    pipelineTemplateFilterModel.setData("activeFilters", pipelineTemplateFilterModel.getActiveFilters());
    setPipelineTemplateFilterModel({...pipelineTemplateFilterModel});
  };

  return ({
    pipelineTemplates: pipelineTemplates,
    setPipelineTemplates: setPipelineTemplates,
    pipelineTemplateFilterModel: pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel: setPipelineTemplateFilterModel,
    loadData: () => loadData(getPipelineTemplate, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
