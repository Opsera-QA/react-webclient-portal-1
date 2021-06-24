import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/pro-light-svg-icons";
import {CODE_THEME_TYPES} from "components/common/inputs/code/CodeInput";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ToggleThemeIcon({ theme, toggleTheme, className }) {
  if (toggleTheme == null || theme == null) {
    return null;
  }

  const getIcon = () => {
    return theme === CODE_THEME_TYPES.DARK ? faMoon : faSun;
  };

  return (
    <TooltipWrapper innerText={"Toggle Theme"} >
      <div className={className}>
        <div className={"pointer"} onClick={() => {toggleTheme();}}>
          <span><FontAwesomeIcon icon={getIcon()} fixedWidth/></span>
        </div>
      </div>
    </TooltipWrapper>
  );
}

ToggleThemeIcon.propTypes = {
  toggleTheme: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string
};

export default ToggleThemeIcon;