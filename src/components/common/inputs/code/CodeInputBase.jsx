import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import * as ace from 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/mode-powershell";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-fsharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-yaml";
ace.config.set('basePath', 'ace-builds/');

function CodeInputBase(
  {
    value,
    inputId,
    mode,
    theme,
    isLoading,
    disabled,
    setDataFunction,
    height,
  }) {
  const [script, setScript] = useState("");

  useEffect(() => {
    setScript(value);
  }, [value]);

  const handleData = (newValue) => {
    setScript(newValue);
    setDataFunction(newValue);
  };

  if (setDataFunction == null && disabled !== true) {
    console.log("set data function is null");
    return null;
  }

  return (
    <div id={inputId}>
      <AceEditor
        mode={mode}
        theme={theme}
        readOnly={disabled === true || isLoading === true}
        onChange={(newValue) => handleData(newValue)}
        highlightActiveLine={true}
        name={inputId}
        value={script}
        editorProps={{$blockScrolling: true}}
        width={"100%"}
        height={height}
      />
    </div>
  );
}

CodeInputBase.propTypes = {
  value: PropTypes.string,
  inputId: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  height: PropTypes.string,
};

export default CodeInputBase;