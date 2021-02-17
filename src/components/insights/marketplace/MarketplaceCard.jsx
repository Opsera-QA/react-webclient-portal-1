import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { formatDistanceToNowStrict } from "date-fns";

export default function MarketplaceCard({ kpi, openModal }) {
  return (
    <Card className="marketplace-card"  onClick={()=> openModal(kpi)}>
      <Card.Img variant="top"
        className="pt-2 pl-2 pr-2"
        src={kpi.thumbnailPath}
      />
      <Card.Body>
      <Card.Title>{kpi.name}</Card.Title>
        <Card.Text>
          <span className="overflow-text">
            {kpi.description}
          </span>
        </Card.Text>
          <ul className="tags">
            {kpi.tools.map((tool,idx)=>{
              return (idx < 8) ? <li key={idx}><span className="tag">{tool}</span></li> : null
            })}
          </ul>
        <Card.Text>
          <small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(kpi.updatedAt))} ago.</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

MarketplaceCard.propTypes = {
  kpi: PropTypes.object,
  openModal: PropTypes.func
};
