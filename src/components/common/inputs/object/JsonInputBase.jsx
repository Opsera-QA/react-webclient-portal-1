import React from "react";
import PropTypes from "prop-types";
import locale from "react-json-editor-ajrm/locale/en";
import JSONInput from "react-json-editor-ajrm";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

export default function JsonInputBase(
  {
    disabled,
    value,
    isLoading,
    setDataFunction,
    height,
    width,
  }) {

  if (disabled === true || isLoading === true) {
    return (
      <StandaloneJsonField
        theme="light_mitsuketa_tribute"
        locale={locale}
        disabled={disabled}
        height={height}
        width={width}
        json={value}
      />
    );
  }

  return (
    <JSONInput
      placeholder={value}
      onChange={(newObject) => setDataFunction(DataParsingHelper.parseJson(newObject?.json))}
      theme={"light_mitsuketa_tribute"}
      locale={locale}
      height={height}
      width={width}
    />
  );
}

JsonInputBase.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  setDataFunction: PropTypes.func,
  value: PropTypes.any,
  height: PropTypes.string,
  width: PropTypes.string,
};

JsonInputBase.defaultProps = {
  height: "300px",
  width: "100%",
};