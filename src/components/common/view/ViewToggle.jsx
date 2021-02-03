import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faThLarge} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";

function ViewToggle({filterDto, setFilterDto, saveCookies}) {

  const getViewToggle = () => {
    const view = filterDto.getData("viewType");
    return (
      <div className="d-flex">
        <Button
          variant={view === "list" ? "primary" : "outline-secondary"}
          className="mr-2"
          size="sm"
          onClick={() => switchView()}>
          <FontAwesomeIcon icon={faList} fixedWidth/>
        </Button>
        <Button
          variant={view !== "list" ? "primary" : "outline-secondary"}
          size="sm"
          onClick={() => switchView()}>
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

  if (filterDto == null) {
    return <></>;
  }

  return (getViewToggle());
}

ViewToggle.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  saveCookies: PropTypes.func
};

export default ViewToggle;