import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import useGetToolIdentifierByIdentifier from "hooks/tool_identifiers/useGetToolIdentifierByIdentifier";

export default function ToolIdentifierNameFieldBase(
  {
    identifier,
  }) {
  const {
    toolIdentifier,
    isLoading,
  } = useGetToolIdentifierByIdentifier(identifier);

  if (isLoading) {
    return (
      <span>
        <LoadingIcon className={"mr-1"}/>
        {identifier}
      </span>
    );
  }

  if (toolIdentifier) {
    return (
      <span>
        {toolIdentifier?.name}
      </span>
    );
  }

  return (
    <span>
      {identifier}
    </span>
  );
}

ToolIdentifierNameFieldBase.propTypes = {
  identifier: PropTypes.string,
};
