import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faMoon, faSun} from "@fortawesome/pro-light-svg-icons";
import {CODE_THEME_TYPES} from "components/common/inputs/code/CodeInput";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import {MONACO_CODE_THEME_TYPES} from "components/common/inputs/code/monaco/MonacoCodeDiffInput";

function ToggleThemeIcon({ theme, toggleTheme, className, size, variant }) {
  if (toggleTheme == null || theme == null) {
    return null;
  }

  const getIcon = () => {
    return ((theme === CODE_THEME_TYPES.DARK) || (theme === MONACO_CODE_THEME_TYPES.DARK)) ? faMoon : faSun;
  };

  return (
    <TooltipWrapper innerText={"Toggle Theme"} >
      <div className={className}>
        <Button variant={variant} size={size}  onClick={() => {toggleTheme();}}>
          <span><IconBase icon={getIcon()}/></span>
        </Button>
      </div>
    </TooltipWrapper>
  );
}

ToggleThemeIcon.propTypes = {
  toggleTheme: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

ToggleThemeIcon.defaultProps = {
  variant: "outline-primary",
  size: "sm"
};

export default ToggleThemeIcon;