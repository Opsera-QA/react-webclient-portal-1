import React, { useState } from "react";
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

const getEditorState = (value) => {
  try {
    const parsedValue = DataParsingHelper.parseString(value);

    if (!parsedValue) {
      return EditorState.createWithText("");
    }

    const json = DataParsingHelper.parseJson(parsedValue);

    if (json) {
      return EditorState.createWithContent(convertFromRaw(DataParsingHelper.parseJson(value, {})));
    }

    return EditorState.createWithText("Invalid value could not be parsed.");
  } catch (error) {
    return EditorState.createWithText("Invalid value could not be parsed.");
  }
};

export default function RichTextInputBase (
  {
    value,
    setDataFunction,
    disabled,
  }) {
  const [editorState, setEditorState] = useState(getEditorState(value));

  const updateValue = (newValue) => {
    setEditorState(newValue);
    // \u0001 preserves proper spaces/newlines
    setDataFunction(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  if (setDataFunction == null && disabled !== true) {
    return null;
  }

  if (disabled === true) {
    return (
      <Editor
        editorState={editorState}
        onChange={() => {}}
        customStyleMap={undefined}
      />
    );
  }

  return (
    <>
      <Toolbar />
      <Editor
        editorState={editorState}
        onChange={updateValue}
        customStyleMap={undefined}
        plugins={plugins}
      />
    </>
  );
}

RichTextInputBase.propTypes = {
  value: PropTypes.any,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};