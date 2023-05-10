import React from "react";
import PropType from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";

export default function VanityTextFieldBase({ label, text, className }) {
  return (
    <FieldContainer className={className}>
      <VanityLabelBase label={label} />
      <div>{text}</div>
    </FieldContainer>
  );
}

VanityTextFieldBase.propTypes = {
  label: PropType.any,
  text: PropType.string,
  className: PropType.string,
};