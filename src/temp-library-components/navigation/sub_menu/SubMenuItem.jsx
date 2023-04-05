import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function SubMenuItem(
  {
    activeKey,
    setActiveKey,
    itemKey,
    label,
    visible,
    className,
    disabled,
  }) {
  const getClassNames = () => {
    const classNames = `my-auto ${DataParsingHelper.parseString(className, "")}`;

    if (activeKey === itemKey) {
      return `${classNames} active`;
    }

    return classNames;
  };

  if (visible === false) {
    return null;
  }

  return (
    <li
      key={itemKey}
      className={getClassNames()}
    >
      <div
        onClick={activeKey === itemKey || disabled === true ? undefined : () => setActiveKey(itemKey)}
        className={activeKey === itemKey || disabled === true ? undefined : "pointer"}
      >
        {label}
      </div>
    </li>
  );
}

SubMenuItem.propTypes = {
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func,
  itemKey: PropTypes.string,
  label: PropTypes.any,
  visible: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
