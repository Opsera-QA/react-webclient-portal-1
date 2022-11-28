import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {
  platformPipelineTemplateCatalogActions
} from "components/workflow/catalog/platform/platformPipelineTemplateCatalog.actions";

export default function useGetPlatformPipelineTemplateById(
  id,
  handleErrorFunction,
) {
  const [pipelineTemplate, setPipelineTemplate] = useState(undefined);
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
    setPipelineTemplate(undefined);

    if (isMongoDbId(id) === true && loadData) {
      loadData(getPipelineTemplate, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getPipelineTemplate = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await platformPipelineTemplateCatalogActions.getPlatformCatalogPipelineTemplateById(
      getAccessToken,
      cancelTokenSource,
      id,
    );
    const newPipelineTemplate = DataParsingHelper.parseObject(response?.data?.data);

    if (newPipelineTemplate) {
      setPipelineTemplate(newPipelineTemplate);
    }
  };

  return ({
    pipelineTemplate: pipelineTemplate,
    setPipelineTemplate: setPipelineTemplate,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
