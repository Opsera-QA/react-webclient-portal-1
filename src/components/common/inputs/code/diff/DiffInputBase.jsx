import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { diff as DiffEditor } from "react-ace";

import * as ace from 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-powershell";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-fsharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-yaml";
import { diffHelper } from "utils/diff.helper";
ace.config.set('basePath', 'ace-builds/');

function DiffInputBase(
  {
    inputId,
    mode,
    theme,
    isLoading,
    disabled,
    setDataFunction,
    height,
    originalCode,
    changedCode,
  }) {
  const [internalOriginalCode, setInternalOriginalCode] = useState("");
  const [internalChangedCode, setInternalChangedCode] = useState("");
  const [diffLines, setDiffLines] = useState([]);

  useEffect(() => {
    setDiffLines([]);

    const diff = diffHelper.getSeparatedDiffLineNumbers(internalOriginalCode, internalChangedCode,);

  }, [internalOriginalCode, internalChangedCode]);

  useEffect(() => {
    setInternalOriginalCode(originalCode);
  }, [originalCode]);

  useEffect(() => {
    setInternalChangedCode(changedCode);
  }, [changedCode]);

  const handleData = (newValue) => {
    if (setDataFunction) {
      setInternalOriginalCode(newValue);
      setDataFunction(newValue);
    }
  };

  if (setDataFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div id={inputId}>
      <DiffEditor
        mode={mode}
        theme={theme}
        readOnly={disabled === true || isLoading === true}
        onChange={(newValue) => handleData(newValue)}
        highlightActiveLine={true}
        name={inputId}
        value={[internalOriginalCode, internalChangedCode]}
        editorProps={{$blockScrolling: true}}
        width={"100%"}
        height={height}
      />
    </div>
  );
}

DiffInputBase.propTypes = {
  originalCode: PropTypes.string,
  changedCode: PropTypes.string,
  inputId: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  height: PropTypes.string,
};

DiffInputBase.defaultProps = {
  theme: "monokai",
  mode: "javascript",
};

export default DiffInputBase;