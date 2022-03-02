import React  from "react";
import PropTypes from "prop-types";
import {faList, faThLarge} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import IconBase from "components/common/icons/IconBase";

function ViewToggle(
  {
    filterModel, 
    setFilterModel, 
    saveCookies, 
    supportViewToggle, 
    className, 
    isLoading,
  }) {

  const getViewToggle = () => {
    const view = filterModel?.getData("viewType");
    return (
      <div className={"d-flex"}>
        <Button
          variant={view === "list" ? "success" : "outline-secondary"}
          className={"mr-2"}
          size={"sm"}
          onClick={() => switchView()}
          disabled={isLoading}
        >
          <IconBase icon={faList} />
        </Button>
        <Button
          variant={view === "card" ? "success" : "outline-secondary"}
          size={"sm"}
          onClick={() => switchView()}
          disabled={isLoading}
        >
          <IconBase icon={faThLarge} />
        </Button>
      </div>
    );
  };

  const switchView = () => {
    let newFilterDto = filterModel;
    const newViewType = filterModel.getData("viewType") === "list" ? "card" : "list";
    newFilterDto.setData("viewType", newViewType);

    if (saveCookies) {
      saveCookies(newFilterDto);
    }

    setFilterModel({ ...newFilterDto });
  };

  if (supportViewToggle !== true) {
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
  saveCookies: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ViewToggle;