export const formatMaturityScoreItems = items => items.map(
  item => ({
    ...item,
    score: item.overallMaturityScoreText,
    previousScore: item.previousOverallMaturityScoreText,
  })
);

export const formatForSDMTimelineChart = dataPoints => dataPoints.map(
  ({
    x,
    sdmScore,
    sdmScoreText,
    range
  }) => ({
    x,
    y: sdmScore,
    sdmScoreText,
    range
  })
);
