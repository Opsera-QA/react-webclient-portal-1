import React from "react";
import PropTypes from "prop-types";
import useExternalToolPropertyCacheEntry from "hooks/cache/external_tools/useExternalToolPropertyCache";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalToolPropertyCacheFieldBase(
  {
    uniqueId,
    toolId,
    externalCacheLabelPropertyName,
    formatExternalCacheLabelFunction,
  }) {
  const {
    cachedEntry,
    isHandlingCache,
  } = useExternalToolPropertyCacheEntry(
    true,
    uniqueId,
    toolId,
  );

  if (isHandlingCache) {
    return (
      <span>
        <LoadingIcon className={"mr-1"}/>
        {uniqueId}
      </span>
    );
  }

  if (!cachedEntry) {
    return (
      <span>
        {uniqueId}
      </span>
    );
  }

  if (hasStringValue(externalCacheLabelPropertyName) === true) {
    return (
      <span>
        {DataParsingHelper.parseNestedString(
          cachedEntry,
          `parameters.cache.${externalCacheLabelPropertyName}`,
          uniqueId,
        )}
      </span>
    );
  }

  if (typeof formatExternalCacheLabelFunction === "function") {
    return formatExternalCacheLabelFunction(cachedEntry);
  }

  return (
    <span>
      {uniqueId}
    </span>
  );
}

ExternalToolPropertyCacheFieldBase.propTypes = {
  uniqueId: PropTypes.string,
  toolId: PropTypes.string,
  externalCacheLabelPropertyName: PropTypes.string,
  formatExternalCacheLabelFunction: PropTypes.func,
};
