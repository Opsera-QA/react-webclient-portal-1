import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Editor, { loader } from "@monaco-editor/react";

// added this so that it doesn't go to cdn : https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/loader.js as we restrict external scripts
loader.config({
  paths: {
    vs: "/monaco-editor/min/vs",
  },
});

function MonacoCodeInputBase({
  mode,
  value,
  inputId,
  isLoading,
  disabled,
  setDataFunction,
  height,
  theme,
}) {
  const [script, setScript] = useState("");

  useEffect(() => {
    setScript(value);
  }, [value]);

  const handleData = (newValue, event) => {
    setScript(newValue);
    setDataFunction(newValue);
  };

  return (
    <div id={inputId}>
      <Editor
        language={mode}
        width={"100%"}
        height={height}
        defaultValue={script}
        options={{
          readOnly:
            disabled === true || setDataFunction == null || isLoading === true,
        }}
        theme={theme}
        onChange={handleData}
      />
    </div>
  );
}

MonacoCodeInputBase.propTypes = {
  value: PropTypes.string,
  inputId: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  height: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
};

export default MonacoCodeInputBase;
