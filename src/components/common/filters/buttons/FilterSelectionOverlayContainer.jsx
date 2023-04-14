import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import Model from "core/data_model/model";
import CancelButton from "components/common/buttons/CancelButton";

export default function FilterSelectionOverlayContainer(
  {
    filterModel,
    filterDropdownTitle,
    size,
    children,
    loadDataFunction,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const loadFilters = async () => {
    filterModel?.setData("currentPage", 1);
    loadDataFunction(filterModel);
    closePanelFunction();
  };

  const resetFilters = () => {
    let newFilterModel;
    const sortOption = filterModel?.getData("sortOption");
    const pageSize = filterModel?.getData("pageSize");

    if (filterModel?.getNewInstance) {
      newFilterModel = filterModel.getNewInstance();
    } else {
      newFilterModel = new Model({...filterModel.getNewObjectFields()}, filterModel.getMetaData(), false);
    }

    if (sortOption) {
      newFilterModel.setData("pageSize", pageSize);
    }

    if (pageSize) {
      newFilterModel.setData("sortOption", sortOption);
    }

    if (loadDataFunction) {
      loadDataFunction(newFilterModel);
    }

    closePanelFunction();
  };

  if (children == null) {
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
        {children}
        <ButtonContainerBase className={"mt-3"}>
          <VanityButtonBase
            onClickFunction={loadFilters}
            normalText={"Filter"}
            className={"ml-3"}
            icon={faFilter}
          />
          {/*<VanityButtonBase*/}
          {/*  disabled={isLoading || filterDto?.getData("activeFilters").length === 0}*/}
          {/*  onClickFunction={() => loadFilters()}*/}
          {/*  normalText={"Remove"}*/}
          {/*  variant={"outline-secondary"}*/}
          {/*  icon={<StackedFilterRemovalIcon />}*/}
          {/*/>*/}
          <div className={"ml-3"}>
            <Button
              variant={"outline-secondary"}
              onClick={() => resetFilters()}
              className={"w-100"}
              disabled={filterModel?.getData("activeFilters").length === 0}
            >
              <div className={"d-flex no-wrap-inline"}>
                <span className="mr-2"><StackedFilterRemovalIcon/></span>
                Remove Filters
              </div>
            </Button>
          </div>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"ml-3"}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

FilterSelectionOverlayContainer.propTypes = {
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  filterDropdownTitle: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
};

FilterSelectionOverlayContainer.defaultProps = {
  filterDropdownTitle: "Filter Selection",
};