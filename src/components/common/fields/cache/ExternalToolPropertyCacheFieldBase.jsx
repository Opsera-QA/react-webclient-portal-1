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
  const textField = DataParsingHelper.parseNestedString(cachedEntry, "parameters.textField");
  const cache = DataParsingHelper.parseNestedObject(cachedEntry, "parameters.cache");

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
          cache,
          externalCacheLabelPropertyName,
          uniqueId,
        )}
      </span>
    );
  }

  if (typeof formatExternalCacheLabelFunction === "function") {
    return (
      <span>
        {formatExternalCacheLabelFunction(cachedEntry)}
      </span>
    );
  }


  if (textField) {
    return (
      <span>
        {cache[textField]}
      </span>
    );
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
