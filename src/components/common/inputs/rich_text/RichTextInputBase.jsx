import React, { useState } from "react";
import {EditorState} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

export default function RichTextInputBase (
  {
    value,
    setDataFunction,
  }) {
  const [editorState, setEditorState] = useState(() => EditorState.createWithText(DataParsingHelper.parseString(value, "")),);

  const updateValue = (newValue) => {
    setEditorState(newValue);
    // \u0001 preserves proper spaces/newlines
    setDataFunction(newValue.getCurrentContent().getPlainText('\u0001'));
  };

  if (setDataFunction == null) {
    return null;
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
};