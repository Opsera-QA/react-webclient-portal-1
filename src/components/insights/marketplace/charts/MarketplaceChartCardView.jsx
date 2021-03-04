import React from "react";
import PropTypes from "prop-types";
import {CardColumns} from "react-bootstrap";
import CardView from "components/common/card/CardView";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import LoadingDialog from "components/common/status_notifications/loading";
import MarketplaceChartCard from "components/insights/marketplace/charts/MarketplaceChartCard";

function MarketplaceChartCardView({ marketplaceCharts, marketplaceChartFilterModel, setMarketplaceChartFilterModel, loadData, isLoading, dashboardId }) {
  const getCards = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Marketplace Items"} size={"sm"} />;
    }

    if (!Array.isArray(marketplaceCharts) || marketplaceCharts.length === 0) {
      return (<InlineInformation message={"No Marketplace Items Found"} />);
    }

    return (
      <div className="my-2">
        <CardColumns>
          {marketplaceCharts.map((kpi, index) => {
            return (<MarketplaceChartCard key={index} kpi={kpi} dashboardId={dashboardId}/>)
          })}
        </CardColumns>
      </div>
    );
  }

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setMarketplaceChartFilterModel}
      paginationDto={marketplaceChartFilterModel}
      cards={getCards()}
    />
  );
}

MarketplaceChartCardView.propTypes = {
  marketplaceCharts: PropTypes.array,
  marketplaceChartFilterModel: PropTypes.object,
  setMarketplaceChartFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  dashboardId: PropTypes.string
};

export default MarketplaceChartCardView;