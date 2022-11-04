import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { loader, DiffEditor } from "@monaco-editor/react";
import MonacoEditorCodeInputBase from "./MonacoEditorCodeInputBase";

// loader.config({ paths: { vs: "dependencies/vs" } });

export default function MonacoEditorCodeDiffInputBase({
  mode,
  originalContent,
  modifiedContent,
  isLoading,
  disabled,
  onChangeHandler,
  height,
  width,
  theme,
  inlineDiff,
  minMap,
  wordWrap,
  originalEditable,
}) {

  const handleEditorMount = (editor) => {
    const modifiedEditor = editor.getModifiedEditor();
    const originalEditor = editor.getOriginalEditor();

    setDisabledEditorMessage(modifiedEditor, "File marked for deletion cannot be modified");
    setDisabledEditorMessage(originalEditor, "Content from target branch cannot be modified");

    modifiedEditor.onDidChangeModelContent((_) => {
      // console.log(modifiedEditor.getValue());
      if (onChangeHandler) {
        onChangeHandler(modifiedEditor.getValue());
      }
    });
  };

  const setDisabledEditorMessage = (editorInstance, message) => {
    const messageContribution = editorInstance.getContribution(
      "editor.contrib.messageController",
    );
    editorInstance.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage(message, editorInstance.getPosition());
    });
  };

  return (
    <DiffEditor
      language={mode}
      height={height}
      defaultLanguage={"javascript"}
      original={originalContent}
      modified={modifiedContent}
      width={width}
      options={{
        renderSideBySide: !inlineDiff,
        originalEditable: originalEditable,
        smoothScrolling: true,
        minimap: {
          enabled: minMap,
        },
        wordWrap: wordWrap === true ? "on" : "off",
        diffWordWrap: wordWrap === true ? "on" : "off",
        readOnly: disabled === true || isLoading === true,
        scrollbar: {
          horizontalScrollbarSize: "5",
          verticalScrollbarSize: "5",
          verticalSliderSize: "5",
        },
      }}
      theme={theme ? theme : "vs-dark"}
      onMount={handleEditorMount}
      // onValidate={handleEditorValidation}
    />
  );
}

MonacoEditorCodeDiffInputBase.propTypes = {
  originalContent: PropTypes.string,
  modifiedContent: PropTypes.string,
  width: PropTypes.string,
  onChangeHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  inlineDiff: PropTypes.bool,
  minMap: PropTypes.bool,
  wordWrap: PropTypes.bool,
  originalEditable: PropTypes.bool
};

MonacoEditorCodeInputBase.defaultProps = {
  minMap: false,
  wordWrap: true,
  originalEditable: false,
  height: "800px",
};