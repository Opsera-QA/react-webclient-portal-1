import React  from "react";
import PropTypes from "prop-types";
import {faList, faThLarge} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ViewToggle(
  {
    filterModel, 
    setFilterModel, 
    supportViewToggle,
    className, 
    isLoading,
    variant,
  }) {
  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getViewToggle = () => {
    const view = filterModel?.getData("viewType");
    return (
      <div className={"d-flex"}>
        <Button
          variant={view === "list" ? "success" : isFreeTrial === true ? "secondary" : variant}
          className={"mr-2"}
          size={"sm"}
          onClick={() => switchView()}
          onFocus={(e) => (e.target.blur())}
          disabled={isLoading}
        >
          <IconBase icon={faList} />
        </Button>
        <Button
          variant={view === "card" ? "success" : isFreeTrial === true ? "secondary" : variant}
          size={"sm"}
          onClick={() => switchView()}
          disabled={isLoading}
          onFocus={(e) => (e.target.blur())}
        >
          <IconBase icon={faThLarge} />
        </Button>
      </div>
    );
  };

  const switchView = () => {
    const newViewType = filterModel.getData("viewType") === "list" ? "card" : "list";
    filterModel.setData("viewType", newViewType);
    setFilterModel({ ...filterModel });
  };

  if (supportViewToggle !== true || setFilterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      {getViewToggle()}
    </div>
  );
}

ViewToggle.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
};

ViewToggle.defaultProps = {
  variant: "outline-secondary",
};
