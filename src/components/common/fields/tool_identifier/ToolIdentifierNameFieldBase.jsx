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
  console.log("identifier: " + JSON.stringify(identifier));
  console.log("toolIdentifier: " + JSON.stringify(toolIdentifier));

  if (isLoading) {
    return (
      <span>
        <LoadingIcon className={"mr-1"}/>
        {identifier}
      </span>
    );
  }

  if (toolIdentifier) {
    console.log("found tool identifier: " + JSON.stringify(toolIdentifier));
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
