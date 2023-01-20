import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Editor, { loader } from "@monaco-editor/react";
import MonacoCodeDiffInput from "./MonacoCodeDiffInput";
import MonacoEditorCodeDiffInputBase from "./MonacoEditorCodeDiffInputBase";

loader.config({ paths: { vs: "dependencies/vs" } });

export default function MonacoEditorCodeInputBase({
  mode,
  value,
  isLoading,
  disabled,
  setDataFunction,
  height,
  width,
  theme,
  minMap,
  wordWrap,
}) {
  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  return (
    <Editor
      language={mode}
      height={height}
      defaultLanguage={"javascript"}
      value={value}
      width={width}
      options={{
        smoothScrolling: true,
        minimap: {
          enabled: minMap,
        },
        wordWrap: wordWrap === true ? "on" : "off",
        scrollbar: { horizontalScrollbarSize: "5", verticalScrollbarSize: "5" },
        readOnly:
          disabled === true || setDataFunction == null || isLoading === true,
      }}
      theme={theme}
      onChange={(newValue) => setDataFunction(newValue)}
      // onValidate={handleEditorValidation}
    />
  );
}

MonacoEditorCodeInputBase.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  setDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  minMap: PropTypes.bool,
  wordWrap: PropTypes.bool,
};

MonacoEditorCodeDiffInputBase.defaultProps = {
  minMap: false,
  wordWrap: true,
};