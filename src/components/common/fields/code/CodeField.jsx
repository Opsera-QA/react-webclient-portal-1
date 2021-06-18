import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import AceEditor from "react-ace";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import FieldTitleBar from "components/common/fields/FieldTitleBar";

function CodeField({model, fieldName, language, theme, className, isLoading}) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar field={field} icon={faFileCode} isLoading={isLoading} />
          <div id={`${model?.getData("_id")}-${fieldName}`}>
            <AceEditor
              mode={language}
              theme={theme}
              readOnly={true}
              name={`${model?.getData("_id")}-${fieldName}`}
              value={model?.getData(fieldName)}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </div>
    </FieldContainer>
  );
}

CodeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  isLoading: PropTypes.bool
};

export default CodeField;