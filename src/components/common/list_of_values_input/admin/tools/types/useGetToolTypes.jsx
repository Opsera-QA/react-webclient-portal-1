import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";

export default function useGetToolTypes(
  includeInactive,
  handleErrorFunction,
  ) {
  const [toolTypes, setToolTypes] = useState([]);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData(
    handleErrorFunction,
  );

  useEffect(() => {
    loadData(loadToolTypes).catch(() => {});
  }, [includeInactive]);

  const loadToolTypes = async () => {
    const response = await toolCategoryActions.getToolTypesV2(
      getAccessToken,
      cancelTokenSource,
      includeInactive,
    );

    setToolTypes([...DataParsingHelper.parseArray(response?.data?.data, [])]);
  };

  return ({
    toolTypes: toolTypes,
    setToolTypes: setToolTypes,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
