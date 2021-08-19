import React from "react";
import PropTypes from "prop-types";
import StandaloneInlineActiveLogTerminal from "components/common/fields/code/StandaloneInlineActiveLogTerminal";

function InlineActiveLogTerminalBase({ title, logs, noDataMessage }) {
  if (logs == null || !Array.isArray(logs)) {
    return null;
  }

  return (
    <StandaloneInlineActiveLogTerminal
      logs={logs}
      noDataMessage={noDataMessage}
      title={title}
    />
  );
}

InlineActiveLogTerminalBase.propTypes = {
  logs: PropTypes.array,
  title: PropTypes.string,
  noDataMessage: PropTypes.string,
};

export default InlineActiveLogTerminalBase;
