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

export default function FilterSelectionOverlayContainer(
  {
    filterModel,
    isLoading,
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
    if (isLoading === true) {
      return;
    }

    filterModel?.setData("currentPage", 1);
    loadDataFunction(filterModel);
    document.body.click();
  };

  const resetFilters = () => {
    if (isLoading === true) {
      return;
    }

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
        <ButtonContainerBase>
            <VanityButtonBase
              disabled={isLoading}
              onClickFunction={loadFilters}
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
              onClick={resetFilters}
              disabled={isLoading}
            >
              <span><span className={"mr-2"}><StackedFilterRemovalIcon/></span>Remove</span>
            </Button>
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