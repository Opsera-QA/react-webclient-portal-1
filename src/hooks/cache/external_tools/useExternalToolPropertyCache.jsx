import useExternalToolPropertyCacheActions from "hooks/cache/external_tools/useExternalToolPropertyCacheActions";
import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useApiState, {API_STATES} from "hooks/general/api/useApiState";

export default function useExternalToolPropertyCacheEntry(
  enableAutomaticCachePull,
  uniqueId,
  toolId,
  toolIdentifier,
) {
  const [cachedEntry, setCachedEntry] = useState(undefined);
  const externalToolPropertyCacheActions = useExternalToolPropertyCacheActions();
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();

  useEffect(() => {
    if (enableAutomaticCachePull === true) {
      pullCachedValue();
    }
  }, [uniqueId, toolIdentifier, toolId, enableAutomaticCachePull]);

  const pullCachedValue = () => {
    const parsedUniqueId = DataParsingHelper.parseString(uniqueId);
    const parsedToolIdentifier = DataParsingHelper.parseString(toolIdentifier);
    const parsedToolId = DataParsingHelper.parseMongoDbId(toolId);
    setCachedEntry(undefined);

    if (parsedUniqueId && (parsedToolIdentifier || parsedToolId)) {
      apiStateFunctions.setBusyState();
      return externalToolPropertyCacheActions.getExternalToolPropertyCacheEntry(
        parsedToolId,
        parsedToolIdentifier,
        uniqueId,
      )
        .catch((error) => console.error("Could not pull cached value:", error))
        .then((response) => {
          const parsedSavedCacheEntry = DataParsingHelper.parseNestedObject(response, "data.data");

          if (parsedSavedCacheEntry) {
            setCachedEntry({...parsedSavedCacheEntry});
            return parsedSavedCacheEntry;
          }
        })
        .finally(() => apiStateFunctions.setReadyState());
    }
  };

  const setCachedValue = (newParameters) => {
    const parsedExistingParameters = DataParsingHelper.parseNestedObject(cachedEntry, "parameters");
    const parsedNewParameters = DataParsingHelper.parseObject(newParameters);
    const parsedUniqueId = DataParsingHelper.parseString(uniqueId);
    const parsedToolIdentifier = DataParsingHelper.parseString(toolIdentifier);
    const parsedToolId = DataParsingHelper.parseMongoDbId(toolId);

    if (
      parsedNewParameters
      && parsedUniqueId
      && (parsedToolIdentifier || parsedToolId)
      && (!parsedExistingParameters || ObjectHelper.areObjectsEqualLodash(parsedExistingParameters, newParameters) !== true)
    ) {
      return externalToolPropertyCacheActions.createExternalToolPropertyCacheEntry(
        parsedToolId,
        parsedToolIdentifier,
        parsedUniqueId,
        parsedNewParameters,
      )
        .catch((error) => console.error("Could not cache value:", error))
        .then((response) => {
          const parsedNewCachedEntry = DataParsingHelper.parseNestedObject(response, "data.data");

          if (parsedNewCachedEntry) {
            setCachedEntry({...parsedNewCachedEntry});
            return parsedNewCachedEntry;
          }
        });
    }
  };

  return {
    cachedEntry: cachedEntry,
    isHandlingCache: apiState === API_STATES.BUSY,
    pullCachedValue: pullCachedValue,
    setCachedValue: setCachedValue,
  };
}
