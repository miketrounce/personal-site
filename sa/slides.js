/* ═══════════════════════════════════════════════════════════════════
   SLIDE_DATA — single source of truth for all slides
   Consumed by /sa/slides/ (table view) and /sa/deck/ (presentation)
   ═══════════════════════════════════════════════════════════════════ */

var API = 'https://api.miketrounce.com/api/series/';
function commas(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

var SLIDE_DATA = [
  {
    id: 'supply',
    eyebrow: 'The South African Government Bond Market',
    title: 'Supply',
    description: 'Budget deficit fan chart — projections vs reality',
    chartName: 'Deficit Fan',
    bullets: [
      'The dashed lines are deficit projections from every National Budget Review (2011–2026)',
      'It has been politically impossible to borrow less than 4% of GDP',
      'Projections of debt supply cannot be relied on',
      'I view the flow rate of supply of government debt as endogenously fixed at <strong>4.5% of GDP</strong>'
    ],
    buildChart: function(canvas) {
      var allLabels = ['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29'];
      var actuals = [5.3,4.3,4.8,5.3,4.6,4.5,4.2,3.8,4.6,4.8,7.7,11.6,5.7,4.9,4.8,4.8,null,null,null,null];
      var projections = [
        {2:4.2,3:4.8,4:4.6,5:4.0},{3:5.2,4:5.2,5:4.1,6:3.5},
        {4:4.9,5:4.7,6:3.9,7:3.2},{5:5.0,6:4.4,7:3.5,8:3.0},
        {6:4.2,7:4.2,8:3.6,9:3.1},{7:4.3,8:3.9,9:3.6,10:3.4},
        {8:4.1,9:3.8,10:3.8,11:3.7},{9:4.4,10:4.4,11:4.2,12:4.0},
        {10:6.5,11:6.8,12:6.4,13:5.9},{11:14.6,12:9.3,13:7.7},
        {11:14.0,12:7.3,13:6.3,14:5.7},{12:5.5,13:6.0,14:5.2,15:4.6},
        {13:4.5,14:4.5,15:3.7,16:3.2},{14:4.7,15:4.3,16:3.7,17:3.3},
        {15:4.7,16:4.6,17:3.9,18:3.6},{16:4.5,17:3.7,18:3.3,19:2.9}
      ];
      var chart = new Chart(canvas, {type:'line', data:{labels:allLabels, datasets:[
        {label:'Actual deficit (% of GDP)', data:actuals, borderColor:'#81b64c', borderWidth:3, pointBackgroundColor:'#81b64c', pointRadius:3, tension:0, spanGaps:false, order:0}
      ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, animation:{duration:400},
        plugins:{legend:{display:false}, title:{display:true, text:'Main Budget Deficit', color:'#f4f2ec', font:{size:14, weight:'bold'}},
          tooltip:{filter:function(i){return i.raw!==null;}, callbacks:{label:function(c){return c.dataset.label+': '+c.raw.toFixed(1)+'%';}}}},
        scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
          y:{min:0, max:16, ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}}}}});
      var pIdx = 0;
      var interval = setInterval(function() {
        if (pIdx >= projections.length) { clearInterval(interval); return; }
        var p = projections[pIdx];
        var d = allLabels.map(function(_, i) { return p[i] != null ? p[i] : null; });
        chart.data.datasets.push({label:'Projection', data:d, borderColor:'rgba(244,242,236,0.25)', borderWidth:1, borderDash:[4,3], pointRadius:0, tension:0, spanGaps:false, order:1});
        chart.update();
        pIdx++;
      }, 500);
    }
  },
  {
    id: 'debt-stock',
    eyebrow: 'The South African Government Bond Market',
    title: 'Debt Stock',
    description: 'Gross loan debt & debt-to-GDP ratio — explosive path',
    chartName: 'Debt Combo',
    bullets: [
      'The stock chart reveals something important: debt is on an explosive path',
      'The combination of growth and borrowing costs cannot tolerate supply of 4.5% of GDP year after year',
      'Debt-to-GDP has risen from 25% to over 75% in fifteen years',
      'Projected improvements rarely materialise'
    ],
    buildChart: function(canvas) {
      fetch(API + '?name=' + encodeURIComponent('Gross loan debt of national government'))
        .then(function(r) { return r.json(); })
        .then(function(barData) {
          fetch(API + '?name=' + encodeURIComponent('Gross debt-to-GDP ratio'))
            .then(function(r) { return r.json(); })
            .then(function(lineData) {
              var barVals = barData.values.map(function(v) { return Math.round(v / 1000); });
              var axisTopLabels = {
                id: 'axisTopLabels',
                afterDraw: function(chart) {
                  var ctx = chart.ctx;
                  var yLeft = chart.scales.y;
                  var yRight = chart.scales.y1;
                  ctx.save();
                  ctx.font = 'bold 11px -apple-system, system-ui, sans-serif';
                  ctx.textBaseline = 'bottom';
                  ctx.fillStyle = '#81b64c';
                  ctx.textAlign = 'left';
                  ctx.fillText('ZAR bn', yLeft.left, yLeft.top - 8);
                  ctx.fillStyle = '#e8c547';
                  ctx.textAlign = 'right';
                  ctx.fillText('Debt / GDP %', yRight.right, yRight.top - 8);
                  ctx.restore();
                }
              };
              new Chart(canvas, {type:'bar', data:{labels:barData.labels, datasets:[
                {label:'ZAR bn', data:barVals, backgroundColor:'rgba(129,182,76,0.7)', borderRadius:3, yAxisID:'y', order:1},
                {label:'Debt/GDP %', data:lineData.values, type:'line', borderColor:'#e8c547', borderWidth:2, pointBackgroundColor:'#e8c547', pointRadius:3, tension:0, yAxisID:'y1', order:0}
              ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6,
                layout:{padding:{top:20}},
                interaction:{mode:'index', intersect:false},
                plugins:{legend:{display:false},
                  title:{display:true, text:'Gross Loan Debt & Debt-to-GDP', color:'#f4f2ec', font:{size:14, weight:'bold'}},
                  tooltip:{callbacks:{label:function(c){
                    if (c.dataset.yAxisID==='y1') return c.raw.toFixed(1)+'%';
                    return 'R'+c.raw+' bn';
                  }}}},
                scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
                  y:{position:'left', min:0, ticks:{color:'#81b64c', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}},
                  y1:{position:'right', min:0, max:90, ticks:{color:'#e8c547', callback:function(v){return commas(v);}}, grid:{drawOnChartArea:false}}
                }}, plugins:[axisTopLabels]});
            });
        });
    }
  },
  {
    id: 'supply-flow',
    eyebrow: 'The South African Government Bond Market',
    title: 'Supply (Flow)',
    description: 'Budget deficit in ZAR bn with % of GDP overlay',
    chartName: 'Deficit Combo',
    bullets: [
      'For a growing economy, the Rand value of 4.5% of GDP grows over time',
      'In US Dollar terms, South Africa borrows a roughly constant $15–20 billion per year',
      'The bars show the absolute size of the deficit growing',
      'The line confirms the deficit rate holds steady around 4–5% of GDP'
    ],
    buildChart: function(canvas) {
      Promise.all([
        fetch(API + '?name=' + encodeURIComponent('Main budget deficit')).then(function(r){return r.json();}),
        fetch(API + '?name=' + encodeURIComponent('Main budget balance')).then(function(r){return r.json();})
      ]).then(function(ds) {
        var barVals = ds[0].values.map(function(v){return Math.round(v/1000);});
        var lineVals = ds[1].values.map(function(v){return Math.abs(v);});
        var axisPlugin = {id:'axisTopLabels', afterDraw:function(chart){var ctx=chart.ctx;ctx.save();ctx.font='bold 11px -apple-system,system-ui,sans-serif';ctx.textBaseline='bottom';ctx.fillStyle='#81b64c';ctx.textAlign='left';ctx.fillText('ZAR bn',chart.scales.y.left,chart.scales.y.top-8);ctx.fillStyle='#e8c547';ctx.textAlign='right';ctx.fillText('% of GDP',chart.scales.y1.right,chart.scales.y1.top-8);ctx.restore();}};
        new Chart(canvas, {type:'bar', data:{labels:ds[0].labels, datasets:[
          {label:'ZAR bn', data:barVals, backgroundColor:'rgba(129,182,76,0.7)', borderRadius:3, yAxisID:'y', order:1},
          {label:'% of GDP', data:lineVals, type:'line', borderColor:'#e8c547', borderWidth:2, pointBackgroundColor:'#e8c547', pointRadius:3, tension:0, yAxisID:'y1', order:0}
        ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, layout:{padding:{top:20}},
          interaction:{mode:'index', intersect:false},
          plugins:{legend:{display:false}, title:{display:true, text:'Main Budget Deficit', color:'#f4f2ec', font:{size:14, weight:'bold'}},
            tooltip:{callbacks:{label:function(c){if(c.dataset.yAxisID==='y1')return c.raw.toFixed(1)+'%';return 'R'+commas(c.raw)+' bn';}}}},
          scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
            y:{position:'left', min:0, ticks:{color:'#81b64c', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}},
            y1:{position:'right', min:0, max:14, ticks:{color:'#e8c547', callback:function(v){return commas(v);}}, grid:{drawOnChartArea:false}}}
        }, plugins:[axisPlugin]});
      });
    }
  },
  {
    id: 'debt-fan',
    eyebrow: 'The South African Government Bond Market',
    title: 'Debt-to-GDP',
    description: 'Debt-to-GDP fan chart — projections vs explosive reality',
    chartName: 'Debt Fan',
    bullets: [
      'Every budget projected debt-to-GDP would stabilise and decline',
      'Instead it has risen relentlessly from 25% to over 75%',
      'The fan of broken projections tells the same story as the deficit fan',
      'Debt is on an explosive path'
    ],
    buildChart: function(canvas) {
      fetch(API + '?name=' + encodeURIComponent('Gross debt-to-GDP ratio') + '&projections=' + encodeURIComponent('Gross debt-to-GDP ratio (projection)'))
        .then(function(r){return r.json();}).then(function(data) {
        var actuals = {}; data.labels.forEach(function(l,i){actuals[l]=data.values[i];});
        var vintageKeys = Object.keys(data.projections).sort();
        var maxYear = Math.max.apply(null, vintageKeys.map(function(k){return Math.max.apply(null, Object.keys(data.projections[k]).map(Number));}));
        var allLabels = []; for(var i=10;i<=maxYear;i++) allLabels.push(String(i));
        var actualData = allLabels.map(function(l){var v=actuals[l];return v!=null?v:null;});
        var chart = new Chart(canvas, {type:'line', data:{labels:allLabels, datasets:[
          {label:'Actual', data:actualData, borderColor:'#81b64c', borderWidth:3, pointBackgroundColor:'#81b64c', pointRadius:3, tension:0, spanGaps:false, order:0}
        ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, layout:{padding:{top:20}}, animation:{duration:400},
          plugins:{legend:{display:false}, title:{display:true, text:'Gross Debt-to-GDP Ratio', color:'#f4f2ec', font:{size:14, weight:'bold'}},
            tooltip:{filter:function(i){return i.raw!==null;}, callbacks:{label:function(c){return c.dataset.label+': '+c.raw.toFixed(1);}}}},
          scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
            y:{min:0, max:90, ticks:{color:'#b8b0a4', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}}}}});
        var pIdx = 0;
        var interval = setInterval(function(){
          if(pIdx>=vintageKeys.length){clearInterval(interval);return;}
          var pv=data.projections[vintageKeys[pIdx]];
          var d=allLabels.map(function(l){var v=pv[l];return v!=null?v:null;});
          chart.data.datasets.push({label:'Projection', data:d, borderColor:'rgba(244,242,236,0.25)', borderWidth:1, borderDash:[4,3], pointRadius:0, tension:0, spanGaps:false, order:1});
          chart.update(); pIdx++;
        }, 500);
      });
    }
  },
  {
    id: 'foreign-holdings',
    eyebrow: 'The South African Government Bond Market',
    title: 'Foreign Holdings',
    description: 'Non-resident share of government bonds — demand side',
    chartName: 'Foreign Line',
    bullets: [
      'There is large variation in the stock of foreign holdings',
      'Large jumps in 2011–2013, 2016–2018, and 2023–2025',
      'Foreign investors are the marginal price-setter in this market',
      'When foreigners buy, yields fall — when they sell, yields rise'
    ],
    buildChart: function(canvas) {
      fetch(API + '?name=' + encodeURIComponent('Foreign holdings of government bonds'))
        .then(function(r){return r.json();}).then(function(data) {
        var axisPlugin = {id:'singleAxisLabel', afterDraw:function(chart){var ctx=chart.ctx;ctx.save();ctx.font='bold 11px -apple-system,system-ui,sans-serif';ctx.textBaseline='bottom';ctx.fillStyle='#81b64c';ctx.textAlign='left';ctx.fillText('% of total',chart.scales.y.left,chart.scales.y.top-8);ctx.restore();}};
        new Chart(canvas, {type:'line', data:{labels:data.labels, datasets:[
          {label:'Foreign holdings', data:data.values, borderColor:'#81b64c', borderWidth:3, pointBackgroundColor:'#81b64c', pointRadius:3, tension:0}
        ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, layout:{padding:{top:20}},
          plugins:{legend:{display:false}, title:{display:true, text:'Foreign Holdings of Government Bonds', color:'#f4f2ec', font:{size:14, weight:'bold'}},
            tooltip:{callbacks:{label:function(c){return c.raw.toFixed(1)+'%';}}}},
          scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
            y:{min:0, max:40, ticks:{color:'#b8b0a4', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}}}}
        , plugins:[axisPlugin]});
      });
    }
  },
  {
    id: 'loan-debt',
    eyebrow: 'The South African Government Bond Market',
    title: 'Gross Loan Debt',
    description: 'Total national government debt in ZAR bn',
    chartName: 'Debt Bar',
    bullets: [
      'Gross loan debt has grown from under R1 trillion to over R5 trillion',
      'The rate of growth accelerated sharply after COVID',
      'This is the stock consequence of running persistent 4–5% deficits',
      'At current trajectory, debt will exceed R6 trillion within two years'
    ],
    buildChart: function(canvas) {
      fetch(API + '?name=' + encodeURIComponent('Gross loan debt of national government'))
        .then(function(r){return r.json();}).then(function(data) {
        var vals = data.values.map(function(v){return Math.round(v/1000);});
        var axisPlugin = {id:'singleAxisLabel', afterDraw:function(chart){var ctx=chart.ctx;ctx.save();ctx.font='bold 11px -apple-system,system-ui,sans-serif';ctx.textBaseline='bottom';ctx.fillStyle='#81b64c';ctx.textAlign='left';ctx.fillText('ZAR bn',chart.scales.y.left,chart.scales.y.top-8);ctx.restore();}};
        new Chart(canvas, {type:'bar', data:{labels:data.labels, datasets:[
          {label:'Gross Loan Debt', data:vals, backgroundColor:'rgba(129,182,76,0.7)', borderRadius:3}
        ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, layout:{padding:{top:20}},
          plugins:{legend:{display:false}, title:{display:true, text:'Gross Loan Debt', color:'#f4f2ec', font:{size:14, weight:'bold'}},
            tooltip:{callbacks:{label:function(c){return 'R'+commas(c.raw)+' bn';}}}},
          scales:{x:{ticks:{color:'#b8b0a4'}, grid:{color:'rgba(69,64,58,0.5)'}},
            y:{min:0, ticks:{color:'#b8b0a4', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}}}}
        , plugins:[axisPlugin]});
      });
    }
  },
  {
    id: 'sabo',
    eyebrow: 'The South African Government Bond Market',
    title: 'Net Foreign Bond Flows',
    description: 'Daily net foreign purchases — the demand signal',
    chartName: 'SABO Bar',
    bullets: [
      'Daily net foreign purchases of SA government bonds (Bloomberg SABO Index)',
      'When foreigners buy, yields fall — this is the causal link',
      'The flow data reveals demand shifts before they show up in prices',
      'This is the core insight of flow-of-funds analysis'
    ],
    buildChart: function(canvas) {
      fetch(API + '?name=' + encodeURIComponent('SA Net Bond Sales to Foreigners'))
        .then(function(r){return r.json();}).then(function(data) {
        var colors = 'rgba(129,182,76,0.7)';
        var axisPlugin = {id:'singleAxisLabel', afterDraw:function(chart){var ctx=chart.ctx;ctx.save();ctx.font='bold 11px -apple-system,system-ui,sans-serif';ctx.textBaseline='bottom';ctx.fillStyle='#b8b0a4';ctx.textAlign='left';ctx.fillText('ZAR mn',chart.scales.y.left,chart.scales.y.top-8);ctx.restore();}};
        new Chart(canvas, {type:'bar', data:{labels:data.labels, datasets:[
          {label:'Net foreign purchases', data:data.values, backgroundColor:colors, borderRadius:0, barPercentage:1.0, categoryPercentage:1.0}
        ]}, options:{responsive:true, maintainAspectRatio:true, aspectRatio:1.6, layout:{padding:{top:20}},
          plugins:{legend:{display:false}, title:{display:true, text:'Net Foreign Bond Purchases', color:'#f4f2ec', font:{size:14, weight:'bold'}},
            tooltip:{callbacks:{label:function(c){return (c.raw>=0?'+':'')+commas(Math.round(c.raw))+' ZAR mn';}}}},
          scales:{x:{ticks:{color:'#b8b0a4', maxTicksLimit:12}, grid:{color:'rgba(69,64,58,0.5)'}},
            y:{ticks:{color:'#b8b0a4', callback:function(v){return commas(v);}}, grid:{color:'rgba(69,64,58,0.5)'}}}}
        , plugins:[axisPlugin]});
      });
    }
  },
  {
    id: 'investor-composition',
    eyebrow: 'The South African Government Bond Market',
    title: 'Who Holds the Bonds?',
    description: 'Investor base composition — the demand structure',
    chartName: 'Stacked Area',
    bullets: [
      'Pension funds have halved their share from <strong>45% to 22%</strong> since 2006',
      'Foreigners surged from 9% to 43% then retreated to ~26% after the <strong>WGBI exit</strong>',
      'Banks have quietly doubled their share to <strong>21%</strong>, driven by Basel III liquidity rules',
      'The domestic investor base absorbed what foreigners relinquished — but at the cost of deeper sovereign exposure'
    ],
    buildChart: function(canvas) {
      var seriesNames = [
        'Bond holdings: Non-residents',
        'Bond holdings: Banks',
        'Bond holdings: Pension funds',
        'Bond holdings: Insurers',
        'Bond holdings: Other financial',
        'Bond holdings: Other'
      ];
      var seriesLabels = ['Non-residents', 'Banks', 'Pension funds', 'Insurers', 'Other financial', 'Other'];
      var seriesColors = ['#81b64c', '#e8c547', '#6fb5ff', '#e0976e', '#b48cff', '#7a7368'];
      Promise.all(seriesNames.map(function(n) {
        return fetch(API + '?name=' + encodeURIComponent(n)).then(function(r) { return r.json(); });
      })).then(function(datasets) {
        var labels = datasets[0].labels;
        var ds = datasets.map(function(d, i) {
          var hex = seriesColors[i].slice(1);
          var r = parseInt(hex.substr(0,2),16), g = parseInt(hex.substr(2,2),16), b = parseInt(hex.substr(4,2),16);
          return {
            label: seriesLabels[i], data: d.values,
            backgroundColor: 'rgba(' + r + ',' + g + ',' + b + ',0.6)',
            borderColor: seriesColors[i], borderWidth: 1,
            fill: true, pointRadius: 0, tension: 0
          };
        });
        var axisPlugin = {id:'singleAxisLabel', afterDraw:function(chart){var ctx=chart.ctx;ctx.save();ctx.font='bold 11px -apple-system,system-ui,sans-serif';ctx.textBaseline='bottom';ctx.fillStyle='#b8b0a4';ctx.textAlign='left';ctx.fillText('% of total',chart.scales.y.left,chart.scales.y.top-8);ctx.restore();}};
        new Chart(canvas, { type: 'line', data: { labels: labels, datasets: ds }, options: {
          responsive: true, maintainAspectRatio: true, aspectRatio: 1.6,
          layout: { padding: { top: 20 } },
          plugins: {
            legend: { display: true, position: 'bottom', labels: { color: '#b8b0a4', boxWidth: 12, padding: 12, font: { size: 10 } } },
            title: { display: true, text: 'Investor Base Composition', color: '#f4f2ec', font: { size: 14, weight: 'bold' } },
            tooltip: { mode: 'index', callbacks: { label: function(c) { return c.dataset.label + ': ' + c.raw.toFixed(1) + '%'; } } }
          },
          scales: {
            x: { ticks: { color: '#b8b0a4', maxTicksLimit: 20 }, grid: { color: 'rgba(69,64,58,0.5)' } },
            y: { min: 0, max: 100, stacked: true, ticks: { color: '#b8b0a4', callback: function(v) { return commas(v); } }, grid: { color: 'rgba(69,64,58,0.5)' } }
          }
        }, plugins: [axisPlugin] });
      });
    }
  }
];

/* Helper: look up a slide by ID */
function getSlideById(id) {
  for (var i = 0; i < SLIDE_DATA.length; i++) {
    if (SLIDE_DATA[i].id === id) return SLIDE_DATA[i];
  }
  return null;
}
