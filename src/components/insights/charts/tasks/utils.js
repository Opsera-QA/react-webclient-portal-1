const getTrendForBlocks = (curr, previous) => {
  let trend = "";
  try {
    if (curr > previous) {
      trend = "up";
    } else if (curr === previous) {
      trend = "neutral";
    } else if (curr < previous) {
      trend = "down";
    } else {
      trend = "black";
    }
  } catch (e) {
    console.error(e);
    return null;
  }
  return {
    trend,
  };
};

export { getTrendForBlocks }
