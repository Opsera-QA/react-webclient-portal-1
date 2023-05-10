import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import FieldQueryComponent from "./FieldQueryComponent";
import customSettingQueryMetadata from "./custom-setting-query-metadata";
import DetailPanelContainer from "../../../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import { getMigrationTypeLabel, MIGRATION_TYPES } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import { faArrowLeft, faPlug, faPlus, faSave } from "@fortawesome/pro-light-svg-icons";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import CustomSettingQueryBuilderMenuBar, {
  QUERY_BUILDER_VIEWS,
} from "./CustomSettingQueryBuilderMenuBar";
import axios from "axios";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

const operators = [
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "STARTS WITH",
  "ENDS WITH",
  "CONTAINS",
  "IN",
  "NOT IN",
  "INCLUDES",
  "EXCLUDES",
];
const CustomSettingQueryBuilderScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [fieldsList, setFieldsList] = useState([]);
  const [queryFilters, setQueryFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [currentView, setCurrentView] = useState(
    QUERY_BUILDER_VIEWS.FILTER_SELECTION_QUERY_BUILDER,
  );
  const [manualQueryString, setManualQueryString] = useState("");

  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [wizardModel?.getData("selectedFieldList")]);

  const loadData = () => {
    try {
      if (wizardModel?.getData("selectedFieldList")) {
        const filteredData = wizardModel
          ?.getData("selectedFieldList")
          ?.filter((item) => {
            return item.filterable === true;
          });

        const filteredFieldsList = filteredData.map((item) => {
          // return item.name;
          return { name: item.name, type: item.type };
        });
        setFieldsList(filteredFieldsList);

        const filters =
          Array.isArray(wizardModel?.getData("queryFilters")) &&
          wizardModel?.getData("queryFilters").length > 0
            ? wizardModel?.getData("queryFilters")
            : [];
        // if (filters.length === 0) {
        //   filters.push({ ...customSettingQueryMetadata.newObjectFields });
        // }
        setManualQueryString(generateQuery());
        setQueryFilters([...filters]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFieldChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].field = value.name;
      newFilters[index].type = value.type;
      return newFilters;
    });
  };

  const handleOperatorChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].operator = value;
      return newFilters;
    });
  };

  const handleValueChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].value = value;
      return newFilters;
    });
  };

  const handleAddFilter = () => {
    setQueryFilters((prevFilters) => [
      ...prevFilters,
      { field: "", operator: operators[0], value: "" },
    ]);
  };

  const handleRemoveFilter = (index) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  const generateQuery = () => {
    const whereClause = queryFilters
      .map((filter) => {
        switch (filter.operator) {
          case "=":
          case "!=":
          case ">":
          case ">=":
          case "<":
          case "<=":
            if (
              filter?.type === "number" ||
              filter?.type === "double" ||
              filter?.type === "boolean"
            )
              return `${filter.field} ${filter.operator} ${filter.value}`;
            return `${filter.field} ${filter.operator} '${filter.value}'`;
          case "STARTS WITH":
            return `${filter.field} LIKE '${filter.value}%'`;
          case "ENDS WITH":
            return `${filter.field} LIKE '%${filter.value}'`;
          case "CONTAINS":
            return `${filter.field} LIKE '%${filter.value}%'`;
          case "IN":
            return `${filter.field} IN (${filter.value})`;
          case "NOT IN":
            return `${filter.field} NOT IN (${filter.value})`;
          case "INCLUDES":
            return `${filter.value} IN ${filter.field}`;
          case "EXCLUDES":
            return `${filter.value} NOT IN ${filter.field}`;
          default:
            return `${filter.field} ${filter.operator} '${filter.value}'`;
        }
      })
      .join(" AND ");
    const query = `SELECT ${fieldsList
      ?.map((ele) => ele.name)
      .join(", ")} FROM ${
      wizardModel?.getData("selectedCustomSetting")?.componentName
    }${whereClause ? ` WHERE ${whereClause}` : ""}`;
    return query;
  };

  const query = useMemo(() => generateQuery(), [queryFilters]);
  const handleBackButton = () => {
    if (taskType === MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG) {
      setCurrentScreen(CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.MAPPING_SCREEN);
      return;
    }
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };

  const saveAndProceed = async () => {
    try {
      setIsLoading(true);
      let finalQuery = query;
      if (currentView === QUERY_BUILDER_VIEWS.MANUAL_QUERY_BUILDER) {
        finalQuery = manualQueryString;
      }
      wizardModel.setData("filterQuery", finalQuery);
      wizardModel.setData("queryFilters", queryFilters);
      const response =
        await customSettingMigrationTaskWizardActions.validateQuery(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          finalQuery,
        );
      if (response?.status === 200) {
        await customSettingMigrationTaskWizardActions.setFilterQuery(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          finalQuery,
          queryFilters,
        );
        setCurrentScreen(
          CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIRMATION_SCREEN,
        );
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const validateQuery = async () => {
    try {
      setIsValidating(true);
      let finalQuery = query;
      if (currentView === QUERY_BUILDER_VIEWS.MANUAL_QUERY_BUILDER) {
        finalQuery = manualQueryString;
      }
      wizardModel.setData("filterQuery", finalQuery);
      wizardModel.setData("queryFilters", queryFilters);
      const response =
        await customSettingMigrationTaskWizardActions.validateQuery(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          finalQuery,
        );

      if (isMounted.current === true) {
        if (response?.status === 200) {
          toastContext.showSystemSuccessToast("Validation Succeeded.");
        }
        if (response?.status !== 200) {
          console.log(response);
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsValidating(false);
      }
    }
  };

  if (wizardModel == null) {
    return (
      <CenterLoadingIndicator
        minHeight={"500px"}
        message={`Loading`}
      />
    );
  }

  const getAddRuleButton = () => {
    if (queryFilters.length < 1) {
      return (
        <div className={"d-flex justify-content-end"}>
          <Button
            variant="outline-primary"
            className={"mr-3"}
            onClick={handleAddFilter}
            size="sm"
          >
            <span>
              <IconBase
                className={"mr-1"}
                icon={faPlus}
              />
            </span>
            Add filter to start building Query
          </Button>
        </div>
      );
    }
  };

  const setCurrentViewFunc = (newValue) => {
    setQueryFilters([]);
    setManualQueryString(generateQuery());
    setCurrentView(newValue);
  };

  const getQueryBuilderMenuBar = () => {
    return (
      <CustomSettingQueryBuilderMenuBar
        currentView={currentView}
        setCurrentView={setCurrentViewFunc}
      />
    );
  };

  const getQueryBuilderView = () => {
    switch (currentView) {
      case QUERY_BUILDER_VIEWS.MANUAL_QUERY_BUILDER:
        return (
          <div className={"mt-5 mb-5"}>
            <textarea
              value={manualQueryString}
              onChange={(event) => setManualQueryString(event.target.value)}
              className={`form-control`}
              rows={10}
            />
            <div className="d-flex justify-content-between mt-2">
              <InlineWarning
                warningMessage={
                  "Switching back to filter based Query builder will reset out your manual changes."
                }
              />
              <Button
                variant="primary"
                size="sm"
                className="mr-2 mt-2"
                onClick={validateQuery}
                disabled={isValidating}
              >
                <IconBase
                  icon={faPlug}
                  fixedWidth
                  className="mr-2"
                  isLoading={isValidating}
                />
                {isValidating ? "Validating" : "Validate Query"}
              </Button>
            </div>
          </div>
        );
      case QUERY_BUILDER_VIEWS.FILTER_SELECTION_QUERY_BUILDER:
        return (
          <div className={"mt-3 mb-5"}>
            {getAddRuleButton()}
            <div className={"m-3"}>
              {fieldsList &&
              fieldsList.length > 0 &&
              queryFilters &&
              queryFilters.length > 0 ? (
                <div>
                  {queryFilters.map((filter, index) => (
                    <FieldQueryComponent
                      key={index}
                      index={index}
                      fields={fieldsList}
                      operators={operators}
                      filter={filter}
                      onFieldChange={handleFieldChange}
                      onOperatorChange={handleOperatorChange}
                      onValueChange={handleValueChange}
                      onRemove={handleRemoveFilter}
                      onAdd={handleAddFilter}
                      isRemovable={queryFilters.length > 1}
                    />
                  ))}
                </div>
              ) : null}
              <div>
                <textarea
                  value={query}
                  disabled={true}
                  className={`form-control`}
                  rows={10}
                />
                <div className="d-flex justify-content-between mt-2">
                  {`SOQL query generated based of filter selection made above.`}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <H5FieldSubHeader
          subheaderText={`${getMigrationTypeLabel(
            taskType,
          )} : Query Builder Screen`}
        />
      </Row>
      <div className={"my-3"}>
        {getQueryBuilderMenuBar()}
        {getQueryBuilderView()}
      </div>
      <SaveButtonContainer>
        <Button
          variant="secondary"
          size="sm"
          className="mr-2"
          onClick={() => {
            handleBackButton();
          }}
        >
          <IconBase
            icon={faArrowLeft}
            fixedWidth
            className="mr-2"
          />
          Back
        </Button>
        <Button
          className={"mr-2"}
          size="sm"
          variant="primary"
          onClick={saveAndProceed}
          disabled={isLoading}
        >
          <span>
            <IconBase
              icon={faSave}
              isLoading={isLoading}
              fixedWidth
              className="mr-2"
            />
            {isLoading ? "Saving Query" : "Save and Proceed"}
          </span>
        </Button>
        <CancelButton
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
          size={"sm"}
        />
      </SaveButtonContainer>
    </DetailPanelContainer>
  );
};

CustomSettingQueryBuilderScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingQueryBuilderScreen;
