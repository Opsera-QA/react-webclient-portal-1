import React from "react";
import PropTypes from "prop-types";
import Editor, { loader } from '@monaco-editor/react';

loader.config({ paths: { vs: 'dependencies/vs' } });

export default function MonacoEditorCodeInputBase(
  {
    value,
    setDataFunction,
    height,
    width,
  }) {

  function handleEditorValidation(markers) {
    markers.forEach(marker => console.log("onValidate:", marker.message));
  }

  return (
    <Editor
      height={height}
      defaultLanguage={"javascript"}
      value={value}
      width={width}
      onChange={(newValue) => setDataFunction(newValue)}
      onValidate={handleEditorValidation}
    />
  );
}

MonacoEditorCodeInputBase.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  setDataFunction: PropTypes.func,
  height: PropTypes.string,
};