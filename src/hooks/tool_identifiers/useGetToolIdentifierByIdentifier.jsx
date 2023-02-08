import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useToolIdentifierActions from "hooks/tool_identifiers/useToolIdentifierActions";

export default function useGetToolIdentifierByIdentifier(
  identifier,
  handleErrorFunction,
) {
  const [toolIdentifier, setToolIdentifier] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const toolIdentifierActions = useToolIdentifierActions();

  useEffect(() => {
    setToolIdentifier(undefined);

    if (hasStringValue(identifier) === true && loadData) {
      loadData(getPipeline, handleErrorFunction).catch(() => {});
    }
  }, [identifier]);

  const getPipeline = async () => {
    if (hasStringValue(identifier) !== true) {
      return;
    }

    const response = await toolIdentifierActions.getToolIdentifierByIdentifier( identifier);
    console.log("response: " + JSON.stringify(response));
    setToolIdentifier(DataParsingHelper.parseNestedObject(response, "data.data"));
  };

  return ({
    toolIdentifier: toolIdentifier,
    setToolIdentifier: setToolIdentifier,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
