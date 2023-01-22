import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Model from "core/data_model/model";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import FilterSelectionPopoverButton from "components/common/filters/buttons/FilterSelectionPopoverButton";

function FilterButtons(
  {
    dropdownFilters,
    filterDto,
    loadData,
    className,
    isLoading,
    filterBtnClassName,
    includeButtonText,
    filterDropdownTitle,
    inlineFilters,
    filterSelectionOverlayPanel,
  }) {
  const {
    toastContext,
    isFreeTrial,
  } = useComponentStateReference();

  const loadFilters = async () => {
    if (isLoading === true) {
      return;
    }

    filterDto?.setData("currentPage", 1);
    loadData(filterDto);
    document.body.click();
  };

  const resetFilters = () => {
    if (isLoading === true) {
      return;
    }

    let newFilterModel;
    const sortOption = filterDto?.getData("sortOption");
    const pageSize = filterDto?.getData("pageSize");

    if (filterDto?.getNewInstance) {
      newFilterModel = filterDto.getNewInstance();
    } else {
      newFilterModel = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    }

    if (sortOption) {
      newFilterModel.setData("pageSize", pageSize);
    }

    if (pageSize) {
      newFilterModel.setData("sortOption", sortOption);
    }

    if (loadData) {
      loadData(newFilterModel);
    }
  };

  const resetFiltersAndCloseItem = () => {
    resetFilters();
    document.body.click();
  };

  const launchFilterSelectionOverlay = () => {
    toastContext.showOverlayPanel(filterSelectionOverlayPanel);
  };

  const getFilterButton = () => {
    if (filterSelectionOverlayPanel) {
      return (
        <div className={"mr-2"}>
          <Button
            className={filterBtnClassName}
            disabled={filterDto == null || isLoading}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
            size={"sm"}
            onClick={launchFilterSelectionOverlay}
          >
            <span><IconBase icon={faFilter}/></span>
            {includeButtonText && <span>Filter Results</span>}
          </Button>
        </div>
      );
    }

    if (dropdownFilters) {
      return (
        <FilterSelectionPopoverButton
          resetFiltersAndCloseItem={resetFiltersAndCloseItem}
          filterDto={filterDto}
          loadFilters={loadFilters}
          dropdownFilters={dropdownFilters}
          isLoading={isLoading}
          filterDropdownTitle={filterDropdownTitle}
          filterBtnClassName={filterBtnClassName}
          includeButtonText={includeButtonText}
        />
      );
    }
  };

  if (dropdownFilters == null && inlineFilters == null && filterSelectionOverlayPanel == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex">
        {getFilterButton()}
        <div>
          <Button
            className={`${filterBtnClassName}`}
            disabled={filterDto == null || filterDto?.getArrayData("activeFilters").length === 0 || isLoading}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
            size={"sm"}
            onClick={() => resetFilters()}
          >
            <StackedFilterRemovalIcon />
            {includeButtonText && <span className={'ml-1'}>Clear Results</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  dropdownFilters: PropTypes.any,
  inlineFilters: PropTypes.any,
  loadData: PropTypes.func,
  className: PropTypes.string,
  filterBtnClassName: PropTypes.string,
  includeButtonText: PropTypes.bool,
  filterDropdownTitle: PropTypes.string,
  filterSelectionOverlayPanel: PropTypes.object,
};

export default FilterButtons;