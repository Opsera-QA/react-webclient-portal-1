export default () => ({
  enableGridX: false,
  enableGridY: false,  
  yScale: { 
    type: 'linear', 
    min: '0', 
    max: '100', 
    stacked: false, 
    reverse: false 
  },
  xFormat: "time:%Y-%m-%d",  
  colors: { datum: 'color' },
  axisLeft: {
    tickValues: [0, 50, 100],
    legend: 'Success Rate %',
    legendOffset: -40,
    legendPosition: 'middle'
  },
  axisBottom: {
    format: d => { var date = new Date(d).toDateString(); date = date.split(" "); return date[1]+" "+date[2]; },
    tickRotation: -45,
    legend: 'Date',
    legendOffset: 55,
    legendPosition: 'middle'
  },
  pointSize: 6  
});
