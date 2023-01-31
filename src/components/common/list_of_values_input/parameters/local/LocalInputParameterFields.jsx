import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import LocalInputParameterHeaderField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterHeaderField";
import LocalInputParameterInlineField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterInlineField";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function LocalInputParameterFields(
  {
    model,
    setModel,
    disabled,
    fieldName,
  }) {
  const stepParameters = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  const deleteLocalParameter = (index) => {
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    model.setData(fieldName, currentData);
    setModel({...model});
  };

  if (stepParameters.length > 0) {
    return (
      <div className={"mb-1"}>
        <H5FieldSubHeader
          subheaderText={"Local Parameters"}
        />
        <div
          className={"content-container-border mb-3"}
          style={{
            overflowY: "hidden",
          }}
        >
          <LocalInputParameterHeaderField/>
          {stepParameters.map((parameter, index) => {
            return (
              <LocalInputParameterInlineField
                disabled={disabled}
                parameter={parameter}
                deleteParameterFunction={deleteLocalParameter}
                index={index}
                key={index}
              />
            );
          })}
        </div>
        <hr/>
      </div>
    );
  }

  return (
    <div className={"mb-3"}>
      <div>
        <H5FieldSubHeader
          subheaderText={"Local Parameters"}
        />
      </div>
      <div
        className={"content-container-border mb-3"}
        style={{
          overflowY: "hidden",
        }}
      >
        <CenteredContentWrapper minHeight={"50px"}>
          <div>No Local Parameters have been added yet</div>
        </CenteredContentWrapper>
      </div>
      <hr/>
    </div>
  );
}

LocalInputParameterFields.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};
