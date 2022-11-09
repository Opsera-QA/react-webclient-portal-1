import React, { useRef, useCallback } from "react";
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from 'components/common/inputs/rich_text/editorJs.tools';
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const ReactEditorJS = createReactEditorJS();

export default function RichTextInputBase (
  {
    value,
    setDataFunction,
    disabled,
  }) {
  const editorCore = useRef(null);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = JSON.stringify(await editorCore.current.save());
    setDataFunction(savedData);
  }, []);

  if (setDataFunction == null && disabled !== true) {
    return null;
  }

  if (disabled === true) {
    return (
      <div className={"read-only-rich-text px-3 py-2"}>
        <ReactEditorJS
          minHeight={0}
          readOnly={true}
          defaultValue={DataParsingHelper.parseJson(value)}
          logLevel={"ERROR"}
          tools={EDITOR_JS_TOOLS}
        />
      </div>
    );
  }

  return (
    <ReactEditorJS
      minHeight={100}
      placeholder={"enter text"}
      onChange={handleSave}
      onInitialize={handleInitialize}
      logLevel={"ERROR"}
      defaultValue={DataParsingHelper.parseJson(value)}
      tools={EDITOR_JS_TOOLS}
    />
  );
}

RichTextInputBase.propTypes = {
  value: PropTypes.any,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};