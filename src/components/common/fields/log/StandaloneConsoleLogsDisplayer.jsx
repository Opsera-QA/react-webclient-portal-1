import React, {useEffect} from "react";
import PropTypes from "prop-types";
import StandaloneConsoleLogField from "components/common/fields/log/StandaloneConsoleLogField";
import MultipleConsoleLogsField from "components/common/fields/log/MultipleConsoleLogsField";

function StandaloneConsoleLogsDisplayer({consoleLogs}) {
  useEffect(() => {
  }, [consoleLogs]);

  // TODO: This should be refined once we have more examples
  const getConsoleLogBody = () => {
    if (consoleLogs.length === 1) {
      const consoleLog = consoleLogs[0];

      if (typeof consoleLog === "string") {
        return (
          <StandaloneConsoleLogField
            title={"Console Log"}
            consoleLog={consoleLog}
          />
        );
      }

      if (typeof consoleLog === "object") {
        const id = consoleLog?.id;
        const log = consoleLog?.log || "Incompatible Console Log Format";

        return (
          <StandaloneConsoleLogField
            title={id}
            consoleLog={log}
          />
        );
      }
    }

    return (
      <MultipleConsoleLogsField
        consoleLogs={consoleLogs}
      />
    );
  };

  if (consoleLogs == null || !Array.isArray(consoleLogs) || consoleLogs.length === 0) {
    return null;
  }

  return (
    <div>
      {getConsoleLogBody()}
    </div>
  );
}

StandaloneConsoleLogsDisplayer.propTypes = {
  consoleLogs: PropTypes.array,
};

export default StandaloneConsoleLogsDisplayer;