import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function FilterSelectionOverlay(
  {
    dropdownFilters,
    filterDto,
    loadFilters,
    isLoading,
    resetFiltersAndCloseItem,
    filterDropdownTitle,
    size,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const getInnerFilters = () => {
    if (dropdownFilters) {
      if (Array.isArray(dropdownFilters)) {
        return (dropdownFilters.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        }));
      } else {
        return <div className="mb-2">{dropdownFilters}</div>;
      }
    }
  };

  const closePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const handleFilterLoading = () => {
    loadFilters();
    closePanelFunction();
  };

  const handleFilterRemoval = () => {
    resetFiltersAndCloseItem();
    closePanelFunction();
  };

  if (dropdownFilters == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={filterDropdownTitle}
      titleIcon={faFilter}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      <div className={"bg-white m-3"}>
        {getInnerFilters()}
        <ButtonContainerBase>
            <VanityButtonBase
              disabled={isLoading}
              onClickFunction={handleFilterLoading}
              normalText={"Filter"}
              className={"mr-2"}
              icon={faFilter}
            />
          {/*<VanityButtonBase*/}
          {/*  disabled={isLoading || filterDto?.getData("activeFilters").length === 0}*/}
          {/*  onClickFunction={() => loadFilters()}*/}
          {/*  normalText={"Remove"}*/}
          {/*  variant={"outline-secondary"}*/}
          {/*  icon={<StackedFilterRemovalIcon />}*/}
          {/*/>*/}
            <Button
              variant={"outline-secondary"}
              onClick={handleFilterRemoval}
              disabled={isLoading || filterDto?.getData("activeFilters").length === 0}
            >
              <span><span className={"mr-2"}><StackedFilterRemovalIcon/></span>Remove</span>
            </Button>
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

FilterSelectionOverlay.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  dropdownFilters: PropTypes.any,
  loadFilters: PropTypes.func,
  resetFiltersAndCloseItem: PropTypes.func,
  filterDropdownTitle: PropTypes.string,
  size: PropTypes.string,
};

FilterSelectionOverlay.defaultProps = {
  filterDropdownTitle: "Filter Selection",
};