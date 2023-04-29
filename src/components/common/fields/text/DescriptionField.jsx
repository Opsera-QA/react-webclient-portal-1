import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {cutOffExcessCharacters} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DescriptionField(
  {
    dataObject,
    fieldName,
    className,
    characterLimit,
  }) {
  const parsedDescriptionField = DataParsingHelper.parseString(dataObject?.getData(fieldName), "");
  const parsedCharacterLimit = DataParsingHelper.parseInteger(characterLimit, 150);
  const exceedsLimit = parsedDescriptionField.length > parsedCharacterLimit;

  return (
    <FieldContainer className={className}>
      <TooltipWrapper
        innerText={exceedsLimit === true ? parsedDescriptionField : undefined}
        overlayWidth={"200px"}
      >
        <div>
          {cutOffExcessCharacters(parsedDescriptionField, parsedCharacterLimit)}
        </div>
      </TooltipWrapper>
    </FieldContainer>
  );
}

DescriptionField.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  dataObject: PropTypes.object,
  characterLimit: PropTypes.number
};

DescriptionField.defaultProps = {
  characterLimit: 150,
  fieldName: "description",
};

export default DescriptionField;