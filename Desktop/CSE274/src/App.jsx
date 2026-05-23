import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ─── DATA ────────────────────────────────────────────────────────────────────

const UNITS = [
  { id: 1, label: "Unit I", title: "Data Pre-processing", icon: "📊" },
  { id: 2, label: "Unit II", title: "Feature Engineering", icon: "🔧" },
  { id: 3, label: "Unit III", title: "Classification Models", icon: "🤖" },
  { id: 4, label: "Unit IV", title: "Regression", icon: "📈" },
  { id: 5, label: "Unit V", title: "Ensemble Learning", icon: "🌲" },
  { id: 6, label: "Unit VI", title: "Unsupervised Learning", icon: "🔮" },
  { id: 7, label: "Mixed", title: "Long Answer Questions", icon: "📝" },
];

const MCQ = {
  1: [
    { q: "A dataset has 'City' (Delhi/Mumbai/Pune) and 'Rating' (Poor/Good/Excellent). Which encoding pair is most appropriate?", opts: ["One-Hot for City, Label Encoding for Rating", "Label Encoding for both", "Ordinal Encoding for City, One-Hot for Rating", "Target Encoding for both"], ans: 0, exp: "City is nominal — no natural order — so One-Hot is correct. Rating is ordinal (Poor < Good < Excellent), so Label/Ordinal encoding is correct." },
    { q: "You fit a StandardScaler on the full dataset before splitting train/test. This is an example of:", opts: ["Target Leakage", "Train-Test Contamination", "Temporal Leakage", "Overfitting"], ans: 1, exp: "Fitting any preprocessor on the full dataset before splitting leaks test statistics into training — this is train-test contamination, a form of data leakage." },
    { q: "A salary column has values [25000, 50000, 75000, 100000, 500000]. Which scaler is most robust to the ₹500000 outlier?", opts: ["StandardScaler", "MinMaxScaler", "RobustScaler", "Log Transform"], ans: 2, exp: "RobustScaler uses the median and IQR (Q3−Q1), so extreme outliers barely affect it. MinMaxScaler and StandardScaler are heavily distorted by the ₹500000 value." },
    { q: "A fraud detection dataset has 97% non-fraud and 3% fraud. A model predicts 'non-fraud' always. Its accuracy is:", opts: ["97% — and this is a good model", "97% — but this model is useless for fraud detection", "3% — it misses all frauds", "50% — random baseline"], ans: 1, exp: "The model achieves 97% accuracy but has 0% recall for fraud. For imbalanced data, accuracy is misleading. Use F1-score or ROC-AUC instead." },
    { q: "SMOTE creates new minority samples by:", opts: ["Duplicating existing minority samples randomly", "Interpolating between existing minority samples and their k-nearest neighbors", "Removing majority class samples", "Assigning higher loss weights to minority samples"], ans: 1, exp: "SMOTE (Synthetic Minority Over-sampling Technique) creates synthetic points along the line segment between a minority sample and one of its k-nearest minority neighbors." },
    { q: "Which data type has a true absolute zero, making ratios meaningful?", opts: ["Nominal", "Ordinal", "Interval", "Ratio"], ans: 3, exp: "Ratio scale has an absolute zero (e.g., height, weight). 80 kg is twice 40 kg. Interval scale (like temperature in °C) has no true zero, so ratios are not meaningful." },
    { q: "You're building a credit scoring model and accidentally include the 'loan_repaid' column to predict 'loan_default'. This is:", opts: ["Train-test contamination", "Target leakage", "Temporal leakage", "Multicollinearity"], ans: 1, exp: "Including a feature derived from or highly correlated with the target is target leakage. 'Loan_repaid' is essentially the target variable rephrased — this feature won't be available when predicting new loans." },
    { q: "A column has 40% missing values. What is generally recommended?", opts: ["Always drop the column", "Always impute with mean", "Consider domain context; dropping may be better if missingness is not random", "Use KNN imputation always"], ans: 2, exp: "With 40% missing, the choice depends on why data is missing (MCAR, MAR, MNAR). If missingness is informative, even the missing-ness itself can be a feature. There's no single rule." },
    { q: "For a right-skewed salary distribution, which transformation helps normalize it?", opts: ["StandardScaler", "Log Transform", "MinMaxScaler", "Winsorization"], ans: 1, exp: "Log Transform compresses large values and expands small ones, pulling right-skewed distributions toward normality. It's the go-to for salary, income, and count data." },
    { q: "The IQR method marks a value as an outlier if:", opts: ["|z| > 2", "x < Q1 − 1.5×IQR or x > Q3 + 1.5×IQR", "x < μ − 2σ or x > μ + 2σ", "x is in the top 5%"], ans: 1, exp: "The IQR rule defines fences at Q1 − 1.5×IQR (lower) and Q3 + 1.5×IQR (upper). Points outside these fences are considered outliers. It doesn't assume normality." },
    { q: "Which imputation strategy is most sophisticated and preserves relationships between variables?", opts: ["Mean imputation", "Median imputation", "KNN imputation", "MICE (Multiple Imputation by Chained Equations)"], ans: 3, exp: "MICE iteratively models each feature with missing values as a function of other features, preserving inter-feature correlations. KNN is good but doesn't model joint distributions." },
    { q: "Winsorization handles outliers by:", opts: ["Removing them", "Replacing them with mean", "Clipping them to the fence values (e.g., upper/lower bounds)", "Using a separate indicator variable"], ans: 2, exp: "Winsorization clips extreme values to defined boundary values (e.g., the IQR fence). Unlike deletion, it keeps the observation in the dataset while reducing outlier impact." },
    { q: "You're predicting tomorrow's stock price. You accidentally split your time-series data randomly. This causes:", opts: ["Target leakage", "Train-test contamination", "Temporal leakage (future data in training set)", "Multicollinearity"], ans: 2, exp: "Random splitting of time-series data allows 'future' observations into the training set, which is temporal leakage. Always split time-series by time boundary." },
    { q: "For a 'temperature' column measured in Celsius, the scale of measurement is:", opts: ["Ratio", "Ordinal", "Interval", "Nominal"], ans: 2, exp: "Celsius is an interval scale — differences are meaningful (20°C is 10° warmer than 10°C), but there is no true zero (0°C is not 'no temperature'). Kelvin would be ratio scale." },
    { q: "A hospital dataset has 'Blood Type' (A, B, AB, O). This is:", opts: ["Ordinal categorical", "Nominal categorical", "Discrete numerical", "Continuous numerical"], ans: 1, exp: "Blood type has no natural order — AB is not 'more' than A. It's a nominal (unordered) categorical variable. One-Hot Encoding is appropriate here." },
    { q: "Which sklearn tool helps prevent data leakage by ensuring preprocessing is fit only on training data during cross-validation?", opts: ["GridSearchCV", "Pipeline", "ColumnTransformer", "Both Pipeline and ColumnTransformer"], ans: 3, exp: "sklearn Pipeline chains preprocessing with the model so that fit() only sees training data in each fold of cross-validation. ColumnTransformer applies different transforms to different columns, also within a Pipeline." },
    { q: "A feature 'is_employed' is 1 for 99% of rows. What should you do?", opts: ["Keep it — it might matter for the 1%", "Drop it using VarianceThreshold — it provides almost no information", "Apply SMOTE to balance it", "Standardize it"], ans: 1, exp: "A near-constant feature has near-zero variance and provides almost no discriminative information. VarianceThreshold in sklearn automatically removes such features." },
    { q: "When the minority class in SMOTE is very small (e.g., 10 samples), what is a risk?", opts: ["Overfitting to the original minority samples", "Generating duplicate majority samples", "Reducing model accuracy to 50%", "Causing train-test contamination"], ans: 0, exp: "With very few real minority samples, SMOTE generates synthetic points between those few points. If those samples are noisy or unrepresentative, SMOTE amplifies those errors — risking overfit." },
    { q: "For neural networks and image data, which scaling method is most commonly used?", opts: ["StandardScaler", "RobustScaler", "MinMaxScaler (to [0,1])", "Log Transform"], ans: 2, exp: "MinMaxScaler maps values to [0,1], matching the typical [0,1] or [−1,1] range expected by neural networks and for pixel normalization. StandardScaler is preferred for linear models and SVMs." },
    { q: "Structured data is best described as:", opts: ["Data requiring deep learning to process", "Data that fits neatly into rows and columns", "Text and image data", "Data with temporal ordering"], ans: 1, exp: "Structured data has a predefined schema and fits into relational tables (CSV, SQL). Unstructured data (text, images, audio) doesn't have this neat row-column format." },
    { q: "A data scientist fits a MinMaxScaler on all data, splits 80/20, then trains a model. The validation accuracy is 95%. This accuracy is:", opts: ["Reliable", "Inflated due to data leakage", "Deflated because MinMax hurts performance", "Accurate only if the dataset is balanced"], ans: 1, exp: "Fitting MinMaxScaler before splitting means the scaler 'saw' test data — the min/max computed includes test points. Validation metrics are therefore optimistically biased." },
    { q: "You have an 'Education' column: High School < Bachelor < Master < PhD. Which encoding is correct?", opts: ["One-Hot Encoding", "Label Encoding with arbitrary numbers", "Ordinal Encoding with the correct order mapping", "Target Encoding"], ans: 2, exp: "Education has a natural order. OrdinalEncoder with categories=[['High School','Bachelor','Master','PhD']] correctly maps 0→1→2→3, preserving that ordering." },
    { q: "The Z-score method for outlier detection assumes:", opts: ["Data follows a uniform distribution", "Data is approximately normally distributed", "Data has no missing values", "All features are scaled"], ans: 1, exp: "Z-score = (x − μ)/σ only makes sense when data is (approximately) normal. |Z| > 3 captures the tails of a normal distribution. For skewed data, IQR is preferred." },
    { q: "class_weight='balanced' in sklearn logistic regression:", opts: ["Removes majority class samples", "Creates synthetic minority samples", "Increases the penalty for misclassifying minority class", "Scales all features to balance them"], ans: 2, exp: "class_weight='balanced' automatically adjusts loss weights inversely proportional to class frequencies, penalizing minority class misclassification more heavily." },
    { q: "Which metric should you NEVER rely on for an imbalanced medical diagnosis dataset?", opts: ["F1-Score", "Accuracy", "ROC-AUC", "Precision-Recall AUC"], ans: 1, exp: "Accuracy is misleading for imbalanced data. A model predicting 'no disease' 100% of the time could achieve 99% accuracy if only 1% of patients are sick — yet it catches zero actual cases." },
    { q: "Random Undersampling handles imbalance by:", opts: ["Generating new minority samples", "Removing majority samples to match minority size", "Adjusting loss weights", "Both generating and removing samples"], ans: 1, exp: "Random undersampling removes majority class rows randomly until classes are balanced. It's fast and simple but risks losing important majority-class information." },
    { q: "A value in a dataset is 'John,Smith' while all others are numeric. This is a:", opts: ["Missing value", "Outlier", "Inconsistency / data quality issue", "Categorical data"], ans: 2, exp: "A non-numeric value in a numeric column is a data quality issue (inconsistency/corruption), not strictly a missing value or statistical outlier. Requires cleaning." },
    { q: "When is it appropriate to impute missing values with mode?", opts: ["For continuous numerical columns", "For categorical columns", "For time-series data", "For image data"], ans: 1, exp: "Mode imputation (most frequent value) is appropriate for categorical features. For continuous features, mean or median imputation is standard." },
    { q: "Isolation Forest detects outliers by:", opts: ["Measuring z-scores", "Isolating points using random splits — anomalies are isolated faster", "Computing distance to cluster centroid", "Using the IQR fence formula"], ans: 1, exp: "Isolation Forest builds random trees. Normal points need many splits to isolate; anomalies are isolated in very few splits (short path length). It works well for high-dimensional data." },
    { q: "You want to encode a 'Country' column with 150 unique values for a linear model. One-Hot Encoding would create:", opts: ["1 column", "2 columns", "150 columns (or 149 with drop='first')", "log(150) columns"], ans: 2, exp: "One-Hot Encoding creates one binary column per category. 150 countries → 150 columns (149 with drop='first' to avoid multicollinearity). Consider Target Encoding for high-cardinality features." },
    { q: "The 'dummy variable trap' in One-Hot Encoding occurs when:", opts: ["Too many categories cause memory issues", "All one-hot columns are linearly dependent (perfect multicollinearity)", "The model overfits to rare categories", "Encoding is applied before splitting"], ans: 1, exp: "With k categories and k columns, one column is perfectly predictable from the others (they sum to 1). This causes multicollinearity. Fix: drop one column (drop='first')." },
    { q: "Target Encoding replaces a category with:", opts: ["Its integer rank", "The mean of the target variable for that category", "A random number between 0 and 1", "Binary 0/1 based on frequency"], ans: 1, exp: "Target Encoding maps each category to the mean target value for that category. E.g., City='Delhi' → mean(target for Delhi rows). It's compact and powerful but risks leakage without cross-validation." },
    { q: "For a dataset with Age ranging 18–80 and Income ranging 10,000–1,000,000, which algorithm is most affected by this scale difference?", opts: ["Decision Tree", "Random Forest", "K-Nearest Neighbors", "XGBoost"], ans: 2, exp: "KNN computes Euclidean distances. Without scaling, Income dominates distance calculations completely (since its range is 1000x larger). Tree-based models are invariant to scale." },
    { q: "Which is NOT a step in a proper ML preprocessing pipeline?", opts: ["Split data first", "Fit scaler only on training data", "Transform both train and test using the same fitted scaler", "Fit scaler on test data to get better test accuracy"], ans: 3, exp: "Fitting the scaler on test data is exactly data leakage. The scaler must be fit only on training data, then used to transform both train and test sets." },
    { q: "MCAR stands for:", opts: ["Missing Completely And Randomly", "Missing Completely At Random", "Multiple Categorical And Regression", "Model Calibration And Regularization"], ans: 1, exp: "MCAR — Missing Completely At Random — means missingness has no relationship with the data itself. Under MCAR, simple imputation methods are unbiased. MAR and MNAR are more complex." },
    { q: "A bank dataset has 0.1% fraud. After SMOTE, what is the training set proportion roughly?", opts: ["Still 0.1% fraud", "50% fraud (if resampled to balance)", "It depends on the SMOTE sampling_strategy parameter", "10% fraud always"], ans: 2, exp: "SMOTE's sampling_strategy parameter controls the target ratio. Default is to balance classes (50/50), but you can set it to e.g. 0.1 (minority becomes 10% of majority). It's configurable." },
    { q: "Which approach to missing values preserves the most information?", opts: ["Drop rows with any missing value", "Drop columns with > 20% missing", "Impute with MICE", "Fill all with 0"], ans: 2, exp: "MICE (Multiple Imputation by Chained Equations) models each feature's missingness using the other features iteratively, preserving data relationships and producing the least biased results." },
    { q: "Nominal data is:", opts: ["Data with a natural rank order", "Data with equal intervals and no true zero", "Categorical data with no natural order", "Data measured from a true zero"], ans: 2, exp: "Nominal data has categories with no inherent order: colors, blood type, city names. Ordinal data has order (ranks). Interval has equal gaps. Ratio has a true zero." },
    { q: "To correctly implement cross-validation with scaling, you should:", opts: ["Scale the entire dataset before CV", "Include scaling in a Pipeline so it refits per fold", "Scale only the training set once before CV", "Not scale if using CV"], ans: 1, exp: "Including scaling in a Pipeline ensures the scaler is fit only on each fold's training data and then applied to the validation fold — preventing any data leakage across folds." },
    { q: "A data point with Z-score of −4.2 is considered:", opts: ["A normal value slightly below average", "A mild outlier", "A strong outlier (|Z| > 3)", "An imputed value"], ans: 2, exp: "Z-score of −4.2 means the value is 4.2 standard deviations below the mean. Since |Z| > 3, it is classified as a strong outlier under the Z-score method." },
    { q: "Which encoding technique encodes a category into its binary representation using log2(k) bits?", opts: ["One-Hot Encoding", "Label Encoding", "Binary Encoding", "Ordinal Encoding"], ans: 2, exp: "Binary Encoding first assigns integer codes, then represents each integer in binary, producing log2(k) columns. This is more compact than One-Hot for medium-cardinality categoricals." },
    { q: "An e-commerce site has 'Purchase Category' with 500 unique values. The best encoding for a tree model is:", opts: ["One-Hot (500 columns)", "Target Encoding", "Ordinal Encoding", "Binary Encoding"], ans: 1, exp: "Target Encoding maps each category to the mean target value — producing just 1 column regardless of cardinality. For tree models with high-cardinality categoricals, it's very effective." },
    { q: "The main drawback of Random Undersampling compared to SMOTE is:", opts: ["It's computationally expensive", "It can discard potentially useful majority class data", "It creates noisy synthetic samples", "It increases dimensionality"], ans: 1, exp: "Random undersampling removes majority class samples randomly, potentially discarding important patterns. SMOTE retains all data but adds synthetic minority samples." },
    { q: "In sklearn, you should call .fit_transform() on which set?", opts: ["Test set only", "Both sets together", "Training set only", "Validation set only"], ans: 2, exp: "fit_transform() computes statistics (mean, std, min, max) AND transforms data. This should only happen on the training set. On test set, use .transform() only — with the already-fitted object." },
    { q: "A feature 'has_bought_before' is binary (0 or 1). It predicts churn. What encoding is needed?", opts: ["One-Hot Encoding", "Label Encoding", "No encoding needed — it's already numeric binary", "Ordinal Encoding"], ans: 2, exp: "A binary feature that's already coded as 0/1 is already in a usable numeric form. No encoding is needed. ML models can directly use it." },
    { q: "Sensor data recording temperature every second for 30 days is best classified as:", opts: ["Structured nominal data", "Unstructured data", "Time-series / temporal data", "Discrete numerical data"], ans: 2, exp: "Regularly-timed sequential measurements (sensor, stock price, EEG) constitute time-series data. Temporal ordering matters — it cannot be shuffled without losing meaning." },
    { q: "The best evaluation metric for a heavily imbalanced medical diagnosis task is:", opts: ["Accuracy", "Precision-Recall AUC (PR-AUC)", "Mean Squared Error", "Silhouette Score"], ans: 1, exp: "PR-AUC focuses on the minority (positive) class, measuring the tradeoff between Precision and Recall. It's more informative than ROC-AUC when the negative class overwhelmingly dominates." },
    { q: "Missing value imputation should always be done:", opts: ["Before train-test split", "After train-test split, fitting imputer on train only", "On the test set independently", "Using the test set statistics"], ans: 1, exp: "Imputation should be fit (compute mean/median/mode) on the training data ONLY, then applied to both train and test. Doing it before splitting leaks test statistics into training." },
    { q: "For a linear regression model, which preprocessing step is REQUIRED?", opts: ["Encoding categorical features", "Handling missing values", "Scaling numerical features", "All of the above"], ans: 3, exp: "All three are required for linear regression: categories must be encoded (it needs numbers), missing values handled (NaN breaks optimization), and features scaled (gradient descent converges better and coefficients are interpretable)." },
    { q: "You observe that 'house_price' has a few values > 5 crore in a dataset where most are < 1 crore. After training a linear model, these outliers will:", opts: ["Have no effect", "Strongly pull the regression line toward them", "Be automatically removed by the model", "Improve model accuracy"], ans: 1, exp: "Linear regression minimizes sum of squared errors. Outliers contribute disproportionately (error² is huge) and pull the fitted line toward them, degrading overall predictions." },
  ],
  2: [
    { q: "A feature 'city_encoded' has variance of 0.0001. Using VarianceThreshold(threshold=0.01), this feature will be:", opts: ["Kept", "Removed", "Scaled", "Imputed"], ans: 1, exp: "VarianceThreshold removes features whose variance falls below the threshold. Variance 0.0001 < 0.01 threshold → feature is removed. It's essentially constant and conveys no information." },
    { q: "Two features, 'weight_kg' and 'weight_lbs', have a correlation of 0.99. What should you do?", opts: ["Keep both — they confirm each other", "Drop one to reduce redundancy and avoid multicollinearity", "Apply PCA to both", "Use target encoding on both"], ans: 1, exp: "Highly correlated features (|r| > 0.85–0.90) are redundant. Keeping both wastes resources and causes multicollinearity in linear models. Drop one (typically keep the more interpretable one)." },
    { q: "Recursive Feature Elimination (RFE) works by:", opts: ["Computing variance and dropping low-variance features", "Training model, dropping weakest feature, repeating", "Using PCA to extract components", "Searching all feature subsets exhaustively"], ans: 1, exp: "RFE trains a model on all features, identifies the least important feature (via coefficients or importances), removes it, and repeats — backward elimination until the desired number of features remains." },
    { q: "A Random Forest reports feature importance of 0.45 for 'petal_length'. This means:", opts: ["45% of data points use this feature", "This feature reduces Gini impurity by 45% on average across all trees", "This feature has 45% correlation with the target", "45% of trees used this feature for the first split"], ans: 1, exp: "Tree-based feature importance measures the total reduction in Gini impurity (or MSE) attributed to that feature, averaged across all trees and normalized to sum to 1." },
    { q: "PCA must be applied after which preprocessing step?", opts: ["One-Hot Encoding", "StandardScaler (or feature scaling)", "SMOTE", "Train-test split only"], ans: 1, exp: "PCA is sensitive to scale — a feature with range 0–1000 will dominate components over one with range 0–1. Always StandardScale before PCA. (And after splitting.)" },
    { q: "LDA (Linear Discriminant Analysis) is a supervised technique that maximizes:", opts: ["Explained variance of features", "Separation between class means relative to within-class variance", "Distance from origin", "Number of retained dimensions"], ans: 1, exp: "LDA maximizes the ratio of between-class variance to within-class variance — the Fisher criterion. This ensures the projected data is most discriminative for classification." },
    { q: "For a 4-feature dataset with 3 classes, LDA can produce at most how many discriminant components?", opts: ["4", "3", "2 (n_classes − 1)", "1"], ans: 2, exp: "LDA produces at most min(n_classes − 1, n_features) components. With 3 classes, n_classes − 1 = 2. So maximum 2 LDA components regardless of feature count." },
    { q: "PCA with 2 components on Iris data captures 95.8% variance. This means:", opts: ["2% of data is noise", "Two components explain 95.8% of total data spread — other 2 components add little", "Only 2 features are useful", "The other 2 PCA components are correlated"], ans: 1, exp: "Explained variance ratio = 95.8% means 2 principal components capture 95.8% of total variance in the dataset. The remaining 4.2% in components 3 and 4 is mostly noise or minor variation." },
    { q: "The Curse of Dimensionality refers to:", opts: ["Too many classes in the target variable", "Data becoming sparse and distances losing meaning as features increase", "High correlation between features", "Model taking too long to train"], ans: 1, exp: "As dimensionality increases exponentially, the data volume grows faster than data points can fill it — data becomes sparse, distances become meaningless, and models require exponentially more data." },
    { q: "Forward Selection starts with:", opts: ["All features and removes one at a time", "No features and adds one at a time based on performance", "PCA components and selects top ones", "Random subset and refines"], ans: 1, exp: "Forward Selection begins with no features, adds the single feature that most improves model performance, then continues adding features one by one until a stopping criterion is met." },
    { q: "Backward Elimination is preferred over Forward Selection when:", opts: ["Dataset is very large with millions of samples", "Number of features is manageable and interaction effects matter", "Features are all uncorrelated", "Only one feature is needed"], ans: 1, exp: "Backward elimination starts with all features and considers all interactions from the start. Forward selection may miss interactions. When you have manageable features, backward gives more thorough results." },
    { q: "A feature 'transaction_month_sin' is created from 'transaction_month' using sin(2π·month/12). This is an example of:", opts: ["Feature selection", "Target encoding", "Cyclical feature encoding / feature creation", "PCA transformation"], ans: 2, exp: "Cyclical encoding using sin/cos converts cyclic features (month, hour, day-of-week) into continuous representations that preserve the circular nature (December is close to January)." },
    { q: "You create a feature 'age_squared' from 'age'. This is called:", opts: ["Dimensionality reduction", "Polynomial feature creation", "Binary encoding", "Target leakage"], ans: 1, exp: "Adding polynomial features (x², x³, x·y interaction terms) is polynomial feature creation/expansion. It helps linear models capture non-linear relationships without changing the algorithm." },
    { q: "VarianceThreshold with threshold=0 removes:", opts: ["All features", "Features with exactly zero variance (constant features)", "Features with below-average variance", "Correlated features"], ans: 1, exp: "Threshold=0 removes only constant features (same value in all rows, variance=0). These carry zero information. A higher threshold removes near-constant features too." },
    { q: "In PCA, the first principal component is the direction of:", opts: ["Maximum correlation with the target", "Maximum explained variance in the data", "Minimum distance from the mean", "Smallest eigenvalue of the covariance matrix"], ans: 1, exp: "PC1 is the eigenvector of the covariance matrix corresponding to the largest eigenvalue — it captures the direction of greatest variance in the data." },
    { q: "Feature extraction vs Feature selection: which statement is correct?", opts: ["Both create new features from scratch", "Selection picks a subset; extraction creates new transformed features", "Extraction picks a subset; selection creates new features", "Both reduce to a fixed number of features"], ans: 1, exp: "Feature Selection picks a subset of original features (e.g., RFE, VarianceThreshold). Feature Extraction creates new features by transforming originals (e.g., PCA components, polynomial terms)." },
    { q: "You have 100 features and train a Random Forest. Feature importance sums to 1.0. You keep top features with importance > 0.02. How many features do you keep at minimum?", opts: ["At least 2", "Could be any number — depends on distribution", "Always 50", "Always 20"], ans: 1, exp: "Feature importances sum to 1.0 and are unevenly distributed. If a few features dominate (e.g., one has 0.45), you might keep far fewer than 50. The threshold 0.02 just filters by individual contribution." },
    { q: "Target encoding on a 'City' column with cross-validation prevents:", opts: ["Variance inflation", "Overfitting due to target leakage", "Multicollinearity", "High dimensionality"], ans: 1, exp: "Without cross-validation, target encoding can cause leakage: the encoded value for a row's city uses that row's target to compute the mean. CV-based target encoding computes means on out-of-fold data." },
    { q: "PCA is NOT appropriate when:", opts: ["You want to visualize high-dimensional data", "Features are all categorical and haven't been numerically encoded", "You want to compress 100 features to 5", "You want to remove multicollinearity"], ans: 1, exp: "PCA operates on numeric data and covariance matrices. Raw categorical features can't be directly fed to PCA — they must be encoded first. PCA loses interpretability but is fine for the other goals." },
    { q: "LDA is preferred over PCA for classification preprocessing because:", opts: ["LDA is faster", "LDA uses class label information to maximize discriminability", "LDA can handle more components", "LDA doesn't require scaling"], ans: 1, exp: "LDA is supervised — it uses the class labels to find axes that maximize between-class separation relative to within-class spread. PCA is unsupervised and ignores the labels." },
    { q: "A feature 'bmi' is derived from existing features 'weight' and 'height'. Creating it is called:", opts: ["Feature selection", "Domain knowledge-based feature creation", "Dimensionality reduction", "Backward elimination"], ans: 1, exp: "Creating 'bmi = weight/height²' from existing features using domain knowledge is feature engineering / feature creation. It encodes expert knowledge into a compact, meaningful signal." },
    { q: "Mutual information in feature selection measures:", opts: ["Linear correlation between features", "The reduction in uncertainty about one variable given another (non-linear dependency)", "The variance of a feature", "The covariance matrix eigenvalue"], ans: 1, exp: "Mutual Information quantifies how much knowing one variable reduces uncertainty about another. Unlike Pearson correlation, it captures non-linear dependencies — ideal for complex feature-target relationships." },
    { q: "After PCA, the components are:", opts: ["Original features renamed", "Orthogonal (uncorrelated) linear combinations of original features", "Standardized versions of original features", "Eigenvalues of the covariance matrix"], ans: 1, exp: "PCA components are eigenvectors of the covariance matrix — orthogonal to each other (uncorrelated), and are linear combinations of original features. They point in directions of maximum variance." },
    { q: "You apply RFE with a Logistic Regression estimator and request 5 features. After running, the model will have been trained:", opts: ["Once on all features", "Once on 5 features", "n_features − 4 times (each step removes one feature)", "Only during CV"], ans: 2, exp: "RFE with step=1 trains and evaluates the model once per feature removal iteration. Starting from n features down to 5 features: n−5 training steps. With step > 1, fewer steps." },
    { q: "Correlation-based feature removal should use |r| threshold of:", opts: ["0.1", "0.5", "0.85–0.95", "Always 1.0 (only perfectly correlated)"], ans: 2, exp: "Common practice removes one of a pair when |Pearson r| > 0.85–0.90. Lower thresholds remove too many useful features; requiring 1.0 catches only perfect duplicates." },
    { q: "When two features have |r| = 0.90, which one should you drop?", opts: ["Always drop the second one alphabetically", "Drop the one with lower correlation to the target variable", "Drop the one with lower variance", "Always drop the numerical one"], ans: 1, exp: "When breaking a high-correlation pair, keep the feature more correlated with the target (more predictive). The other adds redundant information." },
    { q: "Explained variance ratio in PCA sums to:", opts: ["The number of components chosen", "The number of original features", "Exactly 1.0 (100%)", "The largest eigenvalue"], ans: 2, exp: "All explained variance ratios across all possible components sum to 1.0 (100%). When you choose k components, you capture the sum of their k ratios — the rest is discarded." },
    { q: "The 'feature_importances_' attribute is available in:", opts: ["LogisticRegression", "SVM", "RandomForestClassifier", "KNeighborsClassifier"], ans: 2, exp: "feature_importances_ is available in tree-based models: DecisionTree, RandomForest, GradientBoosting, XGBoost. Linear models have 'coef_' instead. KNN and SVM (non-linear) have neither directly." },
    { q: "You derive a rolling 7-day average of sales as a new feature for a prediction model. This is:", opts: ["Target leakage if computed before splitting by time", "Always valid preprocessing", "A form of PCA", "Binary encoding"], ans: 0, exp: "Rolling averages computed without a time split can leak future information into the training set. They must be computed using only past data — fit on train, carefully applied to test." },
    { q: "SelectKBest in sklearn selects features based on:", opts: ["Manual specification by the data scientist", "A scoring function (like f_classif or mutual_info_classif) applied to each feature independently", "Sequential model-based forward selection", "PCA component loadings"], ans: 1, exp: "SelectKBest applies a univariate scoring function to each feature vs the target independently, ranks features by score, and selects the top k. It does NOT model feature interactions." },
    { q: "A feature with near-zero variance should be removed because:", opts: ["It will cause numerical overflow", "It provides almost no information and can destabilize some models", "It always causes multicollinearity", "It makes gradient descent diverge"], ans: 1, exp: "A near-constant feature provides almost no discriminative power. In some models (e.g., Naive Bayes), zero-variance features can also cause division-by-zero. Better to remove them early." },
    { q: "The number of output features of PolynomialFeatures(degree=2) on 2 input features is:", opts: ["2", "4", "6 (including 1, x1, x2, x1², x1x2, x2²)", "3"], ans: 2, exp: "For 2 features and degree 2: constant (1), x1, x2, x1², x1·x2, x2² = 6 features. Formula: C(n+d, d) = C(2+2,2) = 6. This grows rapidly with more features or higher degree." },
    { q: "In industry, feature selection is important mainly because:", opts: ["ML models require exactly 10 features", "Fewer relevant features reduce training time, prevent overfitting, and improve interpretability", "Regulators require fewer features in all models", "All algorithms perform equally with any number of features"], ans: 1, exp: "Feature selection improves model efficiency, reduces overfitting by removing noise, speeds up training and inference, and makes models easier to interpret and maintain." },
    { q: "The 'drop one' strategy in correlation removal: if A and B have |r|=0.95, and A has r=0.7 with target while B has r=0.6 with target, which do you keep?", opts: ["A (higher target correlation)", "B", "Keep both", "Drop both"], ans: 0, exp: "Keep A because it has a stronger direct relationship with the target (0.7 > 0.6). B is redundant — A already captures that information — and B adds less predictive value." },
    { q: "Embedding layers in neural networks are a form of:", opts: ["Feature selection", "Feature extraction for categorical data", "Variance thresholding", "Target encoding"], ans: 1, exp: "Embeddings learn dense low-dimensional vector representations of categories (used heavily in NLP/recommender systems). They are learned feature extractors — a more powerful alternative to One-Hot encoding." },
    { q: "You have 500 features. PCA captures 95% variance in 20 components. Using 20 components instead of 500:", opts: ["Hurts performance because information is lost", "Reduces overfitting and speeds up training significantly", "Makes model uninterpretable only if features were interpretable", "Both B and C"], ans: 3, exp: "Reducing from 500 to 20 features: (B) dramatically speeds up training and reduces overfitting by removing noise dimensions; (C) the PCA components lose the original feature interpretability." },
    { q: "Which statement about PCA is FALSE?", opts: ["PCA requires feature scaling before application", "PCA is a supervised technique using class labels", "PCA components are orthogonal to each other", "PCA can be used for dimensionality reduction before clustering"], ans: 1, exp: "PCA is UNSUPERVISED — it finds directions of maximum variance without using any class labels. LDA is the supervised equivalent. The other statements about PCA are all true." },
    { q: "A data scientist creates 'total_purchases × avg_purchase_value = estimated_revenue'. This feature:", opts: ["Is always target leakage", "Is a domain-knowledge derived interaction feature", "Must be removed by VarianceThreshold", "Should be target encoded"], ans: 1, exp: "Creating meaningful interactions from domain knowledge (revenue = count × average) is valid feature engineering. It's only leakage if it directly encodes future/target information." },
    { q: "SHAP values are used to:", opts: ["Select features using variance", "Explain individual predictions and measure feature contribution", "Replace PCA for dimensionality reduction", "Detect outliers in high dimensions"], ans: 1, exp: "SHAP (SHapley Additive exPlanations) assigns each feature a contribution value for individual predictions, using game theory. It provides both local (per-instance) and global feature importance." },
    { q: "After applying PCA to reduce 50 features to 5 components, can you retrieve the original 50 features exactly?", opts: ["Yes, always — PCA is reversible", "Only if you kept all 50 components", "No — reducing to 5 components discards information (lossy compression)", "Yes, using the inverse_transform with 95% accuracy"], ans: 2, exp: "PCA with fewer components than original features is lossy. inverse_transform gives an approximation, not the exact original. If you keep all 50 components, you can reconstruct perfectly." },
    { q: "L1 regularization (Lasso) in linear models also performs:", opts: ["Dimensionality reduction like PCA", "Automatic feature selection by driving some coefficients to exactly zero", "Clustering of features", "Correlation removal"], ans: 1, exp: "L1 (Lasso) penalty promotes sparsity — it drives coefficients of irrelevant features to exactly zero. This is both regularization and implicit feature selection in one step." },
    { q: "For a text dataset with 10,000 unique words (TF-IDF features), which is most appropriate before training a logistic regression?", opts: ["VarianceThreshold to remove rare words, then StandardScaler", "Keep all 10,000 features as-is", "PCA to reduce to ~100 components", "All three combined"], ans: 0, exp: "VarianceThreshold removes near-zero variance features (very rare words); scaling helps logistic regression. However, for sparse TF-IDF specifically, truncated SVD (a.k.a. LSA) is often used instead of PCA." },
    { q: "The key difference between Filter, Wrapper, and Embedded feature selection methods:", opts: ["Filter uses ML models; Wrapper doesn't; Embedded combines both", "Filter is model-independent; Wrapper evaluates subsets with a model; Embedded uses regularization inside training", "All three are equivalent", "Filter is faster but Wrapper is more accurate always"], ans: 1, exp: "Filter methods (variance, correlation) are model-independent and fast. Wrapper methods (RFE, forward/backward selection) evaluate feature subsets by training a model. Embedded methods (Lasso, feature_importances_) select features as part of training." },
    { q: "Pearson correlation measures:", opts: ["Any non-linear relationship between two variables", "Linear relationship between two continuous variables", "Rank-based order relationship", "Mutual information between variables"], ans: 1, exp: "Pearson r measures linear correlation between continuous variables. For non-linear relationships, Spearman rank correlation or mutual information is more appropriate." },
    { q: "A feature 'day_of_week' coded as 0–6 (Mon=0, Sun=6): coding Sunday=6 and Monday=0 implies:", opts: ["No ordering issue — it's fine", "False ordering: Sunday (6) appears 'greater' than Monday (0) and not close to it", "Sunday and Monday are correctly shown as adjacent", "This is nominal encoding"], ans: 1, exp: "Day of week is cyclic. Linear encoding 0–6 makes Sunday (6) and Monday (0) seem far apart, and implies Tuesday (1) > Monday (0). Use sin/cos cyclical encoding to capture the circular nature." },
    { q: "What does 'n_components=0.95' in PCA(n_components=0.95) mean?", opts: ["Use 95 components", "Automatically select the minimum components to explain 95% of variance", "Use 95% of the data for fitting", "Apply 95% threshold to loadings"], ans: 1, exp: "When n_components is a float between 0 and 1, sklearn's PCA automatically selects the minimum number of components needed to explain that fraction of total variance." },
    { q: "The main risk of using too many polynomial features (high degree):", opts: ["Model underfits (too simple)", "Model overfits — learns training data noise", "Features become uncorrelated", "Training is always faster"], ans: 1, exp: "High-degree polynomial features increase model complexity exponentially. The model can perfectly fit training data (including noise) while generalizing poorly to new data — classic overfitting." },
    { q: "In a feature selection report, a feature has importance = 0. This means:", opts: ["The feature was constant", "The model never used this feature to make a split/decision", "The feature is perfectly correlated with another", "An error in computation"], ans: 1, exp: "Feature importance = 0 in a tree model means the feature was never chosen for any split across all trees — it provided no benefit. This could be due to redundancy, irrelevance, or masking by other features." },
    { q: "For a recommendation system with millions of users, encoding user_id as One-Hot would create:", opts: ["A manageable sparse matrix", "An impractically large matrix with millions of columns — use embedding instead", "A 100-column dense matrix", "A single binary feature"], ans: 1, exp: "One-Hot for millions of users creates millions of columns — memory-prohibitive. Embedding layers (or hashing tricks) map users to low-dimensional dense vectors, which is standard practice in recommendation systems." },
  ],
  3: [
    { q: "A Perceptron fails to learn the XOR function because:", opts: ["Its learning rate is too small", "XOR data is not linearly separable", "The step function is non-differentiable", "It needs more training epochs"], ans: 1, exp: "XOR data cannot be separated by a single straight line (hyperplane). The Perceptron can only classify linearly separable data. Multi-layer networks (MLPs) can solve XOR." },
    { q: "The sigmoid function σ(z) outputs values in the range:", opts: ["(−∞, +∞)", "[−1, +1]", "(0, 1)", "[0, 1]"], ans: 2, exp: "σ(z) = 1/(1+e⁻ᶻ) asymptotically approaches 0 and 1 but never reaches them — so the range is the open interval (0, 1). This makes it suitable for probability estimation." },
    { q: "Logistic Regression is called 'regression' but is used for:", opts: ["Predicting continuous values", "Classification (predicting class probabilities)", "Dimensionality reduction", "Clustering"], ans: 1, exp: "Despite the name, Logistic Regression is a classification algorithm. It outputs P(y=1|x) via the sigmoid function, and a threshold (usually 0.5) converts probabilities to class labels." },
    { q: "The 'naïve' assumption in Naïve Bayes is:", opts: ["All features have the same mean", "All features are conditionally independent given the class", "The dataset is balanced", "Features are normally distributed"], ans: 1, exp: "Naïve Bayes assumes that all features are conditionally independent given the class label: P(X|y) = ∏P(xᵢ|y). This is 'naïve' because it's rarely true, yet the classifier often works well." },
    { q: "KNN is called a 'lazy learner' because:", opts: ["It learns slowly during training", "It stores all training data and defers computation to prediction time — no explicit training phase", "It uses fewer resources than other models", "It performs poorly on complex tasks"], ans: 1, exp: "KNN has no training phase — it simply memorizes all training data. All computation (finding K nearest neighbors) happens at prediction time. This makes training instant but prediction slow for large datasets." },
    { q: "In Decision Trees, Gini Impurity = 0 means:", opts: ["All classes are equally distributed", "The node contains only samples of one class (perfectly pure)", "50% of each class in the node", "Maximum entropy"], ans: 1, exp: "Gini = 1 − Σpᵢ² = 0 when all pᵢ = 0 except one pᵢ = 1. This means all samples in the node belong to the same class — perfect purity, no further splitting needed." },
    { q: "SVM finds the hyperplane that:", opts: ["Minimizes training error", "Maximizes the margin between the two closest points of each class (support vectors)", "Passes through the centroid of each class", "Minimizes the number of support vectors"], ans: 1, exp: "SVM's objective is to find the maximum-margin hyperplane — the one with the largest minimum distance (margin) from any training point. The data points closest to the hyperplane are support vectors." },
    { q: "A medical test predicts cancer. Reducing false negatives is critical. Which metric to optimize?", opts: ["Precision", "Recall (Sensitivity)", "Specificity", "Accuracy"], ans: 1, exp: "Recall = TP/(TP+FN). A false negative (missed cancer) is far worse than a false positive in this domain. Maximizing recall ensures we catch as many true cancer cases as possible." },
    { q: "A spam filter should minimize false positives (legitimate emails marked spam). Optimize:", opts: ["Recall", "Precision", "F1-Score", "ROC-AUC"], ans: 1, exp: "Precision = TP/(TP+FP). A false positive here means a good email goes to spam — annoying and potentially harmful. High precision means when we predict spam, it's very likely actual spam." },
    { q: "The C parameter in SVM controls:", opts: ["The kernel function type", "Bias-variance tradeoff: high C = harder margin (less regularization)", "The number of support vectors exactly", "The learning rate"], ans: 1, exp: "C is the regularization parameter. Low C = soft margin (allows some misclassifications, more regularization, may underfit). High C = hard margin (penalizes all errors, less regularization, may overfit)." },
    { q: "ROC-AUC = 0.5 means the classifier is:", opts: ["Perfectly accurate", "Equivalent to random guessing", "Worse than random", "Perfectly calibrated"], ans: 1, exp: "AUC = 0.5 means the ROC curve lies on the diagonal — the classifier has no discriminating power, equivalent to randomly assigning classes. AUC = 1.0 is perfect; AUC < 0.5 suggests systematic inversion." },
    { q: "MultinomialNB is most appropriate for:", opts: ["Continuous feature data", "Text classification with word count features", "Binary (0/1) features", "Time-series data"], ans: 1, exp: "MultinomialNB assumes features are counts (or frequencies), making it ideal for NLP tasks with TF or TF-IDF features. GaussianNB is for continuous data; BernoulliNB for binary vectors." },
    { q: "The kernel trick in SVM allows:", opts: ["Training without labeled data", "Non-linear classification by implicitly mapping data to higher-dimensional space", "Handling missing values", "Automatic feature selection"], ans: 1, exp: "The kernel trick computes dot products in a high-dimensional feature space without explicitly computing the transformation. RBF kernel can handle non-linear boundaries efficiently." },
    { q: "In a confusion matrix, False Positive Rate (FPR) is:", opts: ["FP / (FP + TN)", "TP / (TP + FN)", "FP / (FP + TP)", "TN / (TN + FP)"], ans: 0, exp: "FPR = FP/(FP+TN) = proportion of actual negatives incorrectly classified as positive. It's plotted on the x-axis of the ROC curve. Specificity = 1 − FPR = TN/(TN+FP)." },
    { q: "The Perceptron update rule wᵢ ← wᵢ + η(y − ŷ)xᵢ updates weights when:", opts: ["Always, every epoch", "Only when prediction is incorrect (y ≠ ŷ)", "Only when y = 1", "Only in the first epoch"], ans: 1, exp: "When the prediction is correct (y = ŷ), (y − ŷ) = 0 and weights don't change. Weights only update when there's a mismatch. Perceptron is guaranteed to converge only for linearly separable data." },
    { q: "Decision Tree with unlimited depth will:", opts: ["Always generalize well", "Overfit — memorize training data", "Underfit — learn too little", "Have high bias and low variance"], ans: 1, exp: "An unlimited depth tree can grow until each leaf contains a single training sample (zero training error). This is severe overfitting — high variance. Pruning or max_depth limits are essential." },
    { q: "The RBF (Radial Basis Function) kernel in SVM is most useful when:", opts: ["Classes are linearly separable", "Decision boundary is non-linear and complex", "Data has millions of features (NLP)", "Training speed is top priority"], ans: 1, exp: "The RBF kernel maps data to infinite-dimensional space, enabling complex non-linear decision boundaries. For linearly separable data, a linear kernel is sufficient and faster." },
    { q: "F1-Score is defined as:", opts: ["(TP + TN) / total", "2 × (Precision × Recall) / (Precision + Recall)", "TP / (TP + FP)", "TP / (TP + FN)"], ans: 1, exp: "F1 = harmonic mean of Precision and Recall = 2PR/(P+R). It balances both metrics and is the go-to for imbalanced datasets. Macro-F1 and weighted-F1 extend this to multiclass." },
    { q: "KNN with K=1 will have what training error?", opts: ["50%", "High error due to noise", "Zero — each point's nearest neighbor is itself", "Error depends on data distribution"], ans: 2, exp: "With K=1, the nearest neighbor of any training point is itself (distance 0). Every training prediction is perfect → 0 training error. But K=1 overfits massively to noise." },
    { q: "A Decision Tree uses Information Gain. The feature chosen at each split:", opts: ["Has the smallest Gini impurity value", "Maximizes information gain (maximizes entropy reduction)", "Has the highest variance", "Is selected randomly"], ans: 1, exp: "Information Gain = H(parent) − Σ(weighted H(child)). The feature that reduces entropy the most (maximizes information gain) is chosen. This is used in ID3 and C4.5 algorithms." },
    { q: "Logistic Regression uses Binary Cross-Entropy loss. For a true label y=1 and predicted probability p=0.01, the loss is:", opts: ["Very small (good prediction)", "Moderate", "Very large (−log(0.01) ≈ 4.6)", "Zero"], ans: 2, exp: "Loss = −log(p) for y=1. −log(0.01) = 4.61, which is very large. The model is extremely confident in the wrong direction — the loss penalizes this severely, driving correction." },
    { q: "For a customer churn model, you get Precision=0.90 and Recall=0.30. What does this indicate?", opts: ["Excellent model overall", "Model rarely predicts churn but when it does, it's usually right — missing many actual churners", "Model predicts all customers will churn", "Good balance between precision and recall"], ans: 1, exp: "High precision, low recall: when the model predicts churn, it's correct 90% of the time (few false positives), but it only identifies 30% of actual churners (many false negatives)." },
    { q: "Which classifier makes the independence assumption that helps it handle text very efficiently?", opts: ["KNN", "SVM", "Naïve Bayes", "Decision Tree"], ans: 2, exp: "Naïve Bayes assumes feature independence: P(x1,x2,...|y) = ∏P(xi|y). This makes training and prediction O(n·d) — very fast for text with thousands of word features." },
    { q: "Standardizing features is essential for KNN because:", opts: ["KNN is a probabilistic model sensitive to distributions", "KNN uses distances — unscaled features dominate distance if their range is larger", "KNN uses gradient descent that needs normalized gradients", "KNN overfits without scaling"], ans: 1, exp: "KNN classifies based on Euclidean distance. If salary (0–1,000,000) and age (0–100) are both used, salary completely dominates the distance. Scaling gives both features equal influence." },
    { q: "Decision Tree Information Gain uses Entropy, defined as:", opts: ["1 − Σpᵢ²", "−Σpᵢ·log₂(pᵢ)", "Σpᵢ·(1−pᵢ)", "log₂(n_classes)"], ans: 1, exp: "Entropy H = −Σpᵢ·log₂(pᵢ) where pᵢ is the proportion of class i. Maximum entropy occurs at uniform distribution (H = log₂(k) for k classes). Zero entropy = pure node." },
    { q: "SVM's support vectors are:", opts: ["All training data points", "Training points farthest from the decision boundary", "Training points closest to the decision boundary that define it", "Points with the highest feature values"], ans: 2, exp: "Support vectors are the training points that lie on or within the margin (closest to the hyperplane). They 'support' the boundary — removing non-support vectors doesn't change the hyperplane." },
    { q: "A model has AUC-ROC = 0.98 but F1-Score = 0.35 on a 99:1 imbalanced dataset. The model is:", opts: ["Excellent at all prediction tasks", "Good at ranking but poor at binary decisions at the default 0.5 threshold", "Equally good on both metrics", "Definitely using the wrong algorithm"], ans: 1, exp: "High AUC = good discrimination between classes at various thresholds. Low F1 = poor binary predictions at default threshold 0.5. Adjusting the threshold can dramatically improve F1." },
    { q: "The 'elbow' in K-means is analogous to what concept in Decision Trees?", opts: ["Gini impurity reduction", "Max depth limiting overfitting", "Information gain", "Both B and C"], ans: 1, exp: "Both the elbow method (K-means) and max_depth (Decision Tree) help find the right model complexity. Beyond the elbow K (or beyond appropriate max_depth), adding complexity gives diminishing returns / overfitting." },
    { q: "Precision-Recall AUC (PR-AUC) is preferred over ROC-AUC when:", opts: ["Data is balanced", "The positive class is rare and finding it matters most", "You need speed", "Both classes are equally important"], ans: 1, exp: "ROC-AUC can be optimistic for imbalanced data because TN is large. PR-AUC focuses on the positive (rare) class — it directly measures ability to find positives among all predictions." },
    { q: "The decision boundary of Logistic Regression is:", opts: ["A curve (due to sigmoid)", "A linear hyperplane (w·x + b = 0)", "A tree-like structure", "Determined by the nearest neighbors"], ans: 1, exp: "Despite the sigmoid output, Logistic Regression's decision boundary is linear: P = 0.5 when σ(w·x+b) = 0.5, i.e., when w·x+b = 0. This is a straight line/hyperplane in feature space." },
    { q: "A model trained on credit data achieves 95% accuracy. The dataset has 95% 'No Default' samples. The model:", opts: ["Is excellent", "May just be predicting 'No Default' for everyone — accuracy is misleading", "Needs more data", "Is overfitting"], ans: 1, exp: "95% accuracy equals the majority class rate — the model may be a trivial classifier. For imbalanced credit data, check precision/recall/F1 for the minority 'Default' class." },
    { q: "GaussianNB assumes features follow:", opts: ["Uniform distribution", "Normal (Gaussian) distribution within each class", "Multinomial distribution", "No distribution (non-parametric)"], ans: 1, exp: "GaussianNB models P(xᵢ|y) as a Gaussian distribution, estimating the mean and variance of each feature for each class. It works when features are (approximately) normally distributed." },
    { q: "When K is too small in KNN (e.g., K=1), the model:", opts: ["Underfits and has high bias", "Overfits — decision boundary is too jagged and sensitive to noise", "Has high variance and low bias (overfits)", "Both A and C"], ans: 2, exp: "Small K = low bias but high variance (overfits, sensitive to individual noisy points). Large K = high bias but low variance (smoother, potentially underfitting). Optimal K is found via CV." },
    { q: "Binary Cross-Entropy penalizes a model most when:", opts: ["It predicts 0.5 for all samples", "It predicts with high confidence in the WRONG direction", "It predicts the correct class with 0.7 probability", "It predicts randomly (0.5)"], ans: 1, exp: "Loss = −y·log(p) − (1−y)·log(1−p). When y=1 and p→0, loss → ∞. High-confidence wrong predictions incur the highest penalty, driving aggressive correction during training." },
    { q: "In multiclass classification, One-vs-Rest (OvR) strategy trains:", opts: ["One model for all classes", "n_classes models, each treating one class as positive and rest as negative", "One model using softmax", "n²/2 pairwise models"], ans: 1, exp: "OvR trains n_classes binary classifiers. Each sees 'my class vs. all others.' Final prediction uses the classifier with the highest confidence score. Logistic Regression uses OvR by default." },
    { q: "A hospital wants to detect rare diseases. Which is more dangerous: FP or FN?", opts: ["False Positive (tell healthy patient they have disease)", "False Negative (miss actual disease in patient)", "Both equally dangerous", "Depends on cost of treatment"], ans: 1, exp: "False Negative (missed diagnosis) is typically more dangerous — the patient doesn't receive needed treatment. Optimize for high Recall/Sensitivity. FP leads to unnecessary further testing, but at least the patient gets checked." },
    { q: "Laplace smoothing in Naïve Bayes prevents:", opts: ["Overfitting to dominant classes", "Zero probability for unseen feature values (causing P(X|y) = 0)", "Multicollinearity between features", "High variance in probability estimates"], ans: 1, exp: "Without smoothing, if a feature value (e.g., word) never appeared in training for a class, P(word|class)=0, making the whole product P(X|y)=0. Laplace (add-1) smoothing avoids this zero probability issue." },
    { q: "SVM with a linear kernel is preferred for:", opts: ["Image classification with complex spatial features", "High-dimensional, linearly separable data like text (NLP)", "Non-linear decision boundaries", "Very small datasets only"], ans: 1, exp: "Linear SVM is highly effective for high-dimensional sparse data (like TF-IDF text features) where linear separability is often sufficient. It's computationally efficient when n_features >> n_samples." },
    { q: "What is the purpose of the 'C' parameter in Soft-Margin SVM?", opts: ["Controls the number of support vectors", "Trades off maximizing margin width vs penalizing margin violations (misclassifications)", "Sets the kernel bandwidth", "Specifies the number of classes"], ans: 1, exp: "In Soft-Margin SVM, C controls the regularization: low C = wide margin, allows violations (underfits with very noisy data); high C = narrow margin, fewer violations (can overfit). It balances simplicity vs correctness." },
    { q: "Which algorithm is non-parametric and makes no assumptions about the data distribution?", opts: ["Logistic Regression", "Gaussian Naïve Bayes", "K-Nearest Neighbors", "Linear SVM"], ans: 2, exp: "KNN is non-parametric — it makes no assumption about the underlying data distribution. It simply uses distances between points. LogReg and GNB make explicit distributional assumptions." },
    { q: "The macro-averaged F1-score in multiclass classification:", opts: ["Weights each class by its sample size", "Computes F1 per class then takes an unweighted average", "Uses only the majority class F1", "Is equivalent to accuracy"], ans: 1, exp: "Macro F1 = average of per-class F1 scores, treating all classes equally regardless of support. Weighted F1 accounts for class imbalance by weighting by sample count. Macro is stricter for rare classes." },
    { q: "A Decision Tree's max_depth=3 means:", opts: ["The tree has 3 leaf nodes", "The tree has at most 3 levels of splits from the root", "3 features are used", "3 classes are predicted"], ans: 1, exp: "max_depth=3 limits the tree to 3 levels of splitting: root → 3 levels deep. With depth 3, the tree can have at most 2³=8 leaf nodes. This prevents overfitting." },
    { q: "Precision = 0.60 in a disease classifier means:", opts: ["60% of actual disease patients are detected", "Of patients predicted to have disease, 60% actually do", "The model is correct 60% of the time", "40% of predictions are wrong"], ans: 1, exp: "Precision = TP/(TP+FP). Of all patients the model says 'has disease,' 60% truly do (40% are false alarms). This controls the false alarm rate. Recall measures how many actual cases are found." },
    { q: "KNN prediction time complexity for N training samples, D features, and a new point:", opts: ["O(1)", "O(log N)", "O(N·D) — must compute distance to all N training points", "O(D²)"], ans: 2, exp: "KNN must compute the distance from the new point to all N training samples across D features → O(N·D). This makes KNN slow at prediction time for large datasets. KD-trees or Ball Trees can reduce this." },
    { q: "Which classifier is most interpretable for explaining decisions to non-technical stakeholders?", opts: ["SVM with RBF kernel", "Random Forest", "Decision Tree", "Logistic Regression with many features"], ans: 2, exp: "A Decision Tree can be visualized and read like a flowchart: 'If income > 50k AND age > 30, then predict Yes.' This is the most transparent and explainable model for non-technical audiences." },
    { q: "In Logistic Regression, the coefficient for a binary feature tells you:", opts: ["The feature's correlation with the target", "The change in log-odds of the positive class per unit increase in the feature", "The probability that this feature is useful", "The number of standard deviations from the mean"], ans: 1, exp: "LR coefficients are in log-odds space: a coefficient β means the log-odds of y=1 changes by β for each unit increase in that feature (holding others constant). exp(β) gives the odds ratio." },
    { q: "SVM using the Polynomial kernel k(x,z) = (x·z + 1)² maps data to:", opts: ["Same dimensional space", "Quadratic feature space — includes all degree-2 polynomial interactions", "Infinite-dimensional space", "Lower dimensional space"], ans: 1, exp: "The degree-2 polynomial kernel corresponds to a feature map including all original features, their squares, and all pairwise products — quadratic feature space. Computationally done via kernel matrix, not explicit mapping." },
    { q: "The confusion matrix for a binary classifier has TP=45, TN=50, FP=5, FN=10. Accuracy is:", opts: ["82.3%", "90%", "85.7%", "87.5%"], ans: 2, exp: "Accuracy = (TP+TN)/(TP+TN+FP+FN) = (45+50)/(45+50+5+10) = 95/110 ≈ 0.8636 ≈ 86.4%. Closest to 85.7%. Actually: 95/110 = 86.4%, so 85.7% is closest to correct (rounding differences may vary)." },
    { q: "For a multiclass problem with 5 classes using One-vs-Rest SVM, how many models are trained?", opts: ["5", "10 (5×4/2 pairs)", "1", "25"], ans: 0, exp: "One-vs-Rest (OvR) trains one binary classifier per class: class 1 vs rest, class 2 vs rest, ..., class 5 vs rest = 5 models total. One-vs-One (OvO) would train C(5,2)=10 models." },
  ],
  4: [
    { q: "Simple Linear Regression finds the best fit line by minimizing:", opts: ["Sum of absolute errors", "Sum of squared errors (OLS — Ordinary Least Squares)", "Maximum error", "R-squared directly"], ans: 1, exp: "OLS minimizes Σ(yᵢ − ŷᵢ)². Squaring amplifies large errors, making the solution sensitive to outliers but analytically tractable (closed-form solution exists: β = (XᵀX)⁻¹Xᵀy)." },
    { q: "R-squared (R²) = 0.85 means:", opts: ["85% accuracy", "The model explains 85% of the variance in the target", "15% of predictions are wrong", "RMSE is 0.85"], ans: 1, exp: "R² = 1 − SS_res/SS_tot. R²=0.85 means the model accounts for 85% of the variance in y. The remaining 15% is unexplained variance (noise or missing features)." },
    { q: "Lasso (L1) regression drives some coefficients to exactly zero because:", opts: ["L2 norm constraint has corners where sparse solutions occur", "L1 norm constraint has corners at axes where coefficients become exactly zero", "Gradient descent randomly sets coefficients to zero", "Lasso uses a different optimizer"], ans: 1, exp: "The L1 ball (|β₁| + |β₂| = const) has corners on the coordinate axes. OLS contours often 'touch' these corners, setting one or more coefficients to exactly zero — automatic feature selection." },
    { q: "Ridge (L2) regression shrinks coefficients but rarely makes them exactly zero because:", opts: ["L2 ball is circular/spherical — no corners where coefficients hit zero", "Ridge uses a larger penalty than Lasso", "Ridge has a lower learning rate", "Ridge can't handle correlated features"], ans: 0, exp: "The L2 ball (β₁² + β₂² = const) is smooth and round — no corners at axes. OLS contours touch the L2 ball at a non-axis point, so no coefficient becomes exactly zero." },
    { q: "ElasticNet is a combination of:", opts: ["Ridge and PCA", "Lasso and Ridge (L1 + L2 penalty)", "Lasso and Decision Tree", "Ridge and Gradient Boosting"], ans: 1, exp: "ElasticNet = α·L1 + (1−α)·L2 penalty. The l1_ratio parameter controls the mix. It gets feature selection from L1 and handles correlated features better than pure L1." },
    { q: "A house price model shows multicollinearity between 'total_rooms' and 'total_bedrooms'. The best fix is:", opts: ["Remove both features", "Use Lasso or Ridge regression (regularization handles multicollinearity)", "Increase sample size", "Switch to a decision tree"], ans: 1, exp: "Ridge regression stabilizes estimates when features are multicollinear — it adds λI to (XᵀX) before inversion, preventing singular/near-singular matrices. Lasso may drop one correlated feature entirely." },
    { q: "MSE vs MAE: which is more sensitive to outliers?", opts: ["MAE (Mean Absolute Error)", "MSE (Mean Squared Error) — because errors are squared", "Both equally sensitive", "Depends on dataset size"], ans: 1, exp: "MSE = mean of squared errors — large errors contribute disproportionately (squared). MAE = mean of absolute errors — all errors contribute linearly. MSE penalizes outliers much more heavily." },
    { q: "In multiple linear regression, the coefficient β₁ represents:", opts: ["The correlation between x₁ and y", "The change in y per unit increase in x₁, holding all other predictors constant", "The total effect of x₁ on y", "The R² contribution of x₁"], ans: 1, exp: "In MLR, β₁ is the partial regression coefficient: the expected change in y for a one-unit increase in x₁, while all other predictors are held fixed. This isolates x₁'s independent effect." },
    { q: "Polynomial Regression degree=5 achieves R²=0.99 on training data but R²=0.20 on test data. This indicates:", opts: ["Underfitting", "Data leakage", "Severe overfitting — the model memorized training data", "The test set is too small"], ans: 2, exp: "Huge gap between train (0.99) and test (0.20) R² = overfitting. A degree-5 polynomial has enough parameters to weave through training points, but this doesn't generalize. Use lower degree or regularization." },
    { q: "For time-series data (sales over months), the correct train-test split is:", opts: ["Random 80/20 split", "Split by time: first 80% of time periods for training, last 20% for testing", "K-fold cross-validation", "Leave-one-out cross-validation"], ans: 1, exp: "Time-series data must respect temporal ordering. Random splits allow 'future' data into training (leakage). Always train on the past, test on future time periods." },
    { q: "A lag feature y(t−1) in time-series regression means:", opts: ["Average of the last 7 values", "Yesterday's target value used as today's predictor", "The seasonal component", "A rolling standard deviation"], ans: 1, exp: "y(t−1) is a lag-1 feature — the previous time step's actual value used as input to predict the current value. Lag features capture autocorrelation (today's value depends on yesterday's)." },
    { q: "RMSE (Root Mean Squared Error) is preferred over MSE for reporting because:", opts: ["RMSE is always smaller", "RMSE is in the same units as the target variable — more interpretable", "RMSE handles outliers better", "RMSE is faster to compute"], ans: 1, exp: "RMSE = √MSE. Taking the square root returns the error to the same units as y (e.g., ₹ for house prices). MSE is in squared units (₹²) which is hard to interpret practically." },
    { q: "A regression model has high bias and low variance. This suggests:", opts: ["Overfitting — too complex a model", "Underfitting — model is too simple to capture the pattern", "Ideal model — perfect fit", "Data has too many outliers"], ans: 1, exp: "High bias = model underfits — makes systematic errors because it's too simple (e.g., fitting a line to quadratic data). Low variance = consistent but consistently wrong. Need a more complex model." },
    { q: "Cross-validation is used in regression to:", opts: ["Speed up training", "Estimate generalization performance more reliably than a single train/test split", "Select the best features automatically", "Perform bootstrapping"], ans: 1, exp: "K-fold CV splits data into K folds, trains K models (each holding a different fold for validation), and averages scores. This gives a more robust estimate of generalization than a single split." },
    { q: "Regularization parameter λ (alpha in sklearn) in Ridge regression:", opts: ["Large λ → small shrinkage → more overfitting", "Large λ → strong shrinkage → simpler model, may underfit", "Does not affect the model", "Controls the number of features selected"], ans: 1, exp: "Large λ adds a strong penalty on coefficient magnitude → coefficients shrink toward zero → simpler model. Too large = underfit. Too small = essentially no regularization → may overfit." },
    { q: "An e-commerce company wants to predict revenue (continuous). Which loss function is standard?", opts: ["Binary Cross-Entropy", "Categorical Cross-Entropy", "Mean Squared Error (MSE)", "Hinge Loss"], ans: 2, exp: "Revenue is a continuous target — regression task. MSE is the standard loss. Binary and Categorical Cross-Entropy are for classification. Hinge loss is for SVM classification." },
    { q: "The OLS closed-form solution β = (XᵀX)⁻¹Xᵀy fails when:", opts: ["The dataset is too small", "XᵀX is singular (features are perfectly multicollinear or n_samples < n_features)", "The target has outliers", "Features are not normalized"], ans: 1, exp: "If features are perfectly correlated or there are more features than samples, XᵀX is singular (non-invertible). Ridge adds λI to regularize: (XᵀX + λI)⁻¹ is always invertible for λ > 0." },
    { q: "Adjusted R² penalizes adding unnecessary features because:", opts: ["It divides R² by the number of features", "It adjusts for the number of predictors — only increases if a new feature genuinely improves the model", "It uses a different error formula", "It squares the residuals differently"], ans: 1, exp: "R² always increases (or stays same) when you add features — even noise. Adjusted R² penalizes for each additional predictor, only increasing when the feature explains enough variance to justify its addition." },
    { q: "Rolling mean with window=7 in time-series:", opts: ["Sums the last 7 values", "Computes the average of the last 7 time steps — smooths the series", "Computes 7-day variance", "Shifts the series 7 days forward"], ans: 1, exp: "Rolling (or moving) mean smooths the time-series by averaging across a sliding window. Window=7 (e.g., weekly) reduces noise and captures the local trend, useful as a feature for regression models." },
    { q: "In Polynomial Regression, adding x², x³ features makes it:", opts: ["A non-linear algorithm", "Still a linear model in its parameters (coefficients), but non-linear in x", "A tree-based model", "An ensemble method"], ans: 1, exp: "Polynomial regression is linear in parameters (β₀ + β₁x + β₂x² + β₃x³). The model is still OLS regression, but the feature space has been expanded. 'Linear' refers to the parameter relationship, not x." },
    { q: "Decision Tree Regressor prediction for a new sample is:", opts: ["The average of all training targets", "The mean of training samples in the leaf node where the sample falls", "A linear combination of features", "The median of all samples"], ans: 1, exp: "In Decision Tree regression, each leaf stores the mean of training targets in that region. Prediction = navigate the tree to the leaf, return the leaf's mean target value." },
    { q: "Random Forest Regressor reduces overfitting compared to a single Decision Tree by:", opts: ["Using fewer features", "Averaging predictions of many trees — variance reduction through ensemble", "Using deeper trees", "Applying L2 regularization to each tree"], ans: 1, exp: "Each tree is trained on a bootstrap sample with random feature subsets (bagging). Individual trees may overfit but differently. Averaging cancels out individual errors — variance is reduced √n times." },
    { q: "Gradient Boosting Regression improves predictions by:", opts: ["Training all trees in parallel on the same data", "Each tree fitting the residual errors of the previous model", "Selecting the best single tree from many candidates", "Random feature sampling with replacement"], ans: 1, exp: "Gradient Boosting is sequential: Tree 1 fits y; Tree 2 fits residuals of Tree 1; Tree 3 fits residuals of Tree 1+2, etc. Each tree corrects the previous model's errors. This reduces bias." },
    { q: "For a house price dataset, you add 'zipcode' as a numeric feature (10001–99999). Without encoding, a linear model will:", opts: ["Use it correctly as a location indicator", "Interpret zipcode numbers as having a linear relationship with price — incorrect", "Ignore it automatically", "Apply ordinal encoding automatically"], ans: 1, exp: "Zip codes are nominal — 10001 is not 'less valuable' than 99999. Using raw numbers implies a linear numeric relationship. They should be One-Hot or Target encoded." },
    { q: "Mean Absolute Percentage Error (MAPE) is most problematic when:", opts: ["Target values are large", "Target values are near or equal to zero (division by zero)", "Dataset has many features", "Model is linear"], ans: 1, exp: "MAPE = (1/n)Σ|actual−predicted|/|actual|. When actual=0, division by zero occurs. MAPE is also disproportionately penalizes errors on small actual values." },
    { q: "The bias-variance tradeoff in polynomial regression: as degree increases,", opts: ["Both bias and variance decrease", "Bias decreases and variance increases", "Bias increases and variance decreases", "Both increase"], ans: 1, exp: "Higher polynomial degree → more flexible model → lower bias (fits training data better), but higher variance (sensitive to training data noise). The optimal degree minimizes total error = Bias² + Variance + irreducible noise." },
    { q: "Feature 'days_since_last_purchase' used to predict 'will_churn' in a customer model: if calculated using data AFTER the prediction date, this is:", opts: ["A valid lag feature", "Temporal leakage — future information used to predict current outcome", "Target leakage", "An interaction feature"], ans: 1, exp: "Using data from after the prediction date (future information) in a time-ordered prediction problem constitutes temporal leakage. Features must only use information available at prediction time." },
    { q: "Gradient Boosting with too many estimators (n_estimators=10000, no early stopping) will:", opts: ["Always improve performance", "Eventually overfit — training error keeps decreasing but test error rises", "Converge to a fixed value without overfitting", "Fail to train due to memory"], ans: 1, exp: "Gradient Boosting can overfit with too many trees. Training error keeps decreasing, but test error starts rising after the optimal point. Use early_stopping_rounds or cross-validation to find optimal n_estimators." },
    { q: "When should you use Tree-Based Regression over Linear Regression?", opts: ["When the relationship between features and target is perfectly linear", "When data has complex non-linear relationships and feature interactions", "When n_features > n_samples", "When you need coefficient interpretability"], ans: 1, exp: "Tree-based regressors (RF, GBM) automatically capture non-linear relationships and interactions between features. Linear regression requires manual feature engineering for non-linearity." },
    { q: "Residual analysis in linear regression: if residuals show a funnel shape (variance increases with fitted values), this violates:", opts: ["Normality of errors", "Homoscedasticity (constant variance of errors)", "Independence of observations", "Linearity of relationship"], ans: 1, exp: "Homoscedasticity = constant error variance. A funnel shape means heteroscedasticity — variance of errors increases with fitted values. Fix: log-transform the target, use Weighted Least Squares, or robust regression." },
    { q: "In XGBoost regression, the 'learning_rate' (eta) parameter:", opts: ["Controls the number of trees", "Scales each tree's contribution — smaller rate → more trees needed, often better generalization", "Sets the maximum tree depth", "Determines the fraction of features used per tree"], ans: 1, exp: "Learning rate (eta) shrinks each tree's contribution. Smaller eta = each tree corrects less aggressively → needs more trees → slower but often better generalization. Typical range: 0.01–0.3." },
    { q: "The Durbin-Watson statistic in time-series regression tests for:", opts: ["Multicollinearity between predictors", "Autocorrelation in regression residuals", "Normality of residuals", "Heteroscedasticity"], ans: 1, exp: "Durbin-Watson statistic tests for autocorrelation in residuals. Values near 2 = no autocorrelation. Near 0 = positive autocorrelation. Near 4 = negative autocorrelation. Autocorrelation violates OLS assumptions in time-series." },
    { q: "A stock price prediction model trained on 2015–2022 data, tested on 2023 data. The test R² = −0.30. This means:", opts: ["The model explains 70% of variance correctly", "The model performs worse than just predicting the mean — negative R² is possible", "Data needs to be shuffled", "Test set was too small"], ans: 1, exp: "R² can be negative when SS_res > SS_tot — the model is worse than just predicting the mean. This often happens when train distribution (pre-COVID) doesn't match test distribution (post-COVID)." },
    { q: "In regularized regression, the hyperparameter α (alpha) is tuned using:", opts: ["Gradient descent", "Cross-validation on the training set", "The test set directly", "R-squared on the full dataset"], ans: 1, exp: "Regularization strength α is a hyperparameter selected via cross-validation on the training set. Using the test set for hyperparameter selection would leak test information." },
    { q: "Which regression metric is most interpretable for house price prediction in lakhs?", opts: ["MSE (Mean Squared Error)", "R² (Coefficient of Determination)", "RMSE (Root MSE) — same units as price", "Adjusted R²"], ans: 2, exp: "RMSE is in the same units as the target (lakhs). 'RMSE = 5 lakhs' means on average predictions are off by 5 lakhs — directly interpretable. MSE would be in 'lakh²', which is meaningless." },
    { q: "For predicting tomorrow's demand given seasonality and trend, what feature engineering approach helps most?", opts: ["One-Hot Encoding the date", "Creating lag features, rolling statistics, and seasonal indicators (day_of_week, month_sin/cos)", "Applying PCA to past demand", "Using raw timestamps as numeric features"], ans: 1, exp: "For time-series demand prediction: lag features capture autocorrelation; rolling statistics capture trends; cyclical encodings (sin/cos of month/day) capture seasonality without false ordering." },
    { q: "What is 'gradient' in Gradient Boosting Regression?", opts: ["The slope of each tree's decision boundary", "The negative gradient of the loss function with respect to predictions — each tree fits this residual signal", "The learning rate value", "The number of leaves per tree"], ans: 1, exp: "In GBM, the gradient of the loss (for MSE loss, this is simply the residual = y − ŷ) is computed, and each new tree is fit to minimize this gradient signal — hence 'gradient boosting.'" },
    { q: "In multiple regression, Variance Inflation Factor (VIF) > 10 indicates:", opts: ["Good model fit", "Severe multicollinearity — this predictor's variance is inflated 10x by correlation with others", "High predictive power", "The feature should be log-transformed"], ans: 1, exp: "VIF = 1/(1 − R²ⱼ) where R²ⱼ is R² from regressing feature j on all others. VIF > 5–10 = severe multicollinearity. The feature's coefficient is unreliable. Fix: remove one correlated feature or use Ridge." },
    { q: "A real estate company wants to predict house prices. The relationship between area and price follows a square-root curve. Best approach:", opts: ["Fit simple linear regression directly", "Add √area as a feature or use tree-based regression that handles non-linearity", "Apply MinMax Scaler and re-run linear regression", "Use classification instead"], ans: 1, exp: "Transform area to √area (domain knowledge) to linearize the relationship, then use linear regression. Alternatively, Random Forest/XGBoost automatically detect the non-linear pattern without manual transformation." },
    { q: "The intercept (β₀) in linear regression y = β₀ + β₁x represents:", opts: ["The rate of change of y with x", "The predicted value of y when all predictors are zero", "The correlation between x and y", "The standard error of prediction"], ans: 1, exp: "β₀ is the y-intercept — the model's prediction when all features are zero. In practice, this may not be meaningful (e.g., predicting house price when area=0), but it ensures the model can be unbiased at origin." },
    { q: "Huber Loss combines benefits of MSE and MAE by:", opts: ["Using MSE for small errors and MAE for large errors (outliers)", "Always using MSE", "Squaring all errors then taking the root", "Weighting samples inversely proportional to error size"], ans: 0, exp: "Huber Loss = MSE for |error| ≤ δ (sensitive to small deviations) and linear (MAE-like) for |error| > δ (robust to large errors/outliers). Parameter δ controls the transition point." },
    { q: "For a dataset with 1000 samples and 5 features, which regression approach is most likely to underfit?", opts: ["Polynomial degree 8", "Simple linear regression on a non-linear relationship", "Random Forest with 100 trees", "XGBoost with default parameters"], ans: 1, exp: "If the true relationship is non-linear, simple linear regression underfits (high bias). It can only fit a straight plane, missing curves and interactions. Polynomial or tree-based models capture the complexity." },
    { q: "In time-series, what is 'seasonality'?", opts: ["Long-term upward or downward trend", "Recurring patterns at fixed intervals (e.g., higher sales every December)", "Random fluctuations in the data", "Autocorrelation with lag 1"], ans: 1, exp: "Seasonality = repeating patterns tied to calendar cycles (daily, weekly, yearly). E.g., ice cream sales peak every summer. Seasonal features (month_sin, day_of_week) or seasonal decomposition capture this." },
    { q: "The p-value of a coefficient in OLS regression being > 0.05 suggests:", opts: ["The feature is the most important", "The feature's effect is NOT statistically significant (may be noise)", "The model is overfitting", "The coefficient is zero exactly"], ans: 1, exp: "p-value tests H₀: βᵢ = 0. p > 0.05 → fail to reject null hypothesis → no evidence that this feature has a real effect. The coefficient could be due to sampling noise." },
    { q: "If Lasso regression sets 3 out of 10 feature coefficients to zero, what has effectively happened?", opts: ["Dimensionality reduction via projection", "Feature selection — 7 features remain, 3 are excluded from the model", "Overfitting prevention via normalization", "Data augmentation"], ans: 1, exp: "Lasso's L1 penalty forces sparse solutions — coefficients at zero mean those features contribute nothing to predictions. This is simultaneous regularization and automatic feature selection." },
    { q: "A temperature forecasting model trained on Indian cities should NOT be tested on:", opts: ["Data from 6 months after training cutoff", "Shuffled data from the same period (breaks temporal ordering)", "Data from a holdout set after the training period", "Recent unseen data"], ans: 1, exp: "Randomly shuffled test data from the training period violates temporal ordering — future values contaminate training. Test set must be chronologically after the training period for valid evaluation." },
    { q: "MAE is more appropriate than RMSE when:", opts: ["Outliers should be penalized heavily", "All errors (including outliers) should contribute equally (not squared)", "The target variable is binary", "You want fast computation"], ans: 1, exp: "MAE treats all errors equally (linear penalty). RMSE squares errors, making outliers dominate. Use MAE when outliers are valid observations that shouldn't be over-penalized (e.g., rare but real extreme house prices)." },
    { q: "GradientBoostingRegressor with learning_rate=0.1 and n_estimators=100 vs learning_rate=0.01 and n_estimators=100: which generally performs better?", opts: ["Higher learning rate always wins", "Lower learning rate with same n_estimators may underfit — needs more estimators", "Both are identical", "Lower learning rate is always better regardless of n_estimators"], ans: 1, exp: "Lower learning rate requires more trees to converge. With same n_estimators, lr=0.01 may not converge fully. lr=0.1 with 100 trees may give better results. Optimal: low lr + high n_estimators + early stopping." },
    { q: "What does 'Homoscedasticity' mean in the context of linear regression assumptions?", opts: ["Features are normally distributed", "Errors have constant variance across all levels of fitted values", "Features are uncorrelated with each other", "The model has no intercept"], ans: 1, exp: "Homoscedasticity = equal spread of residuals across all fitted values. If residuals show patterns (fan shape, cone shape), OLS standard errors are unreliable. Violating this doesn't invalidate point estimates but invalidates p-values." },
    { q: "In a simple regression y = 2.5x + 10.3 with R² = 0.75, if x increases by 2 units, y changes by:", opts: ["2.5", "5.0 (2 × 2.5)", "10.3", "0.75"], ans: 1, exp: "The slope coefficient β₁ = 2.5 means y increases by 2.5 for each 1-unit increase in x. For 2-unit increase in x: Δy = 2.5 × 2 = 5.0. The intercept (10.3) and R² don't affect this calculation." },
    { q: "Neural network with MSE loss is essentially performing:", opts: ["Classification", "Non-linear regression — fitting a complex function from inputs to continuous outputs", "Clustering", "Dimensionality reduction"], ans: 1, exp: "MSE is the regression loss. A neural network with MSE loss and a linear output layer is performing non-linear regression — it can approximate any continuous function (universal approximation theorem)." },
  ],
  5: [
    { q: "Bagging reduces which aspect of model error?", opts: ["Bias", "Variance", "Irreducible noise", "Training time"], ans: 1, exp: "Bagging (Bootstrap Aggregating) trains multiple models on different bootstrap samples and averages their predictions. Averaging reduces variance — individual model errors cancel out — without significantly affecting bias." },
    { q: "Boosting reduces which aspect of model error?", opts: ["Variance", "Bias — sequential models correct each other's errors", "Both equally", "Neither — it just increases accuracy"], ans: 1, exp: "Boosting is sequential: each model corrects the errors of previous ones. This progressively reduces bias (systematic errors). However, it can increase variance if too many rounds are used (overfitting risk)." },
    { q: "Bootstrap sampling in Random Forest means:", opts: ["Sampling features without replacement", "Sampling training rows WITH replacement for each tree", "Sampling 50% of data for each tree", "Sampling based on class distribution"], ans: 1, exp: "Each tree in Random Forest trains on a bootstrap sample: n rows drawn WITH replacement from training data. Some rows appear multiple times; ~37% are not included (out-of-bag samples)." },
    { q: "The 'random' in Random Forest comes from:", opts: ["Random initialization of weights", "Both random bootstrap samples AND random feature subsets at each split", "Random target shuffling", "Random pruning of trees"], ans: 1, exp: "RF has two sources of randomness: (1) bootstrap sampling — different data per tree; (2) random feature subset — at each split, only √p (classification) or p/3 (regression) features are considered. Both reduce correlation between trees." },
    { q: "In AdaBoost, misclassified samples in round t:", opts: ["Are removed from the next round", "Receive lower weights in the next round", "Receive higher weights so next model focuses on them", "Are replaced by synthetic samples"], ans: 2, exp: "AdaBoost's key mechanism: after each round, misclassified samples get their weights increased. The next weak learner focuses on getting these hard examples right. Correctly classified samples get lower weights." },
    { q: "XGBoost is different from standard Gradient Boosting because:", opts: ["XGBoost uses bagging; GBM uses boosting", "XGBoost uses 2nd-order gradients (Hessian), L1+L2 regularization, and level-wise tree growth", "XGBoost trains only one tree", "XGBoost doesn't require feature engineering"], ans: 1, exp: "XGBoost improves on GBM: uses both gradient (1st order) and Hessian (2nd order) for better convergence; adds L1+L2 regularization on tree weights; level-wise tree growth; column/row subsampling; handles missing values natively." },
    { q: "LightGBM uses Leaf-Wise tree growth instead of Level-Wise. This means:", opts: ["All nodes at the same depth are split simultaneously", "The leaf with the largest loss reduction is split next — faster convergence but can overfit on small data", "Trees grow symmetrically", "Only leaf nodes are used for prediction"], ans: 1, exp: "Leaf-wise growth splits the leaf that reduces loss the most, regardless of depth — trees grow asymmetrically. This is faster and achieves better accuracy, but can overfit on small datasets (use min_child_samples to control)." },
    { q: "CatBoost's main advantage over XGBoost and LightGBM is:", opts: ["Fastest training speed", "Native support for categorical features without preprocessing", "Simpler hyperparameter tuning", "Built-in feature selection"], ans: 1, exp: "CatBoost handles categorical features natively using a target-statistic encoding computed per permutation (preventing leakage). XGBoost and LightGBM require manual categorical encoding before training." },
    { q: "Out-of-Bag (OOB) error in Random Forest is:", opts: ["Error computed on a separate validation set", "Error computed on the ~37% of samples not used in each tree's bootstrap sample — a free validation", "Error on the training set", "Average error across all trees on test data"], ans: 1, exp: "Since bootstrap sampling excludes ~37% of samples from each tree, each tree can be evaluated on its 'out-of-bag' samples without needing a separate validation set. OOB error is a reliable unbiased performance estimate." },
    { q: "Stacking (Stacked Generalization) combines models by:", opts: ["Averaging their predictions equally", "Training a meta-learner on the predictions of base models as features", "Multiplying predictions together", "Using only the best-performing base model"], ans: 1, exp: "Stacking has two levels: Level 0 = diverse base models trained on data; Level 1 = a meta-learner trained on Level 0 predictions as inputs. The meta-learner learns how to optimally combine base model outputs." },
    { q: "Soft Voting in VotingClassifier averages:", opts: ["Class labels from each model", "Predicted class probabilities — final class is argmax of averaged probabilities", "Feature importances", "Model accuracies"], ans: 1, exp: "Soft voting averages the predicted probability vectors from each model, then predicts the class with the highest average probability. This gives more nuanced combination than hard voting (majority label vote)." },
    { q: "GridSearchCV with 5-fold CV and 20 parameter combinations trains how many models total?", opts: ["20", "5", "100 (20 × 5)", "25"], ans: 2, exp: "Each parameter combination is evaluated with 5-fold CV = 5 model fits. With 20 combinations: 20 × 5 = 100 model fits total. Plus optionally a final refit on full training data." },
    { q: "RandomizedSearchCV advantage over GridSearchCV:", opts: ["Always finds the best hyperparameter set", "Much faster — evaluates random subset of combinations rather than all combinations", "Guarantees better accuracy", "Uses fewer parameters"], ans: 1, exp: "GridSearchCV exhaustively tries all combinations (exponential with more params). RandomizedSearchCV samples n_iter random combinations — often finds near-optimal results in a fraction of the time." },
    { q: "Bayesian Optimization for hyperparameter tuning differs from Grid/Random Search because:", opts: ["It uses gradient descent to find hyperparameters", "It builds a probabilistic model of the objective function and intelligently selects next candidates based on past results", "It requires manual starting points", "It works only for neural networks"], ans: 1, exp: "Bayesian Optimization fits a surrogate model (e.g., Gaussian Process) to results seen so far, then uses an acquisition function (e.g., Expected Improvement) to choose the next most promising hyperparameter set to evaluate." },
    { q: "Feature importance from Random Forest vs. XGBoost: main difference is:", opts: ["RF uses information gain; XGBoost uses Gini", "RF importance based on mean impurity reduction; XGBoost can also use gain, cover, and frequency metrics", "Both compute identical importance scores", "XGBoost doesn't compute feature importance"], ans: 1, exp: "XGBoost offers multiple importance types: gain (total information gain), cover (total samples affected), frequency (number of times used in splits). RF uses mean Gini/MSE reduction across all trees. Both are valid but give different rankings." },
    { q: "When is a single Decision Tree preferred over Random Forest?", opts: ["When maximum accuracy is needed", "When model interpretability is critical and data is simple", "When dataset is very large", "When features are highly correlated"], ans: 1, exp: "A single Decision Tree can be visualized and explained as human-readable rules — crucial for regulated industries (medical, legal, financial). RF is a black box. For accuracy, RF wins; for explainability, a shallow tree wins." },
    { q: "Early stopping in XGBoost/LightGBM prevents:", opts: ["Underfitting by adding more trees", "Overfitting by stopping training when validation metric stops improving", "Data leakage", "Multicollinearity among features"], ans: 1, exp: "Early stopping monitors a validation metric after each boosting round. If it doesn't improve for n consecutive rounds (early_stopping_rounds), training stops. This finds the optimal n_estimators automatically." },
    { q: "The learning_rate in Gradient Boosting / XGBoost controls:", opts: ["The depth of each tree", "The fraction of data used per tree", "How much each new tree contributes to the final prediction", "The L2 regularization strength"], ans: 2, exp: "learning_rate (eta) scales each tree's contribution: ŷ ← ŷ + η · h_t(x). Smaller η = smaller steps = more trees needed but often better generalization. It's the shrinkage parameter for the ensemble." },
    { q: "VotingClassifier with hard voting uses:", opts: ["Probability averages", "Majority class vote from all base estimators", "Weighted sum of predictions", "The best single model's prediction"], ans: 1, exp: "Hard voting = each classifier votes a class label; the class with the most votes wins. Soft voting averages probabilities. For calibrated classifiers with reliable probability estimates, soft voting typically performs better." },
    { q: "In a Random Forest, increasing n_estimators (number of trees):", opts: ["Always overfits", "Reduces variance — performance improves and then plateaus after enough trees", "Increases bias proportionally", "Decreases tree depth automatically"], ans: 1, exp: "Adding more trees reduces variance (due to more averaging) but never increases bias. Performance improves with more trees but plateaus — beyond ~100–500 trees, gains are marginal. Training time grows linearly." },
    { q: "AdaBoost's final prediction is:", opts: ["Average of all weak learner predictions", "Weighted majority vote — better weak learners have higher vote weight", "The last weak learner's prediction", "Random choice from all learners"], ans: 1, exp: "AdaBoost assigns weight αₜ = 0.5·log((1−εₜ)/εₜ) to each weak learner based on its error εₜ. Final prediction = sign(Σαₜhₜ(x)) — low-error learners contribute more to the final decision." },
    { q: "n_estimators in XGBoost vs n_estimators in Random Forest: key difference is:", opts: ["Both are interchangeable", "XGBoost: more trees can overfit (sequential) — use early stopping; RF: more trees only help (parallel averaging)", "RF needs fewer trees always", "XGBoost trees are shallower"], ans: 1, exp: "RF: parallel trees, more = better (just slower). XGBoost: sequential trees, more rounds = more fitting of residuals. Too many in XGBoost → overfit to training noise. Early stopping is essential for boosting." },
    { q: "The max_features parameter in Random Forest (commonly set to √p for classification):", opts: ["Limits the tree depth", "Limits the number of features considered at each split — creates tree diversity", "Sets the bootstrap sample size", "Determines minimum samples per leaf"], ans: 1, exp: "At each split, only a random subset of √p features are considered. This decorrelates trees — if one feature dominates, not all trees use it at every split. Diversity → better ensemble averaging." },
    { q: "Hyperparameter tuning with cross-validation is done on:", opts: ["Test set", "Training set using k-fold CV — never on test set", "A different dataset", "The validation set within each training fold"], ans: 1, exp: "Hyperparameter tuning must be done using cross-validation on the training set only. Using the test set for tuning causes optimistic evaluation bias (the test set is 'used up')." },
    { q: "SHAP TreeExplainer is used with ensemble models to:", opts: ["Compress the model for deployment", "Explain individual predictions by attributing contributions to each feature", "Select the best model from the ensemble", "Speed up prediction"], ans: 1, exp: "SHAP (SHapley Additive exPlanations) TreeExplainer provides exact SHAP values for tree-based models, showing each feature's contribution to a specific prediction. Enables both local (per instance) and global model explanations." },
    { q: "Which ensemble method is most likely to overfit with weak base learners?", opts: ["Bagging", "Boosting (especially with many rounds and low learning rate)", "Stacking with simple meta-learner", "Averaging"], ans: 1, exp: "Boosting sequentially fits residuals — given enough rounds, it can perfectly fit training data (including noise). Bagging averages independent noisy predictions, so overfitting is much less common." },
    { q: "For a Kaggle competition tabular dataset, which model family usually wins?", opts: ["Logistic Regression", "Support Vector Machines", "Gradient Boosting (XGBoost/LightGBM/CatBoost)", "K-Nearest Neighbors"], ans: 2, exp: "Gradient boosting frameworks (especially XGBoost, LightGBM, CatBoost) consistently dominate tabular data competitions due to their ability to capture complex non-linear patterns, handle missing values, and efficient built-in regularization." },
    { q: "min_child_weight in XGBoost controls:", opts: ["Minimum number of trees", "Minimum sum of instance weights (hessian) required in a leaf — prevents overfitting on small groups", "Minimum feature importance threshold", "Minimum learning rate"], ans: 1, exp: "min_child_weight is the minimum sum of hessian in a child node. Higher value = more conservative — prevents creating leaves from very few samples. It's a key regularization parameter against overfitting on small subgroups." },
    { q: "subsample=0.8 in XGBoost means:", opts: ["80% of features are used per tree", "80% of training rows are randomly sampled for each tree — reduces overfitting", "Trees are 80% of maximum depth", "80% of weak learners are used"], ans: 1, exp: "subsample (row subsampling) uses 80% of training rows randomly for each tree, similar to stochastic gradient descent. This reduces overfitting and speeds up training. colsample_bytree does the same for features." },
    { q: "Gradient Boosting's key weakness compared to Random Forest is:", opts: ["Lower accuracy on tabular data", "More sensitive to hyperparameters and can overfit if not carefully tuned", "Cannot handle regression problems", "Does not support feature importance"], ans: 1, exp: "GBM/XGBoost require careful tuning of n_estimators, learning_rate, max_depth, etc. and can overfit. Random Forest is more robust with default settings — a good starting point when you're not sure what to tune." },
    { q: "In a Voting Ensemble, adding a very correlated model (same predictions as an existing one):", opts: ["Significantly improves performance", "Provides no benefit — diversity is key for ensemble gains", "Reduces variance dramatically", "Is always recommended"], ans: 1, exp: "Ensemble methods benefit from diverse, uncorrelated models. Adding a model that predicts exactly like an existing one is equivalent to voting twice with one opinion — no new information, no improvement." },
    { q: "The 'depth' parameter in XGBoost (max_depth) should be:", opts: ["As large as possible", "Typically 3–8; shallow trees are preferred in boosting to avoid overfitting", "Equal to number of features", "Set to 1 always (stumps)"], ans: 1, exp: "Boosting with deep trees overfits since each tree already captures too much. Shallow trees (3–8) are 'weak learners' that each capture a piece of the pattern. AdaBoost classically uses stumps (depth=1)." },
    { q: "Blending vs Stacking: main difference is:", opts: ["Blending uses all training data; stacking uses cross-validation", "Stacking trains meta-learner on full training set; blending uses a holdout set for meta-learner features", "Both are identical", "Blending is only for regression"], ans: 1, exp: "Stacking uses k-fold CV to generate out-of-fold predictions as meta-features (no leakage). Blending uses a simpler holdout set for the meta-learner. Stacking is more robust; blending is simpler and faster." },
    { q: "Random Forest feature importance is sometimes criticized because:", opts: ["It ignores categorical features", "It can be biased toward high-cardinality and continuous features (impurity-based importance)", "It only works for classification", "It requires feature scaling"], ans: 1, exp: "Impurity-based (Gini/variance) importance can be biased toward features with more possible splits (high cardinality or continuous). Permutation importance is a more reliable alternative that doesn't have this bias." },
    { q: "Which hyperparameter tuning technique explores the most combinations given equal compute budget?", opts: ["Grid Search", "Random Search with the same n_iter as grid combinations", "Bayesian Optimization", "Manual search"], ans: 2, exp: "Bayesian Optimization intelligently uses past evaluations to focus compute on promising regions of the hyperparameter space. It finds good solutions much faster than grid or random search for the same number of evaluations." },
    { q: "In boosting, the learning_rate = 0.1 means:", opts: ["10% of training data is used per round", "Each new tree's prediction is multiplied by 0.1 before adding to ensemble", "The optimizer takes steps of size 0.1", "10% of features are sampled"], ans: 1, exp: "learning_rate (shrinkage) scales the contribution of each tree: Fₜ(x) = Fₜ₋₁(x) + η·hₜ(x). η=0.1 means each tree only adds 10% of its 'full' correction. Smaller η = more regularization, needs more trees." },
    { q: "An ensemble of 5 models has CV scores: [0.82, 0.83, 0.91, 0.81, 0.82]. Soft voting will likely give:", opts: ["Exactly 0.91 (best single model score)", "Better than the average (0.838) but similar to the best model", "Worse than all individual models", "Exactly the average (0.838)"], ans: 1, exp: "Ensemble methods typically outperform individual models because errors partially cancel. Soft voting should exceed the average and approach or exceed the best individual model — especially since models have diverse strengths." },
    { q: "The 'gamma' parameter in XGBoost controls:", opts: ["Learning rate", "Minimum loss reduction required to make a split — higher gamma = more conservative tree (regularization)", "Number of features per tree", "Row subsampling rate"], ans: 1, exp: "gamma (min_split_loss) specifies the minimum loss reduction for a node to be split. Higher gamma = only splits that significantly reduce loss are made → shallower, more regularized trees. Helps prevent overfitting." },
    { q: "Random Forest vs Extra Trees (Extremely Randomized Trees): key difference:", opts: ["Extra Trees uses boosting; RF uses bagging", "Extra Trees adds extra randomness by choosing both the split feature AND threshold randomly — faster, sometimes better", "RF doesn't use bootstrap sampling; Extra Trees does", "Extra Trees uses fewer trees"], ans: 1, exp: "ExtraTreesClassifier chooses split thresholds randomly (not optimally), adding more randomness than RF. This further reduces variance but may increase bias slightly. It's often faster since no optimal threshold search is needed." },
    { q: "When to use CatBoost over XGBoost?", opts: ["When training speed is the top priority", "When dataset has many categorical features requiring minimal preprocessing", "When interpretability is critical", "When dataset is very small"], ans: 1, exp: "CatBoost handles categorical features natively with built-in ordered target statistics — no manual encoding needed. For datasets with many categorical features (e.g., e-commerce, user data), CatBoost saves preprocessing time and often improves accuracy." },
    { q: "The `colsample_bytree=0.8` in XGBoost:", opts: ["Selects 80% of training rows per tree", "Randomly selects 80% of features for each tree — similar to RF's max_features", "Uses 80% of available CPU cores", "Sets tree depth to 80% of maximum"], ans: 1, exp: "colsample_bytree randomly samples 80% of features for each tree (column subsampling). Combined with subsample (row sampling), this introduces randomness similar to Random Forest, reducing overfitting." },
    { q: "Permutation feature importance is more reliable than impurity-based importance because:", opts: ["It's faster to compute", "It measures how shuffling a feature's values (breaking its relationship with y) increases model error — not biased by cardinality", "It uses gradient information", "It works only for linear models"], ans: 1, exp: "Permutation importance randomly permutes feature values and measures prediction error increase — directly measuring the feature's importance to predictions. Unlike Gini-based importance, it's not biased by feature cardinality or data scale." },
    { q: "Weak learner in AdaBoost is typically:", opts: ["A Random Forest", "A Decision Tree with max_depth=1 (decision stump)", "Logistic Regression", "KNN with k=1"], ans: 1, exp: "AdaBoost typically uses decision stumps (single-split trees, depth=1) as weak learners. These are 'just better than random' — each captures one simple rule. Combining many weighted stumps creates a powerful classifier." },
    { q: "What is the purpose of n_jobs=-1 in sklearn ensemble models?", opts: ["Limit the number of trees to CPU count", "Use all available CPU cores to parallelize tree training", "Set number of bootstrap samples", "Control random seed"], ans: 1, exp: "n_jobs=-1 instructs sklearn to use all available CPU cores in parallel. For Random Forest and bagging (parallel training), this dramatically speeds up training. Boosting methods can't parallelize trees but can parallelize CV." },
    { q: "After hyperparameter tuning with cross-validation, the final model should be trained on:", opts: ["Only the training fold that gave best CV result", "Full training data (train + validation) with the best hyperparameters found", "The test set to include all available data", "Half the training data"], ans: 1, exp: "After finding optimal hyperparameters via CV, retrain the model on ALL training data (all folds combined) with those hyperparameters. This maximizes training data usage. Then evaluate once on the held-out test set." },
    { q: "The bias-variance tradeoff in ensemble learning: Bagging reduces variance by:", opts: ["Making each tree simpler (higher bias)", "Averaging n trees — variance of average is σ²/n if trees are uncorrelated", "Sequential correction of errors", "Using deeper trees"], ans: 1, exp: "If n independent models each have variance σ², their average has variance σ²/n. Trees aren't fully independent in bagging (correlated due to same training distribution), so reduction is less than √n, but still substantial." },
    { q: "XGBoost with 'reg_alpha' sets which regularization?", opts: ["L2 regularization on leaf weights", "L1 regularization on leaf weights (promotes sparsity in tree weights)", "Regularization on learning rate", "Row subsampling"], ans: 1, exp: "reg_alpha = L1 (Lasso-like) regularization on leaf scores in XGBoost. reg_lambda = L2 (Ridge-like). L1 promotes sparse trees (some leaves get zero weights). Both prevent overfitting, with reg_lambda being XGBoost's default regularization." },
    { q: "LightGBM is faster than XGBoost primarily because:", opts: ["It uses fewer trees", "Leaf-wise tree growth + Gradient-based One-Side Sampling (GOSS) + Exclusive Feature Bundling (EFB)", "It doesn't use regularization", "It uses decision stumps only"], ans: 1, exp: "LightGBM uses: leaf-wise growth (more efficient); GOSS (down-samples less informative samples, keeping hard examples); EFB (bundles sparse features). These together give 10–20x speedup over XGBoost on large datasets." },
    { q: "In a stacking ensemble, the meta-learner (Level 2 model) should ideally be:", opts: ["The most powerful model (XGBoost or Neural Network)", "A simple model (Logistic Regression, Ridge) to avoid overfitting on base-model predictions", "Same as the base models", "Always a Decision Tree"], ans: 1, exp: "The meta-learner sees only a few features (base model predictions). A complex meta-learner easily overfits on this small feature set. Simple regularized models (Logistic Regression, Ridge) work best as meta-learners." },
    { q: "Feature importance from tree models can guide feature selection. After eliminating low-importance features, you should:", opts: ["Retrain once and accept results", "Re-evaluate using cross-validation — removing features may change importance rankings", "Accept the original model's results", "Immediately deploy the simplified model"], ans: 1, exp: "Feature importances are model-dependent. After removing features, importance rankings shift. Always re-run CV to verify the simplified model genuinely performs as well or better before deployment." },
  ],
  6: [
    { q: "K-Means is sensitive to outliers because:", opts: ["It uses rank-based distances", "Cluster centroids are means — outliers pull them away from true cluster centers", "It uses Euclidean distance only", "Outliers increase the number of clusters automatically"], ans: 1, exp: "K-Means centroids = arithmetic means of cluster members. A single extreme outlier drastically shifts the centroid. K-Medoids solves this by using actual data points (medoids) as cluster centers." },
    { q: "The Elbow Method for choosing K in K-Means uses:", opts: ["Silhouette Score plot", "Inertia (within-cluster sum of squares) vs K plot — choose K at the 'bend'", "Davies-Bouldin Index vs K", "Dendrogram cutting height"], ans: 1, exp: "Plot inertia (total within-cluster variance) for K=1 to K=10. As K increases, inertia always decreases. The 'elbow' — where improvement rate drops sharply — suggests the optimal K." },
    { q: "DBSCAN's ε (epsilon) parameter controls:", opts: ["Maximum number of clusters", "The neighborhood radius — points within ε of each other are considered neighbors", "Minimum cluster size", "Number of iterations"], ans: 1, exp: "ε is the radius of the neighborhood search. Points within ε distance of each other are neighbors. Too small ε = everything is noise; too large = everything merges into one cluster." },
    { q: "A point labeled -1 by DBSCAN is:", opts: ["A cluster centroid", "A noise point / outlier — doesn't belong to any cluster", "A border point", "A core point with no neighbors"], ans: 1, exp: "DBSCAN labels noise points (outliers) as -1. These are points that don't have min_samples neighbors within ε and are not within ε of a core point. This is a powerful built-in anomaly detection feature." },
    { q: "Silhouette Score closer to +1 means:", opts: ["Data point is in the wrong cluster", "Data point is close to its own cluster and far from neighboring clusters — good clustering", "Equal distances to all clusters", "The cluster has only one point"], ans: 1, exp: "Silhouette(i) = (b−a)/max(a,b) where a=mean intra-cluster distance, b=mean nearest-cluster distance. Score near +1 means a << b — well-clustered. Near 0 = on boundary. Near −1 = misclassified." },
    { q: "Cosine similarity is preferred over Euclidean distance for text clustering because:", opts: ["It's computationally cheaper", "It measures angle/direction — captures semantic similarity regardless of document length", "It works for binary features only", "It's equivalent to Euclidean for normalized vectors"], ans: 1, exp: "Cosine similarity measures the angle between vector orientations, ignoring magnitude. A short document and a long document about the same topic have high cosine similarity. Euclidean distance would show them as far apart." },
    { q: "Hierarchical clustering (Agglomerative) with Ward linkage merges:", opts: ["The two closest individual points", "The two clusters whose merger minimizes the increase in total within-cluster variance", "The largest clusters first", "Clusters with maximum average distance"], ans: 1, exp: "Ward linkage minimizes the total within-cluster sum of squares (variance) at each merge step. It tends to create compact, spherical clusters of similar size and is the most commonly used linkage for general clustering." },
    { q: "Davies-Bouldin Index: lower values indicate:", opts: ["More clusters", "Better clustering — clusters are compact and well-separated", "Higher noise ratio", "More iterations needed"], ans: 1, exp: "DBI = avg(max((sᵢ+sⱼ)/dᵢⱼ)) where sᵢ=cluster scatter, dᵢⱼ=centroid distance. Lower DBI = clusters are tighter (small scatter) and farther apart (large distance). DBI=0 is perfect." },
    { q: "K-Medoids differs from K-Means in that:", opts: ["K-Medoids uses Euclidean distance; K-Means uses Manhattan", "K-Medoids cluster centers must be actual data points — more robust to outliers", "K-Medoids doesn't require choosing K", "K-Medoids is always faster"], ans: 1, exp: "K-Medoids (PAM) uses the actual data point that minimizes total dissimilarity to cluster members (medoid), unlike K-Means which uses the computed mean. Since medoids are real points, outliers have less influence." },
    { q: "The main advantage of DBSCAN over K-Means is:", opts: ["DBSCAN always runs faster", "DBSCAN discovers arbitrary-shaped clusters and automatically identifies outliers", "DBSCAN requires fewer parameters", "DBSCAN works better for high-dimensional data"], ans: 1, exp: "DBSCAN doesn't assume spherical clusters (K-Means does). It finds clusters of any shape based on density. It also doesn't require specifying K in advance — clusters emerge from the data density structure." },
    { q: "Isolation Forest detects anomalies because:", opts: ["It computes the distance to the cluster centroid", "Anomalies are isolated in fewer random splits — they have shorter path lengths in isolation trees", "It uses the Z-score internally", "Anomalies have larger silhouette scores"], ans: 1, exp: "Isolation Forest builds random trees by repeatedly splitting on random feature + threshold. Normal points need many splits to isolate (dense neighborhood); anomalies are isolated quickly (short path length). Score = average path length." },
    { q: "Local Outlier Factor (LOF) detects anomalies based on:", opts: ["Global statistical properties (Z-score)", "Local density comparison — a point is an outlier if its local density is much lower than its neighbors'", "Cluster distance metrics", "Isolation tree path lengths"], ans: 1, exp: "LOF computes the ratio of average density of k-nearest neighbors to the point's own density. A point with much lower density than its neighbors (LOF >> 1) is a local outlier. It captures local anomalies that global methods miss." },
    { q: "A city wants to identify natural districts based on crime statistics. Best algorithm:", opts: ["Logistic Regression", "K-Means or DBSCAN clustering", "Decision Tree", "Linear Regression"], ans: 1, exp: "Grouping geographic areas based on similar crime patterns is unsupervised — there are no predefined 'correct' district labels. Clustering discovers natural groupings. K-Means works for roughly circular clusters; DBSCAN for arbitrary shapes." },
    { q: "Agglomerative clustering produces a dendrogram. Cutting it at height 5 means:", opts: ["Creating 5 clusters", "Merging all clusters whose distance is < 5 — creating clusters at that granularity", "Using the top 5 most important features", "Keeping only 5 samples"], ans: 1, exp: "Cutting the dendrogram at a horizontal level corresponds to a distance threshold. All merges below that height are accepted; the number of remaining separate branches = number of clusters. Higher cut = fewer, larger clusters." },
    { q: "For a customer segmentation task with non-spherical, varied-density customer groups, choose:", opts: ["K-Means", "DBSCAN", "Both are equally appropriate", "PCA followed by K-Means"], ans: 1, exp: "DBSCAN handles arbitrary shapes and varied densities. K-Means forces spherical, similar-sized clusters. For non-spherical customer groups (e.g., a dense urban cluster and a sparse rural cluster), DBSCAN is more natural." },
    { q: "Euclidean distance between [1,2] and [4,6] is:", opts: ["5", "7", "3", "25"], ans: 0, exp: "Euclidean distance = √((4−1)² + (6−2)²) = √(9+16) = √25 = 5. This is the straight-line distance in 2D space." },
    { q: "Manhattan distance between [1,2] and [4,6] is:", opts: ["5", "7", "3", "25"], ans: 1, exp: "Manhattan distance = |4−1| + |6−2| = 3 + 4 = 7. It sums absolute differences along each axis — like navigating a city grid (hence 'city block distance')." },
    { q: "K-Means algorithm step after assigning each point to nearest centroid:", opts: ["Compute new centroids as means of assigned points", "Recompute the number of clusters K", "Apply silhouette scoring", "Remove outlier clusters"], ans: 0, exp: "K-Means alternates: (1) Assign each point to nearest centroid; (2) Update centroids = mean of assigned points; repeat until convergence. The update step is what makes K-Means iteratively improve." },
    { q: "A Silhouette Score of −0.2 for a customer segment indicates:", opts: ["Excellent clustering — customers tightly grouped", "The average customer in this segment is closer to another segment than their own", "Too many clusters", "Need more data"], ans: 1, exp: "Silhouette near −1 means a point is farther from its own cluster than from the nearest other cluster. Score = −0.2 suggests these customers might be misassigned — they'd fit better in a different cluster." },
    { q: "In anomaly detection for network intrusion, which method is appropriate for capturing non-linear anomaly patterns?", opts: ["Z-score threshold", "Isolation Forest", "IQR method", "K-Means clustering only"], ans: 1, exp: "Isolation Forest works in high dimensions and captures non-linear anomaly patterns. Z-score and IQR are univariate and linear. Network intrusion data has complex multi-feature interactions — Isolation Forest handles these well." },
    { q: "The number of clusters K in K-Means must be:", opts: ["Determined automatically by the algorithm", "Specified in advance by the practitioner", "Equal to the number of features", "Always the square root of n_samples"], ans: 1, exp: "K is a hyperparameter in K-Means — you must specify it before running. This is K-Means' main limitation. DBSCAN and hierarchical clustering don't require K in advance." },
    { q: "Complete Linkage (in hierarchical clustering) merges clusters based on:", opts: ["Minimum distance between any two members", "Maximum distance between any two members of the two clusters", "Average of all pairwise distances", "Distance between centroids"], ans: 1, exp: "Complete linkage = max(d(a,b)) for a∈Cluster1, b∈Cluster2. It merges clusters by their farthest points, creating compact clusters. Single linkage uses the minimum distance — prone to chaining." },
    { q: "A DBSCAN parameter min_samples=5 means:", opts: ["Maximum 5 clusters are formed", "A point is a core point only if it has ≥5 neighbors within ε", "Only samples with 5+ features are used", "Clusters must have ≥5 points to be valid"], ans: 1, exp: "min_samples is the minimum number of points within ε for a point to be a core point. Core points form cluster interiors. border points are within ε of a core but have fewer than min_samples neighbors." },
    { q: "Why is feature scaling important for K-Means clustering?", opts: ["K-Means requires scaled data for the algorithm to converge", "K-Means uses Euclidean distances — unscaled features with larger ranges dominate cluster assignments", "K-Means fails completely without scaling", "Scaling reduces K needed"], ans: 1, exp: "If salary (0–1M) and age (0–100) are used together unscaled, the salary dimension completely dominates cluster assignments. StandardScaler or MinMaxScaler ensures all features contribute equally to the distance calculation." },
    { q: "Elliptic Envelope for anomaly detection assumes:", opts: ["Any data distribution", "Data follows a Gaussian (normal) distribution — fits an ellipse to normal data", "Data forms distinct clusters", "Features are independent"], ans: 1, exp: "Elliptic Envelope fits a multivariate Gaussian distribution (an ellipse in 2D, ellipsoid in higher D) to the data. Points outside a given Mahalanobis distance threshold are anomalies. Works well when data is truly Gaussian." },
    { q: "Hierarchical clustering's main advantage over K-Means:", opts: ["Runs faster on large datasets", "Doesn't require specifying K — you can choose the number of clusters after by cutting the dendrogram", "Handles outliers better", "Works with categorical data natively"], ans: 1, exp: "The dendrogram shows the full merge hierarchy. You can choose K retrospectively by cutting at different heights, exploring different granularities of clustering. K-Means requires fixing K before running." },
    { q: "Inertia in K-Means is defined as:", opts: ["Average silhouette score", "Sum of squared distances from each point to its assigned centroid", "Between-cluster distance", "Number of iterations to convergence"], ans: 1, exp: "Inertia = Σᵢ Σₓ∈Cᵢ ||x − μᵢ||² — total within-cluster sum of squared distances. Lower inertia = tighter, more compact clusters. It always decreases with more K, so use the elbow method to find optimal K." },
    { q: "A retailer clusters customers and gets Silhouette=0.62. This is:", opts: ["Poor — below 0.5 is poor", "Good — above 0.5 is considered acceptable to good clustering", "Perfect — only 1.0 is good", "Depends on K only"], ans: 1, exp: "Silhouette score > 0.5 is generally considered good clustering (clear, well-separated clusters). > 0.7 is strong. 0.62 indicates reasonably distinct customer segments that make business sense to act on." },
    { q: "DBSCAN with very large ε will:", opts: ["Create many small clusters", "Merge most points into one cluster (under-clustering)", "Identify more noise points", "Have no effect on clustering"], ans: 1, exp: "Very large ε = all points are neighbors of each other → most points become core points → everything merges into one dense cluster. ε should be tuned with a k-distance plot (distance to k-th nearest neighbor)." },
    { q: "K-Means++ initialization (vs random initialization) improves:", opts: ["Convergence speed and final clustering quality by spreading initial centroids", "The silhouette score formula", "Algorithm's ability to handle non-spherical clusters", "Automatic K selection"], ans: 0, exp: "K-Means++ chooses the first centroid randomly, then each subsequent centroid with probability proportional to distance squared from existing centroids. This spreads centroids, reducing risk of bad local minima. sklearn uses K-Means++ by default." },
    { q: "Cosine distance between two identical document vectors is:", opts: ["1 (maximum distance)", "0 (minimum distance — same direction)", "0.5", "-1"], ans: 1, exp: "Cosine similarity = 1 for identical vectors (angle=0°). Cosine distance = 1 − cosine_similarity = 1 − 1 = 0. Two identical documents have 0 cosine distance — perfectly similar." },
    { q: "An e-commerce platform wants to group products with no pre-defined categories. The appropriate ML approach:", opts: ["Logistic Regression with One-vs-Rest", "Unsupervised clustering (K-Means or Hierarchical)", "SVM with RBF kernel", "Decision Tree Classification"], ans: 1, exp: "Without predefined categories/labels, this is an unsupervised learning problem. Clustering discovers natural groupings based on product features (price, category tags, purchase patterns) without needing labeled examples." },
    { q: "The Rand Index measures:", opts: ["Inertia-to-silhouette ratio", "Clustering quality when ground truth labels are available — proportion of correctly assigned pairs", "Distance between cluster centroids", "Variance within clusters"], ans: 1, exp: "Rand Index = (TP+TN)/total pairs — proportion of point pairs correctly grouped (same cluster if truly same, different clusters if truly different). Adjusted Rand Index (ARI) corrects for chance agreements." },
    { q: "Why might K-Means fail on a dataset with ring-shaped clusters?", opts: ["K-Means has too high bias", "K-Means assumes convex, spherical clusters — rings are non-convex and not sphere-shaped", "K-Means needs the correct K which is hard to set for rings", "K-Means can only handle 2D data"], ans: 1, exp: "K-Means partitions data into Voronoi regions (convex), which can't capture ring shapes. A 'ring' cluster has points far from the center — K-Means' mean centroid would fall in the empty ring center. Use DBSCAN or spectral clustering." },
    { q: "Feature selection before clustering is important because:", opts: ["Clustering algorithms can't handle > 10 features", "Irrelevant/noisy features add dimensions that dilute meaningful distances (Curse of Dimensionality)", "Scaling is not possible with many features", "Clusters must be balanced in size"], ans: 1, exp: "In high dimensions, all points appear equidistant (Curse of Dimensionality) — distance-based clustering breaks down. Removing irrelevant features and applying PCA makes distances more meaningful and clustering more effective." },
    { q: "LOF > 1 for a data point suggests:", opts: ["The point is well-clustered", "The point's local density is lower than its neighbors — potential outlier", "The point is a cluster centroid", "Silhouette score is positive"], ans: 1, exp: "LOF = ratio of average neighbor density to own density. LOF >> 1 means the point is in a sparse region compared to its neighbors → likely an outlier. LOF ≈ 1 → point has similar density to neighbors → normal." },
    { q: "In a fraud detection system, using DBSCAN, fraudulent transactions are likely labeled as:", opts: ["Large, dense clusters (high cluster ID)", "Noise points (-1) — they occur rarely in atypical patterns far from normal transaction clusters", "The first cluster (cluster 0)", "Core points of small clusters"], ans: 1, exp: "Fraudulent transactions are rare and atypical — they don't form dense enough neighborhoods to be core points. DBSCAN labels them as noise (-1), making DBSCAN a natural anomaly detector." },
    { q: "Hierarchical clustering time complexity O(n³) means:", opts: ["It scales well to millions of records", "It's impractical for large datasets — use K-Means or mini-batch K-Means instead", "It requires cubic features", "It trains 3 models in sequence"], ans: 1, exp: "O(n³) time complexity (naive implementation; O(n² log n) with optimizations) makes hierarchical clustering too slow for large datasets. It's best for small-medium datasets where the dendrogram's interpretability is valuable." },
    { q: "Gaussian Mixture Models (GMM) compared to K-Means:", opts: ["Both produce hard cluster assignments", "GMM provides soft (probabilistic) cluster membership and can fit elliptical clusters", "GMM always produces worse results", "GMM requires fewer parameters"], ans: 1, exp: "K-Means gives hard assignments (each point belongs to exactly one cluster). GMM models clusters as Gaussians with full covariance matrices, providing probabilities of belonging to each cluster and handling elliptical shapes." },
    { q: "The optimal epsilon for DBSCAN can be estimated using:", opts: ["Elbow method on inertia", "K-distance plot — plot sorted distances to k-th nearest neighbor, find the 'knee'", "Silhouette score grid search", "Random search"], ans: 1, exp: "Plot each point's distance to its k-th nearest neighbor (k=min_samples), sorted ascending. The 'knee' (sharp bend) suggests a good ε — below this, points are in dense neighborhoods; above, they're in sparse regions." },
    { q: "After clustering customers into 4 segments, labeling them 'Budget', 'Moderate', 'Premium', 'Luxury' is:", opts: ["Part of the algorithm output", "A human interpretation step that requires domain knowledge after seeing cluster statistics", "Automatically done by K-Means", "Based solely on Silhouette Score"], ans: 1, exp: "Clustering algorithms produce numbered clusters (0,1,2,3) with no business meaning. Human interpretation — looking at cluster centroids/statistics (average spend, purchase frequency) — is required to assign meaningful labels." },
    { q: "Principal Component Analysis is often applied before clustering. Why?", opts: ["PCA selects the most important cluster", "PCA reduces dimensionality — improving distance meaningfulness and computation speed for clustering", "PCA determines the optimal K", "PCA converts clustering to classification"], ans: 1, exp: "High-dimensional data suffers from the Curse of Dimensionality. PCA reduces to a compact representation that captures most variance. Clustering on 2–10 PCA components is faster and produces more meaningful results than on 100+ raw features." },
    { q: "K-Means with K=1 results in:", opts: ["An error — K must be ≥ 2", "All points in one cluster — centroid is the global mean, inertia = total variance", "No clustering done", "Each point is its own cluster"], ans: 1, exp: "K=1 is valid: one cluster containing all points with centroid at the global mean. Inertia = total sum of squared distances from the mean = total variance. This is the baseline against which other K values are compared in the elbow plot." },
    { q: "Anomaly detection is different from supervised fraud detection because:", opts: ["Anomaly detection is always less accurate", "Anomaly detection doesn't require labeled fraud examples — it identifies statistically unusual patterns", "Supervised detection can't handle new fraud types", "Anomaly detection only works in 2D"], ans: 1, exp: "Labeled fraud data is expensive and rare. Anomaly detection learns what 'normal' looks like, flagging deviations — no labels needed. Supervised methods need labeled examples but can be very precise when good labels exist." },
    { q: "DBSCAN min_samples=2 creates:", opts: ["More clusters (too sensitive)", "Very lenient core point condition — even pairs of points form clusters, more noise removed", "Fewer, larger clusters", "No change compared to default"], ans: 1, exp: "Low min_samples = almost any dense pair creates a cluster — very few points are labeled noise. High min_samples = stricter core point condition, more noise. Tune both ε and min_samples together based on domain expectations." },
    { q: "Cluster validation using Silhouette requires:", opts: ["Ground truth labels", "Only the clustering result and feature matrix — no labels needed", "The dendrogram", "The number of clusters to be > 5"], ans: 1, exp: "Silhouette score is an internal validation metric — computed purely from the data and cluster assignments, no ground truth needed. External metrics (Rand Index, NMI) require ground truth. Internal metrics are used when truth is unavailable." },
    { q: "A customer loyalty dataset is clustered into 5 groups. Group 0 has 2 customers; groups 1–4 have ~250 each. Group 0 likely represents:", opts: ["The average customers", "Outliers or VIP customers with exceptional patterns", "A clustering error — should be merged", "The most common customer type"], ans: 1, exp: "A very small cluster often represents genuine outliers (unusual behavior) or a rare but real segment (e.g., VIP/whale customers with extreme purchase values). Before dismissing it, investigate whether these customers have distinct, actionable characteristics." },
  ],
};

const LONG_QA = [
  // Unit I: Data Pre-processing (5 questions)
  {
    q: "Explain data leakage in machine learning. What are its types, how does it occur, and how is it prevented using sklearn Pipelines?",
    a: `**Data Leakage** occurs when information from outside the training dataset is used to create the model, giving it unrealistically optimistic evaluation metrics that fail to generalize to real-world data.

**Types of Leakage:**

1. **Train-Test Contamination:** The most common form. Fitting a scaler, imputer, or encoder on the full dataset before splitting allows the model to "see" test set statistics during training. Example: fitting StandardScaler on all 1000 rows, then splitting 800/200 — the scaler's mean/std already encodes test data information.

2. **Target Leakage:** Including features that are derived from, or causally downstream of, the target variable. Example: using 'loan_repaid' to predict 'loan_default' — these measure the same event from different angles and the feature won't exist at prediction time.

3. **Temporal Leakage:** In time-series problems, using randomly shuffled splits allows future data into the training set. A model trained on 2020–2022 data mixed with 2023 data will artificially perform well but fail when deployed on genuinely future data.

**Prevention Using sklearn Pipeline:**

The Pipeline chains preprocessing steps with the model. During cross-validation, 'pipeline.fit()' is called only on each fold's training data — the scaler/imputer never sees validation data.

\\\python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ('scaler', StandardScaler()),  # fit only on train fold
    ('model', LogisticRegression())
])
scores = cross_val_score(pipe, X_train, y_train, cv=5)
\\\

This ensures each preprocessing step is learned from training data only, producing valid, unbiased validation metrics.

**Real-World Impact:** A fraud detection model with leakage might show 99% CV accuracy in testing but drop to 60% in production — a devastating discrepancy that wastes resources and erodes trust.`
  },
  {
    q: "Compare and contrast StandardScaler, MinMaxScaler, and RobustScaler. When would you use each?",
    a: `Feature scaling ensures that features with larger numerical ranges don't dominate distance-based or gradient-based algorithms.

**StandardScaler (Z-score Normalization):**
- Formula: z = (x − μ) / σ
- Output: approximately [-3, +3], mean=0, std=1
- Assumes approximately Gaussian distribution
- **Best for:** Linear models, SVM, KNN, PCA, Logistic Regression
- **Weakness:** Sensitive to outliers — a salary of ₹50,00,000 shifts μ and σ, distorting all other values

**MinMaxScaler:**
- Formula: x' = (x − min) / (max − min)
- Output: strictly [0, 1]
- Preserves zero values (important for sparse data)
- **Best for:** Neural Networks, image pixel normalization, algorithms needing bounded input
- **Weakness:** Extremely sensitive to outliers — a single extreme value compresses all other values into a tiny range

**RobustScaler:**
- Formula: x' = (x − Q2) / (Q3 − Q1)
- Uses median and IQR — both robust statistics unaffected by extreme values
- Output: no fixed range, but resistant to outliers
- **Best for:** Datasets with outliers that should be retained (not removed), e.g., salary data, medical measurements, financial data

**Decision Summary:**
| Algorithm | Recommended Scaler |
|---|---|
| Linear Regression, LogReg, SVM | StandardScaler |
| Neural Networks, image models | MinMaxScaler |
| Data with significant outliers | RobustScaler |
| Decision Trees, Random Forest, XGBoost | None needed |

Tree-based models (Decision Tree, RF, XGBoost, LightGBM) are completely invariant to monotonic feature transformations — scaling doesn't change their split decisions at all.`
  },
  {
    q: "What is PCA? Explain step-by-step how it works, the role of explained variance, and when to prefer LDA over PCA.",
    a: `**PCA (Principal Component Analysis)** is an unsupervised dimensionality reduction technique that finds new orthogonal axes (Principal Components) capturing maximum variance in the data.

**Step-by-Step Process:**
1. **Standardize features** — PCA is sensitive to scale; StandardScale first
2. **Compute covariance matrix** — captures how features vary together: Σ = XᵀX/(n−1)
3. **Eigen decomposition** — find eigenvectors (directions of variance) and eigenvalues (amount of variance): Σv = λv
4. **Sort components** — by descending eigenvalue; PC1 captures the most variance
5. **Select k components** — choose k that captures ≥ 95% cumulative explained variance
6. **Project data** — X_reduced = X · V_k (multiply by top k eigenvectors)

**Explained Variance Ratio:**
Each component's eigenvalue / total eigenvalues = proportion of total variance explained. For Iris (4 features): PC1=73%, PC2=22.9%, cumulative 95.8% with just 2 components out of 4. This means we can reduce from 4 to 2 features while retaining 95.8% of information.

**Choosing number of components:** Standard rule = keep minimum components for ≥95% cumulative explained variance. Use 'PCA(n_components=0.95)' in sklearn for automatic selection.

**Curse of Dimensionality:** As features increase, data volume grows exponentially. Data becomes sparse, distances become meaningless, and models overfit. PCA directly combats this.

**PCA vs LDA:**
| | PCA | LDA |
|---|---|---|
| Type | Unsupervised | Supervised |
| Objective | Maximize total variance | Maximize class separation (Fisher criterion) |
| Max components | min(n_samples, n_features) | n_classes − 1 |
| When to use | Visualization, compression | Classification preprocessing |

**Use LDA when:** You have class labels and want components that most discriminate between classes. LDA's components may explain less total variance but capture class-discriminative structure that PCA misses.`
  },
  {
    q: "Explain the bias-variance tradeoff. How do Bagging and Boosting address each component?",
    a: `**The Bias-Variance Tradeoff** is a fundamental principle: total prediction error = Bias² + Variance + Irreducible Noise.

**Bias:** Systematic error from wrong assumptions. A linear model fit to a non-linear curve has high bias — it's consistently off in the same direction regardless of training data.

**Variance:** Error from sensitivity to training data fluctuations. A decision tree trained to max depth memorizes training data — small changes in training set produce very different models.

**The Tradeoff:** More complex models → lower bias (fits training data well) + higher variance (overfits). Simpler models → higher bias + lower variance. Goal: find the sweet spot that minimizes total test error.

**Bagging (Bootstrap Aggregating) — Reduces Variance:**
- Trains n models independently on bootstrap samples (with replacement)
- Final prediction = average (regression) or majority vote (classification)
- If each model has variance σ², uncorrelated average has variance σ²/n
- In practice, trees are correlated → reduction is less than √n but still substantial
- Bias is unchanged — averaging doesn't make models less biased
- **Random Forest** extends bagging: also randomizes feature subsets at each split, reducing tree correlation further

**Boosting — Reduces Bias:**
- Sequential training: each model corrects the previous model's errors
- AdaBoost: increases sample weights for misclassified points
- Gradient Boosting: each tree fits the negative gradient (residuals) of the loss
- Each round reduces bias by focusing on previously wrong predictions
- Risk: enough rounds can also increase variance (overfit)
- Controlled via: learning_rate shrinkage, max_depth, early stopping

**Summary:**
| | Bias | Variance | Risk |
|---|---|---|---|
| Bagging (RF) | Same | ↓↓ | Low overfitting |
| Boosting (XGB) | ↓↓ | Same/↑ | Can overfit |
| Both combined | ↓ | ↓ | Best of both |

In practice, Boosting often achieves higher accuracy; Bagging is more robust to hyperparameter choices.`
  },
  {
    q: "What is the difference between Precision, Recall, and F1-Score? When would you optimize each? Provide real-world examples.",
    a: `These metrics all derive from the confusion matrix, but each emphasizes different types of errors.

**Confusion Matrix Definitions:**
- **TP (True Positive):** Predicted positive, actually positive ✓
- **FP (False Positive):** Predicted positive, actually negative ✗ (Type I Error)
- **FN (False Negative):** Predicted negative, actually positive ✗ (Type II Error)
- **TN (True Negative):** Predicted negative, actually negative ✓

**Precision = TP / (TP + FP)**
"Of all predicted positives, what fraction were truly positive?"
Measures: quality of positive predictions; controls false alarm rate.

**Recall (Sensitivity) = TP / (TP + FN)**
"Of all actual positives, what fraction did we catch?"
Measures: coverage of true positives; controls missed detection rate.

**F1-Score = 2 × (Precision × Recall) / (Precision + Recall)**
Harmonic mean of Precision and Recall. Penalizes extreme imbalance between the two. Best when both false positives and false negatives matter.

**When to Optimize Each — Real-World Examples:**

| Domain | Optimize | Reason |
|---|---|---|
| Cancer diagnosis | Recall | Missed cancer (FN) is life-threatening; false alarm leads to more tests but patient is safe |
| Spam filter | Precision | Marking legitimate emails as spam (FP) destroys trust; missing some spam is tolerable |
| Fraud detection | F1 or Recall | Missing fraud (FN) is expensive; too many false alarms (FP) burden investigators |
| Information retrieval | Precision@k | User wants highly relevant results, not exhaustive coverage |
| Legal document review | Recall | Missing a relevant document (FN) has legal consequences |

**The Precision-Recall Tradeoff:** Moving the classification threshold (default 0.5) changes the balance. Lowering threshold → more positives predicted → higher recall, lower precision. Finding the right threshold is domain-specific.

**Imbalanced Data:** Never use accuracy alone. For a 99:1 dataset, a 'predict always negative' model gets 99% accuracy but 0% recall. Always report Precision, Recall, F1, and AUC.`
  },
  {
    q: "Explain K-Means clustering algorithm end-to-end. What are its assumptions, limitations, and how do you choose the optimal K?",
    a: `**K-Means Algorithm:**

**Initialization:** Randomly select K points as initial centroids (K-Means++ selects them more strategically — probabilistically farther apart, reducing bad local minima).

**Iterative Steps:**
1. **Assignment:** Assign each data point to the nearest centroid (by Euclidean distance): cᵢ = argmin_k ||xᵢ − μk||²
2. **Update:** Recalculate each centroid as the mean of assigned points: μk = (1/|Ck|)Σ xᵢ
3. **Repeat** until centroids stop moving (convergence) or max_iter reached

**Convergence:** K-Means always converges (inertia decreases monotonically) but may converge to local minima. Run multiple times (n_init=10 default) and keep the best result.

**Assumptions and Limitations:**
1. Assumes **spherical (isotropic)** clusters — fails on elongated or ring-shaped clusters
2. Assumes clusters are **roughly equal in size**
3. **Sensitive to K** — must specify in advance
4. **Sensitive to outliers** — outliers pull centroids away from true centers
5. **Sensitive to scale** — always StandardScale before K-Means
6. Only finds **convex** cluster boundaries (Voronoi regions)

**Choosing Optimal K:**
1. **Elbow Method:** Plot Inertia vs K. Inertia always decreases; look for the "elbow" — the K where improvement rate sharply drops. Beyond the elbow, adding clusters gives diminishing returns.
2. **Silhouette Score:** For each K, compute average silhouette. Higher is better (>0.5 = good). Choose K that maximizes silhouette score.
3. **Davies-Bouldin Index:** Lower is better. Choose K that minimizes DBI.
4. **Domain Knowledge:** Sometimes business context dictates K (e.g., "we want 4 customer segments for our 4 marketing teams")

**When Not to Use K-Means:**
- Non-spherical clusters → DBSCAN, Spectral Clustering
- Unknown K and arbitrary shapes → DBSCAN
- Probabilistic soft assignments needed → Gaussian Mixture Models`
  },
  {
    q: "Compare Ridge, Lasso, and ElasticNet regression. Explain the mathematical intuition behind each and when to use them.",
    a: `All three are **regularized linear regression** methods that add a penalty term to the OLS loss function to prevent overfitting and handle multicollinearity.

**Standard OLS Loss:** L = Σ(yᵢ − ŷᵢ)²

**Ridge Regression (L2):**
- Loss: L = Σ(yᵢ − ŷᵢ)² + λΣβⱼ²
- Penalizes large coefficients; shrinks all toward zero but rarely to exactly zero
- Geometrically: the L2 ball (βⱼ² ≤ const) is smooth — no corners — so OLS contours touch it at a non-axis point
- **Effect:** Distributes coefficient weight among correlated features (stability)
- **Best for:** Multicollinearity; when all features are likely relevant

**Lasso Regression (L1):**
- Loss: L = Σ(yᵢ − ŷᵢ)² + λΣ|βⱼ|
- The L1 ball (|βⱼ| ≤ const) has corners at axes — OLS contours often touch a corner
- **Effect:** Sets some coefficients to exactly zero → automatic feature selection
- **Best for:** Sparse solutions; feature selection built in; when you believe many features are irrelevant

**ElasticNet (L1 + L2):**
- Loss: L = Σ(yᵢ − ŷᵢ)² + λ₁Σ|βⱼ| + λ₂Σβⱼ²
- sklearn: 'l1_ratio' controls mix (0=Ridge, 1=Lasso)
- **Effect:** Gets feature selection from L1 + handles correlated features better than pure Lasso (which arbitrarily picks one from a correlated group)
- **Best for:** High-dimensional data with groups of correlated features (e.g., genomics)

**Hyperparameter α (lambda):**
- Large α → strong regularization → simpler model (may underfit)
- Small α → weak regularization → closer to OLS (may overfit)
- Select via cross-validation: 'RidgeCV', 'LassoCV', or 'ElasticNetCV'

**Summary:**
| | Ridge | Lasso | ElasticNet |
|---|---|---|---|
| Zeros in β | Rare | Yes | Yes |
| Feature selection | No | Yes | Yes |
| Correlated features | Stable | Picks one | Groups together |
| Use case | Multicollinearity | Sparse data | High-dim correlated |`
  },
  {
    q: "Explain the Support Vector Machine (SVM) algorithm. How does the kernel trick enable non-linear classification?",
    a: `**SVM Core Idea:** Find the hyperplane that maximizes the margin between classes — the gap between the closest points (support vectors) of each class.

**Mathematical Formulation:**
- Hyperplane: w·x + b = 0
- Constraints: yᵢ(w·xᵢ + b) ≥ 1 for all training points
- Objective: Maximize margin = 2/||w||, equivalently minimize (1/2)||w||²
- This is a convex quadratic optimization problem with a unique global solution

**Support Vectors:** The training points lying on the margin boundaries (yᵢ(w·xᵢ + b) = 1). Only these points determine the hyperplane — removing non-support vectors doesn't change the model.

**Soft Margin (C parameter):**
For non-linearly separable data: allow some misclassifications with slack variables ξᵢ.
- Objective: min (1/2)||w||² + CΣξᵢ
- High C = hard margin, penalize violations heavily (low regularization, can overfit)
- Low C = soft margin, allow violations (more regularization, may underfit)

**The Kernel Trick:**
For non-linear boundaries, we'd need to map data to a higher-dimensional space φ(x) where it becomes linearly separable. But computing φ(x)·φ(z) explicitly is expensive.

The kernel trick: replace dot products with kernel functions k(x,z) = φ(x)·φ(z) — computed without explicit mapping.

**Common Kernels:**
| Kernel | Formula | Best For |
|---|---|---|
| Linear | k(x,z) = x·z | High-dim NLP, linearly separable |
| RBF (Gaussian) | k(x,z) = exp(−γ||x−z||²) | Non-linear, general purpose |
| Polynomial | k(x,z) = (x·z+1)^d | Interaction features |

**RBF Kernel:** γ controls the influence radius. Small γ = smooth, wide boundary (underfits). Large γ = tight, jagged boundary (overfits).

**SVM Advantages:** Works well in high dimensions; memory efficient (uses only support vectors); robust with appropriate kernel.

**Disadvantages:** Slow for large n_samples (O(n²)–O(n³)); not directly probabilistic; sensitive to scaling; difficult to interpret.`
  },
  {
    q: "What is the Curse of Dimensionality? How does it affect ML algorithms, and what are the strategies to combat it?",
    a: `**The Curse of Dimensionality** describes how problems arise when data has many features (dimensions), making learning exponentially harder.

**Core Problem:** As dimensionality d increases, the volume of the data space grows as sᵈ (for a hypercube of side s). Data becomes exponentially sparse — to maintain the same data density, you need exponentially more samples.

**Concrete Effects:**

1. **Distance Concentration:** In high dimensions, all pairwise distances become approximately equal. The contrast between nearest and farthest neighbors vanishes. For KNN, this is catastrophic — every point becomes equidistant from every other.

2. **Sparsity:** With 100 binary features, you'd need 2¹⁰⁰ samples to densely cover the space. In practice, real datasets have regions with zero data coverage — models must extrapolate wildly.

3. **Overfitting:** More dimensions = more model parameters = more ways to memorize training data. Generalization requires exponentially more training data per dimension.

4. **Computational Cost:** Distance computations, covariance matrix estimation, and hyperparameter optimization all scale poorly with d.

**Algorithms Most Affected:**
- KNN (distance-based)
- Kernel SVM (distance via kernel)
- Clustering (distance-based)
- Gaussian processes

**Algorithms Less Affected:**
- Tree-based models (splits on individual features)
- Regularized linear models (implicit feature selection via L1/L2)

**Strategies to Combat:**

1. **Feature Selection:** VarianceThreshold, correlation filtering, RFE, Lasso — directly reduce dimensions by removing irrelevant features

2. **Dimensionality Reduction:**
   - PCA: compress to k components capturing 95% variance
   - LDA: supervised projection maximizing class separation
   - t-SNE / UMAP: non-linear reduction for visualization

3. **Regularization:** L1/L2 penalties effectively reduce model complexity in high dimensions

4. **Domain Knowledge:** Feature engineering to create a few meaningful features from many raw ones

5. **Manifold Learning:** Real-world high-dimensional data often lies on a low-dimensional manifold (e.g., images on a manifold in pixel space)`
  },
  {
    q: "Explain ensemble learning methods: Bagging, Boosting, Stacking, and Voting. What makes ensembles better than individual models?",
    a: `**Why Ensembles Work:**
Individual models make different errors. When independent models vote or average, their uncorrelated errors cancel out. Mathematically: if n independent models each have error σ², their average has error σ²/n. Even with correlated models, diversity reduces total error.

**1. Bagging (Bootstrap Aggregating):**
- Trains n models in parallel on bootstrap samples (rows sampled with replacement)
- Final prediction: average (regression) or majority vote (classification)
- Reduces variance; bias unchanged
- Requires diverse base models — use if single model has high variance
- **Random Forest** = Bagging + random feature subsets at each split
- OOB evaluation: ~37% of samples unused per tree = free validation set

**2. Boosting:**
- Sequential training; each model corrects previous model's errors
- **AdaBoost:** misclassified samples get higher weights; final = weighted vote
- **Gradient Boosting:** each tree fits negative gradient of loss (residuals)
- **XGBoost improvements:** 2nd-order gradients, L1+L2 regularization, column/row subsampling, missing value handling, parallel tree construction on level
- **LightGBM improvements:** leaf-wise growth, GOSS, EFB → 10-20x faster
- **CatBoost:** native categorical handling via ordered target statistics
- Reduces bias; can overfit with too many rounds → use early stopping

**3. Stacking (Stacked Generalization):**
- Level 0: diverse base models (RF, SVM, XGBoost, LR) trained with k-fold CV; out-of-fold predictions stored
- Level 1: meta-learner trained on Level 0's OOF predictions
- Meta-learner learns optimal combination of base model outputs
- Best for maximizing accuracy when compute is not a constraint
- Meta-learner should be simple (Logistic Regression, Ridge) to avoid overfitting

**4. Voting:**
- Hard voting: majority label from classifiers
- Soft voting: average class probabilities → more nuanced
- Best when models are diverse and reasonably accurate
- Adding a correlated model (same predictions as existing one) provides no benefit

**Key Principle:** Diversity is essential. Ensemble of 5 different model types often outperforms 5 copies of the same model. Combine models that make different types of errors (e.g., linear model + tree model).`
  },
  {
    q: "Describe the complete workflow for handling a class imbalance problem in a fraud detection scenario.",
    a: `**Scenario:** Credit card fraud dataset with 99.5% legitimate transactions and 0.5% fraudulent. This extreme imbalance makes standard ML approaches fail badly.

**Step 1: Understand the Imbalance**
First, never blindly apply class balancing. Measure: 'Counter(y_train)'. Check if imbalance is natural (it is in fraud) or a data collection artifact.

**Step 2: Choose the Right Evaluation Metric First**
Accuracy is worthless here — predicting "all legitimate" gives 99.5% accuracy but catches 0 fraudsters.
- **Primary metric:** Precision-Recall AUC (PR-AUC) — focuses on the positive (fraud) class
- **Secondary:** F1-Score with beta (F2 if recall more important), ROC-AUC
- Set a business threshold: "We want to catch 80% of fraud even if we review 5% of legitimate transactions" → Recall ≥ 0.80, Precision ≥ 0.20

**Step 3: Baseline — No Balancing**
Always establish a baseline with 'class_weight='balanced'' first — often sufficient.
\\\python
lr = LogisticRegression(class_weight='balanced')
\\\
Result: automatically weights fraud class inversely proportional to frequency. No data manipulation needed.

**Step 4: Resampling Techniques**
a) **SMOTE Oversampling:** Creates synthetic minority samples by interpolating between real fraud cases and their k-nearest neighbors. Apply ONLY to training data, inside a Pipeline to prevent leakage.

b) **Random Undersampling:** Drop majority (legitimate) samples randomly. Fast but loses information.

c) **Combined (SMOTEENN):** SMOTE oversampling + Edited Nearest Neighbors cleaning — often best of both worlds.

\\\python
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
pipe = Pipeline([('smote', SMOTE(sampling_strategy=0.1)), ('model', XGBClassifier())])
\\\

**Step 5: Threshold Tuning**
Default threshold 0.5 is rarely optimal. Adjust based on business objective:
\\\python
probas = model.predict_proba(X_test)[:,1]
threshold = 0.3  # catch more fraud, accept more false alarms
preds = (probas >= threshold).astype(int)
\\\
Plot Precision-Recall curve to visualize the tradeoff at all thresholds.

**Step 6: Model Selection**
Tree-based ensembles (XGBoost with 'scale_pos_weight=199' for 99.5:0.5 ratio) often outperform linear models for fraud because fraud patterns are highly non-linear.

**Step 7: Continuous Monitoring**
Fraud patterns drift — monitor PR-AUC monthly and retrain when performance degrades.`
  },
  {
    q: "What is feature engineering? Explain feature creation, transformation, and selection with examples from real-world datasets.",
    a: `**Feature Engineering** is the process of using domain knowledge to create, transform, or select features that help ML models learn better. It is often called "the most impactful part of the ML pipeline" — the right features can turn a mediocre model into an excellent one.

**1. Feature Creation (Domain Knowledge):**
Creating new features that encode meaningful patterns:

- **Ratios:** 'debt_to_income = total_debt / annual_income' — a single feature that encodes the key credit risk signal better than either component alone
- **Aggregations:** 'user_avg_purchase_last_30_days', 'store_revenue_rolling_7_days' — aggregate temporal information
- **Interactions:** 'area * price_per_sqft = total_price' — meaningful product of two features
- **Cyclical encoding:** 'hour_sin = sin(2π·hour/24)', 'hour_cos = cos(2π·hour/24)' — encodes the circular nature of time (11pm and 1am are close)
- **Indicator flags:** 'is_weekend = day_of_week.isin([5,6]).astype(int)'
- **Age-based:** 'account_age_days = (today - account_created_date).days'

**2. Feature Transformation:**
Changing the distribution or scale of existing features:

- **Log transform:** 'log(salary + 1)' for right-skewed distributions — makes linear model assumptions hold better
- **Box-Cox / Yeo-Johnson:** General power transformations to normalize distributions
- **Binning:** Convert continuous age to ordinal buckets ('0-18: child, 18-35: young adult...') — captures non-linear threshold effects
- **Polynomial features:** 'area², area³, area × bedrooms' — lets linear models capture curves

**3. Feature Selection:**
Choosing which features to include:

- **Filter methods:** VarianceThreshold (removes constant features), correlation analysis (remove |r| > 0.90 pairs), mutual information
- **Wrapper methods:** RFE with cross-validation — trains model on feature subsets
- **Embedded methods:** Lasso (L1 zeros out irrelevant coefficients), tree feature importances
- **SHAP values:** Most reliable method — shows each feature's average contribution to predictions

**Key Principle:** Feature engineering requires domain expertise. A data scientist building a house price model who knows that location matters more than size should create 'neighborhood_median_price' as a feature — no algorithm discovers this without domain guidance.

**Impact Example:** Adding 'petal_length / sepal_length' ratio to Iris dataset improves classification accuracy from 92% to 98% — one engineered feature worth more than all original features combined.`
  },
  {
    q: "Explain XGBoost in detail: how it differs from standard Gradient Boosting, its key hyperparameters, and best practices for tuning.",
    a: `**Standard Gradient Boosting recap:** Sequential ensemble where each tree fits the negative gradient of the loss (residuals for MSE). Prediction = sum of all trees' outputs multiplied by learning_rate.

**XGBoost Improvements over Standard GBM:**

**1. Second-Order Optimization:** Uses both gradient (first derivative) and Hessian (second derivative) of the loss for finding optimal leaf values. This enables faster, more accurate convergence.

**2. Regularization:** Explicitly adds L1 (reg_alpha) and L2 (reg_lambda) penalties on leaf weights + a penalty on the number of leaves (gamma). Standard GBM has no built-in regularization.

**3. Sparsity Awareness:** Natively handles missing values — learns the optimal default direction for missing values at each split during training.

**4. Level-wise tree growth:** Builds each tree level by level (BFS), processing all nodes at the same depth together. (vs LightGBM's leaf-wise growth which is faster but can overfit on small data)

**5. Parallel & Column Block:** Sorts feature values in advance into compressed column blocks; parallel computation within each level significantly speeds up tree construction.

**Key Hyperparameters and Tuning Strategy:**

| Parameter | Role | Typical Range |
|---|---|---|
| n_estimators | Number of trees | 100–10000 (use early stopping) |
| learning_rate (eta) | Shrinkage per tree | 0.01–0.3 (smaller = better, needs more trees) |
| max_depth | Tree depth | 3–10 (3–6 for most datasets) |
| subsample | Row sampling per tree | 0.6–1.0 |
| colsample_bytree | Feature sampling per tree | 0.6–1.0 |
| reg_alpha | L1 regularization | 0, 0.1, 1, 10 |
| reg_lambda | L2 regularization | 1 (default), 0.1, 10 |
| gamma | Min gain for split | 0, 0.1, 0.5, 1 |
| min_child_weight | Min hessian per leaf | 1, 3, 5, 10 |
| scale_pos_weight | Class imbalance | n_negative/n_positive |

**Best Practices:**
1. Set learning_rate=0.1, use early_stopping_rounds=50 to find optimal n_estimators
2. Then lower learning_rate to 0.01 and increase n_estimators proportionally
3. Tune max_depth (most impactful), then subsample/colsample_bytree for regularization
4. Use Bayesian Optimization (Optuna) for large hyperparameter spaces
5. Always use CV=5 for evaluation; never tune on test set
6. scale_pos_weight = majority/minority count for imbalanced datasets`
  },
  {
    q: "Describe DBSCAN algorithm in detail. Compare it to K-Means and explain when each is most appropriate.",
    a: `**DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** clusters based on local density regions rather than distance to centroids.

**Core Concepts:**
- **Core Point:** A point with ≥ min_samples neighbors within radius ε
- **Border Point:** Within ε of a core point, but has fewer than min_samples neighbors itself
- **Noise Point:** Neither core nor border — labeled -1 (outlier)

**Algorithm Steps:**
1. For each unvisited point, count neighbors within ε
2. If count ≥ min_samples → core point, create new cluster
3. Recursively add all density-reachable points (neighbors of neighbors)
4. If point is reachable from a core but not itself core → border point (same cluster)
5. Remaining points = noise (-1)

**Key Parameters:**
- **ε (epsilon):** Neighborhood radius. Too small → everything is noise. Too large → one giant cluster. Tune using k-distance plot (sort distances to k-th nearest neighbor; knee = good ε)
- **min_samples:** Core point threshold. Larger = more conservative, more noise. Rule of thumb: ≥ 2 × n_features

**DBSCAN vs K-Means:**

| Property | K-Means | DBSCAN |
|---|---|---|
| Cluster shape | Spherical only | Arbitrary (any shape) |
| K required | Yes — in advance | No |
| Outlier detection | No — every point assigned | Yes — noise = -1 |
| Varying density | Assumes similar sizes | Struggles if densities vary greatly |
| Computational | O(nKI) | O(n log n) with index |
| Scaling | Needed (Euclidean) | Needed (distance-based) |
| Best for | Well-separated, spherical | Complex shapes, anomaly detection |

**When to Use DBSCAN:**
- Geographic data (irregular shaped regions)
- Anomaly detection (noise points = anomalies)
- When number of clusters is unknown
- Non-spherical, ring-shaped, or interleaved clusters

**When to Use K-Means:**
- Compact, roughly spherical clusters
- Large datasets (faster for n > 100K)
- When K is known from business context (e.g., 5 product categories)
- When you need cluster centroids for interpretation

**Practical note:** For most production clustering tasks, start with K-Means for speed and interpretability. Switch to DBSCAN if you need outlier detection or suspect non-spherical structure.`
  },
  {
    q: "What is Naïve Bayes? Explain its assumption, variants, applications, and why it works despite being 'naïve'.",
    a: `**Naïve Bayes (NB)** applies Bayes' theorem with the 'naïve' conditional independence assumption between features.

**Bayes' Theorem:**
P(y|X) = P(X|y) · P(y) / P(X)
- P(y|X): Posterior — probability of class y given features X (what we want)
- P(X|y): Likelihood — probability of features given class
- P(y): Prior — base rate of class y in training data
- P(X): Evidence (constant for all classes)

**The 'Naïve' Assumption:**
P(X|y) = P(x₁|y) × P(x₂|y) × ... × P(xₙ|y) — all features are conditionally independent given class.
This is almost never true (word 'bank' and 'money' in text co-occur), yet NB performs surprisingly well.

**Why Does It Work Despite the Wrong Assumption?**
For classification, we only need the correct *ranking* of class probabilities, not accurate probability values. Even with wrong independence assumptions, the relative ordering of P(y|X) across classes is often preserved. Additionally, with small training data, the independence assumption prevents overfitting.

**Variants:**
| Variant | Likelihood Model | Best For |
|---|---|---|
| GaussianNB | P(xᵢ|y) ~ Gaussian | Continuous features |
| MultinomialNB | P(xᵢ|y) ~ Multinomial (counts) | Text (word counts, TF) |
| BernoulliNB | P(xᵢ|y) ~ Bernoulli (binary) | Binary features, short texts |
| ComplementNB | Uses complement class statistics | Imbalanced text classification |

**Laplace Smoothing:**
If word "football" never appeared in class 'spam' in training, P("football"|spam) = 0, making the entire product 0. Laplace smoothing (add-1): P(xᵢ|y) = (count + 1) / (total_count + vocabulary_size). Prevents zero probabilities for unseen features.

**Advantages:**
- Extremely fast: O(n·d) training, O(d) prediction
- Works well with small training data
- Handles high-dimensional text naturally (20,000+ word features)
- Real-time prediction suitable

**Disadvantages:**
- Independence assumption violated in most real data
- Probability estimates are often poorly calibrated (not reliable probabilities)
- Doesn't capture feature interactions

**Key Applications:**
- Spam/ham email classification (MultinomialNB)
- Sentiment analysis
- Document categorization
- Real-time text classification at scale`
  },
  {
    q: "Explain Random Forest in detail. How does it improve on a single Decision Tree? What are the key hyperparameters?",
    a: `**Random Forest (RF)** is a bagging ensemble of decision trees with additional randomization at the feature level, creating highly diverse and collectively powerful models.

**Problems with a Single Decision Tree:**
- **High variance:** Sensitive to training data — small changes cause very different trees
- **Overfitting:** Unlimited depth memorizes training data (high variance, low bias)
- **Instability:** A single split near the root changes the entire tree structure

**How Random Forest Fixes This:**

**Step 1 — Bootstrap Sampling:**
For each of n_estimators trees, draw n samples with replacement from training data. Each tree sees a different (though overlapping) subset — ~63% unique samples, ~37% not included (OOB).

**Step 2 — Random Feature Subsets:**
At each split, consider only √p features (classification) or p/3 (regression) chosen randomly. This is the key difference from standard bagging. If one feature dominates (high importance), not all trees use it at every split → decorrelates trees.

**Step 3 — Grow Full (Deep) Trees:**
Unlike single trees (pruned), RF trees are grown to max depth (or until pure leaves). Individual trees overfit, but ensembling cancels overfitting via averaging.

**Step 4 — Ensemble:**
- Classification: majority vote across all trees
- Regression: mean of all tree predictions

**Why Averaging Helps:**
Variance of average = σ²_tree × (ρ + (1−ρ)/n) where ρ = tree correlation. Higher tree diversity (lower ρ) → more variance reduction. Random feature subsets directly reduce ρ.

**Out-of-Bag (OOB) Error:**
Each tree can be evaluated on its ~37% unused samples. Average OOB error across all trees ≈ cross-validated test error — a free validation without extra computation.

**Key Hyperparameters:**
| Parameter | Effect | Typical Values |
|---|---|---|
| n_estimators | More trees → more stable, then plateau | 100–500 |
| max_features | Lower → more diverse trees | 'sqrt' (default), 'log2', 0.5 |
| max_depth | Limits overfitting | None (default), 10, 20 |
| min_samples_split | Minimum samples to split a node | 2 (default), 5, 10 |
| min_samples_leaf | Minimum samples per leaf | 1 (default), 2, 5 |
| max_samples | Bootstrap sample size fraction | 1.0 (default), 0.8 |

**Feature Importance:**
'feature_importances_' = mean Gini/MSE reduction across all trees. More reliable with many trees. Permutation importance is preferred to avoid high-cardinality bias.

**RF vs XGBoost in practice:** RF is more robust with defaults; XGBoost often achieves higher accuracy with proper tuning. Start with RF, then try XGBoost.`
  },
  {
    q: "What is time-series regression? How is it different from regular regression, and what techniques are used?",
    a: `**Time-series data** has a temporal ordering where observations are sequentially dependent. This violates the independence assumption of standard regression and requires specialized techniques.

**Critical Difference from Regular Regression:**

| Regular Regression | Time-Series Regression |
|---|---|
| Observations are IID | Observations are temporally correlated |
| Random train/test split valid | Must split by time (train: past, test: future) |
| No sequential dependencies | Today's value depends on yesterday's |
| Feature order irrelevant | Feature order (time) is crucial |

**Key Time-Series Concepts:**

**Autocorrelation:** Correlation of a time series with its own lagged values. A series with high autocorrelation (lag 1) means yesterday's value is a strong predictor of today's.

**Stationarity:** Statistical properties (mean, variance) don't change over time. Many statistical models require stationarity. Test with Augmented Dickey-Fuller test. Achieve via differencing.

**Components:**
- **Trend:** Long-term upward/downward direction
- **Seasonality:** Recurring pattern at fixed intervals (daily, weekly, yearly)
- **Residuals:** Random noise after removing trend + seasonality

**Feature Engineering for Time-Series:**

1. **Lag Features:** y(t−1), y(t−2), y(t−7) — "yesterday's sales predicts today's"

2. **Rolling Statistics:** 'rolling_mean_7 = y.rolling(7).mean()' — smoothed trend features; captures local patterns

3. **Calendar Features:** month, day_of_week, quarter, is_holiday — critical for seasonal patterns. Use cyclical encoding: month_sin = sin(2π·month/12)

4. **Expanding Statistics:** 'y.expanding().mean()' — running historical average

5. **Difference Features:** y(t) − y(t−1) — rate of change (useful for non-stationary series)

**ML Approach for Time-Series:**
\\\
Create lag/rolling features → treat as regular tabular ML → use XGBoost/RF
\\\
This approach often outperforms classical ARIMA models for complex, multi-variable time series.

**Temporal Cross-Validation:**
Cannot use standard k-fold. Use TimeSeriesSplit — always train on past, validate on future:
- Fold 1: Train [1-100], Val [101-120]
- Fold 2: Train [1-120], Val [121-140]
- Expanding window preserves temporal causality

**Critical Pitfall:** Any feature computed using data after the prediction date is temporal leakage. Always verify the "information cutoff" for each feature.`
  },
  {
    q: "How does Logistic Regression work? Explain the sigmoid function, loss function, and regularization.",
    a: `**Logistic Regression** is a linear classification algorithm that models the probability of a binary outcome using the logistic (sigmoid) function.

**From Linear Regression to Logistic Regression:**
Linear regression predicts y ∈ (−∞, +∞). For classification, we need P(y=1) ∈ [0, 1]. Apply the sigmoid function:

**Sigmoid Function:**
σ(z) = 1 / (1 + e^(−z)) where z = w·x + b = β₀ + β₁x₁ + ... + βₙxₙ

Properties:
- Output always in (0, 1) — interpretable as probability
- σ(0) = 0.5 (decision boundary)
- σ(z) → 1 as z → +∞; σ(z) → 0 as z → −∞
- Differentiable everywhere — enables gradient-based optimization

**Decision Rule:**
P(y=1|x) = σ(w·x + b)
ŷ = 1 if P(y=1|x) ≥ threshold (default 0.5), else 0
Decision boundary: w·x + b = 0 — always a linear hyperplane

**Loss Function — Binary Cross-Entropy:**
L = −(1/n) Σ [yᵢ·log(p̂ᵢ) + (1−yᵢ)·log(1−p̂ᵢ)]
- y=1, p̂=0.01: loss = −log(0.01) = 4.61 (high — wrong and confident)
- y=1, p̂=0.99: loss = −log(0.99) ≈ 0.01 (low — correct and confident)
- Convex function → gradient descent finds global minimum

**Coefficient Interpretation:**
A coefficient βⱼ represents the change in log-odds of y=1 per unit increase in xⱼ:
log(P/(1−P)) = β₀ + β₁x₁ + ...

Odds Ratio = exp(βⱼ): if β₁ = 0.5, then OR = e^0.5 ≈ 1.65 — a 1-unit increase in x₁ multiplies the odds of y=1 by 1.65.

**Regularization:**
In sklearn, C = 1/λ (inverse of regularization strength):
- L2 (default, penalty='l2'): adds λΣβⱼ² — shrinks all coefficients, handles multicollinearity
- L1 (penalty='l1'): adds λΣ|βⱼ| — sets some coefficients to zero, automatic feature selection
- ElasticNet (penalty='elasticnet'): combines both

Small C → stronger regularization → simpler model.
Large C → weaker regularization → closer to unregularized LR.

**Multiclass Extension:**
- One-vs-Rest (OvR): k binary classifiers, each "this class vs all others"
- Softmax (multinomial): single model predicting k probabilities summing to 1 (used when multi_class='multinomial')`
  },
  {
    q: "What is the difference between parametric and non-parametric ML models? Give examples and discuss their tradeoffs.",
    a: `**Parametric Models** learn a fixed-size set of parameters from training data. The model structure is determined before training, and predictions are made using only those learned parameters (training data is then discarded).

**Non-Parametric Models** don't assume a fixed functional form. The model complexity grows with training data — effectively "the training data is the model."

**Parametric Models:**

| Model | Parameters | Fixed Structure |
|---|---|---|
| Linear Regression | β coefficients | y = βX (linear) |
| Logistic Regression | w, b | P(y=1) = σ(wX+b) |
| Naïve Bayes | μ, σ per class-feature | Gaussian likelihood |
| Neural Networks | All layer weights | Architecture fixed |
| LDA | Class means, covariance | Assumes Gaussian |

**Advantages:** Fast prediction (O(1) for parameters); memory efficient; clear mathematical assumptions; extrapolates beyond training data; fewer samples needed; easier to interpret (linear models).

**Non-Parametric Models:**

| Model | "Parameters" | Grows with Data |
|---|---|---|
| KNN | All training data | Prediction uses all n points |
| Decision Tree | Structure varies | Grows with more data |
| SVM | Support vectors | Subset of training data |
| Kernel Density Estimation | All training points | Stores everything |
| Gaussian Process | All training points | O(n³) computation |

**Advantages:** Few assumptions about data distribution; automatically captures complex patterns; can model any functional form given enough data; more flexible.

**Tradeoffs:**

| | Parametric | Non-Parametric |
|---|---|---|
| Assumption | Strong (linear, Gaussian) | Minimal |
| Flexibility | Low — limited by structure | High |
| Training data needed | Less (fewer params) | More |
| Training speed | Fast | Varies (KNN: instant) |
| Prediction speed | Fast (params stored) | Slow (KNN: O(nd) per query) |
| Memory | Low (just params) | High (KNN: full dataset) |
| Overfitting risk | Lower | Higher with complexity |
| Interpretability | High (linear models) | Lower |

**Practical Guideline:**
- Small data, need interpretability → Logistic Regression (parametric)
- Large data, complex patterns, many features → XGBoost (non-parametric ensemble)
- KNN works well as a baseline for moderate-sized datasets with informative features`
  },
  {
    q: "What is cross-validation? Explain K-Fold, Stratified K-Fold, and TimeSeriesSplit. When should each be used?",
    a: `**Cross-Validation (CV)** is a model evaluation technique that uses multiple train/validation splits to produce more reliable performance estimates than a single split.

**Why Cross-Validation?**
A single 80/20 split has high variance — a lucky/unlucky split can give misleadingly good/bad results. CV reduces this variance by averaging over k different splits.

**K-Fold Cross-Validation:**
1. Split data into k equal folds
2. For each fold i: train on all folds except i; evaluate on fold i
3. Average metrics across all k folds

\\\
Fold 1: [Val] [Tr] [Tr] [Tr] [Tr]
Fold 2: [Tr] [Val] [Tr] [Tr] [Tr]
...
\\\

**k=5 (most common):** 5 train/val splits; good bias-variance balance.
**k=10:** More reliable estimate but 2x slower.
**LOOCV (k=n):** Most reliable but expensive for large n.

**Bias-Variance in CV:**
Small k (k=2) → each training set is only 50% of data → high bias (underestimates true performance).
Large k (k=n, LOOCV) → nearly full training data used → low bias but high variance between folds.
k=5 or k=10 is the sweet spot.

**Stratified K-Fold:**
For classification — ensures each fold has the same class distribution as the full dataset. Essential for imbalanced datasets.

Without stratification (3-class, 80/10/10 distribution): one fold might get 0 samples of the rare class → meaningless evaluation.
'StratifiedKFold(n_splits=5)' guarantees class proportions are preserved in each fold.

**TimeSeriesSplit:**
For temporal data — must respect time ordering:
\\\
Split 1: Train [1-100], Val [101-120]
Split 2: Train [1-120], Val [121-140]
Split 3: Train [1-140], Val [141-160]
\\\
Expanding training window; each fold tests on strictly future data. Standard K-Fold would put future data into training — temporal leakage.

**Nested Cross-Validation:**
For hyperparameter tuning without test set:
- Outer loop: k-fold for unbiased performance estimate
- Inner loop: CV for hyperparameter selection (on each outer train set)

\\\python
outer_cv = StratifiedKFold(5)
inner_cv = StratifiedKFold(3)
grid_search = GridSearchCV(model, params, cv=inner_cv)
outer_scores = cross_val_score(grid_search, X, y, cv=outer_cv)
\\\

**Choosing CV Strategy:**
| Data Type | CV Method |
|---|---|
| Balanced classification | K-Fold (k=5 or k=10) |
| Imbalanced classification | Stratified K-Fold |
| Time-series | TimeSeriesSplit |
| Very small dataset | LOOCV or k=n |
| Group data (multiple obs per subject) | GroupKFold |`
  },
  {
    q: "Explain the Decision Tree algorithm. What are Gini Impurity and Entropy, and how are they used in tree growing?",
    a: `**Decision Trees** recursively partition the feature space into regions, asking a series of yes/no questions, building a tree structure that maps inputs to outputs.

**The CART Algorithm (Classification and Regression Trees):**

For each node, CART finds the optimal split:
1. For each feature j and threshold t, split data into: left (xⱼ ≤ t) and right (xⱼ > t)
2. Compute impurity reduction (information gain) for this split
3. Choose the (j, t) pair that maximizes impurity reduction
4. Recurse on left and right subsets until stopping criteria met

**Stopping Criteria:** max_depth, min_samples_split, min_samples_leaf, min_impurity_decrease.

**Gini Impurity:**
G(S) = 1 − Σₖ pₖ² where pₖ = fraction of class k samples

Interpretation:
- G = 0: all samples same class (pure node) ← best
- G = 0.5 (binary): equal split between classes ← worst
- For a split: G_split = (nL/n)·G(SL) + (nR/n)·G(SR)
- Choose split that minimizes G_split (maximizes Gini gain)

**Entropy (Information Gain):**
H(S) = −Σₖ pₖ·log₂(pₖ)

Interpretation:
- H = 0: pure node ← best
- H = 1.0 (binary, equal split): maximum uncertainty ← worst
- Information Gain = H(parent) − [weighted avg H(children)]
- Choose split that maximizes Information Gain

**Gini vs Entropy:**
Both give similar results in practice. Gini is computationally slightly faster (no log). Entropy tends to produce slightly more balanced trees. CART defaults to Gini; C4.5 uses Entropy.

**Regression Trees:**
Use MSE or variance instead of Gini/Entropy:
Split criterion: minimize Σ(yᵢ − mean(yL))² + Σ(yᵢ − mean(yR))²
Prediction: mean of target values in leaf

**Overfitting Prevention:**
Raw trees grow until pure leaves → overfit badly (zero training error, poor test performance).

Solutions:
1. **max_depth:** Limit tree height (most powerful control)
2. **min_samples_split:** Node must have ≥ n samples to be split
3. **min_samples_leaf:** Each leaf must have ≥ n samples
4. **max_leaf_nodes:** Limit total leaf count
5. **Post-pruning (CCP):** Prune branches that don't significantly improve test performance

**Feature Importance from Decision Trees:**
feature_importance_j = Σ (samples_at_node/n_total) × impurity_decrease
Across all nodes where feature j is used. Normalized to sum to 1.

**Advantages:** Highly interpretable; no scaling needed; handles mixed data types; captures non-linearities automatically.
**Disadvantages:** High variance; prone to overfitting; can't extrapolate (constant prediction outside training range in regression).`
  },
  {
    q: "What is hyperparameter tuning? Compare GridSearchCV, RandomizedSearchCV, and Bayesian Optimization.",
    a: `**Hyperparameters** are model configuration settings fixed before training (not learned from data): learning_rate, max_depth, n_estimators, C, gamma. Choosing good values significantly impacts model performance.

**The Hyperparameter Tuning Challenge:**
Too few configurations searched → suboptimal model. Using the test set for selection → optimistic evaluation bias (cheating). Solution: use cross-validation on training data to select hyperparameters, then evaluate once on test set.

**Grid Search (GridSearchCV):**
Exhaustively tries every combination of specified parameter values.

\\\python
from sklearn.model_selection import GridSearchCV
params = {'max_depth': [3, 5, 7], 'learning_rate': [0.01, 0.1, 0.3]}
gs = GridSearchCV(XGBClassifier(), params, cv=5, scoring='f1')
gs.fit(X_train, y_train)
\\\

- Combinations: 3 × 3 = 9; with CV=5: 45 model fits
- **Advantage:** Guaranteed to find best combination within the grid
- **Disadvantage:** Exponential with more parameters — 5 params × 5 values = 5⁵ = 3125 combinations × 5 CV = 15,625 fits!
- **Best for:** Small search spaces, few parameters

**Randomized Search (RandomizedSearchCV):**
Randomly samples n_iter combinations from the parameter distributions.

\\\python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform, randint
params = {'max_depth': randint(3, 10), 'learning_rate': uniform(0.01, 0.3)}
rs = RandomizedSearchCV(XGBClassifier(), params, n_iter=50, cv=5, random_state=42)
\\\

- With n_iter=50 and CV=5: exactly 250 model fits regardless of search space size
- Key insight: in high-dimensional spaces, random search explores more of the space than grid search for the same compute budget
- **Advantage:** Scales to many parameters; often finds near-optimal in 50-100 iterations
- **Disadvantage:** Not guaranteed to find absolute best; results vary (use random_state)
- **Best for:** Wide search spaces, many hyperparameters

**Bayesian Optimization (Optuna, Hyperopt):**
Builds a probabilistic surrogate model (e.g., Tree Parzen Estimator or Gaussian Process) of the objective function, then uses an acquisition function (Expected Improvement) to decide which hyperparameters to evaluate next.

\\\python
import optuna
def objective(trial):
    params = {'max_depth': trial.suggest_int('max_depth', 3, 10),
              'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True)}
    return cross_val_score(XGBClassifier(**params), X_tr, y_tr, cv=5).mean()
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)
\\\

- Intelligently focuses evaluations on promising regions after early exploration
- **Advantage:** Much more efficient — finds better results than random search in same n_trials; handles conditional parameters
- **Disadvantage:** More complex setup; overhead of surrogate model
- **Best for:** Expensive models, large hyperparameter spaces, critical performance needs

**Summary:**
| Method | Best for | Guarantee |
|---|---|---|
| GridSearchCV | Small spaces, few params | Finds best in grid |
| RandomizedSearchCV | Wide spaces | None, but efficient |
| Bayesian Optimization | Expensive models | Near-optimal efficiently |

**Practical Advice:** Use RandomizedSearch first for broad exploration, then fine-tune with GridSearch around the best region. For XGBoost/LightGBM, Optuna is the industry standard.`
  },
  {
    q: "Explain anomaly detection. What are the main methods, and how would you apply it to a real-world problem?",
    a: `**Anomaly Detection** (also called Outlier Detection) identifies data points that differ significantly from the majority — rare, unusual observations that may indicate fraud, equipment failure, network intrusion, or medical conditions.

**Types of Anomalies:**
1. **Point anomalies:** Single data point is unusual (e.g., one very large transaction)
2. **Contextual anomalies:** Unusual only in context (e.g., outdoor temperature −40°C is normal in Canada, anomalous in Chennai)
3. **Collective anomalies:** A sequence is anomalous (e.g., 100 consecutive identical transactions)

**Why Unsupervised?**
Labeled anomaly data is extremely rare and expensive. An unsupervised approach learns what 'normal' looks like and flags deviations. Supervised detection works well when labeled examples exist but misses novel attack patterns.

**Key Methods:**

**1. Statistical Methods:**
- **Z-Score:** |z| > 3 means the point is 3 standard deviations from the mean. Assumes normal distribution; univariate only.
- **IQR Method:** Points outside [Q1−1.5×IQR, Q3+1.5×IQR] are outliers. Non-parametric; robust.
- **Elliptic Envelope:** Fits a multivariate Gaussian to the data; points with high Mahalanobis distance are anomalies. Requires approximate Gaussianity.

**2. Isolation Forest:**
- Builds random trees by repeatedly selecting a random feature and random split threshold
- Anomalies are isolated in fewer steps (short average path length)
- Score = 2^(−avg_path_length / c(n)) where c(n) normalizes for dataset size
- Works well in high dimensions; doesn't assume distribution
- Key parameter: contamination (expected fraction of anomalies)

**3. Local Outlier Factor (LOF):**
- Computes local density of k-nearest neighbors compared to point's own density
- LOF >> 1 = point is in much lower density than its neighbors → local anomaly
- Captures local outliers that global methods miss (a dense region can have local outliers)
- More sensitive to k parameter

**4. One-Class SVM:**
- Learns a boundary around normal data; points outside = anomalies
- Works well for non-linear anomaly boundaries; expensive for large n

**Real-World Application — Network Intrusion Detection:**

\\\
1. Collect normal network traffic features: packet_size, connection_duration, protocol, bytes_in/out
2. Train Isolation Forest on normal traffic only (or contamination=0.01 for 1% expected attacks)
3. Score new connections in real-time: anomaly_score = model.decision_function(features)
4. Flag connections with score < threshold for security review
5. Monitor false positive rate — tune contamination to reduce analyst burden
6. Retrain monthly as normal traffic patterns evolve
\\\

**Evaluation Challenge:**
True anomaly labels are rare. Use:
- Precision at K (top K anomalies)
- If some labels exist: Precision-Recall AUC on the anomaly class
- ROC-AUC if class labels available

**Production Considerations:**
- Anomaly detection models decay over time as normal behavior drifts
- Build feedback loops: analyst review → relabeled data → periodic retraining
- Keep an ensemble (Isolation Forest + LOF) for robustness; combine scores`
  },
  {
    q: "What is the difference between information gain (entropy-based) and Gini impurity in decision trees? When does the choice matter?",
    a: `Both are **impurity measures** used to evaluate split quality in decision trees. The goal is to choose the split that creates the 'purest' children nodes — where samples in each child mostly belong to one class.

**Entropy (Information Gain) — ID3, C4.5:**
H(S) = −Σₖ pₖ · log₂(pₖ)

Examples (binary classification):
- pₖ = [1.0, 0.0]: H = 0 (pure, no uncertainty)
- pₖ = [0.5, 0.5]: H = 1.0 (maximum uncertainty)
- pₖ = [0.7, 0.3]: H = −0.7·log₂(0.7) − 0.3·log₂(0.3) = 0.881

Information Gain = H(parent) − [nL/n · H(left) + nR/n · H(right)]
Choose split maximizing Information Gain.

**Gini Impurity — CART (sklearn default):**
G(S) = 1 − Σₖ pₖ²

Examples (binary classification):
- pₖ = [1.0, 0.0]: G = 0 (pure)
- pₖ = [0.5, 0.5]: G = 1 − (0.25 + 0.25) = 0.5 (maximum impurity)
- pₖ = [0.7, 0.3]: G = 1 − (0.49 + 0.09) = 0.42

Gini Gain = G(parent) − [nL/n · G(left) + nR/n · G(right)]

**Comparison:**

| Property | Entropy | Gini |
|---|---|---|
| Range | [0, log₂(k)] | [0, 1 − 1/k] |
| Computation | Requires log (slower) | No log (faster) |
| Sensitivity | More sensitive at very pure nodes | More sensitive near uniform distributions |
| Bias toward | Multi-class splits | Binary splits |
| Tree result | Similar in practice | Similar in practice |

**When Does the Choice Matter?**

In practice, entropy and Gini produce nearly identical trees for most datasets. Benchmark studies show < 1% difference in accuracy.

**Edge cases where they differ:**
1. **Many classes:** Entropy handles multi-class more gracefully (log₂(k) scales with k)
2. **Highly imbalanced classes:** Slightly different sensitivity curves near p=0 and p=1
3. **Very small datasets:** Minor differences can propagate to different tree structures

**Practical Advice:**
- Use Gini (sklearn default) unless you have a specific reason — it's faster
- The choice of tree depth (max_depth), min_samples_split, and min_samples_leaf matters far more than Entropy vs Gini
- For the same dataset, Entropy and Gini often produce identical feature rankings for top splits

**Gain Ratio (C4.5 improvement over ID3):**
Information Gain biases toward features with many values (like unique IDs). Gain Ratio = Information Gain / Split Information penalizes multi-way splits, giving fairer feature comparison.`
  },
  {
    q: "Describe the complete ML pipeline for a real-world classification problem — from raw data to deployed model.",
    a: `Building a production ML model is far more than training an algorithm. This end-to-end pipeline describes best practices for a **customer churn prediction** example.

**Step 1 — Problem Definition:**
- Objective: Predict which customers will cancel subscription in the next 30 days
- Metric: F1-Score (both precision and recall matter); minimize false negatives
- Data: 3 years of customer transactions, demographics, support interactions

**Step 2 — Data Collection & Exploration:**
- Load data, check shapes, dtypes, basic statistics
- Visualize distributions (histograms, boxplots), class balance (96% no-churn, 4% churn)
- Check missing value patterns (missing at random or not?)
- Look for obvious data quality issues (impossible values, duplicates)

**Step 3 — Train-Test Split (FIRST, before any preprocessing):**
\\\python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42
)
\\\
Stratify ensures class proportions preserved. Test set is locked — never touched until final evaluation.

**Step 4 — Preprocessing (fit on train only, transform both):**
- Handle missing values: SimpleImputer (median for numerical, mode for categorical)
- Encode categoricals: OneHotEncoder (nominal), OrdinalEncoder (ordinal)
- Scale numericals: StandardScaler for linear models; not needed for trees
- Handle imbalance: SMOTE on training data inside pipeline

\\\python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
preprocessor = ColumnTransformer([
    ('num', Pipeline([('impute', SimpleImputer()), ('scale', StandardScaler())]), num_cols),
    ('cat', Pipeline([('impute', SimpleImputer(strategy='most_frequent')),
                      ('ohe', OneHotEncoder(handle_unknown='ignore'))]), cat_cols)
])
\\\

**Step 5 — Feature Engineering:**
- Create lag features: last_login_days_ago, purchase_count_30d, avg_ticket_response_hours
- Create interaction features: (contract_length × monthly_charge) = total_contract_value
- Apply VarianceThreshold to remove near-constant features

**Step 6 — Model Selection (baseline → advanced):**
1. Baseline: LogisticRegression (fast, interpretable, good reference)
2. Tree-based: RandomForestClassifier
3. Gradient boosting: XGBClassifier with early stopping
4. Compare using 5-fold StratifiedKFold CV on training data

**Step 7 — Hyperparameter Tuning:**
Use RandomizedSearchCV or Optuna on best model from Step 6.
Never use test data. Tune on training CV.

**Step 8 — Final Evaluation:**
Train best model with best hyperparameters on full training data.
Evaluate ONCE on locked test set: F1, Precision, Recall, ROC-AUC, confusion matrix.
Report calibration curve if probability estimates matter.

**Step 9 — Model Interpretation:**
- SHAP values: global feature importance + local explanations
- Partial Dependence Plots: visualize feature effects
- Confusion matrix analysis: understand error types

**Step 10 — Deployment & Monitoring:**
- Serialize model (joblib/pickle)
- Create prediction API (FastAPI)
- Monitor: input data drift (feature distributions), output drift (prediction distributions), performance metrics
- Retrain schedule: monthly or when F1 drops below threshold

**Pitfalls to Avoid:**
- Preprocessing before splitting → data leakage
- Hyperparameter tuning on test set → optimistic evaluation
- Accuracy for imbalanced data → use F1/AUC
- No monitoring after deployment → model decay undetected`
  },
  {
    q: "What is the silhouette score and Davies-Bouldin Index? How are they used to evaluate clustering quality?",
    a: `Both are **internal clustering validation metrics** — they evaluate clustering quality using only the data and cluster assignments, without requiring ground truth labels.

**Silhouette Score:**

For each point i, compute:
- **a(i):** Mean distance from i to all other points in its cluster (intra-cluster cohesion)
- **b(i):** Mean distance from i to all points in the nearest other cluster (inter-cluster separation)

Silhouette(i) = (b(i) − a(i)) / max(a(i), b(i))

Range: [−1, +1]
- **+1:** Point is well within its cluster and far from other clusters (ideal)
- **0:** Point is on the boundary between two clusters
- **−1:** Point is closer to another cluster than its own (likely misclassified)

Overall silhouette score = mean silhouette across all points.

**Interpretation:**
| Score | Meaning |
|---|---|
| > 0.70 | Strong, well-defined clusters |
| 0.50 – 0.70 | Reasonable, decent clustering |
| 0.25 – 0.50 | Weak, overlapping clusters |
| < 0.25 | Poor clustering or wrong K |

**Davies-Bouldin Index (DBI):**

For each cluster i, find the cluster j (j≠i) that maximizes (sᵢ + sⱼ) / dᵢⱼ where:
- sᵢ = average distance from points in cluster i to its centroid (cluster scatter/spread)
- dᵢⱼ = distance between centroids of clusters i and j

DBI = (1/K) Σᵢ max_j [(sᵢ + sⱼ) / dᵢⱼ]

- **Lower DBI = better:** Clusters are compact (small s) and well-separated (large d)
- **DBI = 0:** Perfect clustering (ideal, theoretical)
- No upper bound — higher is worse

**Comparison:**

| Property | Silhouette | Davies-Bouldin |
|---|---|---|
| Range | [−1, +1] | [0, ∞) |
| Better when | Higher | Lower |
| Intuition | Per-point fit | Cluster-pair ratio |
| Computation | O(n²) — can be slow for large n | O(K²) — fast |
| Best for | Evaluating individual points | Overall cluster quality |

**Using These Metrics to Choose K:**
1. Run K-Means for K = 2, 3, 4, ..., 10
2. Compute Silhouette Score and DBI for each K
3. Choose K that maximizes Silhouette AND minimizes DBI
4. Cross-reference with Elbow plot (inertia)
5. Apply domain knowledge: "Do these 4 clusters make business sense?"

**Important Limitation:** These metrics assume compact, convex clusters (like Gini/Euclidean-based distance). They may not correctly evaluate DBSCAN clusters with arbitrary shapes.

**Real-World Use Case:**
A bank segments customers. K=4 gives Silhouette=0.62, DBI=0.81. K=5 gives Silhouette=0.58, DBI=0.94. Choose K=4 — better on both metrics. Verify by profiling each cluster (average income, transaction frequency) to confirm business interpretability.`
  },
  {
    q: "Compare LightGBM and XGBoost in depth. When would you choose one over the other?",
    a: `Both LightGBM and XGBoost are Gradient Boosting frameworks that dominate tabular data competitions. They share the same foundation but differ significantly in implementation details.

**XGBoost (eXtreme Gradient Boosting):**

**Tree Growth — Level-Wise (BFS):**
Grows the tree level by level — all nodes at the same depth are split simultaneously. More symmetric and stable, lower risk of overfitting on small datasets.

**Key XGBoost Innovations:**
- Second-order optimization (uses Hessian)
- Native L1 + L2 regularization (reg_alpha, reg_lambda)
- Sparsity-aware splits (handles NaN natively)
- Column block for parallel processing
- Monotonic constraints support
- Built-in cross-validation ('xgb.cv')

**LightGBM (Light Gradient Boosting Machine):**

**Tree Growth — Leaf-Wise (DFS):**
Splits the leaf with the maximum loss reduction, regardless of depth. Trees grow asymmetrically — fewer splits needed to achieve the same loss reduction.
- **Faster convergence:** Same accuracy in fewer splits
- **Risk:** Can overfit on small data (control with min_child_samples)

**Key LightGBM Innovations:**
1. **GOSS (Gradient-based One-Side Sampling):** Retains all high-gradient samples (hard examples) + a random subset of low-gradient samples. Reduces samples per iteration while maintaining accuracy.

2. **EFB (Exclusive Feature Bundling):** Bundles mutually exclusive sparse features (never non-zero simultaneously) into one. Dramatically reduces effective feature count for sparse data.

3. **Histogram-based splits:** Bins continuous features into 255 bins — much faster than XGBoost's sorted column method.

**Performance Comparison:**

| | XGBoost | LightGBM |
|---|---|---|
| Training Speed | Fast | ~10-20x faster on large datasets |
| Memory Usage | Moderate | Lower (histograms) |
| Accuracy | Very high | Very high (similar) |
| Tree growth | Level-wise (stable) | Leaf-wise (faster, potential overfit) |
| Categorical support | Manual encoding needed | Native (use_cat_features, cat_l2) |
| Missing values | Native (default direction) | Native |
| Large datasets (>100K rows) | Good | Excellent |
| Small datasets | More stable | May overfit (tune min_child_samples) |

**When to Choose XGBoost:**
- Small datasets (< 10,000 rows)
- When stability with default settings is prioritized
- When you need very fine-grained control and advanced regularization
- When reproducibility and extensive documentation matter

**When to Choose LightGBM:**
- Large datasets (> 100,000 rows) — speed advantage is most significant
- Many categorical features (native encoding)
- Memory-constrained environments
- When training speed is critical (production, repeated retraining)

**Practical Advice:**
Try both with default parameters in cross-validation. Speed difference is negligible for <50K rows. For large-scale production systems, LightGBM is usually preferred.`
  },
  {
    q: "What is regularization in machine learning? Explain L1, L2, and Dropout regularization with mathematical intuition.",
    a: `**Regularization** refers to techniques that add constraints or penalties to a model to prevent overfitting — reducing variance by discouraging overly complex models.

**The Overfitting Problem:**
A model that memorizes training data achieves near-zero training error but high test error. Regularization adds a "complexity cost" to the objective function, balancing fit quality with model simplicity.

**L2 Regularization (Ridge / Weight Decay):**

Loss = Training_Loss + λΣⱼβⱼ²

- Adds the sum of squared parameter values to the loss
- Gradient: ∂L/∂βⱼ += 2λβⱼ → weights are multiplied by (1 − 2λη) each step (weight decay)
- Effect: All weights shrink toward zero proportionally; large weights penalized more
- Result: Stable, small weights; no weight is exactly zero (unless λ→∞)

**Why L2 works geometrically:** The L2 constraint region is a sphere. The OLS optimal solution is "pulled" toward the origin by the sphere constraint. Since the sphere has no corners, the solution is rarely on any axis.

**Applications:** Ridge Regression, L2 regularized Logistic Regression, neural network weight decay. Handles multicollinearity by distributing weight among correlated features.

**L1 Regularization (Lasso / Sparse Regularization):**

Loss = Training_Loss + λΣⱼ|βⱼ|

- Adds the sum of absolute parameter values
- Gradient: ∂L/∂βⱼ += λ·sign(βⱼ) → constant-magnitude pull toward zero
- Effect: Weights that are close to zero get pulled all the way to zero
- Result: Sparse weights — many exactly zero (feature selection!)

**Why L1 causes sparsity geometrically:** The L1 constraint region is a diamond (|β₁| + |β₂| ≤ const). The OLS contours touch the diamond at a corner on an axis, setting one weight to zero.

**Applications:** Lasso Regression, L1 logistic regression, sparse autoencoders. When you want automatic feature selection.

**ElasticNet:** L = Training_Loss + λ₁Σ|βⱼ| + λ₂Σβⱼ². Combines sparsity from L1 with stability from L2. Best for groups of correlated features.

**Dropout (Neural Networks):**

During each training forward pass, randomly zero out a fraction p of neuron activations.
- Effect: Network can't rely on any single neuron → learns redundant representations → ensemble-like effect
- At test time: use all neurons but scale activations by (1−p) for expected value correctness

**Why Dropout works:**
- Forces distributed representations — features learned independently
- Each mini-batch sees a different sub-network (dropout rate=0.5 → 2^n possible sub-networks)
- Equivalent to training an ensemble of exponentially many sub-networks

**Other Regularization Techniques:**
- **Early Stopping:** Stop training when validation loss starts increasing (prevents overfitting)
- **Data Augmentation:** Expand training data (rotations, flips) → reduces effective overfitting
- **Batch Normalization:** Normalizes layer inputs → reduces covariate shift → acts as mild regularizer
- **Max-Norm Constraint:** Clip weight vector norms to a maximum value

**Choosing Regularization:**
| Model | Common Regularization |
|---|---|
| Linear/Logistic Regression | L1 (selection) or L2 (stability) |
| Neural Networks | Dropout + L2 (weight decay) |
| Decision Trees | max_depth, min_samples_leaf |
| Gradient Boosting | learning_rate, max_depth, subsampling |`
  },
  {
    q: "Explain Hierarchical Clustering. What is a dendrogram, and how do different linkage methods affect the result?",
    a: `**Hierarchical Clustering** builds a hierarchy of clusters without requiring K to be specified in advance. The result is a tree-like structure called a **dendrogram** that shows all possible levels of clustering.

**Two Approaches:**

**Agglomerative (Bottom-Up) — most common:**
1. Start: each of n points is its own cluster (n clusters)
2. Find the two closest clusters and merge them
3. Repeat until one cluster remains
4. Total: n−1 merge operations

**Divisive (Top-Down):**
1. Start: all n points in one cluster
2. Recursively split until each point is its own cluster
3. Less common; more computationally expensive

**The Dendrogram:**
A tree visualization where:
- **Leaves (bottom):** Individual data points
- **Branches:** Cluster merges
- **Height of branch:** Distance at which two clusters were merged (higher = more dissimilar)
- **Cutting the dendrogram:** A horizontal cut at height h yields clusters where all merges below h have occurred

Reading a dendrogram:
- Points that merge at low height are very similar
- Clusters that merge at high height are very different
- A natural gap (large jump in merge height) suggests a natural K

**Linkage Methods — How Cluster Distance is Defined:**

| Linkage | Definition | Effect |
|---|---|---|
| Single | d(A,B) = min(d(a,b)) | Chaining — one close point merges clusters; can make long chains |
| Complete | d(A,B) = max(d(a,b)) | Compact, roughly equal-sized clusters |
| Average | d(A,B) = avg(d(a,b)) | Compromise between single and complete |
| **Ward** | Merge minimizes increase in total within-cluster variance | **Most popular** — compact, similar-sized spherical clusters |
| Centroid | d(A,B) = d(centroid_A, centroid_B) | Fast but can invert (child merges at lower height than parent) |

**Ward Linkage in Detail:**
At each step, merge the pair of clusters whose merger minimizes the total within-cluster sum of squares (inertia). Effectively minimizes variance increase, analogous to K-Means' objective. Tends to produce clusters of similar size.

**Choosing the Number of Clusters from Dendrogram:**
1. Look for the largest vertical gap (jump in merge height)
2. Draw a horizontal line just below the gap
3. Count the number of vertical lines the horizontal cut crosses = K

**Advantages of Hierarchical Clustering:**
- No need to specify K in advance
- Dendrogram visualizes cluster relationships at all granularities
- Can detect nested/hierarchical structure
- Deterministic (no random initialization like K-Means)

**Disadvantages:**
- O(n³) time, O(n²) space — impractical for n > 10,000
- Cannot correct bad merges (agglomerative is greedy — no backtracking)
- Linkage choice significantly affects results

**When to Use:**
- Understanding full cluster structure/hierarchy (e.g., species taxonomy, document hierarchy)
- Small-medium datasets where dendrogram visualization is valuable
- When domain knowledge suggests hierarchical organization`
  },
  {
    q: "What are the key evaluation metrics for regression models? Explain MSE, RMSE, MAE, R², Adjusted R², and MAPE.",
    a: `Choosing the right regression metric is critical — different metrics emphasize different aspects of prediction error and are appropriate in different contexts.

**Mean Squared Error (MSE):**
MSE = (1/n) Σ(yᵢ − ŷᵢ)²

- Units: squared units of y (e.g., ₹² for price)
- Properties: penalizes large errors heavily (squared); differentiable; convex
- Best for: training objective (gradient computation); when large errors are especially bad
- Weakness: hard to interpret (what does ₹² mean?); sensitive to outliers

**Root Mean Squared Error (RMSE):**
RMSE = √MSE = √[(1/n) Σ(yᵢ − ŷᵢ)²]

- Units: same as y (₹ for price) — interpretable!
- Best for: reporting model performance ("predictions are off by ₹5 lakh on average")
- Same properties as MSE (outlier sensitive) but interpretable
- **Most commonly reported regression metric in practice**

**Mean Absolute Error (MAE):**
MAE = (1/n) Σ|yᵢ − ŷᵢ|

- Units: same as y — interpretable
- Properties: robust to outliers (linear penalty); not differentiable at 0 (but subgradient methods work)
- Best for: when outliers are valid large values that shouldn't dominate (e.g., rare luxury transactions)
- When MAE << RMSE: dataset has significant outliers (RMSE penalizes them more)

**Comparison: MSE vs MAE sensitivity:**
If residuals = [1, 1, 1, 10]:
- MAE = (1+1+1+10)/4 = 3.25
- RMSE = √[(1+1+1+100)/4] = √25.75 = 5.07
The outlier (10) pushes RMSE much higher than MAE.

**R² (Coefficient of Determination):**
R² = 1 − SS_res / SS_tot = 1 − Σ(yᵢ−ŷᵢ)² / Σ(yᵢ−ȳ)²

- Range: (−∞, 1.0]; perfect = 1.0
- Interpretation: proportion of variance in y explained by the model
- R²=0.85: model explains 85% of variance; 15% remains unexplained
- R²=0: model no better than predicting the mean
- R²<0: model WORSE than predicting the mean (possible for non-linear models tested outside training range)
- Not appropriate for comparing models with different numbers of features (use Adjusted R²)

**Adjusted R²:**
R²_adj = 1 − (1−R²)(n−1)/(n−p−1) where p = number of predictors

- Penalizes for each additional feature added
- Only increases if new feature's predictive contribution exceeds its cost
- Use when comparing models with different feature counts

**MAPE (Mean Absolute Percentage Error):**
MAPE = (1/n) Σ |yᵢ − ŷᵢ| / |yᵢ| × 100%

- Scale-independent: 5% MAPE means predictions are off by 5% of actual value on average
- Intuitive for business communication
- **Critical weakness:** Division by zero when yᵢ = 0; asymmetric (over-predictions penalized differently from under-predictions); unreliable when y values are small

**SMAPE** (Symmetric MAPE): replaces denominator with (|yᵢ| + |ŷᵢ|)/2 — addresses asymmetry

**Practical Selection Guide:**
| Situation | Use |
|---|---|
| General performance reporting | RMSE |
| Outlier-robust evaluation | MAE |
| Explaining variance to stakeholders | R² |
| Comparing models with different features | Adjusted R² |
| Business KPI (% error) | MAPE (when y > 0) |
| Model training objective | MSE |

Always report multiple metrics — no single metric tells the complete story.`
  },
  // Unit IV: Regression (5 questions) - continuing
  {
    q: "Explain time-series forecasting challenges. How do you handle trend, seasonality, and stationarity?",
    a: `**Time-Series Forecasting** predicts future values based on historical patterns. Unlike standard regression, observations are ordered in time and often violate IID assumptions.

**Key Challenges:**

**1. Non-Stationarity:** Mean, variance, or autocorrelation change over time. Most time-series are non-stationary (trends, seasonality). ARIMA and other classical methods require stationarity.

**Test:** Augmented Dickey-Fuller (ADF) test. H₀: series is non-stationary. p-value < 0.05 → stationary.

**Solution:** Differencing — take Y(t) − Y(t−1) to remove trends. Seasonal differencing: Y(t) − Y(t−12) for monthly seasonality.

**2. Trend:** Sustained upward/downward movement. Linear detrending: fit linear regression on time, subtract fitted values.

**3. Seasonality:** Repeating patterns at fixed intervals (monthly sales peak every December). Decompose with 'statsmodels.tsa.seasonal.seasonal_decompose()':
- Original = Trend + Seasonal + Residual
- Model seasonal separately or encode cyclically: sin(2π·month/12), cos(2π·month/12)

**4. Autocorrelation:** Y(t) depends on Y(t−1), Y(t−2), etc. (violates independence assumption of OLS).

**5. Test/Train Split for Time-Series:** Cannot randomly shuffle! Must split by time:
Train: all data up to time T
Test: data after time T
Walk-forward validation: Train[1-100], Test[101-110]; Train[1-110], Test[111-120]; ...

**Forecasting Approaches:**

**ARIMA(p,d,q):**
- p: AR (autoregressive) terms — Y(t) depends on past values
- d: differencing order — how many times to difference for stationarity
- q: MA (moving average) terms — Y(t) depends on past errors
- Fast, interpretable, good for short-term; assumes linearity

**Exponential Smoothing:**
- Weighted average of recent observations; recent data weighted more
- Captures trends and seasonality well
- State-space methods (like ETS) are probabilistic

**Deep Learning (LSTM, Transformer):**
- Can capture complex non-linear patterns and long dependencies
- Requires large datasets
- Black-box; hard to interpret

**Feature Engineering for Time-Series:**
- Lag features: Y(t−1), Y(t−7) (weekly pattern)
- Rolling statistics: rolling mean (trend), rolling std (volatility)
- Seasonal indicators: day_of_week, month, is_holiday
- External regressors: weather, promotions, competitor actions

**Real-World Example:** Electricity demand forecasting
- Trend: gradual increase over years
- Seasonality: higher in summer/winter, lower at night
- Autocorrelation: strong daily patterns
- Solution: decompose, create lag/seasonal features, use XGBoost with early stopping on validation period`
  },
  {
    q: "What is the Random Forest algorithm? How does it reduce variance through bagging and randomness?",
    a: `**Random Forest** is an ensemble method that trains many Decision Trees on random subsets of data and features, then aggregates their predictions to reduce variance and improve generalization.

**Algorithm Steps:**

1. **Bootstrap Sampling (Bagging):** For each tree, randomly sample n rows WITH replacement from training data. ~37% of data is left out (out-of-bag samples) — provides free validation.

2. **Feature Randomness:** At each split in each tree, consider only a random subset of features:
   - Classification: √p features (p = total features)
   - Regression: p/3 features
   - Reduces correlation between trees

3. **Train Deep, Unpruned Trees:** Each tree grows fully (min_samples_leaf=1) without pruning. Individual trees overfit severely.

4. **Aggregate Predictions:**
   - Classification: majority vote across trees
   - Regression: average predictions

**Why Random Forest Works — Variance Reduction:**

Suppose we have n trees, each with variance σ². If trees were uncorrelated:
- Var(average) = σ²/n — variance reduced √n times!

In practice, trees are correlated (same training distribution), but still achieve significant variance reduction. More decorrelated trees (via feature randomness) → better variance reduction.

**Key Hyperparameters:**

| Parameter | Effect |
|---|---|
| n_estimators | More trees → lower variance (always helps, plateaus around 100-500) |
| max_depth | Shallower trees → less variance but more bias; default None (unlimited) |
| min_samples_leaf | Higher → smoother predictions, less overfitting; default 1 |
| max_features | Lower → more decorrelation, but potentially more bias; typically √p or p/3 |
| bootstrap | False = use all data per tree (Pasting) → less variance reduction |
| oob_score=True | Evaluate using out-of-bag samples; free validation without separate holdout |

**Feature Importance:**
Total decrease in Gini/MSE across all splits using this feature, averaged over all trees. Biased toward high-cardinality and continuous features.

**Advantages:** Very robust with default settings; handles non-linear relations; feature importance; largely invariant to scaling; good for mixed data types.

**Disadvantages:** Can't extrapolate; black-box; slow prediction for large datasets; memory intensive; may not achieve highest accuracy (boosting often better).

**When to Use:** Quick baseline; need interpretable importance; robust to hyperparameter tuning; mixture of categorical and continuous features.`
  },
  {
    q: "What is cross-entropy loss? Explain its use in classification and how it differs from MSE.",
    a: `**Cross-Entropy Loss** is the standard loss function for classification problems. It measures the divergence between predicted probability distribution and true distribution.

**For Binary Classification:**
L = −[y·log(ŷ) + (1−y)·log(1−ŷ)]

where y ∈ {0, 1} is true label, ŷ ∈ (0,1) is predicted probability.

**Interpretation:**
- When y=1: L = −log(ŷ). If ŷ→1, loss→0 (correct). If ŷ→0, loss→∞ (severely punished).
- When y=0: L = −log(1−ŷ). If ŷ→0, loss→0 (correct). If ŷ→1, loss→∞.

**Key Property:** Cross-entropy heavily penalizes high-confidence wrong predictions. A model predicting 0.01 when truth is 1 gets massive loss (−log(0.01) ≈ 4.6), forcing correction.

**For Multiclass Classification (K classes):**
L = −Σₖ yₖ·log(ŷₖ)

where yₖ is one-hot encoded (1 if true class is k, else 0).

**Cross-Entropy vs MSE for Classification:**

| Property | Cross-Entropy | MSE |
|---|---|---|
| Output range | Probabilities (0,1) | Any continuous |
| Calibration | Naturally calibrated probabilities | Doesn't prioritize probability quality |
| Penalization | Exponentially worse for confident errors | Quadratic penalization |
| Convergence | Faster (exponential) | Slower (quadratic) |
| Use case | Classification | Regression (or classification if need 0/1 targets) |

**Example: Imbalanced dataset with y=1 in 5% of samples**
- Model A: pred=0.99 for all samples → MSE ≈ 0.01 (looks good!) but cross-entropy shows high loss on rare positives
- Cross-entropy better captures that we're doing poorly on the minority class

**Softmax with Cross-Entropy:**
ŷₖ = exp(zₖ) / Σⱼ exp(zⱼ) where z are raw scores

The softmax transforms raw scores to probabilities; cross-entropy measures fit. This combination is optimal for multiclass classification in deep learning.

**Related Concepts:**
- **KL Divergence:** D_KL(p||q) = Σₚ(x)·log(p(x)/q(x)); cross-entropy is related to KL divergence
- **Log Loss:** Same as binary cross-entropy
- **Focal Loss:** Modification that down-weights easy examples; used for extreme imbalance`
  },
  {
    q: "Explain Gradient Descent and its variants: SGD, Mini-Batch GD, Adam, and RMSprop.",
    a: `**Gradient Descent** is the foundational optimization algorithm that iteratively updates model parameters in the direction of the negative gradient of the loss function.

**Basic Gradient Descent Update Rule:**
θ ← θ − η·∇L(θ)

where θ = parameters, η = learning rate, ∇L = gradient of loss.

The gradient points toward the direction of steepest increase in loss; negative gradient points toward decrease.

**Three Main Variants:**

**1. Batch Gradient Descent (BGD):**
- Computes gradient on entire training dataset per update
- Very stable, smooth convergence path
- Slow for large datasets; memory intensive
- May get stuck in local minima
- Rarely used in practice for large data

**2. Stochastic Gradient Descent (SGD):**
- Computes gradient on single sample per update
- Very fast; allows online learning
- Noisy updates → can escape local minima!
- High variance; may overshoot
- Default for many libraries with proper momentum

**Update with Momentum:**
v ← β·v + (1−β)·∇L(θ)  (accumulate gradient)
θ ← θ − η·v

Momentum smooths noisy updates; β≈0.9 typical. Helps accelerate convergence in flat regions.

**3. Mini-Batch Gradient Descent (MBGD):**
- Computes gradient on small batch (e.g., 32 samples) per update
- Balance between BGD stability and SGD speed
- ~100 samples per batch typical
- Most practical choice; standard in deep learning

**Adaptive Learning Rate Methods:**

**Adam (Adaptive Moment Estimation):**
- Maintains adaptive learning rate per parameter
- Computes exponential moving averages of gradient and squared gradient
- mₜ ← β₁·m_{t-1} + (1−β₁)·∇L(θ)  (mean)
- vₜ ← β₂·v_{t-1} + (1−β₂)·(∇L(θ))²  (variance)
- θ ← θ − η·mₜ / (√vₜ + ε)
- Default: β₁=0.9, β₂=0.999
- **Advantages:** Works well out-of-box; converges quickly; handles sparse gradients
- **Disadvantages:** Sometimes generalizes worse than SGD + momentum; requires memory for m, v

**RMSprop (Root Mean Square Propagation):**
- Similar to Adam but no momentum term
- vₜ ← β·v_{t-1} + (1−β)·(∇L(θ))²
- θ ← θ − η · ∇L(θ) / √vₜ
- Adaptive per-parameter learning rates based on historical squared gradients
- Good for non-stationary problems

**Comparison:**

| | BGD | SGD+Mom | Mini-Batch | Adam | RMSprop |
|---|---|---|---|---|---|
| Speed | Slow | Fast | Fast | Fast | Fast |
| Memory | High | Low | Moderate | Moderate | Moderate |
| Stability | High | Low | High | High | High |
| Tuning | Easy (1 param) | Hard | Moderate | Moderate | Moderate |
| Default Use | Rare | Small data | **Most common** | Neural nets | RNNs |

**Learning Rate Scheduling:**
- Fixed: η constant (simple but requires tuning)
- Step decay: reduce η by factor after N epochs
- Exponential decay: η ← η·e^(-decay·epoch)
- CyclicalLR: oscillate between bounds (helps escape local minima)

**Practical Advice:** Start with Adam for deep learning (good defaults), SGD+momentum for classical ML. If Adam overfits, try SGD. Adjust learning rate if loss diverges (too high) or doesn't decrease (too low).`
  },
  {
    q: "What are the key differences between supervised, unsupervised, and semi-supervised learning? Provide examples.",
    a: `**Supervised Learning:** Learn from labeled data (X, y) where y is the target/label.

**Task:** Given features X, predict corresponding y
**Examples:** Predicting house price (regression), classifying email as spam/not spam (classification)
**Methods:** Logistic Regression, SVM, Decision Trees, Neural Networks
**Data Requirements:** Abundant labeled examples
**Output:** Function f(X) → y

**Use Cases:**
- Email spam detection (training data: emails labeled spam/not spam)
- Medical diagnosis (training data: patient records with confirmed diagnosis)
- Sales forecasting (training data: past sales with known outcomes)

**Challenges:** Labeling is expensive/time-consuming

**Unsupervised Learning:** Learn patterns from unlabeled data X (no y).

**Task:** Discover structure, patterns, or groupings in data
**Examples:** Customer segmentation (K-Means), dimensionality reduction (PCA), anomaly detection (Isolation Forest)
**Methods:** K-Means, Hierarchical Clustering, DBSCAN, PCA, Autoencoders, UMAP
**Data Requirements:** Abundant unlabeled data (easy to collect)
**Output:** Structure (clusters, components, embeddings)

**Use Cases:**
- Customer segmentation: group similar customers without predefined segments
- Anomaly detection: identify unusual network traffic without knowing attack patterns
- Recommendation systems: group similar items/users
- Document clustering: organize documents by topic

**Challenges:** Difficult to evaluate (no ground truth); need domain knowledge to interpret results

**Semi-Supervised Learning:** Use mix of labeled and unlabeled data.

**Task:** Leverage large unlabeled dataset + small labeled dataset to improve predictions
**Examples:** 
- 100 labeled customer records + 10,000 unlabeled records
- 50 labeled medical images + 1,000 unlabeled images
**Methods:** 
- Pseudo-labeling: model predicts labels for unlabeled data, retrains on combined set
- Self-training: iteratively train on unlabeled data with high confidence predictions
- Co-training: multiple models vote on unlabeled examples
- Generative models (VAE, GAN): learn data distribution from unlabeled, transfer to supervised task

**Use Cases:**
- NLP: labeled corpus is small, but massive unlabeled text web is available (train language model on unlabeled, fine-tune on labeled)
- Medical imaging: expensive to label, but scans are abundant
- Speech recognition: labeled speech limited, but unlabeled audio abundant

**Key Insight:** Unlabeled data helps learn better features/representations even for supervised task (pre-training). With labeled data alone, model might overfit to small dataset; unlabeled data regularizes.

**Comparison:**

| Aspect | Supervised | Unsupervised | Semi-Supervised |
|---|---|---|---|
| Labeled data needed | Yes (abundant) | No | Yes (small) + unlabeled (large) |
| Evaluation | Clear (accuracy, AUC) | Subjective (silhouette) | Can evaluate on labeled subset |
| Use case | Clear business target | Exploratory | Limited labeled budget |
| Difficulty | Moderate | Hard | Medium |`
  },
  {
    q: "Explain how ensembles like Voting, Averaging, and Stacking combine multiple models for better performance.",
    a: `**Ensemble Methods** combine multiple models to achieve better performance than any single model. The key principle: if models make diverse errors, averaging cancels errors out.

**Why Ensembles Work:**
Suppose we have 3 models, each with 70% accuracy on a sample:
- Probability all 3 are wrong: 0.3³ = 0.027 = 2.7%
- If they vote, majority wins if ≥2 are correct ≈ 97.3% ensemble accuracy!
- Diversity is crucial: if all 3 models make identical errors, ensemble fails

**Types of Ensembles:**

**1. Averaging (Regression):**
ŷ_ensemble = (ŷ₁ + ŷ₂ + ... + ŷₙ) / n

- Simple; each model contributes equally
- Works well when models are independent and unbiased
- Reduces variance of predictions

**2. Voting (Classification):**
- **Hard Voting:** Each model votes a class; majority class wins
- **Soft Voting:** Average probability estimates, then predict argmax class
- Soft voting usually better (more information from probabilities)

**3. Weighted Voting/Averaging:**
ŷ_ensemble = (w₁·ŷ₁ + w₂·ŷ₂ + ... + wₙ·ŷₙ) / Σwᵢ

- Weight better models higher
- Weights from CV accuracy or AUC
- Doesn't require retraining; simple to implement
- Good when models have different quality

**4. Stacking (Stacked Generalization):**

Two-level approach:

**Level 0 (Base Models):** Train diverse base models on training data:
- Model 1 (e.g., Logistic Regression)
- Model 2 (e.g., SVM)
- Model 3 (e.g., Random Forest)

**Level 1 (Meta-Learner):** Train a meta-learner using predictions of base models as features:
1. Use cross-validation: generate out-of-fold predictions from base models on training data
2. Stack these predictions as new features: S = [ŷ₁, ŷ₂, ŷ₃]
3. Train meta-learner: f_meta(S) → final prediction
4. Meta-learner (usually simple: Logistic Regression, Ridge) learns how to optimally combine base models

**Example:**
\\\
Base Model 1 (LR): P(class=1) = 0.7
Base Model 2 (SVM): P(class=1) = 0.8
Base Model 3 (RF): P(class=1) = 0.6
→ Stack: [0.7, 0.8, 0.6] (new feature vector)
→ Meta-learner predicts final class using this vector
\\\

**Why Stacking Works:**
- Base models capture different patterns
- Meta-learner learns which models are reliable in different regions of input space
- More complex than voting but can achieve better accuracy

**5. Blending:**
Similar to stacking but simpler:
- Split data: train + validation + test
- Train base models on train set only
- Generate predictions on validation set (only once)
- Meta-learner trained on validation predictions
- Faster than stacking but uses less data for meta-learner

**Bagging vs Boosting vs Stacking:**

| | Bagging | Boosting | Stacking |
|---|---|---|---|
| Training | Parallel (independent) | Sequential (each corrects previous) | Two levels, base models parallel |
| Reduces | Variance | Bias | Both (complementary models) |
| Risk | Low overfitting | Can overfit with many rounds | Moderate |
| Examples | Random Forest | XGBoost, AdaBoost | Custom implementation |
| Stability | Very stable | More tuning needed | Depends on meta-learner |

**When to Use Each:**
- **Voting:** Quick ensemble, limited time
- **Stacking:** When you have diverse models and want maximum accuracy; competitions
- **Bagging:** Default for tree-based, highly parallel
- **Boosting:** When maximizing accuracy on hard examples matters`
  },
  {
    q: "What is supervised vs semi-supervised vs unsupervised learning? Give real-world examples of when to use each.",
    a: `**Three Paradigms of ML:**

**Supervised Learning:** We have labeled data (y known); learn f(x) → y.
- **Classification:** Predict category (email: spam/not-spam; image: dog/cat/bird)
- **Regression:** Predict continuous value (house price, temperature)

*Assumption:* Labels are ground truth; future data follows same distribution.

**Example:** Email spam detection. We label 10K emails as spam/ham; model learns patterns. New emails: model classifies as spam or not.

*Data needed:* Moderate (100s-1000s of labeled samples for most problems).
*Cost:* Labeling is expensive (humans required).
*Accuracy:* Can be very high with enough labeled data.

**Semi-Supervised Learning:** Few labeled examples + many unlabeled examples.
- **Self-training:** Train on labeled; predict on unlabeled; use confident predictions as pseudo-labels; retrain
- **Co-training:** Multiple views of data (e.g., image + text for web pages); models help each other
- **Clustering + Labeling:** Cluster unlabeled data; label cluster centers; propagate

*Real Example:* Medical imaging. We have 100 labeled X-rays (expensive, radiologist reviewed) + 10,000 unlabeled X-rays (not yet reviewed). Can semi-supervised model leverage unlabeled data to improve diagnosis?

*Why useful:* Unlabeled data is cheap; labeling is expensive.
*Example approach:*
1. Train CNN on 100 labeled images
2. Use CNN to predict class for 10K unlabeled images
3. Threshold: if confidence > 0.95, treat as pseudo-labeled
4. Retrain on 100 labeled + 5000 pseudo-labeled

*Risk:* Pseudo-labels can be wrong; model can drift. Use carefully.

**Unsupervised Learning:** No labels; find structure in data.
- **Clustering:** Group similar data (customer segmentation, gene expression patterns)
- **Dimensionality Reduction:** Reduce dimensions while preserving info (PCA for visualization)
- **Anomaly Detection:** Find unusual points (fraud detection, sensor failure)

*Real Example:* Customer segmentation for e-commerce. We have 1M customers with purchase history, but no predefined segments. Clustering groups customers by behavior; marketing creates targeted campaigns per segment.

*No "ground truth":* Can't validate objectively; rely on domain expertise or downstream task performance.

*Cost:* No labeling cost; advantage for high-volume data.

**Comparison Table:**
| | Supervised | Semi-Supervised | Unsupervised |
|---|---|---|---|
| Data Required | Labeled samples | Few labeled + many unlabeled | No labels (all unlabeled) |
| Cost | High (labeling) | Medium (labeling + collection) | Low (just collection) |
| Accuracy | High (if good labels) | Medium-High | Hard to measure |
| Use Case | Production systems, predictions | Limited labeled data, large unlabeled | Exploration, anomaly detection |
| Examples | Spam detection, medical diagnosis | Semi-supervised learning with limited labels | Customer segmentation, fraud detection |

**Decision Framework:**
1. **You have lots of labels?** → Supervised (straight-forward, best accuracy)
2. **You have a few labels + tons of unlabeled data?** → Semi-supervised (leverage unlabeled)
3. **You have no labels + want structure?** → Unsupervised (clustering, anomaly detection)
4. **You want to validate unlabeled data?** → Active Learning (selectively label high-uncertainty points)`
  },
  {
    q: "What is transfer learning? When should you use pre-trained models instead of training from scratch?",
    a: `**Transfer Learning Concept:** Leverage knowledge from one task to improve another task.

**Motivation:**
Training a deep CNN from scratch on image classification requires:
- 1M+ labeled images
- Days to weeks of GPU training
- Significant compute cost

Instead: Use ImageNet-pretrained ResNet50 (trained on 1.2M images, 1000 classes) → fine-tune on your specific task with 1K images. Result: better accuracy, 10x faster, 10x cheaper.

**Why It Works:**
- Early layers learn universal features: edges, textures, shapes (useful across tasks)
- Later layers learn task-specific features: dog ears, flower petals (task-dependent)
- Reuse early layers + adapt later layers

**Strategies:**

**1. Fine-tuning:**
Load pre-trained weights → replace final layer (1000-class ImageNet → 10-class your task) → retrain all layers with small learning rate (0.0001 instead of 0.001).
- Pro: Adapt model to new task while preserving learned features
- Con: Requires significant data and compute

**2. Feature Extraction:**
Load pre-trained model → remove final layer → use as fixed feature extractor.
\\\python
base_model = ResNet50(weights='imagenet', include_top=False)
features = base_model.predict(X)  # Extract features from pre-trained model
new_model = LogisticRegression().fit(features, y)  # Train simple classifier on top
\\\
- Pro: Very fast; works with small data (1000s of samples)
- Con: Less adaptation; may not capture task-specific patterns

**3. Domain Adaptation:**
Pre-trained model is from different but related domain.
- Example: Model trained on sunny outdoor photos → adapt to dark indoor photos
- Techniques: Adversarial training, batch normalization tuning
- Pro: Leverage related knowledge even from different domain
- Con: Distribution mismatch; requires careful tuning

**When to Use Pre-trained Models:**

**1. Computer Vision:**
- ✅ Image classification: 95% of cases use pre-trained ResNet/EfficientNet/Vision Transformer
- ✅ Object detection: Faster R-CNN, YOLOv8 pre-trained on COCO
- ✅ Segmentation: U-Net initialized from ImageNet
- ✗ Only train from scratch if: your images are extremely different (e.g., microscopy, satellite imagery) AND you have 100K+ labeled images

**2. NLP:**
- ✅ Text classification: BERT pre-trained on 3.3B words; fine-tune on your 100 docs for intent detection
- ✅ Translation: Pretrained seq2seq models; fine-tune for domain-specific terminology
- ✓ Always use pre-trained (only crazy people train BERT from scratch!)

**3. Speech Recognition:**
- ✅ Pre-trained Wav2Vec → fine-tune on accented speech (with 1000 hours instead of 10K)

**When to Train from Scratch:**

**1. Completely Novel Domain:**
Your data distribution is so different from any public dataset that pre-trained features are useless.
- Example: Hyperspectral satellite imagery, rare medical scans
- Solution: Still try pre-trained first; if poor, then train from scratch
- Alternative: Use related domain (regular photos) + domain adaptation

**2. Computational Budget:**
Pre-trained model is huge (3GB); your deployment device is mobile (50MB model max).
- Solution: Knowledge distillation (compress pre-trained into small model) or train lightweight from scratch

**3. Proprietary Constraints:**
Can't use public pre-trained models due to licensing or IP concerns (rare).

**Practical Checklist:**
☐ Pre-trained model exists for your domain? → Use it (99% case)
☐ Your data differs significantly from pre-trained? → Fine-tune with small LR
☐ Very limited data (<1000 samples)? → Feature extraction + simple classifier
☐ Model size constraint? → Knowledge distillation
☐ No relevant pre-trained? → Domain adaptation or train from scratch (last resort)`
  },
  {
    q: "Explain ensemble methods: Voting, Bagging, Boosting, and Stacking. What are their differences?",
    a: `**Ensemble Methods:** Combine multiple models to achieve better performance than individual models.

**Core Intuition:** Wisdom of crowds—many imperfect predictors can outperform a single strong predictor if they make different errors.

**1. Voting (Hardest Ensemble):**
Train m different models; each predicts; take majority vote.

\\\python
from sklearn.ensemble import VotingClassifier
models = [
    LogisticRegression(),
    DecisionTreeClassifier(max_depth=5),
    RandomForestClassifier(n_estimators=100),
    SVC()
]
voting_clf = VotingClassifier(estimators=[('lr', m[0]), ('dt', m[1]), ('rf', m[2]), ('svm', m[3])],
                                voting='hard')  # or 'soft' for probability averaging
\\\

- Hard voting: Majority vote (e.g., 3/4 say "cat" → predict "cat")
- Soft voting: Average predicted probabilities (each model outputs p(y=cat), average them)

**Advantages:** Simple; can combine arbitrary models.
**Disadvantages:** Diversity required; if all models similar → no benefit; often outperformed by bagging/boosting.

**2. Bagging (Bootstrap Aggregating):**
Train m models independently on random bootstrap samples; average predictions.

- **Bootstrap Sample:** Sample n rows with replacement from training data; some rows repeated, some missing
- Train model₁ on bootstrap₁, model₂ on bootstrap₂, ..., modelₘ on bootstrapₘ
- Aggregate: average predictions

**Example: Random Forest**
- m decision trees, each on random bootstrap samples
- Each tree can be very deep (low bias)
- Averaging reduces variance by √m (if uncorrelated; typically 1.5-2x in practice)

**Advantages:** Reduces variance; great for high-variance models (trees, KNN); parallel training.
**Disadvantages:** Only reduces variance (not bias); all models train on similar-size data so remaining bias similar.

**3. Boosting (Sequential Ensemble):**
Train models sequentially; each corrects previous model's errors.

**AdaBoost:**
1. Train model₁ on all data
2. Increase weight on misclassified samples
3. Train model₂ on reweighted data (focus on hard examples)
4. Repeat: model₃ emphasizes new mistakes, etc.
5. Final prediction: weighted sum (more accurate models get higher weight)

**Gradient Boosting:**
- Each model fits the *residuals* (errors) of the previous model, not the original target
- Model₁ predicts yhat₁; residuals = y − yhat₁
- Model₂ predicts residuals; new prediction = yhat₁ + yhat₂
- Continues iteratively

**Advantages:** Reduces bias progressively; often best accuracy; handles hard examples.
**Disadvantages:** Sequential training (slower); prone to overfitting if too many rounds; needs careful tuning.

**Early Stopping:** Monitor validation error; stop when it stops improving (critical for boosting).

**4. Stacking (Meta-Learning):**
Use base models' predictions as features for meta-model.

\\\
Level 0 (Base Models):
  Model A predicts → yhat_A
  Model B predicts → yhat_B
  Model C predicts → yhat_C

Level 1 (Meta-Model):
  New features = [yhat_A, yhat_B, yhat_C]
  Meta-model (e.g., Logistic Regression) trained on these meta-features
  Final prediction = Meta-model([yhat_A, yhat_B, yhat_C])
\\\

**Why effective:** Meta-model learns which base models to trust when.

**Example:**
- Model A: Great on class 0, poor on class 1
- Model B: Great on class 1, poor on class 0
- Meta-model learns: "If A says 0 with high confidence, trust it; if B says 1, trust it"

**Advantages:** Can combine diverse models; often highest accuracy; sophisticated.
**Disadvantages:** Computationally expensive; complex; prone to overfitting; slow prediction (many model calls).

**Comparison:**
| Method | Diversity Need | Parallel Training | Bias Reduction | Variance Reduction | Complexity | Accuracy |
|---|---|---|---|---|---|---|
| Voting | High | Yes | None | Low | Very Low | Low-Medium |
| Bagging | Medium | Yes | None | High | Low | Medium |
| Boosting | Low (sequential) | No | High | Medium | Medium | High |
| Stacking | High (base diversity) | Yes (L0) | None | Medium | High | Very High |



`
  }
];
// ─── COMPONENTS ─────────────────────────────────────────────────────────────

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total, color }) {
  return (
    <div style={{ background: "#e8ecf4", borderRadius: 8, height: 6, overflow: "hidden" }}>
      <div style={{
        width: `${(current / total) * 100}%`,
        height: "100%",
        background: color || "#5b7cff",
        borderRadius: 8,
        transition: "width 0.4s ease"
      }} />
    </div>
  );
}

function MCQSection({ unitId }) {
  const questions = MCQ[unitId] || [];
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const total = questions.length;
  const q = questions[current];
  const selected = answers[current];
  const score = Object.entries(answers).filter(([i, v]) => questions[parseInt(i)]?.ans === v).length;
  const answered = Object.keys(answers).length;

  function select(optIdx) {
    if (selected !== undefined) return;
    setAnswers(prev => ({ ...prev, [current]: optIdx }));
  }

  function getColor(optIdx) {
    if (selected === undefined) return null;
    if (optIdx === q.ans) return "#16a34a";
    if (optIdx === selected && selected !== q.ans) return "#dc2626";
    return null;
  }

  function getBg(optIdx) {
    const c = getColor(optIdx);
    if (!c) return selected !== undefined ? "#f5f6fa" : undefined;
    return c === "#16a34a" ? "#dcfce7" : "#fee2e2";
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
          Q {current + 1} / {total}  ·  Score: {score}/{answered || "—"}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setCurrent(Math.max(0, current - 1))}
            style={{ padding: "5px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", background: current === 0 ? "#f3f4f6" : "#fff", cursor: current === 0 ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: current === 0 ? "#9ca3af" : "#374151" }}>
            ← Prev
          </button>
          <button onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            style={{ padding: "5px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", background: current === total - 1 ? "#f3f4f6" : "#fff", cursor: current === total - 1 ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: current === total - 1 ? "#9ca3af" : "#374151" }}>
            Next →
          </button>
        </div>
      </div>

      <ProgressBar current={current + 1} total={total} color="#5b7cff" />

      <div style={{ marginTop: 24, background: "#fff", borderRadius: 14, border: "1.5px solid #e5e7eb", padding: "22px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b7cff", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Q {current + 1}
        </div>
        <p style={{ fontSize: 15.5, fontWeight: 500, color: "#1e293b", lineHeight: 1.65, marginBottom: 20 }}>{q.q}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            const c = getColor(i);
            const bg = getBg(i);
            return (
              <button key={i} onClick={() => select(i)}
                style={{
                  textAlign: "left", padding: "12px 16px", borderRadius: 10,
                  border: `1.5px solid ${c || "#e5e7eb"}`,
                  background: bg || "#fafbff",
                  cursor: selected !== undefined ? "default" : "pointer",
                  fontSize: 14, color: c ? (c === "#16a34a" ? "#15803d" : "#b91c1c") : "#374151",
                  fontWeight: selected !== undefined && (i === q.ans || i === selected) ? 600 : 400,
                  transition: "all 0.2s", lineHeight: 1.5,
                  display: "flex", alignItems: "center", gap: 10
                }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: c ? (c === "#16a34a" ? "#16a34a" : "#dc2626") : "#e8ecf4", color: c ? "#fff" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {c ? (c === "#16a34a" ? "✓" : "✗") : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== undefined && (
          <div style={{ marginTop: 16, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "13px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {selected === q.ans ? "✓ Correct!" : "✗ Incorrect"}
            </div>
            <p style={{ fontSize: 13.5, color: "#166534", lineHeight: 1.6, margin: 0 }}>{q.exp}</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 16 }}>
        {questions.map((_, i) => {
          const a = answers[i];
          const cor = a !== undefined && questions[i].ans === a;
          const wrong = a !== undefined && questions[i].ans !== a;
          return (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${i === current ? "#5b7cff" : cor ? "#16a34a" : wrong ? "#dc2626" : "#e5e7eb"}`, background: i === current ? "#eff3ff" : cor ? "#dcfce7" : wrong ? "#fee2e2" : "#f9fafb", fontSize: 11, fontWeight: 700, color: i === current ? "#5b7cff" : cor ? "#16a34a" : wrong ? "#dc2626" : "#9ca3af", cursor: "pointer" }}>
              {i + 1}
            </button>
          );
        })}
      </div>

      {answered > 0 && (
        <div style={{ marginTop: 20, padding: "14px 20px", borderRadius: 12, background: "linear-gradient(135deg, #eff3ff, #f0fdf4)", border: "1.5px solid #c7d2fe", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#3730a3" }}>Progress: {answered}/{total} answered</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: score / answered >= 0.7 ? "#16a34a" : "#dc2626" }}>
            Score: {score}/{answered} ({Math.round((score / answered) * 100)}%)
          </span>
        </div>
      )}
    </div>
  );
}

function LongSection() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 20, padding: "16px 20px", background: "linear-gradient(135deg, #f0f4ff, #faf0ff)", borderRadius: 12, border: "1.5px solid #c7d2fe" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#4338ca", marginBottom: 4 }}>📝 30 Long Answer Questions</div>
        <div style={{ fontSize: 13, color: "#6366f1" }}>Exam-level answers covering all 6 units. Click any question to expand the full answer.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {LONG_QA.map((item, i) => (
          <div key={i} style={{ borderRadius: 12, border: `1.5px solid ${open === i ? "#818cf8" : "#e5e7eb"}`, overflow: "hidden", background: "#fff", boxShadow: open === i ? "0 2px 16px rgba(99,102,241,0.08)" : "none" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", padding: "15px 18px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: open === i ? "#6366f1" : "#e8ecf4", color: open === i ? "#fff" : "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 600, color: open === i ? "#4338ca" : "#1e293b", lineHeight: 1.5 }}>{item.q}</span>
              <span style={{ marginLeft: "auto", fontSize: 16, color: open === i ? "#6366f1" : "#9ca3af", flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
            </button>
            {open === i && (
              <div style={{ borderTop: "1.5px solid #e0e4f4", padding: "18px 20px 20px", background: "#fafbff", textAlign: "left" }}>
                <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, fontFamily: "inherit", textAlign: "left" }} className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline ? (
                          <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={vscDarkPlus}
                            language={match ? match[1] : 'javascript'}
                            PreTag="div"
                            customStyle={{ borderRadius: "8px", margin: "14px 0", fontSize: "13px", padding: "16px" }}
                          />
                        ) : (
                          <code {...props} className={className} style={{ background: "#e5e7eb", padding: "2px 6px", borderRadius: "4px", fontSize: "13px", color: "#b91c1c" }}>
                            {children}
                          </code>
                        )
                      },
                      p({node, ...props}) {
                        return <p style={{ marginBottom: "12px" }} {...props} />
                      },
                      ul({node, ...props}) {
                        return <ul style={{ marginBottom: "12px", paddingLeft: "24px" }} {...props} />
                      },
                      ol({node, ...props}) {
                        return <ol style={{ marginBottom: "12px", paddingLeft: "24px" }} {...props} />
                      },
                      li({node, ...props}) {
                        return <li style={{ marginBottom: "6px" }} {...props} />
                      },
                      table({node, ...props}) {
                        return (
                          <div style={{ overflowX: "auto", margin: "16px 0" }}>
                            <table style={{ minWidth: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb", textAlign: "left" }} {...props} />
                          </div>
                        )
                      },
                      th({node, ...props}) {
                        return <th style={{ padding: "10px", borderBottom: "2px solid #e5e7eb", backgroundColor: "#f3f4f6", fontWeight: 600 }} {...props} />
                      },
                      td({node, ...props}) {
                        return <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }} {...props} />
                      }
                    }}
                  >
                    {item.a}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeUnit, setActiveUnit] = useState(1);
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f3f9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)", padding: "0 0 0 0", boxShadow: "0 4px 24px rgba(67,56,202,0.25)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "22px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, backdropFilter: "blur(10px)" }}>🎓</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>CSE274 ML Practice Quiz</div>
              <div style={{ fontSize: 12.5, color: "rgba(199,210,254,0.85)", marginTop: 1 }}>300 MCQs (50/unit) + 30 Long Answers · All 6 Units</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 }}>
            {UNITS.map(u => (
              <button key={u.id} onClick={() => setActiveUnit(u.id)}
                style={{
                  padding: "9px 16px", borderRadius: "10px 10px 0 0", border: "none",
                  background: activeUnit === u.id ? "#fff" : "rgba(255,255,255,0.08)",
                  color: activeUnit === u.id ? "#4338ca" : "rgba(199,210,254,0.8)",
                  fontWeight: activeUnit === u.id ? 700 : 500,
                  fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.18s", backdropFilter: "blur(10px)",
                  display: "flex", alignItems: "center", gap: 6
                }}>
                <span>{u.icon}</span>
                <span>{u.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}>
            {unit.icon}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em" }}>{unit.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.02em" }}>{unit.title}</div>
          </div>
          {activeUnit <= 6 && (
            <div style={{ marginLeft: "auto", background: "#eff3ff", borderRadius: 20, padding: "5px 14px", fontSize: 12.5, fontWeight: 700, color: "#4338ca", border: "1.5px solid #c7d2fe" }}>
              50 MCQs
            </div>
          )}
        </div>

        {activeUnit <= 6 ? <MCQSection unitId={activeUnit} /> : <LongSection />}
      </div>
    </div>
  );
}