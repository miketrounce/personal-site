
interface Topic {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  lessons: number;
  description: string;
  tableOfContents: { id: string; label: string }[];
  content: string;
}

const topics: Topic[] = [
  {
    slug: "what-are-quantamental-indicators",
    title: "What are Macro-Quantamental Indicators?",
    category: "Foundations",
    categoryColor: "accent",
    lessons: 12,
    description: "Understand how point-in-time macroeconomic data is transformed into quantitative signals free of look-ahead bias. This is the foundation of everything in the macro-quantamental approach.",
    tableOfContents: [
      { id: "overview", label: "Overview" },
      { id: "point-in-time", label: "The Point-in-Time Principle" },
      { id: "data-vintages", label: "Data Vintages and Revisions" },
      { id: "construction", label: "Indicator Construction" },
      { id: "categories", label: "Indicator Categories" },
      { id: "applications", label: "Applications in Finance" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Macro-quantamental indicators are quantitative representations of macroeconomic conditions, constructed specifically for use in systematic investment strategies. Unlike conventional economic data, these indicators are designed with the strict temporal discipline required for honest backtesting and live trading.</p>
      <p>The term "quantamental" reflects the fusion of quantitative methods with fundamental economic analysis. Rather than treating macro data as a qualitative input to discretionary decision-making, the quantamental approach transforms it into precise, timestamped signals that can be tested, combined, and deployed algorithmically.</p>

      <h2 id="point-in-time">The Point-in-Time Principle</h2>
      <p>The most critical concept in macro-quantamental data is the point-in-time principle. Every observation is stamped with the exact date and time it became available to the market. This means:</p>
      <ul>
        <li>No future information leaks into historical records</li>
        <li>Data revisions are preserved as separate observations, not overwritten</li>
        <li>Publication lags are explicitly modeled and accounted for</li>
        <li>Backtests reflect the true information set available to a trader at each point in history</li>
      </ul>
      <p>Without point-in-time discipline, backtested returns are meaningless. A strategy that appears profitable using revised data may perform poorly when traded in real time, because the revised figures were not available when the trading decision had to be made.</p>

      <h2 id="data-vintages">Data Vintages and Revisions</h2>
      <p>Government statistical agencies routinely revise their initial estimates of economic indicators. GDP figures, employment data, and inflation measures are all subject to multiple rounds of revision that can significantly alter the picture of economic conditions.</p>
      <p>The macro-quantamental approach preserves every vintage of every data release. This creates a rich panel of information that captures not just the final revised value, but the entire sequence of estimates that market participants actually observed. The gap between initial releases and final revisions is itself an informative signal.</p>

      <h2 id="construction">Indicator Construction</h2>
      <p>Raw macroeconomic data must be transformed before it becomes useful as a trading signal. Common transformations include:</p>
      <ul>
        <li><strong>Normalization:</strong> Converting levels to z-scores relative to a rolling historical window, making cross-country comparisons meaningful</li>
        <li><strong>Seasonal adjustment:</strong> Removing predictable seasonal patterns while preserving the genuine cyclical signal</li>
        <li><strong>Frequency alignment:</strong> Interpolating lower-frequency data (e.g., quarterly GDP) to a daily or weekly frequency without introducing look-ahead bias</li>
        <li><strong>Composite construction:</strong> Combining multiple related indicators into a single signal with improved statistical properties</li>
      </ul>

      <h2 id="categories">Indicator Categories</h2>
      <p>Macro-quantamental indicators span all major areas of macroeconomic analysis. The principal categories include:</p>
      <ul>
        <li><strong>Growth and activity:</strong> GDP, industrial production, PMI surveys, labor market indicators</li>
        <li><strong>Inflation and prices:</strong> CPI, PPI, commodity prices, inflation expectations</li>
        <li><strong>External balances:</strong> Current account, trade balance, capital flows</li>
        <li><strong>Government finance:</strong> Fiscal balance, public debt dynamics, sovereign credit metrics</li>
        <li><strong>Monetary conditions:</strong> Policy rates, money supply, credit growth, financial conditions indices</li>
      </ul>

      <h2 id="applications">Applications in Finance</h2>
      <p>Macro-quantamental indicators serve as the raw material for systematic trading strategies across all major asset classes. In foreign exchange, they drive carry, value, and momentum signals. In fixed income, they inform duration, curve, and spread positioning. In equity markets, they contribute to country allocation and sector rotation models.</p>
      <p>The key advantage of the macro-quantamental approach is that it provides an economic rationale for every position. This transparency makes strategies more robust to regime changes and easier to explain to stakeholders, compared to purely statistical or data-mined approaches.</p>
    `,
  },
  {
    slug: "indicators-on-jpmaqs",
    title: "Quantamental Indicators on JPMaQS",
    category: "Foundations",
    categoryColor: "accent",
    lessons: 8,
    description: "Explore the full catalogue of indicators available through the J.P. Morgan Macrosynergy Quantamental System, including coverage, frequency, and data access methods.",
    tableOfContents: [
      { id: "platform-overview", label: "Platform Overview" },
      { id: "data-catalogue", label: "The Data Catalogue" },
      { id: "country-coverage", label: "Country Coverage" },
      { id: "access-methods", label: "Access Methods" },
      { id: "python-package", label: "The macrosynergy Python Package" },
    ],
    content: `
      <h2 id="platform-overview">Platform Overview</h2>
      <p>JPMaQS (the J.P. Morgan Macrosynergy Quantamental System) is the institutional-grade data platform that delivers macro-quantamental indicators to investment professionals. Developed through a partnership between Macrosynergy and J.P. Morgan, it provides curated, point-in-time macroeconomic data spanning over 40 countries and more than two decades of history.</p>
      <p>The platform is designed for quantitative researchers and systematic portfolio managers who need reliable, bias-free macro data for strategy development and backtesting.</p>

      <h2 id="data-catalogue">The Data Catalogue</h2>
      <p>JPMaQS hosts over 1,000 individual indicators organized into thematic categories. Each indicator is documented with its source, construction methodology, publication lag, and revision history. The catalogue is continuously expanded as new data sources become available and new composite indicators are developed.</p>
      <p>Indicators range from raw economic releases (such as GDP growth and CPI inflation) to sophisticated composite signals (such as excess labor supply indices and fiscal vulnerability scores). All indicators maintain strict point-in-time discipline.</p>

      <h2 id="country-coverage">Country Coverage</h2>
      <p>The system covers all G10 economies plus a broad set of emerging markets, including major Latin American, Asian, and European economies. Coverage depth varies by country, with the richest data available for the United States, Euro Area, United Kingdom, and Japan.</p>

      <h2 id="access-methods">Access Methods</h2>
      <p>Data can be accessed through multiple channels: a REST API for programmatic access, bulk data downloads for offline analysis, and direct integration with popular quantitative research platforms. The API supports both real-time data retrieval and historical data reconstruction.</p>

      <h2 id="python-package">The macrosynergy Python Package</h2>
      <p>The open-source <code>macrosynergy</code> Python package provides a high-level interface to JPMaQS data, along with tools for data visualization, signal construction, backtesting, and performance analysis. It is the recommended starting point for researchers new to the platform.</p>
    `,
  },
  {
    slug: "introductory-tutorials",
    title: "Introductory Tutorials",
    category: "Foundations",
    categoryColor: "accent",
    lessons: 6,
    description: "Hands-on walkthroughs covering data retrieval, visualization, and basic signal construction with Python and the macrosynergy package.",
    tableOfContents: [
      { id: "getting-started", label: "Getting Started" },
      { id: "data-retrieval", label: "Retrieving Data" },
      { id: "visualization", label: "Data Visualization" },
      { id: "basic-signals", label: "Basic Signal Construction" },
      { id: "next-steps", label: "Next Steps" },
    ],
    content: `
      <h2 id="getting-started">Getting Started</h2>
      <p>These tutorials walk you through the essential steps of working with macro-quantamental data using the <code>macrosynergy</code> Python package. By the end, you will be able to retrieve indicators, visualize economic trends, and construct basic trading signals.</p>
      <p>Prerequisites include a working Python environment (3.8+), familiarity with pandas and matplotlib, and access credentials for the JPMaQS API.</p>

      <h2 id="data-retrieval">Retrieving Data</h2>
      <p>The first step in any analysis is loading the data. The <code>macrosynergy</code> package provides convenient functions for downloading indicators by ticker, category, or country. All downloads automatically respect point-in-time constraints, ensuring that the data you analyze matches what was available at each historical date.</p>

      <h2 id="visualization">Data Visualization</h2>
      <p>Effective visualization is essential for understanding macro data. The package includes purpose-built plotting functions for time series, cross-sectional comparisons, heatmaps, and correlation structures. These tools help you spot trends, anomalies, and relationships before moving to formal signal construction.</p>

      <h2 id="basic-signals">Basic Signal Construction</h2>
      <p>A signal is a numerical score that ranks assets (countries, currencies, or bonds) from most to least attractive. The simplest signals are z-scores of individual indicators, computed relative to a rolling historical window. More sophisticated signals combine multiple indicators using linear or non-linear methods.</p>
      <p>Every signal must be evaluated out-of-sample to guard against overfitting. The package provides built-in support for expanding-window estimation, which ensures that only past data informs each period's signal.</p>

      <h2 id="next-steps">Next Steps</h2>
      <p>With these fundamentals in place, you are ready to explore factor construction and systematic strategy development in the Strategies stage of the curriculum.</p>
    `,
  },
  {
    slug: "macro-quantamental-factors",
    title: "Macro-Quantamental Factors",
    category: "Strategies",
    categoryColor: "accent-indigo",
    lessons: 10,
    description: "Learn to construct macro-quantamental factors from raw economic data and evaluate their predictive power across asset classes.",
    tableOfContents: [
      { id: "what-are-factors", label: "What are Factors?" },
      { id: "factor-construction", label: "Factor Construction" },
      { id: "factor-evaluation", label: "Evaluation Methodology" },
      { id: "cross-asset", label: "Cross-Asset Applications" },
      { id: "combining-factors", label: "Combining Factors" },
    ],
    content: `
      <h2 id="what-are-factors">What are Factors?</h2>
      <p>In the macro-quantamental framework, a factor is a systematic signal derived from macroeconomic data that has a documented and economically justified relationship with asset returns. Unlike statistical factors extracted through principal component analysis, macro-quantamental factors are grounded in economic theory and institutional knowledge.</p>
      <p>The distinction matters for robustness: a factor with a clear economic rationale is more likely to persist across regimes than one identified purely through historical data mining.</p>

      <h2 id="factor-construction">Factor Construction</h2>
      <p>Constructing a macro-quantamental factor involves several steps. First, relevant indicators are selected based on economic logic. Second, these indicators are transformed into cross-sectional scores (typically z-scores relative to historical distributions). Third, scores may be combined across related indicators to form composite factors with improved signal-to-noise ratios.</p>
      <p>Critical design choices include the lookback window for normalization, the handling of missing data, and the frequency of signal updates. Each choice involves a trade-off between responsiveness and stability.</p>

      <h2 id="factor-evaluation">Evaluation Methodology</h2>
      <p>Factor quality is assessed through a battery of statistical tests: correlation with subsequent returns, accuracy ratios, information coefficients, and panel regression analysis. All tests must be conducted out-of-sample using expanding or rolling windows to prevent overfitting.</p>

      <h2 id="cross-asset">Cross-Asset Applications</h2>
      <p>Macro-quantamental factors can be applied to foreign exchange, fixed income, equity, and credit markets. The same underlying economic signal may manifest differently across asset classes, creating diversification benefits within a multi-asset portfolio.</p>

      <h2 id="combining-factors">Combining Factors</h2>
      <p>Portfolio construction typically combines multiple factors to achieve more consistent risk-adjusted returns. Methods range from simple equal-weighting to more sophisticated approaches such as inverse-volatility weighting, risk parity, and mean-variance optimization with shrinkage estimators.</p>
    `,
  },
  {
    slug: "developing-trading-strategies",
    title: "Developing Trading Strategies",
    category: "Strategies",
    categoryColor: "accent-indigo",
    lessons: 8,
    description: "From signal to portfolio: backtesting frameworks, position sizing, risk budgeting, and the complete strategy development lifecycle.",
    tableOfContents: [
      { id: "strategy-lifecycle", label: "The Strategy Lifecycle" },
      { id: "backtesting", label: "Backtesting Frameworks" },
      { id: "position-sizing", label: "Position Sizing" },
      { id: "risk-management", label: "Risk Management" },
      { id: "implementation", label: "Live Implementation" },
    ],
    content: `
      <h2 id="strategy-lifecycle">The Strategy Lifecycle</h2>
      <p>Developing a macro-quantamental trading strategy follows a disciplined lifecycle: hypothesis formation, data preparation, signal construction, backtesting, performance analysis, and live deployment. Each stage has specific best practices designed to minimize the risk of overfitting and maximize the probability that backtest results translate to live performance.</p>

      <h2 id="backtesting">Backtesting Frameworks</h2>
      <p>A backtesting framework must accurately simulate the constraints faced by a live trader: transaction costs, market impact, funding costs, and position limits. The framework must also enforce strict point-in-time data usage, preventing any form of look-ahead bias.</p>
      <p>The <code>macrosynergy</code> package provides a backtesting engine that handles these requirements automatically, allowing researchers to focus on signal design rather than infrastructure.</p>

      <h2 id="position-sizing">Position Sizing</h2>
      <p>Position sizing translates raw signals into dollar exposures. Common approaches include volatility targeting (scaling positions to achieve a constant level of portfolio risk), signal-proportional sizing (where position sizes are proportional to signal strength), and risk parity (equalizing the risk contribution of each position).</p>

      <h2 id="risk-management">Risk Management</h2>
      <p>Effective risk management involves both ex-ante (before the fact) and ex-post (after the fact) analysis. Ex-ante tools include scenario analysis, stress testing, and tail risk measurement. Ex-post tools include drawdown analysis, attribution, and regime-conditional performance evaluation.</p>

      <h2 id="implementation">Live Implementation</h2>
      <p>Transitioning from backtest to live trading introduces additional challenges: data latency, execution quality, operational risk, and the psychological discipline required to follow systematic signals through periods of underperformance.</p>
    `,
  },
  {
    slug: "macro-quantamental-scorecards",
    title: "Macro-Quantamental Scorecards",
    category: "Strategies",
    categoryColor: "accent-indigo",
    lessons: 7,
    description: "Evaluate and compare strategy performance using standardized scorecards, Sharpe ratios, drawdown analysis, and attribution metrics.",
    tableOfContents: [
      { id: "scorecard-overview", label: "Scorecard Overview" },
      { id: "performance-metrics", label: "Performance Metrics" },
      { id: "drawdown-analysis", label: "Drawdown Analysis" },
      { id: "attribution", label: "Return Attribution" },
      { id: "regime-analysis", label: "Regime Analysis" },
    ],
    content: `
      <h2 id="scorecard-overview">Scorecard Overview</h2>
      <p>A macro-quantamental scorecard is a standardized report that summarizes the risk-return characteristics of a trading strategy. Scorecards enable like-for-like comparison across different signals, asset classes, and time periods. They are the primary tool for deciding which strategies merit capital allocation.</p>

      <h2 id="performance-metrics">Performance Metrics</h2>
      <p>The core metrics include annualized return, annualized volatility, Sharpe ratio, maximum drawdown, and the accuracy ratio (the proportion of periods with positive returns). Complementary metrics such as the Sortino ratio, Calmar ratio, and hit rate provide additional perspective on return quality.</p>

      <h2 id="drawdown-analysis">Drawdown Analysis</h2>
      <p>Drawdown analysis examines the magnitude, duration, and recovery time of peak-to-trough declines. Understanding the worst historical drawdowns helps set realistic expectations for live performance and calibrate appropriate position sizes.</p>

      <h2 id="attribution">Return Attribution</h2>
      <p>Attribution decomposes total returns into contributions from individual positions, asset classes, and signal components. This reveals which parts of a strategy are driving performance and whether returns are concentrated in a few positions or broadly diversified.</p>

      <h2 id="regime-analysis">Regime Analysis</h2>
      <p>Regime-conditional analysis evaluates how strategies perform during different macroeconomic environments: expansions vs. recessions, risk-on vs. risk-off, and high vs. low inflation. Strategies with stable performance across regimes are preferred for long-term capital allocation.</p>
    `,
  },
  {
    slug: "value-generation",
    title: "Principles of Value Generation",
    category: "Strategies",
    categoryColor: "accent-indigo",
    lessons: 6,
    description: "Understand the economic logic that gives macro-quantamental strategies a persistent edge over purely statistical approaches.",
    tableOfContents: [
      { id: "information-edge", label: "The Information Edge" },
      { id: "economic-rationale", label: "Economic Rationale" },
      { id: "persistence", label: "Why Signals Persist" },
      { id: "limits-to-arbitrage", label: "Limits to Arbitrage" },
      { id: "sustainable-alpha", label: "Sustainable Alpha" },
    ],
    content: `
      <h2 id="information-edge">The Information Edge</h2>
      <p>The macro-quantamental approach generates value by systematically processing publicly available information that most market participants underweight. Central bank data, fiscal statistics, and balance-of-payments reports are available to everyone, but few investors process this information in a disciplined, quantitative manner across all countries simultaneously.</p>

      <h2 id="economic-rationale">Economic Rationale</h2>
      <p>Every macro-quantamental signal must be grounded in a coherent economic narrative. A growth momentum signal, for example, captures the tendency of financial markets to react gradually to shifts in economic growth. An excess inflation signal captures the well-documented relationship between unexpected inflation and real asset returns.</p>

      <h2 id="persistence">Why Signals Persist</h2>
      <p>Macro-quantamental signals persist because they exploit structural features of financial markets: information processing limitations, institutional constraints, behavioral biases, and the slow pace at which macroeconomic fundamentals change relative to market expectations.</p>

      <h2 id="limits-to-arbitrage">Limits to Arbitrage</h2>
      <p>Even when macro signals are well understood, several factors prevent their immediate arbitrage: implementation costs, career risk for investment managers, leverage constraints, and the difficulty of timing macro transitions precisely. These frictions ensure that patient, systematic investors can capture a risk premium.</p>

      <h2 id="sustainable-alpha">Sustainable Alpha</h2>
      <p>Sustainable alpha comes not from secrecy but from disciplined execution. The advantage of the macro-quantamental framework lies in its systematic coverage (all countries, all the time), its avoidance of behavioral biases, and its ability to compound small informational edges across many positions and time periods.</p>
    `,
  },
  {
    slug: "statistical-methods-ml",
    title: "Statistical Methods & Machine Learning",
    category: "Advanced",
    categoryColor: "accent-green",
    lessons: 10,
    description: "Cross-validation for panel data, regularization techniques, neural networks, and ensemble methods applied to macro signals.",
    tableOfContents: [
      { id: "challenges", label: "Challenges in Macro ML" },
      { id: "cross-validation", label: "Cross-Validation for Panels" },
      { id: "regularization", label: "Regularization Techniques" },
      { id: "neural-networks", label: "Neural Networks" },
      { id: "ensembles", label: "Ensemble Methods" },
      { id: "pitfalls", label: "Common Pitfalls" },
    ],
    content: `
      <h2 id="challenges">Challenges in Macro ML</h2>
      <p>Applying machine learning to macroeconomic data presents unique challenges compared to other domains. The data is low-frequency (monthly or quarterly), highly correlated across countries, subject to structural breaks, and available in relatively short time series. These characteristics demand careful adaptation of standard ML techniques.</p>

      <h2 id="cross-validation">Cross-Validation for Panels</h2>
      <p>Standard k-fold cross-validation is inappropriate for time-series data because it allows future information to leak into training sets. For macro-quantamental panels (data indexed by both country and time), the correct approach uses expanding or rolling time-series splits that respect the temporal ordering of observations.</p>
      <p>Additional care is needed to handle cross-sectional dependence: if all countries in a given month appear in either the training or test set, the test may underestimate true out-of-sample error.</p>

      <h2 id="regularization">Regularization Techniques</h2>
      <p>With limited sample sizes and many potential features, regularization is essential. Lasso (L1) regularization performs automatic feature selection, while Ridge (L2) regularization shrinks coefficients toward zero without eliminating them. Elastic Net combines both penalties and is often the best default choice for macro-quantamental applications.</p>

      <h2 id="neural-networks">Neural Networks</h2>
      <p>Simple feedforward neural networks with one or two hidden layers can capture non-linear relationships between macro indicators and asset returns. The key is to keep architectures simple: with limited training data, complex networks overfit rapidly. Dropout, early stopping, and weight decay are essential regularization tools.</p>

      <h2 id="ensembles">Ensemble Methods</h2>
      <p>Ensemble methods such as random forests and gradient boosting aggregate predictions from multiple simple models to reduce variance and improve robustness. In the macro context, ensembles can combine signals generated from different subsets of indicators, lookback windows, or model specifications.</p>

      <h2 id="pitfalls">Common Pitfalls</h2>
      <p>The most common pitfalls in macro ML include: overfitting to a short history, data snooping through excessive experimentation, ignoring transaction costs in strategy evaluation, and conflating in-sample fit with out-of-sample predictive power. Discipline in research methodology is the best defense against these risks.</p>
    `,
  },
  {
    slug: "academic-cooperation",
    title: "Academic Cooperation",
    category: "Advanced",
    categoryColor: "accent-green",
    lessons: 5,
    description: "Collaborative research programs, published papers, and ongoing partnerships with leading academic institutions worldwide.",
    tableOfContents: [
      { id: "research-program", label: "The Research Program" },
      { id: "partnerships", label: "Academic Partnerships" },
      { id: "publications", label: "Key Publications" },
      { id: "open-source", label: "Open-Source Contributions" },
    ],
    content: `
      <h2 id="research-program">The Research Program</h2>
      <p>Macrosynergy maintains an active academic research program that bridges the gap between university-based macroeconomic research and institutional investment practice. The program funds collaborative research projects, hosts visiting scholars, and publishes working papers that advance the frontier of macro-quantamental investing.</p>

      <h2 id="partnerships">Academic Partnerships</h2>
      <p>Long-standing partnerships with leading institutions ensure that Macrosynergy's work remains at the cutting edge of academic finance and macroeconomics. These collaborations produce peer-reviewed publications, conference presentations, and new analytical tools that benefit both the academic and investment communities.</p>

      <h2 id="publications">Key Publications</h2>
      <p>The research team has published extensively on topics including macro-quantamental factor construction, cross-sectional predictability of asset returns, and the application of modern statistical learning methods to macroeconomic data. All publications are available through the Macrosynergy research portal.</p>

      <h2 id="open-source">Open-Source Contributions</h2>
      <p>Macrosynergy is committed to open science. The <code>macrosynergy</code> Python package, along with sample datasets and tutorial notebooks, are freely available on GitHub. This enables independent replication of published results and encourages the broader research community to build on the macro-quantamental framework.</p>
    `,
  },
];
export { topics };
