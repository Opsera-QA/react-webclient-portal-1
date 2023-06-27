import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { toolIdentifierActions } from "components/admin/tools/identifiers/toolIdentifier.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {ToolIdentifierFilterModel} from "components/admin/tools/identifiers/toolIdentifier.filter.model";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function useGetToolIdentifiers(
  status,
  enabledInToolRegistry,
  handleErrorFunction,
) {
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [toolIdentifierFilterModel, setToolIdentifierFilterModel] = useState(new ToolIdentifierFilterModel());
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
    setToolIdentifiers([]);

    if (hasStringValue(status) === true) {
      toolIdentifierFilterModel.setData("status", status);
    }

    toolIdentifierFilterModel.setData("enabledInToolRegistry", DataParsingHelper.parseBooleanV2(enabledInToolRegistry));
    loadData(() => getToolIdentifiers(toolIdentifierFilterModel), handleErrorFunction).catch(() => {});
  }, [status, enabledInToolRegistry]);

  const getToolIdentifiers = async (newFilterModel = toolIdentifierFilterModel) => {
    const response = await toolIdentifierActions.getToolIdentifiersV2(
      getAccessToken,
      cancelTokenSource,
      newFilterModel.getData("status"),
      newFilterModel.getData("enabledInToolRegistry"),
      newFilterModel.getFilterValue("search"),
    );

    const identifiers = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setToolIdentifiers([...identifiers]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setToolIdentifierFilterModel({...newFilterModel});
  };

  return ({
    isLoading: isLoading,
    error: error,
    loadData: () => loadData(getToolIdentifiers, handleErrorFunction),
    toolIdentifierFilterModel: toolIdentifierFilterModel,
    setToolIdentifierFilterModel: setToolIdentifierFilterModel,
    toolIdentifiers: toolIdentifiers,
    setToolIdentifiers: setToolIdentifiers,
  });
}
