import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faThLarge} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";

function ViewToggle({filterDto, setFilterDto, saveCookies, supportViewToggle, className, isLoading}) {

  const getViewToggle = () => {
    const view = filterDto?.getData("viewType");
    return (
      <div className="d-flex">
        <Button
          variant={view === "list" ? "success" : "outline-secondary"}
          className="mr-2"
          size="sm"
          onClick={() => switchView()}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faList} fixedWidth/>
        </Button>
        <Button
          variant={view === "card" ? "success" : "outline-secondary"}
          size="sm"
          onClick={() => switchView()}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faThLarge} fixedWidth/>
        </Button>
      </div>
    );
  };

  const switchView = () => {
    let newFilterDto = filterDto;
    const newViewType = filterDto.getData("viewType") === "list" ? "card" : "list";
    newFilterDto.setData("viewType", newViewType);

    if (saveCookies) {
      saveCookies(newFilterDto);
    }

    setFilterDto({ ...newFilterDto });
  };

  if (supportViewToggle !== true) {
    return null;
  }

  return (<div className={className}>{getViewToggle()}</div>);
}

ViewToggle.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  saveCookies: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ViewToggle;