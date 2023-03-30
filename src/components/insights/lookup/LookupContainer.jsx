import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainerBodyLoadingDialog
    from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import {hasStringValue} from "components/common/helpers/string-helpers";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import LookupContainerTitleBar from "./LookupContainerTitleBar";
import ActiveFilterDisplayer from "../../common/filters/ActiveFilterDisplayer";
import Model from "../../../core/data_model/model";
import {Button, Col, Row} from "react-bootstrap";
import IconBase from "../../common/icons/IconBase";
import {faFilter, faSync, faTimes} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "../../common/icons/StackedFilterRemovalIcon";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function LookupContainer(
    {
        breadcrumbDestination,
        pageDescription,
        children,
        isLoading,
        accessDenied,
        showBreadcrumbTrail,
        navigationTabContainer,
        roleRequirement,
        titleActionBar,
        helpComponent,
        bodyClassName,
        auditLogType,
        className,
        filterDto,
        filterBtnClassName,
        includeButtonText,
        filterDropdownTitle,
        dropdownFilters,
        inlineFilters,
        loadData,
        body,
        minimumHeight,
        maximumHeight,
        filterSelectionOverlayPanel,
        hideActiveFilterDisplayer,
        bodyStyling,
        hideXOverflow,
    }) {
    const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
    const toastContext = useContext(DialogToastContext);

    const getFilterBar = () => {
        return (
            <div className="inline-filter-input">
                <div className="d-flex my-auto">
                    <div className="d-flex my-auto">
                        {RefreshButton()}
                        {FilterButton()}
                    </div>
                </div>
            </div>
        );
    };

    const RefreshButton = () => {
        if (!loadData) {
            return null;
        }

        return (
            <div className={"mr-0"}>
                <Button variant={"outline-light"} size={"sm"} disabled={isLoading} onClick={()=> {loadData();}}>
                    <span><IconBase spinIcon={isLoading} icon={faSync}/></span>
                </Button>
            </div>
        );
    };

    const FilterButton = () =>{
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

        const FilterSelectionPopoverButton = () => {
            const {
                isFreeTrial,
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

            const getPopover = () => {
                if (filterDto == null || isLoading) {
                    return <></>;
                }

                return (
                    <Popover id="popover-basic" className="popover-filter">
                        <Popover.Title as="h3" className="filter-title">
                            <Row>
                                <Col sm={10} className="my-auto">{filterDropdownTitle}</Col>
                                <Col sm={2} className="text-right">
                                    <IconBase
                                        icon={faTimes}
                                        className={"pointer"}
                                        onClickFunction={() => {
                                            document.body.click();
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Popover.Title>
                        <Popover.Content className="filter-body">
                            {getInnerFilters()}
                            <div className="d-flex justify-content-between">
                                <div className="w-50 mr-1">
                                    <Button variant={isFreeTrial === true ? "secondary" : "primary"} disabled={isLoading} size="sm" onClick={() => loadFilters()} className="w-100">
                                        <span className="pr-3"><IconBase icon={faFilter} className={"mr-2"}/>Filter</span>
                                    </Button>
                                </div>
                                <div className="w-50 ml-1">
                                    <Button variant="outline-secondary" size="sm" onClick={() => resetFiltersAndCloseItem()} className="w-100"
                                            disabled={isLoading || filterDto?.getData("activeFilters").length === 0}>
                                        <span><span className="mr-2"><StackedFilterRemovalIcon/></span>Remove</span>
                                    </Button>
                                </div>
                            </div>
                        </Popover.Content>
                    </Popover>
                );
            };

            return (
                <OverlayTrigger trigger={isLoading === true ? undefined : "click"} rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
                    <div className={"mr-2"}>
                        <Button className={filterBtnClassName} disabled={filterDto == null || isLoading} variant={"outline-light"} size="sm">
                            <span><IconBase icon={faFilter}/></span>
                            {includeButtonText && <span>Filter Results</span>}
                        </Button>
                    </div>
                </OverlayTrigger>
            );
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
                    FilterSelectionPopoverButton()
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
                            variant={"outline-light"}
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
    };

    const getActiveFilterDisplayer = () => {
        if (hideActiveFilterDisplayer !== true) {
            return (
                <ActiveFilterDisplayer
                    filterModel={filterDto}
                    loadData={loadData}
                />
            );
        }
    };

    const {
        isOpseraAdministrator,
        isFreeTrial,
        userData,
        accessRoleData,
    } = useComponentStateReference();

    useEffect(() => {
        toastContext.removeInlineMessage();
        if (breadcrumb?.name !== breadcrumbDestination) {
            setBreadcrumb(getBreadcrumb(breadcrumbDestination));
        }
    }, [breadcrumbDestination]);

    const getTopNavigation = () => {
        if (showBreadcrumbTrail) {
            return (<BreadcrumbTrail destination={breadcrumbDestination} />);
        }

        if (navigationTabContainer) {
            return (
                <div className={"mb-2"}>
                    {navigationTabContainer}
                </div>
            );
        }

        if (isFreeTrial !== true || isOpseraAdministrator === true) {
            return (
                <div className="mb-2">
                    <div className="sub-navigation-block" />
                </div>
            );
        }
    };

    const getPageDescription = () => {
        const breadcrumbPageDescription = breadcrumb?.pageDescription;

        if (hasStringValue(pageDescription) === true) {
            return (
                <div className={"page-description px-3 mt-1 d-flex"}>
                    <div className={"mt-auto"}>
                        {pageDescription}
                    </div>
                </div>
            );
        }

        if (hasStringValue(breadcrumbPageDescription) === true) {
            return (
                <div className={"page-description px-3 mt-1 d-flex"}>
                    <div className={"mt-auto"}>
                        {breadcrumbPageDescription}
                    </div>
                </div>
            );
        }
    };

    const getRoleRequirementField = () => {
        if (roleRequirement) {
            return (
                <div className={"content-block-footer-text-container pt-2"}>
                    <RoleRequirementField className={"mx-2"} roleRequirement={roleRequirement} />
                </div>
            );
        }
    };

    const getBodyStylingObject = () => {
        if (bodyStyling) {
            return bodyStyling;
        }

        return ({
            minHeight: minimumHeight,
            maxHeight: maximumHeight,
            overflowY: "auto",
            overflowX: hideXOverflow !== false ? "hidden" : undefined,
        });
    };

    if (!isLoading && accessDenied) {
        return (
            <AccessDeniedContainer
                navigationTabContainer={navigationTabContainer}
            />
        );
    }

    if (breadcrumb && Array.isArray(breadcrumb?.allowedRoles) && RoleHelper.doesUserMeetSiteRoleRequirements(userData, breadcrumb?.allowedRoles) !== true) {
        return (
            <AccessDeniedContainer
                navigationTabContainer={navigationTabContainer}
            />
        );
    }

    if (!isLoading && accessRoleData && roleRequirement && !meetsRequirements(roleRequirement, accessRoleData)) {
        return (
            <AccessDeniedContainer
                navigationTabContainer={navigationTabContainer}
            />
        );
    }

    return (
        <div className={className}>
            <div className={"max-content-width max-content-height scroll-y hide-x-overflow"}>
                {getTopNavigation()}
                <div
                    className={"screen-container content-container content-card-1"}
                    style={{
                        minHeight: screenContainerHeights.SCREEN_CONTAINER_HEIGHT,
                    }}
                >
                    <div className={"p-2 content-block-header title-text-header-1"}>
                        <LookupContainerTitleBar
                            titleIcon={breadcrumb?.icon}
                            title={breadcrumb?.title}
                            isBeta={breadcrumb?.isBeta === true}
                            isLoading={isLoading}
                            titleActionBar={titleActionBar}
                            helpComponent={helpComponent}
                            auditLogType={auditLogType}
                            inlineFilters={getFilterBar()}
                        />
                    </div>
                    {getActiveFilterDisplayer()}
                    <div
                        className={bodyClassName}
                        style={getBodyStylingObject()}
                    >
                        {getPageDescription()}
                        {body}
                    </div>
                    {getRoleRequirementField()}
                </div>
            </div>
        </div>
    );
}

LookupContainer.propTypes = {
    breadcrumbDestination: PropTypes.string,
    pageDescription: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.any,
    accessDenied: PropTypes.bool,
    showBreadcrumbTrail: PropTypes.bool,
    navigationTabContainer: PropTypes.object,
    titleActionBar: PropTypes.object,
    accessRoleData: PropTypes.object,
    roleRequirement: PropTypes.string,
    helpComponent: PropTypes.object,
    bodyClassName: PropTypes.string,
    auditLogType: PropTypes.string,
    className: PropTypes.string,
    filterDto: PropTypes.object,
    dropdownFilters: PropTypes.any,
    body: PropTypes.object,
    loadData: PropTypes.func,
    inlineFilters: PropTypes.any,
    minimumHeight: PropTypes.string,
    maximumHeight: PropTypes.string,
    loadingMessage: PropTypes.string,
    bodyStyling: PropTypes.object,
    hideXOverflow: PropTypes.bool,
    filterSelectionOverlayPanel: PropTypes.any,
    hideActiveFilterDisplayer: PropTypes.bool,
    filterBtnClassName: PropTypes.string,
    includeButtonText: PropTypes.bool,
    filterDropdownTitle: PropTypes.string,
};

LookupContainer.defaultProps = {
    bodyClassName: "mt-2",
};

export default LookupContainer;