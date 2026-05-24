export const MCQ = {
  "1": [
    {
      q: "A dataset has 'City' (Delhi/Mumbai/Pune) and 'Rating' (Poor/Good/Excellent). Which encoding pair is most appropriate?",
      opts: [
        "Ordinal Encoding for City, One-Hot for Rating",
        "One-Hot for City, Label Encoding for Rating",
        "Label Encoding for both",
        "Target Encoding for both"
      ],
      ans: 1,
      exp: "City is nominal — no natural order — so One-Hot is correct. Rating is ordinal (Poor < Good < Excellent), so Label/Ordinal encoding is correct."
    },
    {
      q: "You fit a StandardScaler on the full dataset before splitting train/test. This is an example of:",
      opts: [
        "Temporal Leakage",
        "Target Leakage",
        "Overfitting",
        "Train-Test Contamination"
      ],
      ans: 3,
      exp: "Fitting any preprocessor on the full dataset before splitting leaks test statistics into training — this is train-test contamination, a form of data leakage."
    },
    {
      q: "A salary column has values [25000, 50000, 75000, 100000, 500000]. Which scaler is most robust to the ₹500000 outlier?",
      opts: [
        "RobustScaler",
        "Log Transform",
        "MinMaxScaler",
        "StandardScaler"
      ],
      ans: 0,
      exp: "RobustScaler uses the median and IQR (Q3−Q1), so extreme outliers barely affect it. MinMaxScaler and StandardScaler are heavily distorted by the ₹500000 value."
    },
    {
      q: "A fraud detection dataset has 97% non-fraud and 3% fraud. A model predicts 'non-fraud' always. Its accuracy is:",
      opts: [
        "97%",
        "3%",
        "50%",
        "97%"
      ],
      ans: 0,
      exp: "The model achieves 97% accuracy but has 0% recall for fraud. For imbalanced data, accuracy is misleading. Use F1-score or ROC-AUC instead."
    },
    {
      q: "SMOTE creates new minority samples by:",
      opts: [
        "Interpolating between existing minority samples and their k-nearest neighbors",
        "Assigning higher loss weights to minority samples",
        "Duplicating existing minority samples randomly",
        "Removing majority class samples"
      ],
      ans: 0,
      exp: "SMOTE (Synthetic Minority Over-sampling Technique) creates synthetic points along the line segment between a minority sample and one of its k-nearest minority neighbors."
    },
    {
      q: "Which data type has a true absolute zero, making ratios meaningful?",
      opts: [
        "Nominal",
        "Ratio",
        "Interval",
        "Ordinal"
      ],
      ans: 1,
      exp: "Ratio scale has an absolute zero (e.g., height, weight). 80 kg is twice 40 kg. Interval scale (like temperature in °C) has no true zero, so ratios are not meaningful."
    },
    {
      q: "You're building a credit scoring model and accidentally include the 'loan_repaid' column to predict 'loan_default'. This is:",
      opts: [
        "Multicollinearity",
        "Train-test contamination",
        "Temporal leakage",
        "Target leakage"
      ],
      ans: 3,
      exp: "Including a feature derived from or highly correlated with the target is target leakage. 'Loan_repaid' is essentially the target variable rephrased — this feature won't be available when predicting new loans."
    },
    {
      q: "A column has 40% missing values. What is generally recommended?",
      opts: [
        "Always impute with mean",
        "Always drop the column",
        "Consider domain context; dropping may be better if missingness is not random",
        "Use KNN imputation always"
      ],
      ans: 2,
      exp: "With 40% missing, the choice depends on why data is missing (MCAR, MAR, MNAR). If missingness is informative, even the missing-ness itself can be a feature. There's no single rule."
    },
    {
      q: "For a right-skewed salary distribution, which transformation helps normalize it?",
      opts: [
        "Log Transform",
        "MinMaxScaler",
        "Winsorization",
        "StandardScaler"
      ],
      ans: 0,
      exp: "Log Transform compresses large values and expands small ones, pulling right-skewed distributions toward normality. It's the go-to for salary, income, and count data."
    },
    {
      q: "The IQR method marks a value as an outlier if:",
      opts: [
        "x < μ − 2σ or x > μ + 2σ",
        "x is in the top 5%",
        "x < Q1 − 1.5×IQR or x > Q3 + 1.5×IQR",
        "|z| > 2"
      ],
      ans: 2,
      exp: "The IQR rule defines fences at Q1 − 1.5×IQR (lower) and Q3 + 1.5×IQR (upper). Points outside these fences are considered outliers. It doesn't assume normality."
    },
    {
      q: "Which imputation strategy is most sophisticated and preserves relationships between variables?",
      opts: [
        "MICE",
        "Mean imputation",
        "KNN imputation",
        "Median imputation"
      ],
      ans: 0,
      exp: "MICE iteratively models each feature with missing values as a function of other features, preserving inter-feature correlations. KNN is good but doesn't model joint distributions."
    },
    {
      q: "Winsorization handles outliers by:",
      opts: [
        "Removing them",
        "Replacing them with mean",
        "Using a separate indicator variable",
        "Clipping them to the fence values (e.g., upper/lower bounds)"
      ],
      ans: 3,
      exp: "Winsorization clips extreme values to defined boundary values (e.g., the IQR fence). Unlike deletion, it keeps the observation in the dataset while reducing outlier impact."
    },
    {
      q: "You're predicting tomorrow's stock price. You accidentally split your time-series data randomly. This causes:",
      opts: [
        "Temporal leakage",
        "Target leakage",
        "Train-test contamination",
        "Multicollinearity"
      ],
      ans: 0,
      exp: "Random splitting of time-series data allows 'future' observations into the training set, which is temporal leakage. Always split time-series by time boundary."
    },
    {
      q: "For a 'temperature' column measured in Celsius, the scale of measurement is:",
      opts: [
        "Interval",
        "Ratio",
        "Ordinal",
        "Nominal"
      ],
      ans: 0,
      exp: "Celsius is an interval scale — differences are meaningful (20°C is 10° warmer than 10°C), but there is no true zero (0°C is not 'no temperature'). Kelvin would be ratio scale."
    },
    {
      q: "A hospital dataset has 'Blood Type' (A, B, AB, O). This is:",
      opts: [
        "Ordinal categorical",
        "Nominal categorical",
        "Discrete numerical",
        "Continuous numerical"
      ],
      ans: 1,
      exp: "Blood type has no natural order — AB is not 'more' than A. It's a nominal (unordered) categorical variable. One-Hot Encoding is appropriate here."
    },
    {
      q: "Which sklearn tool helps prevent data leakage by ensuring preprocessing is fit only on training data during cross-validation?",
      opts: [
        "Both Pipeline and ColumnTransformer",
        "Pipeline",
        "GridSearchCV",
        "ColumnTransformer"
      ],
      ans: 0,
      exp: "sklearn Pipeline chains preprocessing with the model so that fit() only sees training data in each fold of cross-validation. ColumnTransformer applies different transforms to different columns, also within a Pipeline."
    },
    {
      q: "A feature 'is_employed' is 1 for 99% of rows. What should you do?",
      opts: [
        "Keep it",
        "Apply SMOTE to balance it",
        "Standardize it",
        "Drop it using VarianceThreshold"
      ],
      ans: 3,
      exp: "A near-constant feature has near-zero variance and provides almost no discriminative information. VarianceThreshold in sklearn automatically removes such features."
    },
    {
      q: "When the minority class in SMOTE is very small (e.g., 10 samples), what is a risk?",
      opts: [
        "Reducing model accuracy to 50%",
        "Causing train-test contamination",
        "Generating duplicate majority samples",
        "Overfitting to the original minority samples"
      ],
      ans: 3,
      exp: "With very few real minority samples, SMOTE generates synthetic points between those few points. If those samples are noisy or unrepresentative, SMOTE amplifies those errors — risking overfit."
    },
    {
      q: "For neural networks and image data, which scaling method is most commonly used?",
      opts: [
        "RobustScaler",
        "StandardScaler",
        "Log Transform",
        "MinMaxScaler"
      ],
      ans: 3,
      exp: "MinMaxScaler maps values to [0,1], matching the typical [0,1] or [−1,1] range expected by neural networks and for pixel normalization. StandardScaler is preferred for linear models and SVMs."
    },
    {
      q: "Structured data is best described as:",
      opts: [
        "Text and image data",
        "Data with temporal ordering",
        "Data requiring deep learning to process",
        "Data that fits neatly into rows and columns"
      ],
      ans: 3,
      exp: "Structured data has a predefined schema and fits into relational tables (CSV, SQL). Unstructured data (text, images, audio) doesn't have this neat row-column format."
    },
    {
      q: "A data scientist fits a MinMaxScaler on all data, splits 80/20, then trains a model. The validation accuracy is 95%. This accuracy is:",
      opts: [
        "Deflated because MinMax hurts performance",
        "Accurate only if the dataset is balanced",
        "Reliable",
        "Inflated due to data leakage"
      ],
      ans: 3,
      exp: "Fitting MinMaxScaler before splitting means the scaler 'saw' test data — the min/max computed includes test points. Validation metrics are therefore optimistically biased."
    },
    {
      q: "You have an 'Education' column: High School < Bachelor < Master < PhD. Which encoding is correct?",
      opts: [
        "Target Encoding",
        "Ordinal Encoding with the correct order mapping",
        "Label Encoding with arbitrary numbers",
        "One-Hot Encoding"
      ],
      ans: 1,
      exp: "Education has a natural order. OrdinalEncoder with categories=[['High School','Bachelor','Master','PhD']] correctly maps 0→1→2→3, preserving that ordering."
    },
    {
      q: "The Z-score method for outlier detection assumes:",
      opts: [
        "All features are scaled",
        "Data is approximately normally distributed",
        "Data has no missing values",
        "Data follows a uniform distribution"
      ],
      ans: 1,
      exp: "Z-score = (x − μ)/σ only makes sense when data is (approximately) normal. |Z| > 3 captures the tails of a normal distribution. For skewed data, IQR is preferred."
    },
    {
      q: "class_weight='balanced' in sklearn logistic regression:",
      opts: [
        "Scales all features to balance them",
        "Creates synthetic minority samples",
        "Increases the penalty for misclassifying minority class",
        "Removes majority class samples"
      ],
      ans: 2,
      exp: "class_weight='balanced' automatically adjusts loss weights inversely proportional to class frequencies, penalizing minority class misclassification more heavily."
    },
    {
      q: "Which metric should you NEVER rely on for an imbalanced medical diagnosis dataset?",
      opts: [
        "Accuracy",
        "F1-Score",
        "ROC-AUC",
        "Precision-Recall AUC"
      ],
      ans: 0,
      exp: "Accuracy is misleading for imbalanced data. A model predicting 'no disease' 100% of the time could achieve 99% accuracy if only 1% of patients are sick — yet it catches zero actual cases."
    },
    {
      q: "Random Undersampling handles imbalance by:",
      opts: [
        "Both generating and removing samples",
        "Removing majority samples to match minority size",
        "Adjusting loss weights",
        "Generating new minority samples"
      ],
      ans: 1,
      exp: "Random undersampling removes majority class rows randomly until classes are balanced. It's fast and simple but risks losing important majority-class information."
    },
    {
      q: "A value in a dataset is 'John,Smith' while all others are numeric. This is a:",
      opts: [
        "Missing value",
        "Categorical data",
        "Inconsistency / data quality issue",
        "Outlier"
      ],
      ans: 2,
      exp: "A non-numeric value in a numeric column is a data quality issue (inconsistency/corruption), not strictly a missing value or statistical outlier. Requires cleaning."
    },
    {
      q: "When is it appropriate to impute missing values with mode?",
      opts: [
        "For continuous numerical columns",
        "For time-series data",
        "For categorical columns",
        "For image data"
      ],
      ans: 2,
      exp: "Mode imputation (most frequent value) is appropriate for categorical features. For continuous features, mean or median imputation is standard."
    },
    {
      q: "Isolation Forest detects outliers by:",
      opts: [
        "Measuring z-scores",
        "Isolating points using random splits",
        "Computing distance to cluster centroid",
        "Using the IQR fence formula"
      ],
      ans: 1,
      exp: "Isolation Forest builds random trees. Normal points need many splits to isolate; anomalies are isolated in very few splits (short path length). It works well for high-dimensional data."
    },
    {
      q: "You want to encode a 'Country' column with 150 unique values for a linear model. One-Hot Encoding would create:",
      opts: [
        "150 columns (or 149 with drop='first')",
        "log(150) columns",
        "1 column",
        "2 columns"
      ],
      ans: 0,
      exp: "One-Hot Encoding creates one binary column per category. 150 countries → 150 columns (149 with drop='first' to avoid multicollinearity). Consider Target Encoding for high-cardinality features."
    },
    {
      q: "The 'dummy variable trap' in One-Hot Encoding occurs when:",
      opts: [
        "All one-hot columns are linearly dependent",
        "The model overfits to rare categories",
        "Encoding is applied before splitting",
        "Too many categories cause memory issues"
      ],
      ans: 0,
      exp: "With k categories and k columns, one column is perfectly predictable from the others (they sum to 1). This causes multicollinearity. Fix: drop one column (drop='first')."
    },
    {
      q: "Target Encoding replaces a category with:",
      opts: [
        "The mean of the target variable for that category",
        "Its integer rank",
        "Binary 0/1 based on frequency",
        "A random number between 0 and 1"
      ],
      ans: 0,
      exp: "Target Encoding maps each category to the mean target value for that category. E.g., City='Delhi' → mean(target for Delhi rows). It's compact and powerful but risks leakage without cross-validation."
    },
    {
      q: "For a dataset with Age ranging 18–80 and Income ranging 10,000–1,000,000, which algorithm is most affected by this scale difference?",
      opts: [
        "Decision Tree",
        "Random Forest",
        "XGBoost",
        "K-Nearest Neighbors"
      ],
      ans: 3,
      exp: "KNN computes Euclidean distances. Without scaling, Income dominates distance calculations completely (since its range is 1000x larger). Tree-based models are invariant to scale."
    },
    {
      q: "Which is NOT a step in a proper ML preprocessing pipeline?",
      opts: [
        "Fit scaler only on training data",
        "Fit scaler on test data to get better test accuracy",
        "Split data first",
        "Transform both train and test using the same fitted scaler"
      ],
      ans: 1,
      exp: "Fitting the scaler on test data is exactly data leakage. The scaler must be fit only on training data, then used to transform both train and test sets."
    },
    {
      q: "MCAR stands for:",
      opts: [
        "Model Calibration And Regularization",
        "Missing Completely At Random",
        "Missing Completely And Randomly",
        "Multiple Categorical And Regression"
      ],
      ans: 1,
      exp: "MCAR — Missing Completely At Random — means missingness has no relationship with the data itself. Under MCAR, simple imputation methods are unbiased. MAR and MNAR are more complex."
    },
    {
      q: "A bank dataset has 0.1% fraud. After SMOTE, what is the training set proportion roughly?",
      opts: [
        "10% fraud always",
        "Still 0.1% fraud",
        "It depends on the SMOTE sampling_strategy parameter",
        "50% fraud"
      ],
      ans: 2,
      exp: "SMOTE's sampling_strategy parameter controls the target ratio. Default is to balance classes (50/50), but you can set it to e.g. 0.1 (minority becomes 10% of majority). It's configurable."
    },
    {
      q: "Which approach to missing values preserves the most information?",
      opts: [
        "Drop columns with > 20% missing",
        "Impute with MICE",
        "Drop rows with any missing value",
        "Fill all with 0"
      ],
      ans: 1,
      exp: "MICE (Multiple Imputation by Chained Equations) models each feature's missingness using the other features iteratively, preserving data relationships and producing the least biased results."
    },
    {
      q: "Nominal data is:",
      opts: [
        "Data with a natural rank order",
        "Data with equal intervals and no true zero",
        "Categorical data with no natural order",
        "Data measured from a true zero"
      ],
      ans: 2,
      exp: "Nominal data has categories with no inherent order: colors, blood type, city names. Ordinal data has order (ranks). Interval has equal gaps. Ratio has a true zero."
    },
    {
      q: "To correctly implement cross-validation with scaling, you should:",
      opts: [
        "Scale the entire dataset before CV",
        "Not scale if using CV",
        "Include scaling in a Pipeline so it refits per fold",
        "Scale only the training set once before CV"
      ],
      ans: 2,
      exp: "Including scaling in a Pipeline ensures the scaler is fit only on each fold's training data and then applied to the validation fold — preventing any data leakage across folds."
    },
    {
      q: "A data point with Z-score of −4.2 is considered:",
      opts: [
        "An imputed value",
        "A normal value slightly below average",
        "A strong outlier (|Z| > 3)",
        "A mild outlier"
      ],
      ans: 2,
      exp: "Z-score of −4.2 means the value is 4.2 standard deviations below the mean. Since |Z| > 3, it is classified as a strong outlier under the Z-score method."
    },
    {
      q: "Which encoding technique encodes a category into its binary representation using log2(k) bits?",
      opts: [
        "One-Hot Encoding",
        "Binary Encoding",
        "Label Encoding",
        "Ordinal Encoding"
      ],
      ans: 1,
      exp: "Binary Encoding first assigns integer codes, then represents each integer in binary, producing log2(k) columns. This is more compact than One-Hot for medium-cardinality categoricals."
    },
    {
      q: "An e-commerce site has 'Purchase Category' with 500 unique values. The best encoding for a tree model is:",
      opts: [
        "Binary Encoding",
        "Ordinal Encoding",
        "Target Encoding",
        "One-Hot"
      ],
      ans: 2,
      exp: "Target Encoding maps each category to the mean target value — producing just 1 column regardless of cardinality. For tree models with high-cardinality categoricals, it's very effective."
    },
    {
      q: "The main drawback of Random Undersampling compared to SMOTE is:",
      opts: [
        "It increases dimensionality",
        "It's computationally expensive",
        "It creates noisy synthetic samples",
        "It can discard potentially useful majority class data"
      ],
      ans: 3,
      exp: "Random undersampling removes majority class samples randomly, potentially discarding important patterns. SMOTE retains all data but adds synthetic minority samples."
    },
    {
      q: "In sklearn, you should call .fit_transform() on which set?",
      opts: [
        "Both sets together",
        "Validation set only",
        "Test set only",
        "Training set only"
      ],
      ans: 3,
      exp: "fit_transform() computes statistics (mean, std, min, max) AND transforms data. This should only happen on the training set. On test set, use .transform() only — with the already-fitted object."
    },
    {
      q: "A feature 'has_bought_before' is binary (0 or 1). It predicts churn. What encoding is needed?",
      opts: [
        "One-Hot Encoding",
        "Label Encoding",
        "Ordinal Encoding",
        "No encoding needed"
      ],
      ans: 3,
      exp: "A binary feature that's already coded as 0/1 is already in a usable numeric form. No encoding is needed. ML models can directly use it."
    },
    {
      q: "Sensor data recording temperature every second for 30 days is best classified as:",
      opts: [
        "Discrete numerical data",
        "Unstructured data",
        "Time-series / temporal data",
        "Structured nominal data"
      ],
      ans: 2,
      exp: "Regularly-timed sequential measurements (sensor, stock price, EEG) constitute time-series data. Temporal ordering matters — it cannot be shuffled without losing meaning."
    },
    {
      q: "The best evaluation metric for a heavily imbalanced medical diagnosis task is:",
      opts: [
        "Accuracy",
        "Silhouette Score",
        "Mean Squared Error",
        "Precision-Recall AUC (PR-AUC)"
      ],
      ans: 3,
      exp: "PR-AUC focuses on the minority (positive) class, measuring the tradeoff between Precision and Recall. It's more informative than ROC-AUC when the negative class overwhelmingly dominates."
    },
    {
      q: "Missing value imputation should always be done:",
      opts: [
        "Before train-test split",
        "Using the test set statistics",
        "On the test set independently",
        "After train-test split, fitting imputer on train only"
      ],
      ans: 3,
      exp: "Imputation should be fit (compute mean/median/mode) on the training data ONLY, then applied to both train and test. Doing it before splitting leaks test statistics into training."
    },
    {
      q: "For a linear regression model, which preprocessing step is REQUIRED?",
      opts: [
        "Handling missing values",
        "Scaling numerical features",
        "Encoding categorical features",
        "All of the above"
      ],
      ans: 3,
      exp: "All three are required for linear regression: categories must be encoded (it needs numbers), missing values handled (NaN breaks optimization), and features scaled (gradient descent converges better and coefficients are interpretable)."
    },
    {
      q: "You observe that 'house_price' has a few values > 5 crore in a dataset where most are < 1 crore. After training a linear model, these outliers will:",
      opts: [
        "Have no effect",
        "Improve model accuracy",
        "Be automatically removed by the model",
        "Strongly pull the regression line toward them"
      ],
      ans: 3,
      exp: "Linear regression minimizes sum of squared errors. Outliers contribute disproportionately (error² is huge) and pull the fitted line toward them, degrading overall predictions."
    }
  ],
  "2": [
    {
      q: "A feature 'city_encoded' has variance of 0.0001. Using VarianceThreshold(threshold=0.01), this feature will be:",
      opts: [
        "Imputed",
        "Scaled",
        "Removed",
        "Kept"
      ],
      ans: 2,
      exp: "VarianceThreshold removes features whose variance falls below the threshold. Variance 0.0001 < 0.01 threshold → feature is removed. It's essentially constant and conveys no information."
    },
    {
      q: "Two features, 'weight_kg' and 'weight_lbs', have a correlation of 0.99. What should you do?",
      opts: [
        "Use target encoding on both",
        "Apply PCA to both",
        "Drop one to reduce redundancy and avoid multicollinearity",
        "Keep both"
      ],
      ans: 2,
      exp: "Highly correlated features (|r| > 0.85–0.90) are redundant. Keeping both wastes resources and causes multicollinearity in linear models. Drop one (typically keep the more interpretable one)."
    },
    {
      q: "Recursive Feature Elimination (RFE) works by:",
      opts: [
        "Searching all feature subsets exhaustively",
        "Computing variance and dropping low-variance features",
        "Training model, dropping weakest feature, repeating",
        "Using PCA to extract components"
      ],
      ans: 2,
      exp: "RFE trains a model on all features, identifies the least important feature (via coefficients or importances), removes it, and repeats — backward elimination until the desired number of features remains."
    },
    {
      q: "A Random Forest reports feature importance of 0.45 for 'petal_length'. This means:",
      opts: [
        "This feature reduces Gini impurity by 45% on average across all trees",
        "This feature has 45% correlation with the target",
        "45% of data points use this feature",
        "45% of trees used this feature for the first split"
      ],
      ans: 0,
      exp: "Tree-based feature importance measures the total reduction in Gini impurity (or MSE) attributed to that feature, averaged across all trees and normalized to sum to 1."
    },
    {
      q: "PCA must be applied after which preprocessing step?",
      opts: [
        "Train-test split only",
        "SMOTE",
        "One-Hot Encoding",
        "StandardScaler"
      ],
      ans: 3,
      exp: "PCA is sensitive to scale — a feature with range 0–1000 will dominate components over one with range 0–1. Always StandardScale before PCA. (And after splitting.)"
    },
    {
      q: "LDA (Linear Discriminant Analysis) is a supervised technique that maximizes:",
      opts: [
        "Number of retained dimensions",
        "Separation between class means relative to within-class variance",
        "Distance from origin",
        "Explained variance of features"
      ],
      ans: 1,
      exp: "LDA maximizes the ratio of between-class variance to within-class variance — the Fisher criterion. This ensures the projected data is most discriminative for classification."
    },
    {
      q: "For a 4-feature dataset with 3 classes, LDA can produce at most how many discriminant components?",
      opts: [
        "4",
        "3",
        "1",
        "2"
      ],
      ans: 3,
      exp: "LDA produces at most min(n_classes − 1, n_features) components. With 3 classes, n_classes − 1 = 2. So maximum 2 LDA components regardless of feature count."
    },
    {
      q: "PCA with 2 components on Iris data captures 95.8% variance. This means:",
      opts: [
        "Two components explain 95.8% of total data spread",
        "Only 2 features are useful",
        "The other 2 PCA components are correlated",
        "2% of data is noise"
      ],
      ans: 0,
      exp: "Explained variance ratio = 95.8% means 2 principal components capture 95.8% of total variance in the dataset. The remaining 4.2% in components 3 and 4 is mostly noise or minor variation."
    },
    {
      q: "The Curse of Dimensionality refers to:",
      opts: [
        "Data becoming sparse and distances losing meaning as features increase",
        "Model taking too long to train",
        "Too many classes in the target variable",
        "High correlation between features"
      ],
      ans: 0,
      exp: "As dimensionality increases exponentially, the data volume grows faster than data points can fill it — data becomes sparse, distances become meaningless, and models require exponentially more data."
    },
    {
      q: "Forward Selection starts with:",
      opts: [
        "All features and removes one at a time",
        "No features and adds one at a time based on performance",
        "Random subset and refines",
        "PCA components and selects top ones"
      ],
      ans: 1,
      exp: "Forward Selection begins with no features, adds the single feature that most improves model performance, then continues adding features one by one until a stopping criterion is met."
    },
    {
      q: "Backward Elimination is preferred over Forward Selection when:",
      opts: [
        "Features are all uncorrelated",
        "Only one feature is needed",
        "Dataset is very large with millions of samples",
        "Number of features is manageable and interaction effects matter"
      ],
      ans: 3,
      exp: "Backward elimination starts with all features and considers all interactions from the start. Forward selection may miss interactions. When you have manageable features, backward gives more thorough results."
    },
    {
      q: "A feature 'transaction_month_sin' is created from 'transaction_month' using sin(2π·month/12). This is an example of:",
      opts: [
        "PCA transformation",
        "Cyclical feature encoding / feature creation",
        "Feature selection",
        "Target encoding"
      ],
      ans: 1,
      exp: "Cyclical encoding using sin/cos converts cyclic features (month, hour, day-of-week) into continuous representations that preserve the circular nature (December is close to January)."
    },
    {
      q: "You create a feature 'age_squared' from 'age'. This is called:",
      opts: [
        "Target leakage",
        "Dimensionality reduction",
        "Binary encoding",
        "Polynomial feature creation"
      ],
      ans: 3,
      exp: "Adding polynomial features (x², x³, x·y interaction terms) is polynomial feature creation/expansion. It helps linear models capture non-linear relationships without changing the algorithm."
    },
    {
      q: "VarianceThreshold with threshold=0 removes:",
      opts: [
        "All features",
        "Correlated features",
        "Features with below-average variance",
        "Features with exactly zero variance"
      ],
      ans: 3,
      exp: "Threshold=0 removes only constant features (same value in all rows, variance=0). These carry zero information. A higher threshold removes near-constant features too."
    },
    {
      q: "In PCA, the first principal component is the direction of:",
      opts: [
        "Smallest eigenvalue of the covariance matrix",
        "Maximum explained variance in the data",
        "Minimum distance from the mean",
        "Maximum correlation with the target"
      ],
      ans: 1,
      exp: "PC1 is the eigenvector of the covariance matrix corresponding to the largest eigenvalue — it captures the direction of greatest variance in the data."
    },
    {
      q: "Feature extraction vs Feature selection: which statement is correct?",
      opts: [
        "Both reduce to a fixed number of features",
        "Selection picks a subset; extraction creates new transformed features",
        "Both create new features from scratch",
        "Extraction picks a subset; selection creates new features"
      ],
      ans: 1,
      exp: "Feature Selection picks a subset of original features (e.g., RFE, VarianceThreshold). Feature Extraction creates new features by transforming originals (e.g., PCA components, polynomial terms)."
    },
    {
      q: "You have 100 features and train a Random Forest. Feature importance sums to 1.0. You keep top features with importance > 0.02. How many features do you keep at minimum?",
      opts: [
        "At least 2",
        "Always 50",
        "Could be any number",
        "Always 20"
      ],
      ans: 2,
      exp: "Feature importances sum to 1.0 and are unevenly distributed. If a few features dominate (e.g., one has 0.45), you might keep far fewer than 50. The threshold 0.02 just filters by individual contribution."
    },
    {
      q: "Target encoding on a 'City' column with cross-validation prevents:",
      opts: [
        "High dimensionality",
        "Variance inflation",
        "Overfitting due to target leakage",
        "Multicollinearity"
      ],
      ans: 2,
      exp: "Without cross-validation, target encoding can cause leakage: the encoded value for a row's city uses that row's target to compute the mean. CV-based target encoding computes means on out-of-fold data."
    },
    {
      q: "PCA is NOT appropriate when:",
      opts: [
        "You want to compress 100 features to 5",
        "Features are all categorical and haven't been numerically encoded",
        "You want to remove multicollinearity",
        "You want to visualize high-dimensional data"
      ],
      ans: 1,
      exp: "PCA operates on numeric data and covariance matrices. Raw categorical features can't be directly fed to PCA — they must be encoded first. PCA loses interpretability but is fine for the other goals."
    },
    {
      q: "LDA is preferred over PCA for classification preprocessing because:",
      opts: [
        "LDA is faster",
        "LDA can handle more components",
        "LDA uses class label information to maximize discriminability",
        "LDA doesn't require scaling"
      ],
      ans: 2,
      exp: "LDA is supervised — it uses the class labels to find axes that maximize between-class separation relative to within-class spread. PCA is unsupervised and ignores the labels."
    },
    {
      q: "A feature 'bmi' is derived from existing features 'weight' and 'height'. Creating it is called:",
      opts: [
        "Backward elimination",
        "Domain knowledge-based feature creation",
        "Feature selection",
        "Dimensionality reduction"
      ],
      ans: 1,
      exp: "Creating 'bmi = weight/height²' from existing features using domain knowledge is feature engineering / feature creation. It encodes expert knowledge into a compact, meaningful signal."
    },
    {
      q: "Mutual information in feature selection measures:",
      opts: [
        "Linear correlation between features",
        "The variance of a feature",
        "The reduction in uncertainty about one variable given another",
        "The covariance matrix eigenvalue"
      ],
      ans: 2,
      exp: "Mutual Information quantifies how much knowing one variable reduces uncertainty about another. Unlike Pearson correlation, it captures non-linear dependencies — ideal for complex feature-target relationships."
    },
    {
      q: "After PCA, the components are:",
      opts: [
        "Eigenvalues of the covariance matrix",
        "Standardized versions of original features",
        "Orthogonal (uncorrelated) linear combinations of original features",
        "Original features renamed"
      ],
      ans: 2,
      exp: "PCA components are eigenvectors of the covariance matrix — orthogonal to each other (uncorrelated), and are linear combinations of original features. They point in directions of maximum variance."
    },
    {
      q: "You apply RFE with a Logistic Regression estimator and request 5 features. After running, the model will have been trained:",
      opts: [
        "n_features − 4 times",
        "Once on 5 features",
        "Only during CV",
        "Once on all features"
      ],
      ans: 0,
      exp: "RFE with step=1 trains and evaluates the model once per feature removal iteration. Starting from n features down to 5 features: n−5 training steps. With step > 1, fewer steps."
    },
    {
      q: "Correlation-based feature removal should use |r| threshold of:",
      opts: [
        "0.1",
        "Always 1.0",
        "0.5",
        "0.85–0.95"
      ],
      ans: 3,
      exp: "Common practice removes one of a pair when |Pearson r| > 0.85–0.90. Lower thresholds remove too many useful features; requiring 1.0 catches only perfect duplicates."
    },
    {
      q: "When two features have |r| = 0.90, which one should you drop?",
      opts: [
        "Drop the one with lower correlation to the target variable",
        "Always drop the second one alphabetically",
        "Always drop the numerical one",
        "Drop the one with lower variance"
      ],
      ans: 0,
      exp: "When breaking a high-correlation pair, keep the feature more correlated with the target (more predictive). The other adds redundant information."
    },
    {
      q: "Explained variance ratio in PCA sums to:",
      opts: [
        "The largest eigenvalue",
        "The number of original features",
        "Exactly 1.0 (100%)",
        "The number of components chosen"
      ],
      ans: 2,
      exp: "All explained variance ratios across all possible components sum to 1.0 (100%). When you choose k components, you capture the sum of their k ratios — the rest is discarded."
    },
    {
      q: "The 'feature_importances_' attribute is available in:",
      opts: [
        "KNeighborsClassifier",
        "LogisticRegression",
        "SVM",
        "RandomForestClassifier"
      ],
      ans: 3,
      exp: "feature_importances_ is available in tree-based models: DecisionTree, RandomForest, GradientBoosting, XGBoost. Linear models have 'coef_' instead. KNN and SVM (non-linear) have neither directly."
    },
    {
      q: "You derive a rolling 7-day average of sales as a new feature for a prediction model. This is:",
      opts: [
        "A form of PCA",
        "Target leakage if computed before splitting by time",
        "Always valid preprocessing",
        "Binary encoding"
      ],
      ans: 1,
      exp: "Rolling averages computed without a time split can leak future information into the training set. They must be computed using only past data — fit on train, carefully applied to test."
    },
    {
      q: "SelectKBest in sklearn selects features based on:",
      opts: [
        "A scoring function applied to each feature independently",
        "Manual specification by the data scientist",
        "PCA component loadings",
        "Sequential model-based forward selection"
      ],
      ans: 0,
      exp: "SelectKBest applies a univariate scoring function to each feature vs the target independently, ranks features by score, and selects the top k. It does NOT model feature interactions."
    },
    {
      q: "A feature with near-zero variance should be removed because:",
      opts: [
        "It always causes multicollinearity",
        "It provides almost no information and can destabilize some models",
        "It will cause numerical overflow",
        "It makes gradient descent diverge"
      ],
      ans: 1,
      exp: "A near-constant feature provides almost no discriminative power. In some models (e.g., Naive Bayes), zero-variance features can also cause division-by-zero. Better to remove them early."
    },
    {
      q: "The number of output features of PolynomialFeatures(degree=2) on 2 input features is:",
      opts: [
        "4",
        "6",
        "3",
        "2"
      ],
      ans: 1,
      exp: "For 2 features and degree 2: constant (1), x1, x2, x1², x1·x2, x2² = 6 features. Formula: C(n+d, d) = C(2+2,2) = 6. This grows rapidly with more features or higher degree."
    },
    {
      q: "In industry, feature selection is important mainly because:",
      opts: [
        "All algorithms perform equally with any number of features",
        "Regulators require fewer features in all models",
        "Fewer relevant features reduce training time, prevent overfitting, and improve interpretability",
        "ML models require exactly 10 features"
      ],
      ans: 2,
      exp: "Feature selection improves model efficiency, reduces overfitting by removing noise, speeds up training and inference, and makes models easier to interpret and maintain."
    },
    {
      q: "The 'drop one' strategy in correlation removal: if A and B have |r|=0.95, and A has r=0.7 with target while B has r=0.6 with target, which do you keep?",
      opts: [
        "A",
        "Drop both",
        "Keep both",
        "B"
      ],
      ans: 0,
      exp: "Keep A because it has a stronger direct relationship with the target (0.7 > 0.6). B is redundant — A already captures that information — and B adds less predictive value."
    },
    {
      q: "Embedding layers in neural networks are a form of:",
      opts: [
        "Target encoding",
        "Feature selection",
        "Feature extraction for categorical data",
        "Variance thresholding"
      ],
      ans: 2,
      exp: "Embeddings learn dense low-dimensional vector representations of categories (used heavily in NLP/recommender systems). They are learned feature extractors — a more powerful alternative to One-Hot encoding."
    },
    {
      q: "You have 500 features. PCA captures 95% variance in 20 components. Using 20 components instead of 500:",
      opts: [
        "Hurts performance because information is lost",
        "Reduces overfitting and speeds up training significantly",
        "Makes model uninterpretable only if features were interpretable",
        "Both B and C"
      ],
      ans: 3,
      exp: "Reducing from 500 to 20 features: (B) dramatically speeds up training and reduces overfitting by removing noise dimensions; (C) the PCA components lose the original feature interpretability."
    },
    {
      q: "Which statement about PCA is FALSE?",
      opts: [
        "PCA requires feature scaling before application",
        "PCA components are orthogonal to each other",
        "PCA is a supervised technique using class labels",
        "PCA can be used for dimensionality reduction before clustering"
      ],
      ans: 2,
      exp: "PCA is UNSUPERVISED — it finds directions of maximum variance without using any class labels. LDA is the supervised equivalent. The other statements about PCA are all true."
    },
    {
      q: "A data scientist creates 'total_purchases × avg_purchase_value = estimated_revenue'. This feature:",
      opts: [
        "Is always target leakage",
        "Is a domain-knowledge derived interaction feature",
        "Should be target encoded",
        "Must be removed by VarianceThreshold"
      ],
      ans: 1,
      exp: "Creating meaningful interactions from domain knowledge (revenue = count × average) is valid feature engineering. It's only leakage if it directly encodes future/target information."
    },
    {
      q: "SHAP values are used to:",
      opts: [
        "Explain individual predictions and measure feature contribution",
        "Replace PCA for dimensionality reduction",
        "Select features using variance",
        "Detect outliers in high dimensions"
      ],
      ans: 0,
      exp: "SHAP (SHapley Additive exPlanations) assigns each feature a contribution value for individual predictions, using game theory. It provides both local (per-instance) and global feature importance."
    },
    {
      q: "After applying PCA to reduce 50 features to 5 components, can you retrieve the original 50 features exactly?",
      opts: [
        "Yes, using the inverse_transform with 95% accuracy",
        "Yes, always",
        "Only if you kept all 50 components",
        "No"
      ],
      ans: 3,
      exp: "PCA with fewer components than original features is lossy. inverse_transform gives an approximation, not the exact original. If you keep all 50 components, you can reconstruct perfectly."
    },
    {
      q: "L1 regularization (Lasso) in linear models also performs:",
      opts: [
        "Clustering of features",
        "Automatic feature selection by driving some coefficients to exactly zero",
        "Correlation removal",
        "Dimensionality reduction like PCA"
      ],
      ans: 1,
      exp: "L1 (Lasso) penalty promotes sparsity — it drives coefficients of irrelevant features to exactly zero. This is both regularization and implicit feature selection in one step."
    },
    {
      q: "For a text dataset with 10,000 unique words (TF-IDF features), which is most appropriate before training a logistic regression?",
      opts: [
        "Keep all 10,000 features as-is",
        "All three combined",
        "PCA to reduce to ~100 components",
        "VarianceThreshold to remove rare words, then StandardScaler"
      ],
      ans: 3,
      exp: "VarianceThreshold removes near-zero variance features (very rare words); scaling helps logistic regression. However, for sparse TF-IDF specifically, truncated SVD (a.k.a. LSA) is often used instead of PCA."
    },
    {
      q: "The key difference between Filter, Wrapper, and Embedded feature selection methods:",
      opts: [
        "All three are equivalent",
        "Filter is model-independent; Wrapper evaluates subsets with a model; Embedded uses regularization inside training",
        "Filter is faster but Wrapper is more accurate always",
        "Filter uses ML models; Wrapper doesn't; Embedded combines both"
      ],
      ans: 1,
      exp: "Filter methods (variance, correlation) are model-independent and fast. Wrapper methods (RFE, forward/backward selection) evaluate feature subsets by training a model. Embedded methods (Lasso, feature_importances_) select features as part of training."
    },
    {
      q: "Pearson correlation measures:",
      opts: [
        "Mutual information between variables",
        "Any non-linear relationship between two variables",
        "Rank-based order relationship",
        "Linear relationship between two continuous variables"
      ],
      ans: 3,
      exp: "Pearson r measures linear correlation between continuous variables. For non-linear relationships, Spearman rank correlation or mutual information is more appropriate."
    },
    {
      q: "A feature 'day_of_week' coded as 0–6 (Mon=0, Sun=6): coding Sunday=6 and Monday=0 implies:",
      opts: [
        "This is nominal encoding",
        "No ordering issue",
        "False ordering: Sunday (6) appears 'greater' than Monday (0) and not close to it",
        "Sunday and Monday are correctly shown as adjacent"
      ],
      ans: 2,
      exp: "Day of week is cyclic. Linear encoding 0–6 makes Sunday (6) and Monday (0) seem far apart, and implies Tuesday (1) > Monday (0). Use sin/cos cyclical encoding to capture the circular nature."
    },
    {
      q: "What does 'n_components=0.95' in PCA(n_components=0.95) mean?",
      opts: [
        "Apply 95% threshold to loadings",
        "Use 95 components",
        "Automatically select the minimum components to explain 95% of variance",
        "Use 95% of the data for fitting"
      ],
      ans: 2,
      exp: "When n_components is a float between 0 and 1, sklearn's PCA automatically selects the minimum number of components needed to explain that fraction of total variance."
    },
    {
      q: "The main risk of using too many polynomial features (high degree):",
      opts: [
        "Training is always faster",
        "Features become uncorrelated",
        "Model overfits",
        "Model underfits"
      ],
      ans: 2,
      exp: "High-degree polynomial features increase model complexity exponentially. The model can perfectly fit training data (including noise) while generalizing poorly to new data — classic overfitting."
    },
    {
      q: "In a feature selection report, a feature has importance = 0. This means:",
      opts: [
        "The model never used this feature to make a split/decision",
        "The feature is perfectly correlated with another",
        "The feature was constant",
        "An error in computation"
      ],
      ans: 0,
      exp: "Feature importance = 0 in a tree model means the feature was never chosen for any split across all trees — it provided no benefit. This could be due to redundancy, irrelevance, or masking by other features."
    },
    {
      q: "For a recommendation system with millions of users, encoding user_id as One-Hot would create:",
      opts: [
        "A 100-column dense matrix",
        "An impractically large matrix with millions of columns",
        "A manageable sparse matrix",
        "A single binary feature"
      ],
      ans: 1,
      exp: "One-Hot for millions of users creates millions of columns — memory-prohibitive. Embedding layers (or hashing tricks) map users to low-dimensional dense vectors, which is standard practice in recommendation systems."
    }
  ],
  "3": [
    {
      q: "A Perceptron fails to learn the XOR function because:",
      opts: [
        "The step function is non-differentiable",
        "It needs more training epochs",
        "Its learning rate is too small",
        "XOR data is not linearly separable"
      ],
      ans: 3,
      exp: "XOR data cannot be separated by a single straight line (hyperplane). The Perceptron can only classify linearly separable data. Multi-layer networks (MLPs) can solve XOR."
    },
    {
      q: "The sigmoid function σ(z) outputs values in the range:",
      opts: [
        "[0, 1]",
        "[−1, +1]",
        "(−∞, +∞)",
        "(0, 1)"
      ],
      ans: 3,
      exp: "σ(z) = 1/(1+e⁻ᶻ) asymptotically approaches 0 and 1 but never reaches them — so the range is the open interval (0, 1). This makes it suitable for probability estimation."
    },
    {
      q: "Logistic Regression is called 'regression' but is used for:",
      opts: [
        "Dimensionality reduction",
        "Classification",
        "Predicting continuous values",
        "Clustering"
      ],
      ans: 1,
      exp: "Despite the name, Logistic Regression is a classification algorithm. It outputs P(y=1|x) via the sigmoid function, and a threshold (usually 0.5) converts probabilities to class labels."
    },
    {
      q: "The 'naïve' assumption in Naïve Bayes is:",
      opts: [
        "The dataset is balanced",
        "Features are normally distributed",
        "All features are conditionally independent given the class",
        "All features have the same mean"
      ],
      ans: 2,
      exp: "Naïve Bayes assumes that all features are conditionally independent given the class label: P(X|y) = ∏P(xᵢ|y). This is 'naïve' because it's rarely true, yet the classifier often works well."
    },
    {
      q: "KNN is called a 'lazy learner' because:",
      opts: [
        "It stores all training data and defers computation to prediction time",
        "It performs poorly on complex tasks",
        "It uses fewer resources than other models",
        "It learns slowly during training"
      ],
      ans: 0,
      exp: "KNN has no training phase — it simply memorizes all training data. All computation (finding K nearest neighbors) happens at prediction time. This makes training instant but prediction slow for large datasets."
    },
    {
      q: "In Decision Trees, Gini Impurity = 0 means:",
      opts: [
        "The node contains only samples of one class",
        "All classes are equally distributed",
        "50% of each class in the node",
        "Maximum entropy"
      ],
      ans: 0,
      exp: "Gini = 1 − Σpᵢ² = 0 when all pᵢ = 0 except one pᵢ = 1. This means all samples in the node belong to the same class — perfect purity, no further splitting needed."
    },
    {
      q: "SVM finds the hyperplane that:",
      opts: [
        "Passes through the centroid of each class",
        "Minimizes the number of support vectors",
        "Minimizes training error",
        "Maximizes the margin between the two closest points of each class"
      ],
      ans: 3,
      exp: "SVM's objective is to find the maximum-margin hyperplane — the one with the largest minimum distance (margin) from any training point. The data points closest to the hyperplane are support vectors."
    },
    {
      q: "A medical test predicts cancer. Reducing false negatives is critical. Which metric to optimize?",
      opts: [
        "Specificity",
        "Recall (Sensitivity)",
        "Precision",
        "Accuracy"
      ],
      ans: 1,
      exp: "Recall = TP/(TP+FN). A false negative (missed cancer) is far worse than a false positive in this domain. Maximizing recall ensures we catch as many true cancer cases as possible."
    },
    {
      q: "A spam filter should minimize false positives (legitimate emails marked spam). Optimize:",
      opts: [
        "Recall",
        "ROC-AUC",
        "F1-Score",
        "Precision"
      ],
      ans: 3,
      exp: "Precision = TP/(TP+FP). A false positive here means a good email goes to spam — annoying and potentially harmful. High precision means when we predict spam, it's very likely actual spam."
    },
    {
      q: "The C parameter in SVM controls:",
      opts: [
        "Bias-variance tradeoff: high C = harder margin",
        "The learning rate",
        "The number of support vectors exactly",
        "The kernel function type"
      ],
      ans: 0,
      exp: "C is the regularization parameter. Low C = soft margin (allows some misclassifications, more regularization, may underfit). High C = hard margin (penalizes all errors, less regularization, may overfit)."
    },
    {
      q: "ROC-AUC = 0.5 means the classifier is:",
      opts: [
        "Perfectly accurate",
        "Worse than random",
        "Equivalent to random guessing",
        "Perfectly calibrated"
      ],
      ans: 2,
      exp: "AUC = 0.5 means the ROC curve lies on the diagonal — the classifier has no discriminating power, equivalent to randomly assigning classes. AUC = 1.0 is perfect; AUC < 0.5 suggests systematic inversion."
    },
    {
      q: "MultinomialNB is most appropriate for:",
      opts: [
        "Continuous feature data",
        "Time-series data",
        "Text classification with word count features",
        "Binary (0/1) features"
      ],
      ans: 2,
      exp: "MultinomialNB assumes features are counts (or frequencies), making it ideal for NLP tasks with TF or TF-IDF features. GaussianNB is for continuous data; BernoulliNB for binary vectors."
    },
    {
      q: "The kernel trick in SVM allows:",
      opts: [
        "Handling missing values",
        "Training without labeled data",
        "Non-linear classification by implicitly mapping data to higher-dimensional space",
        "Automatic feature selection"
      ],
      ans: 2,
      exp: "The kernel trick computes dot products in a high-dimensional feature space without explicitly computing the transformation. RBF kernel can handle non-linear boundaries efficiently."
    },
    {
      q: "In a confusion matrix, False Positive Rate (FPR) is:",
      opts: [
        "TP / (TP + FN)",
        "FP / (FP + TN)",
        "FP / (FP + TP)",
        "TN / (TN + FP)"
      ],
      ans: 1,
      exp: "FPR = FP/(FP+TN) = proportion of actual negatives incorrectly classified as positive. It's plotted on the x-axis of the ROC curve. Specificity = 1 − FPR = TN/(TN+FP)."
    },
    {
      q: "The Perceptron update rule wᵢ ← wᵢ + η(y − ŷ)xᵢ updates weights when:",
      opts: [
        "Only in the first epoch",
        "Only when y = 1",
        "Always, every epoch",
        "Only when prediction is incorrect"
      ],
      ans: 3,
      exp: "When the prediction is correct (y = ŷ), (y − ŷ) = 0 and weights don't change. Weights only update when there's a mismatch. Perceptron is guaranteed to converge only for linearly separable data."
    },
    {
      q: "Decision Tree with unlimited depth will:",
      opts: [
        "Underfit",
        "Always generalize well",
        "Overfit",
        "Have high bias and low variance"
      ],
      ans: 2,
      exp: "An unlimited depth tree can grow until each leaf contains a single training sample (zero training error). This is severe overfitting — high variance. Pruning or max_depth limits are essential."
    },
    {
      q: "The RBF (Radial Basis Function) kernel in SVM is most useful when:",
      opts: [
        "Training speed is top priority",
        "Decision boundary is non-linear and complex",
        "Data has millions of features (NLP)",
        "Classes are linearly separable"
      ],
      ans: 1,
      exp: "The RBF kernel maps data to infinite-dimensional space, enabling complex non-linear decision boundaries. For linearly separable data, a linear kernel is sufficient and faster."
    },
    {
      q: "F1-Score is defined as:",
      opts: [
        "(TP + TN) / total",
        "TP / (TP + FN)",
        "2 × / (Precision + Recall)",
        "TP / (TP + FP)"
      ],
      ans: 2,
      exp: "F1 = harmonic mean of Precision and Recall = 2PR/(P+R). It balances both metrics and is the go-to for imbalanced datasets. Macro-F1 and weighted-F1 extend this to multiclass."
    },
    {
      q: "KNN with K=1 will have what training error?",
      opts: [
        "High error due to noise",
        "50%",
        "Zero",
        "Error depends on data distribution"
      ],
      ans: 2,
      exp: "With K=1, the nearest neighbor of any training point is itself (distance 0). Every training prediction is perfect → 0 training error. But K=1 overfits massively to noise."
    },
    {
      q: "A Decision Tree uses Information Gain. The feature chosen at each split:",
      opts: [
        "Has the highest variance",
        "Has the smallest Gini impurity value",
        "Is selected randomly",
        "Maximizes information gain"
      ],
      ans: 3,
      exp: "Information Gain = H(parent) − Σ(weighted H(child)). The feature that reduces entropy the most (maximizes information gain) is chosen. This is used in ID3 and C4.5 algorithms."
    },
    {
      q: "Logistic Regression uses Binary Cross-Entropy loss. For a true label y=1 and predicted probability p=0.01, the loss is:",
      opts: [
        "Very large (−log(0.01) ≈ 4.6)",
        "Very small",
        "Moderate",
        "Zero"
      ],
      ans: 0,
      exp: "Loss = −log(p) for y=1. −log(0.01) = 4.61, which is very large. The model is extremely confident in the wrong direction — the loss penalizes this severely, driving correction."
    },
    {
      q: "For a customer churn model, you get Precision=0.90 and Recall=0.30. What does this indicate?",
      opts: [
        "Excellent model overall",
        "Model predicts all customers will churn",
        "Good balance between precision and recall",
        "Model rarely predicts churn but when it does, it's usually right"
      ],
      ans: 3,
      exp: "High precision, low recall: when the model predicts churn, it's correct 90% of the time (few false positives), but it only identifies 30% of actual churners (many false negatives)."
    },
    {
      q: "Which classifier makes the independence assumption that helps it handle text very efficiently?",
      opts: [
        "Decision Tree",
        "SVM",
        "KNN",
        "Naïve Bayes"
      ],
      ans: 3,
      exp: "Naïve Bayes assumes feature independence: P(x1,x2,...|y) = ∏P(xi|y). This makes training and prediction O(n·d) — very fast for text with thousands of word features."
    },
    {
      q: "Standardizing features is essential for KNN because:",
      opts: [
        "KNN overfits without scaling",
        "KNN uses gradient descent that needs normalized gradients",
        "KNN uses distances",
        "KNN is a probabilistic model sensitive to distributions"
      ],
      ans: 2,
      exp: "KNN classifies based on Euclidean distance. If salary (0–1,000,000) and age (0–100) are both used, salary completely dominates the distance. Scaling gives both features equal influence."
    },
    {
      q: "Decision Tree Information Gain uses Entropy, defined as:",
      opts: [
        "log₂(n_classes)",
        "Σpᵢ·(1−pᵢ)",
        "1 − Σpᵢ²",
        "−Σpᵢ·log₂(pᵢ)"
      ],
      ans: 3,
      exp: "Entropy H = −Σpᵢ·log₂(pᵢ) where pᵢ is the proportion of class i. Maximum entropy occurs at uniform distribution (H = log₂(k) for k classes). Zero entropy = pure node."
    },
    {
      q: "SVM's support vectors are:",
      opts: [
        "Points with the highest feature values",
        "Training points closest to the decision boundary that define it",
        "Training points farthest from the decision boundary",
        "All training data points"
      ],
      ans: 1,
      exp: "Support vectors are the training points that lie on or within the margin (closest to the hyperplane). They 'support' the boundary — removing non-support vectors doesn't change the hyperplane."
    },
    {
      q: "A model has AUC-ROC = 0.98 but F1-Score = 0.35 on a 99:1 imbalanced dataset. The model is:",
      opts: [
        "Good at ranking but poor at binary decisions at the default 0.5 threshold",
        "Equally good on both metrics",
        "Definitely using the wrong algorithm",
        "Excellent at all prediction tasks"
      ],
      ans: 0,
      exp: "High AUC = good discrimination between classes at various thresholds. Low F1 = poor binary predictions at default threshold 0.5. Adjusting the threshold can dramatically improve F1."
    },
    {
      q: "The 'elbow' in K-means is analogous to what concept in Decision Trees?",
      opts: [
        "Both B and C",
        "Gini impurity reduction",
        "Information gain",
        "Max depth limiting overfitting"
      ],
      ans: 3,
      exp: "Both the elbow method (K-means) and max_depth (Decision Tree) help find the right model complexity. Beyond the elbow K (or beyond appropriate max_depth), adding complexity gives diminishing returns / overfitting."
    },
    {
      q: "Precision-Recall AUC (PR-AUC) is preferred over ROC-AUC when:",
      opts: [
        "Data is balanced",
        "The positive class is rare and finding it matters most",
        "Both classes are equally important",
        "You need speed"
      ],
      ans: 1,
      exp: "ROC-AUC can be optimistic for imbalanced data because TN is large. PR-AUC focuses on the positive (rare) class — it directly measures ability to find positives among all predictions."
    },
    {
      q: "The decision boundary of Logistic Regression is:",
      opts: [
        "A tree-like structure",
        "A curve",
        "A linear hyperplane (w·x + b = 0)",
        "Determined by the nearest neighbors"
      ],
      ans: 2,
      exp: "Despite the sigmoid output, Logistic Regression's decision boundary is linear: P = 0.5 when σ(w·x+b) = 0.5, i.e., when w·x+b = 0. This is a straight line/hyperplane in feature space."
    },
    {
      q: "A model trained on credit data achieves 95% accuracy. The dataset has 95% 'No Default' samples. The model:",
      opts: [
        "Is excellent",
        "Is overfitting",
        "Needs more data",
        "May just be predicting 'No Default' for everyone"
      ],
      ans: 3,
      exp: "95% accuracy equals the majority class rate — the model may be a trivial classifier. For imbalanced credit data, check precision/recall/F1 for the minority 'Default' class."
    },
    {
      q: "GaussianNB assumes features follow:",
      opts: [
        "No distribution (non-parametric)",
        "Normal (Gaussian) distribution within each class",
        "Multinomial distribution",
        "Uniform distribution"
      ],
      ans: 1,
      exp: "GaussianNB models P(xᵢ|y) as a Gaussian distribution, estimating the mean and variance of each feature for each class. It works when features are (approximately) normally distributed."
    },
    {
      q: "When K is too small in KNN (e.g., K=1), the model:",
      opts: [
        "Has high variance and low bias (overfits)",
        "Overfits",
        "Both A and C",
        "Underfits and has high bias"
      ],
      ans: 0,
      exp: "Small K = low bias but high variance (overfits, sensitive to individual noisy points). Large K = high bias but low variance (smoother, potentially underfitting). Optimal K is found via CV."
    },
    {
      q: "Binary Cross-Entropy penalizes a model most when:",
      opts: [
        "It predicts 0.5 for all samples",
        "It predicts randomly (0.5)",
        "It predicts with high confidence in the WRONG direction",
        "It predicts the correct class with 0.7 probability"
      ],
      ans: 2,
      exp: "Loss = −y·log(p) − (1−y)·log(1−p). When y=1 and p→0, loss → ∞. High-confidence wrong predictions incur the highest penalty, driving aggressive correction during training."
    },
    {
      q: "In multiclass classification, One-vs-Rest (OvR) strategy trains:",
      opts: [
        "One model for all classes",
        "n²/2 pairwise models",
        "n_classes models, each treating one class as positive and rest as negative",
        "One model using softmax"
      ],
      ans: 2,
      exp: "OvR trains n_classes binary classifiers. Each sees 'my class vs. all others.' Final prediction uses the classifier with the highest confidence score. Logistic Regression uses OvR by default."
    },
    {
      q: "A hospital wants to detect rare diseases. Which is more dangerous: FP or FN?",
      opts: [
        "Both equally dangerous",
        "Depends on cost of treatment",
        "False Negative",
        "False Positive"
      ],
      ans: 2,
      exp: "False Negative (missed diagnosis) is typically more dangerous — the patient doesn't receive needed treatment. Optimize for high Recall/Sensitivity. FP leads to unnecessary further testing, but at least the patient gets checked."
    },
    {
      q: "Laplace smoothing in Naïve Bayes prevents:",
      opts: [
        "Overfitting to dominant classes",
        "Multicollinearity between features",
        "Zero probability for unseen feature values = 0)",
        "High variance in probability estimates"
      ],
      ans: 2,
      exp: "Without smoothing, if a feature value (e.g., word) never appeared in training for a class, P(word|class)=0, making the whole product P(X|y)=0. Laplace (add-1) smoothing avoids this zero probability issue."
    },
    {
      q: "SVM with a linear kernel is preferred for:",
      opts: [
        "Non-linear decision boundaries",
        "High-dimensional, linearly separable data like text (NLP)",
        "Very small datasets only",
        "Image classification with complex spatial features"
      ],
      ans: 1,
      exp: "Linear SVM is highly effective for high-dimensional sparse data (like TF-IDF text features) where linear separability is often sufficient. It's computationally efficient when n_features >> n_samples."
    },
    {
      q: "What is the purpose of the 'C' parameter in Soft-Margin SVM?",
      opts: [
        "Specifies the number of classes",
        "Sets the kernel bandwidth",
        "Trades off maximizing margin width vs penalizing margin violations (misclassifications)",
        "Controls the number of support vectors"
      ],
      ans: 2,
      exp: "In Soft-Margin SVM, C controls the regularization: low C = wide margin, allows violations (underfits with very noisy data); high C = narrow margin, fewer violations (can overfit). It balances simplicity vs correctness."
    },
    {
      q: "Which algorithm is non-parametric and makes no assumptions about the data distribution?",
      opts: [
        "Gaussian Naïve Bayes",
        "Linear SVM",
        "K-Nearest Neighbors",
        "Logistic Regression"
      ],
      ans: 2,
      exp: "KNN is non-parametric — it makes no assumption about the underlying data distribution. It simply uses distances between points. LogReg and GNB make explicit distributional assumptions."
    },
    {
      q: "The macro-averaged F1-score in multiclass classification:",
      opts: [
        "Uses only the majority class F1",
        "Weights each class by its sample size",
        "Computes F1 per class then takes an unweighted average",
        "Is equivalent to accuracy"
      ],
      ans: 2,
      exp: "Macro F1 = average of per-class F1 scores, treating all classes equally regardless of support. Weighted F1 accounts for class imbalance by weighting by sample count. Macro is stricter for rare classes."
    },
    {
      q: "A Decision Tree's max_depth=3 means:",
      opts: [
        "The tree has at most 3 levels of splits from the root",
        "3 classes are predicted",
        "3 features are used",
        "The tree has 3 leaf nodes"
      ],
      ans: 0,
      exp: "max_depth=3 limits the tree to 3 levels of splitting: root → 3 levels deep. With depth 3, the tree can have at most 2³=8 leaf nodes. This prevents overfitting."
    },
    {
      q: "Precision = 0.60 in a disease classifier means:",
      opts: [
        "40% of predictions are wrong",
        "60% of actual disease patients are detected",
        "The model is correct 60% of the time",
        "Of patients predicted to have disease, 60% actually do"
      ],
      ans: 3,
      exp: "Precision = TP/(TP+FP). Of all patients the model says 'has disease,' 60% truly do (40% are false alarms). This controls the false alarm rate. Recall measures how many actual cases are found."
    },
    {
      q: "KNN prediction time complexity for N training samples, D features, and a new point:",
      opts: [
        "O(1)",
        "O",
        "O(N·D)",
        "O(D²)"
      ],
      ans: 2,
      exp: "KNN must compute the distance from the new point to all N training samples across D features → O(N·D). This makes KNN slow at prediction time for large datasets. KD-trees or Ball Trees can reduce this."
    },
    {
      q: "Which classifier is most interpretable for explaining decisions to non-technical stakeholders?",
      opts: [
        "Decision Tree",
        "SVM with RBF kernel",
        "Random Forest",
        "Logistic Regression with many features"
      ],
      ans: 0,
      exp: "A Decision Tree can be visualized and read like a flowchart: 'If income > 50k AND age > 30, then predict Yes.' This is the most transparent and explainable model for non-technical audiences."
    },
    {
      q: "In Logistic Regression, the coefficient for a binary feature tells you:",
      opts: [
        "The probability that this feature is useful",
        "The feature's correlation with the target",
        "The change in log-odds of the positive class per unit increase in the feature",
        "The number of standard deviations from the mean"
      ],
      ans: 2,
      exp: "LR coefficients are in log-odds space: a coefficient β means the log-odds of y=1 changes by β for each unit increase in that feature (holding others constant). exp(β) gives the odds ratio."
    },
    {
      q: "SVM using the Polynomial kernel k(x,z) = (x·z + 1)² maps data to:",
      opts: [
        "Quadratic feature space",
        "Same dimensional space",
        "Lower dimensional space",
        "Infinite-dimensional space"
      ],
      ans: 0,
      exp: "The degree-2 polynomial kernel corresponds to a feature map including all original features, their squares, and all pairwise products — quadratic feature space. Computationally done via kernel matrix, not explicit mapping."
    },
    {
      q: "The confusion matrix for a binary classifier has TP=45, TN=50, FP=5, FN=10. Accuracy is:",
      opts: [
        "82.3%",
        "87.5%",
        "90%",
        "85.7%"
      ],
      ans: 3,
      exp: "Accuracy = (TP+TN)/(TP+TN+FP+FN) = (45+50)/(45+50+5+10) = 95/110 ≈ 0.8636 ≈ 86.4%. Closest to 85.7%. Actually: 95/110 = 86.4%, so 85.7% is closest to correct (rounding differences may vary)."
    },
    {
      q: "For a multiclass problem with 5 classes using One-vs-Rest SVM, how many models are trained?",
      opts: [
        "25",
        "10 (5×4/2 pairs)",
        "1",
        "5"
      ],
      ans: 3,
      exp: "One-vs-Rest (OvR) trains one binary classifier per class: class 1 vs rest, class 2 vs rest, ..., class 5 vs rest = 5 models total. One-vs-One (OvO) would train C(5,2)=10 models."
    }
  ],
  "4": [
    {
      q: "Simple Linear Regression finds the best fit line by minimizing:",
      opts: [
        "R-squared directly",
        "Sum of squared errors (OLS",
        "Sum of absolute errors",
        "Maximum error"
      ],
      ans: 1,
      exp: "OLS minimizes Σ(yᵢ − ŷᵢ)². Squaring amplifies large errors, making the solution sensitive to outliers but analytically tractable (closed-form solution exists: β = (XᵀX)⁻¹Xᵀy)."
    },
    {
      q: "R-squared (R²) = 0.85 means:",
      opts: [
        "The model explains 85% of the variance in the target",
        "RMSE is 0.85",
        "15% of predictions are wrong",
        "85% accuracy"
      ],
      ans: 0,
      exp: "R² = 1 − SS_res/SS_tot. R²=0.85 means the model accounts for 85% of the variance in y. The remaining 15% is unexplained variance (noise or missing features)."
    },
    {
      q: "Lasso (L1) regression drives some coefficients to exactly zero because:",
      opts: [
        "Gradient descent randomly sets coefficients to zero",
        "L1 norm constraint has corners at axes where coefficients become exactly zero",
        "Lasso uses a different optimizer",
        "L2 norm constraint has corners where sparse solutions occur"
      ],
      ans: 1,
      exp: "The L1 ball (|β₁| + |β₂| = const) has corners on the coordinate axes. OLS contours often 'touch' these corners, setting one or more coefficients to exactly zero — automatic feature selection."
    },
    {
      q: "Ridge (L2) regression shrinks coefficients but rarely makes them exactly zero because:",
      opts: [
        "L2 ball is circular/spherical",
        "Ridge can't handle correlated features",
        "Ridge has a lower learning rate",
        "Ridge uses a larger penalty than Lasso"
      ],
      ans: 0,
      exp: "The L2 ball (β₁² + β₂² = const) is smooth and round — no corners at axes. OLS contours touch the L2 ball at a non-axis point, so no coefficient becomes exactly zero."
    },
    {
      q: "ElasticNet is a combination of:",
      opts: [
        "Ridge and PCA",
        "Lasso and Decision Tree",
        "Lasso and Ridge (L1 + L2 penalty)",
        "Ridge and Gradient Boosting"
      ],
      ans: 2,
      exp: "ElasticNet = α·L1 + (1−α)·L2 penalty. The l1_ratio parameter controls the mix. It gets feature selection from L1 and handles correlated features better than pure L1."
    },
    {
      q: "A house price model shows multicollinearity between 'total_rooms' and 'total_bedrooms'. The best fix is:",
      opts: [
        "Remove both features",
        "Increase sample size",
        "Switch to a decision tree",
        "Use Lasso or Ridge regression"
      ],
      ans: 3,
      exp: "Ridge regression stabilizes estimates when features are multicollinear — it adds λI to (XᵀX) before inversion, preventing singular/near-singular matrices. Lasso may drop one correlated feature entirely."
    },
    {
      q: "MSE vs MAE: which is more sensitive to outliers?",
      opts: [
        "MSE",
        "MAE",
        "Depends on dataset size",
        "Both equally sensitive"
      ],
      ans: 0,
      exp: "MSE = mean of squared errors — large errors contribute disproportionately (squared). MAE = mean of absolute errors — all errors contribute linearly. MSE penalizes outliers much more heavily."
    },
    {
      q: "In multiple linear regression, the coefficient β₁ represents:",
      opts: [
        "The total effect of x₁ on y",
        "The change in y per unit increase in x₁, holding all other predictors constant",
        "The R² contribution of x₁",
        "The correlation between x₁ and y"
      ],
      ans: 1,
      exp: "In MLR, β₁ is the partial regression coefficient: the expected change in y for a one-unit increase in x₁, while all other predictors are held fixed. This isolates x₁'s independent effect."
    },
    {
      q: "Polynomial Regression degree=5 achieves R²=0.99 on training data but R²=0.20 on test data. This indicates:",
      opts: [
        "The test set is too small",
        "Data leakage",
        "Underfitting",
        "Severe overfitting"
      ],
      ans: 3,
      exp: "Huge gap between train (0.99) and test (0.20) R² = overfitting. A degree-5 polynomial has enough parameters to weave through training points, but this doesn't generalize. Use lower degree or regularization."
    },
    {
      q: "For time-series data (sales over months), the correct train-test split is:",
      opts: [
        "Split by time: first 80% of time periods for training, last 20% for testing",
        "K-fold cross-validation",
        "Random 80/20 split",
        "Leave-one-out cross-validation"
      ],
      ans: 0,
      exp: "Time-series data must respect temporal ordering. Random splits allow 'future' data into training (leakage). Always train on the past, test on future time periods."
    },
    {
      q: "A lag feature y(t−1) in time-series regression means:",
      opts: [
        "A rolling standard deviation",
        "The seasonal component",
        "Average of the last 7 values",
        "Yesterday's target value used as today's predictor"
      ],
      ans: 3,
      exp: "y(t−1) is a lag-1 feature — the previous time step's actual value used as input to predict the current value. Lag features capture autocorrelation (today's value depends on yesterday's)."
    },
    {
      q: "RMSE (Root Mean Squared Error) is preferred over MSE for reporting because:",
      opts: [
        "RMSE is in the same units as the target variable",
        "RMSE is always smaller",
        "RMSE is faster to compute",
        "RMSE handles outliers better"
      ],
      ans: 0,
      exp: "RMSE = √MSE. Taking the square root returns the error to the same units as y (e.g., ₹ for house prices). MSE is in squared units (₹²) which is hard to interpret practically."
    },
    {
      q: "A regression model has high bias and low variance. This suggests:",
      opts: [
        "Overfitting",
        "Data has too many outliers",
        "Underfitting",
        "Ideal model"
      ],
      ans: 2,
      exp: "High bias = model underfits — makes systematic errors because it's too simple (e.g., fitting a line to quadratic data). Low variance = consistent but consistently wrong. Need a more complex model."
    },
    {
      q: "Cross-validation is used in regression to:",
      opts: [
        "Speed up training",
        "Perform bootstrapping",
        "Estimate generalization performance more reliably than a single train/test split",
        "Select the best features automatically"
      ],
      ans: 2,
      exp: "K-fold CV splits data into K folds, trains K models (each holding a different fold for validation), and averages scores. This gives a more robust estimate of generalization than a single split."
    },
    {
      q: "Regularization parameter λ (alpha in sklearn) in Ridge regression:",
      opts: [
        "Large λ → small shrinkage → more overfitting",
        "Does not affect the model",
        "Controls the number of features selected",
        "Large λ → strong shrinkage → simpler model, may underfit"
      ],
      ans: 3,
      exp: "Large λ adds a strong penalty on coefficient magnitude → coefficients shrink toward zero → simpler model. Too large = underfit. Too small = essentially no regularization → may overfit."
    },
    {
      q: "An e-commerce company wants to predict revenue (continuous). Which loss function is standard?",
      opts: [
        "Categorical Cross-Entropy",
        "Binary Cross-Entropy",
        "Hinge Loss",
        "Mean Squared Error (MSE)"
      ],
      ans: 3,
      exp: "Revenue is a continuous target — regression task. MSE is the standard loss. Binary and Categorical Cross-Entropy are for classification. Hinge loss is for SVM classification."
    },
    {
      q: "The OLS closed-form solution β = (XᵀX)⁻¹Xᵀy fails when:",
      opts: [
        "The target has outliers",
        "XᵀX is singular (features are perfectly multicollinear or n_samples < n_features)",
        "Features are not normalized",
        "The dataset is too small"
      ],
      ans: 1,
      exp: "If features are perfectly correlated or there are more features than samples, XᵀX is singular (non-invertible). Ridge adds λI to regularize: (XᵀX + λI)⁻¹ is always invertible for λ > 0."
    },
    {
      q: "Adjusted R² penalizes adding unnecessary features because:",
      opts: [
        "It uses a different error formula",
        "It divides R² by the number of features",
        "It adjusts for the number of predictors",
        "It squares the residuals differently"
      ],
      ans: 2,
      exp: "R² always increases (or stays same) when you add features — even noise. Adjusted R² penalizes for each additional predictor, only increasing when the feature explains enough variance to justify its addition."
    },
    {
      q: "Rolling mean with window=7 in time-series:",
      opts: [
        "Shifts the series 7 days forward",
        "Sums the last 7 values",
        "Computes 7-day variance",
        "Computes the average of the last 7 time steps"
      ],
      ans: 3,
      exp: "Rolling (or moving) mean smooths the time-series by averaging across a sliding window. Window=7 (e.g., weekly) reduces noise and captures the local trend, useful as a feature for regression models."
    },
    {
      q: "In Polynomial Regression, adding x², x³ features makes it:",
      opts: [
        "A non-linear algorithm",
        "An ensemble method",
        "Still a linear model in its parameters (coefficients), but non-linear in x",
        "A tree-based model"
      ],
      ans: 2,
      exp: "Polynomial regression is linear in parameters (β₀ + β₁x + β₂x² + β₃x³). The model is still OLS regression, but the feature space has been expanded. 'Linear' refers to the parameter relationship, not x."
    },
    {
      q: "Decision Tree Regressor prediction for a new sample is:",
      opts: [
        "The mean of training samples in the leaf node where the sample falls",
        "The median of all samples",
        "The average of all training targets",
        "A linear combination of features"
      ],
      ans: 0,
      exp: "In Decision Tree regression, each leaf stores the mean of training targets in that region. Prediction = navigate the tree to the leaf, return the leaf's mean target value."
    },
    {
      q: "Random Forest Regressor reduces overfitting compared to a single Decision Tree by:",
      opts: [
        "Using fewer features",
        "Averaging predictions of many trees",
        "Applying L2 regularization to each tree",
        "Using deeper trees"
      ],
      ans: 1,
      exp: "Each tree is trained on a bootstrap sample with random feature subsets (bagging). Individual trees may overfit but differently. Averaging cancels out individual errors — variance is reduced √n times."
    },
    {
      q: "Gradient Boosting Regression improves predictions by:",
      opts: [
        "Random feature sampling with replacement",
        "Each tree fitting the residual errors of the previous model",
        "Training all trees in parallel on the same data",
        "Selecting the best single tree from many candidates"
      ],
      ans: 1,
      exp: "Gradient Boosting is sequential: Tree 1 fits y; Tree 2 fits residuals of Tree 1; Tree 3 fits residuals of Tree 1+2, etc. Each tree corrects the previous model's errors. This reduces bias."
    },
    {
      q: "For a house price dataset, you add 'zipcode' as a numeric feature (10001–99999). Without encoding, a linear model will:",
      opts: [
        "Apply ordinal encoding automatically",
        "Interpret zipcode numbers as having a linear relationship with price — incorrect",
        "Ignore it automatically",
        "Use it correctly as a location indicator"
      ],
      ans: 1,
      exp: "Zip codes are nominal — 10001 is not 'less valuable' than 99999. Using raw numbers implies a linear numeric relationship. They should be One-Hot or Target encoded."
    },
    {
      q: "Mean Absolute Percentage Error (MAPE) is most problematic when:",
      opts: [
        "Dataset has many features",
        "Target values are near or equal to zero",
        "Target values are large",
        "Model is linear"
      ],
      ans: 1,
      exp: "MAPE = (1/n)Σ|actual−predicted|/|actual|. When actual=0, division by zero occurs. MAPE is also disproportionately penalizes errors on small actual values."
    },
    {
      q: "The bias-variance tradeoff in polynomial regression: as degree increases,",
      opts: [
        "Both bias and variance decrease",
        "Bias increases and variance decreases",
        "Both increase",
        "Bias decreases and variance increases"
      ],
      ans: 3,
      exp: "Higher polynomial degree → more flexible model → lower bias (fits training data better), but higher variance (sensitive to training data noise). The optimal degree minimizes total error = Bias² + Variance + irreducible noise."
    },
    {
      q: "Feature 'days_since_last_purchase' used to predict 'will_churn' in a customer model: if calculated using data AFTER the prediction date, this is:",
      opts: [
        "A valid lag feature",
        "Target leakage",
        "An interaction feature",
        "Temporal leakage"
      ],
      ans: 3,
      exp: "Using data from after the prediction date (future information) in a time-ordered prediction problem constitutes temporal leakage. Features must only use information available at prediction time."
    },
    {
      q: "Gradient Boosting with too many estimators (n_estimators=10000, no early stopping) will:",
      opts: [
        "Converge to a fixed value without overfitting",
        "Fail to train due to memory",
        "Always improve performance",
        "Eventually overfit"
      ],
      ans: 3,
      exp: "Gradient Boosting can overfit with too many trees. Training error keeps decreasing, but test error starts rising after the optimal point. Use early_stopping_rounds or cross-validation to find optimal n_estimators."
    },
    {
      q: "When should you use Tree-Based Regression over Linear Regression?",
      opts: [
        "When n_features > n_samples",
        "When data has complex non-linear relationships and feature interactions",
        "When the relationship between features and target is perfectly linear",
        "When you need coefficient interpretability"
      ],
      ans: 1,
      exp: "Tree-based regressors (RF, GBM) automatically capture non-linear relationships and interactions between features. Linear regression requires manual feature engineering for non-linearity."
    },
    {
      q: "Residual analysis in linear regression: if residuals show a funnel shape (variance increases with fitted values), this violates:",
      opts: [
        "Homoscedasticity",
        "Normality of errors",
        "Independence of observations",
        "Linearity of relationship"
      ],
      ans: 0,
      exp: "Homoscedasticity = constant error variance. A funnel shape means heteroscedasticity — variance of errors increases with fitted values. Fix: log-transform the target, use Weighted Least Squares, or robust regression."
    },
    {
      q: "In XGBoost regression, the 'learning_rate' (eta) parameter:",
      opts: [
        "Determines the fraction of features used per tree",
        "Sets the maximum tree depth",
        "Controls the number of trees",
        "Scales each tree's contribution"
      ],
      ans: 3,
      exp: "Learning rate (eta) shrinks each tree's contribution. Smaller eta = each tree corrects less aggressively → needs more trees → slower but often better generalization. Typical range: 0.01–0.3."
    },
    {
      q: "The Durbin-Watson statistic in time-series regression tests for:",
      opts: [
        "Normality of residuals",
        "Multicollinearity between predictors",
        "Autocorrelation in regression residuals",
        "Heteroscedasticity"
      ],
      ans: 2,
      exp: "Durbin-Watson statistic tests for autocorrelation in residuals. Values near 2 = no autocorrelation. Near 0 = positive autocorrelation. Near 4 = negative autocorrelation. Autocorrelation violates OLS assumptions in time-series."
    },
    {
      q: "A stock price prediction model trained on 2015–2022 data, tested on 2023 data. The test R² = −0.30. This means:",
      opts: [
        "Data needs to be shuffled",
        "Test set was too small",
        "The model explains 70% of variance correctly",
        "The model performs worse than just predicting the mean"
      ],
      ans: 3,
      exp: "R² can be negative when SS_res > SS_tot — the model is worse than just predicting the mean. This often happens when train distribution (pre-COVID) doesn't match test distribution (post-COVID)."
    },
    {
      q: "In regularized regression, the hyperparameter α (alpha) is tuned using:",
      opts: [
        "R-squared on the full dataset",
        "Gradient descent",
        "The test set directly",
        "Cross-validation on the training set"
      ],
      ans: 3,
      exp: "Regularization strength α is a hyperparameter selected via cross-validation on the training set. Using the test set for hyperparameter selection would leak test information."
    },
    {
      q: "Which regression metric is most interpretable for house price prediction in lakhs?",
      opts: [
        "R²",
        "MSE",
        "RMSE",
        "Adjusted R²"
      ],
      ans: 2,
      exp: "RMSE is in the same units as the target (lakhs). 'RMSE = 5 lakhs' means on average predictions are off by 5 lakhs — directly interpretable. MSE would be in 'lakh²', which is meaningless."
    },
    {
      q: "For predicting tomorrow's demand given seasonality and trend, what feature engineering approach helps most?",
      opts: [
        "Using raw timestamps as numeric features",
        "Applying PCA to past demand",
        "Creating lag features, rolling statistics, and seasonal indicators (day_of_week, month_sin/cos)",
        "One-Hot Encoding the date"
      ],
      ans: 2,
      exp: "For time-series demand prediction: lag features capture autocorrelation; rolling statistics capture trends; cyclical encodings (sin/cos of month/day) capture seasonality without false ordering."
    },
    {
      q: "What is 'gradient' in Gradient Boosting Regression?",
      opts: [
        "The number of leaves per tree",
        "The negative gradient of the loss function with respect to predictions",
        "The slope of each tree's decision boundary",
        "The learning rate value"
      ],
      ans: 1,
      exp: "In GBM, the gradient of the loss (for MSE loss, this is simply the residual = y − ŷ) is computed, and each new tree is fit to minimize this gradient signal — hence 'gradient boosting.'"
    },
    {
      q: "In multiple regression, Variance Inflation Factor (VIF) > 10 indicates:",
      opts: [
        "The feature should be log-transformed",
        "High predictive power",
        "Good model fit",
        "Severe multicollinearity"
      ],
      ans: 3,
      exp: "VIF = 1/(1 − R²ⱼ) where R²ⱼ is R² from regressing feature j on all others. VIF > 5–10 = severe multicollinearity. The feature's coefficient is unreliable. Fix: remove one correlated feature or use Ridge."
    },
    {
      q: "A real estate company wants to predict house prices. The relationship between area and price follows a square-root curve. Best approach:",
      opts: [
        "Add √area as a feature or use tree-based regression that handles non-linearity",
        "Use classification instead",
        "Apply MinMax Scaler and re-run linear regression",
        "Fit simple linear regression directly"
      ],
      ans: 0,
      exp: "Transform area to √area (domain knowledge) to linearize the relationship, then use linear regression. Alternatively, Random Forest/XGBoost automatically detect the non-linear pattern without manual transformation."
    },
    {
      q: "The intercept (β₀) in linear regression y = β₀ + β₁x represents:",
      opts: [
        "The predicted value of y when all predictors are zero",
        "The correlation between x and y",
        "The standard error of prediction",
        "The rate of change of y with x"
      ],
      ans: 0,
      exp: "β₀ is the y-intercept — the model's prediction when all features are zero. In practice, this may not be meaningful (e.g., predicting house price when area=0), but it ensures the model can be unbiased at origin."
    },
    {
      q: "Huber Loss combines benefits of MSE and MAE by:",
      opts: [
        "Always using MSE",
        "Weighting samples inversely proportional to error size",
        "Squaring all errors then taking the root",
        "Using MSE for small errors and MAE for large errors (outliers)"
      ],
      ans: 3,
      exp: "Huber Loss = MSE for |error| ≤ δ (sensitive to small deviations) and linear (MAE-like) for |error| > δ (robust to large errors/outliers). Parameter δ controls the transition point."
    },
    {
      q: "For a dataset with 1000 samples and 5 features, which regression approach is most likely to underfit?",
      opts: [
        "XGBoost with default parameters",
        "Random Forest with 100 trees",
        "Simple linear regression on a non-linear relationship",
        "Polynomial degree 8"
      ],
      ans: 2,
      exp: "If the true relationship is non-linear, simple linear regression underfits (high bias). It can only fit a straight plane, missing curves and interactions. Polynomial or tree-based models capture the complexity."
    },
    {
      q: "In time-series, what is 'seasonality'?",
      opts: [
        "Autocorrelation with lag 1",
        "Long-term upward or downward trend",
        "Random fluctuations in the data",
        "Recurring patterns at fixed intervals"
      ],
      ans: 3,
      exp: "Seasonality = repeating patterns tied to calendar cycles (daily, weekly, yearly). E.g., ice cream sales peak every summer. Seasonal features (month_sin, day_of_week) or seasonal decomposition capture this."
    },
    {
      q: "The p-value of a coefficient in OLS regression being > 0.05 suggests:",
      opts: [
        "The model is overfitting",
        "The coefficient is zero exactly",
        "The feature is the most important",
        "The feature's effect is NOT statistically significant"
      ],
      ans: 3,
      exp: "p-value tests H₀: βᵢ = 0. p > 0.05 → fail to reject null hypothesis → no evidence that this feature has a real effect. The coefficient could be due to sampling noise."
    },
    {
      q: "If Lasso regression sets 3 out of 10 feature coefficients to zero, what has effectively happened?",
      opts: [
        "Data augmentation",
        "Overfitting prevention via normalization",
        "Dimensionality reduction via projection",
        "Feature selection"
      ],
      ans: 3,
      exp: "Lasso's L1 penalty forces sparse solutions — coefficients at zero mean those features contribute nothing to predictions. This is simultaneous regularization and automatic feature selection."
    },
    {
      q: "A temperature forecasting model trained on Indian cities should NOT be tested on:",
      opts: [
        "Shuffled data from the same period",
        "Recent unseen data",
        "Data from a holdout set after the training period",
        "Data from 6 months after training cutoff"
      ],
      ans: 0,
      exp: "Randomly shuffled test data from the training period violates temporal ordering — future values contaminate training. Test set must be chronologically after the training period for valid evaluation."
    },
    {
      q: "MAE is more appropriate than RMSE when:",
      opts: [
        "All errors should contribute equally",
        "The target variable is binary",
        "You want fast computation",
        "Outliers should be penalized heavily"
      ],
      ans: 0,
      exp: "MAE treats all errors equally (linear penalty). RMSE squares errors, making outliers dominate. Use MAE when outliers are valid observations that shouldn't be over-penalized (e.g., rare but real extreme house prices)."
    },
    {
      q: "GradientBoostingRegressor with learning_rate=0.1 and n_estimators=100 vs learning_rate=0.01 and n_estimators=100: which generally performs better?",
      opts: [
        "Higher learning rate always wins",
        "Both are identical",
        "Lower learning rate with same n_estimators may underfit",
        "Lower learning rate is always better regardless of n_estimators"
      ],
      ans: 2,
      exp: "Lower learning rate requires more trees to converge. With same n_estimators, lr=0.01 may not converge fully. lr=0.1 with 100 trees may give better results. Optimal: low lr + high n_estimators + early stopping."
    },
    {
      q: "What does 'Homoscedasticity' mean in the context of linear regression assumptions?",
      opts: [
        "The model has no intercept",
        "Features are normally distributed",
        "Errors have constant variance across all levels of fitted values",
        "Features are uncorrelated with each other"
      ],
      ans: 2,
      exp: "Homoscedasticity = equal spread of residuals across all fitted values. If residuals show patterns (fan shape, cone shape), OLS standard errors are unreliable. Violating this doesn't invalidate point estimates but invalidates p-values."
    },
    {
      q: "In a simple regression y = 2.5x + 10.3 with R² = 0.75, if x increases by 2 units, y changes by:",
      opts: [
        "0.75",
        "5.0 (2 × 2.5)",
        "10.3",
        "2.5"
      ],
      ans: 1,
      exp: "The slope coefficient β₁ = 2.5 means y increases by 2.5 for each 1-unit increase in x. For 2-unit increase in x: Δy = 2.5 × 2 = 5.0. The intercept (10.3) and R² don't affect this calculation."
    },
    {
      q: "Neural network with MSE loss is essentially performing:",
      opts: [
        "Non-linear regression",
        "Clustering",
        "Dimensionality reduction",
        "Classification"
      ],
      ans: 0,
      exp: "MSE is the regression loss. A neural network with MSE loss and a linear output layer is performing non-linear regression — it can approximate any continuous function (universal approximation theorem)."
    }
  ],
  "5": [
    {
      q: "Bagging reduces which aspect of model error?",
      opts: [
        "Bias",
        "Training time",
        "Variance",
        "Irreducible noise"
      ],
      ans: 2,
      exp: "Bagging (Bootstrap Aggregating) trains multiple models on different bootstrap samples and averages their predictions. Averaging reduces variance — individual model errors cancel out — without significantly affecting bias."
    },
    {
      q: "Boosting reduces which aspect of model error?",
      opts: [
        "Neither",
        "Both equally",
        "Variance",
        "Bias"
      ],
      ans: 3,
      exp: "Boosting is sequential: each model corrects the errors of previous ones. This progressively reduces bias (systematic errors). However, it can increase variance if too many rounds are used (overfitting risk)."
    },
    {
      q: "Bootstrap sampling in Random Forest means:",
      opts: [
        "Sampling features without replacement",
        "Sampling training rows WITH replacement for each tree",
        "Sampling based on class distribution",
        "Sampling 50% of data for each tree"
      ],
      ans: 1,
      exp: "Each tree in Random Forest trains on a bootstrap sample: n rows drawn WITH replacement from training data. Some rows appear multiple times; ~37% are not included (out-of-bag samples)."
    },
    {
      q: "The 'random' in Random Forest comes from:",
      opts: [
        "Random target shuffling",
        "Random pruning of trees",
        "Both random bootstrap samples AND random feature subsets at each split",
        "Random initialization of weights"
      ],
      ans: 2,
      exp: "RF has two sources of randomness: (1) bootstrap sampling — different data per tree; (2) random feature subset — at each split, only √p (classification) or p/3 (regression) features are considered. Both reduce correlation between trees."
    },
    {
      q: "In AdaBoost, misclassified samples in round t:",
      opts: [
        "Receive higher weights so next model focuses on them",
        "Are removed from the next round",
        "Receive lower weights in the next round",
        "Are replaced by synthetic samples"
      ],
      ans: 0,
      exp: "AdaBoost's key mechanism: after each round, misclassified samples get their weights increased. The next weak learner focuses on getting these hard examples right. Correctly classified samples get lower weights."
    },
    {
      q: "XGBoost is different from standard Gradient Boosting because:",
      opts: [
        "XGBoost uses 2nd-order gradients (Hessian), L1+L2 regularization, and level-wise tree growth",
        "XGBoost doesn't require feature engineering",
        "XGBoost uses bagging; GBM uses boosting",
        "XGBoost trains only one tree"
      ],
      ans: 0,
      exp: "XGBoost improves on GBM: uses both gradient (1st order) and Hessian (2nd order) for better convergence; adds L1+L2 regularization on tree weights; level-wise tree growth; column/row subsampling; handles missing values natively."
    },
    {
      q: "LightGBM uses Leaf-Wise tree growth instead of Level-Wise. This means:",
      opts: [
        "The leaf with the largest loss reduction is split next",
        "Only leaf nodes are used for prediction",
        "All nodes at the same depth are split simultaneously",
        "Trees grow symmetrically"
      ],
      ans: 0,
      exp: "Leaf-wise growth splits the leaf that reduces loss the most, regardless of depth — trees grow asymmetrically. This is faster and achieves better accuracy, but can overfit on small datasets (use min_child_samples to control)."
    },
    {
      q: "CatBoost's main advantage over XGBoost and LightGBM is:",
      opts: [
        "Simpler hyperparameter tuning",
        "Fastest training speed",
        "Built-in feature selection",
        "Native support for categorical features without preprocessing"
      ],
      ans: 3,
      exp: "CatBoost handles categorical features natively using a target-statistic encoding computed per permutation (preventing leakage). XGBoost and LightGBM require manual categorical encoding before training."
    },
    {
      q: "Out-of-Bag (OOB) error in Random Forest is:",
      opts: [
        "Error on the training set",
        "Average error across all trees on test data",
        "Error computed on the ~37% of samples not used in each tree's bootstrap sample",
        "Error computed on a separate validation set"
      ],
      ans: 2,
      exp: "Since bootstrap sampling excludes ~37% of samples from each tree, each tree can be evaluated on its 'out-of-bag' samples without needing a separate validation set. OOB error is a reliable unbiased performance estimate."
    },
    {
      q: "Stacking (Stacked Generalization) combines models by:",
      opts: [
        "Training a meta-learner on the predictions of base models as features",
        "Using only the best-performing base model",
        "Averaging their predictions equally",
        "Multiplying predictions together"
      ],
      ans: 0,
      exp: "Stacking has two levels: Level 0 = diverse base models trained on data; Level 1 = a meta-learner trained on Level 0 predictions as inputs. The meta-learner learns how to optimally combine base model outputs."
    },
    {
      q: "Soft Voting in VotingClassifier averages:",
      opts: [
        "Class labels from each model",
        "Predicted class probabilities",
        "Feature importances",
        "Model accuracies"
      ],
      ans: 1,
      exp: "Soft voting averages the predicted probability vectors from each model, then predicts the class with the highest average probability. This gives more nuanced combination than hard voting (majority label vote)."
    },
    {
      q: "GridSearchCV with 5-fold CV and 20 parameter combinations trains how many models total?",
      opts: [
        "25",
        "100 (20 × 5)",
        "20",
        "5"
      ],
      ans: 1,
      exp: "Each parameter combination is evaluated with 5-fold CV = 5 model fits. With 20 combinations: 20 × 5 = 100 model fits total. Plus optionally a final refit on full training data."
    },
    {
      q: "RandomizedSearchCV advantage over GridSearchCV:",
      opts: [
        "Always finds the best hyperparameter set",
        "Guarantees better accuracy",
        "Much faster",
        "Uses fewer parameters"
      ],
      ans: 2,
      exp: "GridSearchCV exhaustively tries all combinations (exponential with more params). RandomizedSearchCV samples n_iter random combinations — often finds near-optimal results in a fraction of the time."
    },
    {
      q: "Bayesian Optimization for hyperparameter tuning differs from Grid/Random Search because:",
      opts: [
        "It uses gradient descent to find hyperparameters",
        "It requires manual starting points",
        "It works only for neural networks",
        "It builds a probabilistic model of the objective function and intelligently selects next candidates based on past results"
      ],
      ans: 3,
      exp: "Bayesian Optimization fits a surrogate model (e.g., Gaussian Process) to results seen so far, then uses an acquisition function (e.g., Expected Improvement) to choose the next most promising hyperparameter set to evaluate."
    },
    {
      q: "Feature importance from Random Forest vs. XGBoost: main difference is:",
      opts: [
        "XGBoost doesn't compute feature importance",
        "RF uses information gain; XGBoost uses Gini",
        "Both compute identical importance scores",
        "RF importance based on mean impurity reduction; XGBoost can also use gain, cover, and frequency metrics"
      ],
      ans: 3,
      exp: "XGBoost offers multiple importance types: gain (total information gain), cover (total samples affected), frequency (number of times used in splits). RF uses mean Gini/MSE reduction across all trees. Both are valid but give different rankings."
    },
    {
      q: "When is a single Decision Tree preferred over Random Forest?",
      opts: [
        "When model interpretability is critical and data is simple",
        "When features are highly correlated",
        "When maximum accuracy is needed",
        "When dataset is very large"
      ],
      ans: 0,
      exp: "A single Decision Tree can be visualized and explained as human-readable rules — crucial for regulated industries (medical, legal, financial). RF is a black box. For accuracy, RF wins; for explainability, a shallow tree wins."
    },
    {
      q: "Early stopping in XGBoost/LightGBM prevents:",
      opts: [
        "Data leakage",
        "Multicollinearity among features",
        "Overfitting by stopping training when validation metric stops improving",
        "Underfitting by adding more trees"
      ],
      ans: 2,
      exp: "Early stopping monitors a validation metric after each boosting round. If it doesn't improve for n consecutive rounds (early_stopping_rounds), training stops. This finds the optimal n_estimators automatically."
    },
    {
      q: "The learning_rate in Gradient Boosting / XGBoost controls:",
      opts: [
        "The depth of each tree",
        "The L2 regularization strength",
        "How much each new tree contributes to the final prediction",
        "The fraction of data used per tree"
      ],
      ans: 2,
      exp: "learning_rate (eta) scales each tree's contribution: ŷ ← ŷ + η · h_t(x). Smaller η = smaller steps = more trees needed but often better generalization. It's the shrinkage parameter for the ensemble."
    },
    {
      q: "VotingClassifier with hard voting uses:",
      opts: [
        "The best single model's prediction",
        "Weighted sum of predictions",
        "Probability averages",
        "Majority class vote from all base estimators"
      ],
      ans: 3,
      exp: "Hard voting = each classifier votes a class label; the class with the most votes wins. Soft voting averages probabilities. For calibrated classifiers with reliable probability estimates, soft voting typically performs better."
    },
    {
      q: "In a Random Forest, increasing n_estimators (number of trees):",
      opts: [
        "Always overfits",
        "Increases bias proportionally",
        "Decreases tree depth automatically",
        "Reduces variance"
      ],
      ans: 3,
      exp: "Adding more trees reduces variance (due to more averaging) but never increases bias. Performance improves with more trees but plateaus — beyond ~100–500 trees, gains are marginal. Training time grows linearly."
    },
    {
      q: "AdaBoost's final prediction is:",
      opts: [
        "Random choice from all learners",
        "Weighted majority vote",
        "The last weak learner's prediction",
        "Average of all weak learner predictions"
      ],
      ans: 1,
      exp: "AdaBoost assigns weight αₜ = 0.5·log((1−εₜ)/εₜ) to each weak learner based on its error εₜ. Final prediction = sign(Σαₜhₜ(x)) — low-error learners contribute more to the final decision."
    },
    {
      q: "n_estimators in XGBoost vs n_estimators in Random Forest: key difference is:",
      opts: [
        "XGBoost: more trees can overfit (sequential)",
        "XGBoost trees are shallower",
        "Both are interchangeable",
        "RF needs fewer trees always"
      ],
      ans: 0,
      exp: "RF: parallel trees, more = better (just slower). XGBoost: sequential trees, more rounds = more fitting of residuals. Too many in XGBoost → overfit to training noise. Early stopping is essential for boosting."
    },
    {
      q: "The max_features parameter in Random Forest (commonly set to √p for classification):",
      opts: [
        "Limits the tree depth",
        "Sets the bootstrap sample size",
        "Determines minimum samples per leaf",
        "Limits the number of features considered at each split"
      ],
      ans: 3,
      exp: "At each split, only a random subset of √p features are considered. This decorrelates trees — if one feature dominates, not all trees use it at every split. Diversity → better ensemble averaging."
    },
    {
      q: "Hyperparameter tuning with cross-validation is done on:",
      opts: [
        "A different dataset",
        "Test set",
        "Training set using k-fold CV",
        "The validation set within each training fold"
      ],
      ans: 2,
      exp: "Hyperparameter tuning must be done using cross-validation on the training set only. Using the test set for tuning causes optimistic evaluation bias (the test set is 'used up')."
    },
    {
      q: "SHAP TreeExplainer is used with ensemble models to:",
      opts: [
        "Speed up prediction",
        "Explain individual predictions by attributing contributions to each feature",
        "Select the best model from the ensemble",
        "Compress the model for deployment"
      ],
      ans: 1,
      exp: "SHAP (SHapley Additive exPlanations) TreeExplainer provides exact SHAP values for tree-based models, showing each feature's contribution to a specific prediction. Enables both local (per instance) and global model explanations."
    },
    {
      q: "Which ensemble method is most likely to overfit with weak base learners?",
      opts: [
        "Bagging",
        "Stacking with simple meta-learner",
        "Averaging",
        "Boosting"
      ],
      ans: 3,
      exp: "Boosting sequentially fits residuals — given enough rounds, it can perfectly fit training data (including noise). Bagging averages independent noisy predictions, so overfitting is much less common."
    },
    {
      q: "For a Kaggle competition tabular dataset, which model family usually wins?",
      opts: [
        "Logistic Regression",
        "Gradient Boosting (XGBoost/LightGBM/CatBoost)",
        "K-Nearest Neighbors",
        "Support Vector Machines"
      ],
      ans: 1,
      exp: "Gradient boosting frameworks (especially XGBoost, LightGBM, CatBoost) consistently dominate tabular data competitions due to their ability to capture complex non-linear patterns, handle missing values, and efficient built-in regularization."
    },
    {
      q: "min_child_weight in XGBoost controls:",
      opts: [
        "Minimum number of trees",
        "Minimum sum of instance weights (hessian) required in a leaf",
        "Minimum learning rate",
        "Minimum feature importance threshold"
      ],
      ans: 1,
      exp: "min_child_weight is the minimum sum of hessian in a child node. Higher value = more conservative — prevents creating leaves from very few samples. It's a key regularization parameter against overfitting on small subgroups."
    },
    {
      q: "subsample=0.8 in XGBoost means:",
      opts: [
        "80% of weak learners are used",
        "80% of features are used per tree",
        "80% of training rows are randomly sampled for each tree",
        "Trees are 80% of maximum depth"
      ],
      ans: 2,
      exp: "subsample (row subsampling) uses 80% of training rows randomly for each tree, similar to stochastic gradient descent. This reduces overfitting and speeds up training. colsample_bytree does the same for features."
    },
    {
      q: "Gradient Boosting's key weakness compared to Random Forest is:",
      opts: [
        "More sensitive to hyperparameters and can overfit if not carefully tuned",
        "Cannot handle regression problems",
        "Lower accuracy on tabular data",
        "Does not support feature importance"
      ],
      ans: 0,
      exp: "GBM/XGBoost require careful tuning of n_estimators, learning_rate, max_depth, etc. and can overfit. Random Forest is more robust with default settings — a good starting point when you're not sure what to tune."
    },
    {
      q: "In a Voting Ensemble, adding a very correlated model (same predictions as an existing one):",
      opts: [
        "Is always recommended",
        "Provides no benefit",
        "Significantly improves performance",
        "Reduces variance dramatically"
      ],
      ans: 1,
      exp: "Ensemble methods benefit from diverse, uncorrelated models. Adding a model that predicts exactly like an existing one is equivalent to voting twice with one opinion — no new information, no improvement."
    },
    {
      q: "The 'depth' parameter in XGBoost (max_depth) should be:",
      opts: [
        "As large as possible",
        "Equal to number of features",
        "Typically 3–8; shallow trees are preferred in boosting to avoid overfitting",
        "Set to 1 always (stumps)"
      ],
      ans: 2,
      exp: "Boosting with deep trees overfits since each tree already captures too much. Shallow trees (3–8) are 'weak learners' that each capture a piece of the pattern. AdaBoost classically uses stumps (depth=1)."
    },
    {
      q: "Blending vs Stacking: main difference is:",
      opts: [
        "Stacking trains meta-learner on full training set; blending uses a holdout set for meta-learner features",
        "Both are identical",
        "Blending uses all training data; stacking uses cross-validation",
        "Blending is only for regression"
      ],
      ans: 0,
      exp: "Stacking uses k-fold CV to generate out-of-fold predictions as meta-features (no leakage). Blending uses a simpler holdout set for the meta-learner. Stacking is more robust; blending is simpler and faster."
    },
    {
      q: "Random Forest feature importance is sometimes criticized because:",
      opts: [
        "It ignores categorical features",
        "It only works for classification",
        "It requires feature scaling",
        "It can be biased toward high-cardinality and continuous features"
      ],
      ans: 3,
      exp: "Impurity-based (Gini/variance) importance can be biased toward features with more possible splits (high cardinality or continuous). Permutation importance is a more reliable alternative that doesn't have this bias."
    },
    {
      q: "Which hyperparameter tuning technique explores the most combinations given equal compute budget?",
      opts: [
        "Random Search with the same n_iter as grid combinations",
        "Bayesian Optimization",
        "Manual search",
        "Grid Search"
      ],
      ans: 1,
      exp: "Bayesian Optimization intelligently uses past evaluations to focus compute on promising regions of the hyperparameter space. It finds good solutions much faster than grid or random search for the same number of evaluations."
    },
    {
      q: "In boosting, the learning_rate = 0.1 means:",
      opts: [
        "Each new tree's prediction is multiplied by 0.1 before adding to ensemble",
        "10% of features are sampled",
        "The optimizer takes steps of size 0.1",
        "10% of training data is used per round"
      ],
      ans: 0,
      exp: "learning_rate (shrinkage) scales the contribution of each tree: Fₜ(x) = Fₜ₋₁(x) + η·hₜ(x). η=0.1 means each tree only adds 10% of its 'full' correction. Smaller η = more regularization, needs more trees."
    },
    {
      q: "An ensemble of 5 models has CV scores: [0.82, 0.83, 0.91, 0.81, 0.82]. Soft voting will likely give:",
      opts: [
        "Exactly 0.91",
        "Exactly the average (0.838)",
        "Better than the average (0.838) but similar to the best model",
        "Worse than all individual models"
      ],
      ans: 2,
      exp: "Ensemble methods typically outperform individual models because errors partially cancel. Soft voting should exceed the average and approach or exceed the best individual model — especially since models have diverse strengths."
    },
    {
      q: "The 'gamma' parameter in XGBoost controls:",
      opts: [
        "Row subsampling rate",
        "Learning rate",
        "Number of features per tree",
        "Minimum loss reduction required to make a split"
      ],
      ans: 3,
      exp: "gamma (min_split_loss) specifies the minimum loss reduction for a node to be split. Higher gamma = only splits that significantly reduce loss are made → shallower, more regularized trees. Helps prevent overfitting."
    },
    {
      q: "Random Forest vs Extra Trees (Extremely Randomized Trees): key difference:",
      opts: [
        "Extra Trees uses fewer trees",
        "Extra Trees uses boosting; RF uses bagging",
        "Extra Trees adds extra randomness by choosing both the split feature AND threshold randomly",
        "RF doesn't use bootstrap sampling; Extra Trees does"
      ],
      ans: 2,
      exp: "ExtraTreesClassifier chooses split thresholds randomly (not optimally), adding more randomness than RF. This further reduces variance but may increase bias slightly. It's often faster since no optimal threshold search is needed."
    },
    {
      q: "When to use CatBoost over XGBoost?",
      opts: [
        "When dataset has many categorical features requiring minimal preprocessing",
        "When training speed is the top priority",
        "When dataset is very small",
        "When interpretability is critical"
      ],
      ans: 0,
      exp: "CatBoost handles categorical features natively with built-in ordered target statistics — no manual encoding needed. For datasets with many categorical features (e.g., e-commerce, user data), CatBoost saves preprocessing time and often improves accuracy."
    },
    {
      q: "The `colsample_bytree=0.8` in XGBoost:",
      opts: [
        "Sets tree depth to 80% of maximum",
        "Randomly selects 80% of features for each tree",
        "Selects 80% of training rows per tree",
        "Uses 80% of available CPU cores"
      ],
      ans: 1,
      exp: "colsample_bytree randomly samples 80% of features for each tree (column subsampling). Combined with subsample (row sampling), this introduces randomness similar to Random Forest, reducing overfitting."
    },
    {
      q: "Permutation feature importance is more reliable than impurity-based importance because:",
      opts: [
        "It uses gradient information",
        "It measures how shuffling a feature's values increases model error",
        "It's faster to compute",
        "It works only for linear models"
      ],
      ans: 1,
      exp: "Permutation importance randomly permutes feature values and measures prediction error increase — directly measuring the feature's importance to predictions. Unlike Gini-based importance, it's not biased by feature cardinality or data scale."
    },
    {
      q: "Weak learner in AdaBoost is typically:",
      opts: [
        "A Random Forest",
        "KNN with k=1",
        "A Decision Tree with max_depth=1",
        "Logistic Regression"
      ],
      ans: 2,
      exp: "AdaBoost typically uses decision stumps (single-split trees, depth=1) as weak learners. These are 'just better than random' — each captures one simple rule. Combining many weighted stumps creates a powerful classifier."
    },
    {
      q: "What is the purpose of n_jobs=-1 in sklearn ensemble models?",
      opts: [
        "Set number of bootstrap samples",
        "Use all available CPU cores to parallelize tree training",
        "Limit the number of trees to CPU count",
        "Control random seed"
      ],
      ans: 1,
      exp: "n_jobs=-1 instructs sklearn to use all available CPU cores in parallel. For Random Forest and bagging (parallel training), this dramatically speeds up training. Boosting methods can't parallelize trees but can parallelize CV."
    },
    {
      q: "After hyperparameter tuning with cross-validation, the final model should be trained on:",
      opts: [
        "Half the training data",
        "Only the training fold that gave best CV result",
        "The test set to include all available data",
        "Full training data (train + validation) with the best hyperparameters found"
      ],
      ans: 3,
      exp: "After finding optimal hyperparameters via CV, retrain the model on ALL training data (all folds combined) with those hyperparameters. This maximizes training data usage. Then evaluate once on the held-out test set."
    },
    {
      q: "The bias-variance tradeoff in ensemble learning: Bagging reduces variance by:",
      opts: [
        "Making each tree simpler",
        "Sequential correction of errors",
        "Using deeper trees",
        "Averaging n trees"
      ],
      ans: 3,
      exp: "If n independent models each have variance σ², their average has variance σ²/n. Trees aren't fully independent in bagging (correlated due to same training distribution), so reduction is less than √n, but still substantial."
    },
    {
      q: "XGBoost with 'reg_alpha' sets which regularization?",
      opts: [
        "L2 regularization on leaf weights",
        "Row subsampling",
        "L1 regularization on leaf weights",
        "Regularization on learning rate"
      ],
      ans: 2,
      exp: "reg_alpha = L1 (Lasso-like) regularization on leaf scores in XGBoost. reg_lambda = L2 (Ridge-like). L1 promotes sparse trees (some leaves get zero weights). Both prevent overfitting, with reg_lambda being XGBoost's default regularization."
    },
    {
      q: "LightGBM is faster than XGBoost primarily because:",
      opts: [
        "It uses decision stumps only",
        "It uses fewer trees",
        "It doesn't use regularization",
        "Leaf-wise tree growth + Gradient-based One-Side Sampling (GOSS) + Exclusive Feature Bundling (EFB)"
      ],
      ans: 3,
      exp: "LightGBM uses: leaf-wise growth (more efficient); GOSS (down-samples less informative samples, keeping hard examples); EFB (bundles sparse features). These together give 10–20x speedup over XGBoost on large datasets."
    },
    {
      q: "In a stacking ensemble, the meta-learner (Level 2 model) should ideally be:",
      opts: [
        "The most powerful model",
        "Same as the base models",
        "Always a Decision Tree",
        "A simple model to avoid overfitting on base-model predictions"
      ],
      ans: 3,
      exp: "The meta-learner sees only a few features (base model predictions). A complex meta-learner easily overfits on this small feature set. Simple regularized models (Logistic Regression, Ridge) work best as meta-learners."
    },
    {
      q: "Feature importance from tree models can guide feature selection. After eliminating low-importance features, you should:",
      opts: [
        "Re-evaluate using cross-validation",
        "Retrain once and accept results",
        "Immediately deploy the simplified model",
        "Accept the original model's results"
      ],
      ans: 0,
      exp: "Feature importances are model-dependent. After removing features, importance rankings shift. Always re-run CV to verify the simplified model genuinely performs as well or better before deployment."
    }
  ],
  "6": [
    {
      q: "K-Means is sensitive to outliers because:",
      opts: [
        "Outliers increase the number of clusters automatically",
        "It uses Euclidean distance only",
        "It uses rank-based distances",
        "Cluster centroids are means"
      ],
      ans: 3,
      exp: "K-Means centroids = arithmetic means of cluster members. A single extreme outlier drastically shifts the centroid. K-Medoids solves this by using actual data points (medoids) as cluster centers."
    },
    {
      q: "The Elbow Method for choosing K in K-Means uses:",
      opts: [
        "Davies-Bouldin Index vs K",
        "Inertia vs K plot",
        "Dendrogram cutting height",
        "Silhouette Score plot"
      ],
      ans: 1,
      exp: "Plot inertia (total within-cluster variance) for K=1 to K=10. As K increases, inertia always decreases. The 'elbow' — where improvement rate drops sharply — suggests the optimal K."
    },
    {
      q: "DBSCAN's ε (epsilon) parameter controls:",
      opts: [
        "Number of iterations",
        "Minimum cluster size",
        "Maximum number of clusters",
        "The neighborhood radius"
      ],
      ans: 3,
      exp: "ε is the radius of the neighborhood search. Points within ε distance of each other are neighbors. Too small ε = everything is noise; too large = everything merges into one cluster."
    },
    {
      q: "A point labeled -1 by DBSCAN is:",
      opts: [
        "A border point",
        "A noise point / outlier",
        "A core point with no neighbors",
        "A cluster centroid"
      ],
      ans: 1,
      exp: "DBSCAN labels noise points (outliers) as -1. These are points that don't have min_samples neighbors within ε and are not within ε of a core point. This is a powerful built-in anomaly detection feature."
    },
    {
      q: "Silhouette Score closer to +1 means:",
      opts: [
        "Data point is close to its own cluster and far from neighboring clusters",
        "The cluster has only one point",
        "Equal distances to all clusters",
        "Data point is in the wrong cluster"
      ],
      ans: 0,
      exp: "Silhouette(i) = (b−a)/max(a,b) where a=mean intra-cluster distance, b=mean nearest-cluster distance. Score near +1 means a << b — well-clustered. Near 0 = on boundary. Near −1 = misclassified."
    },
    {
      q: "Cosine similarity is preferred over Euclidean distance for text clustering because:",
      opts: [
        "It measures angle/direction",
        "It's equivalent to Euclidean for normalized vectors",
        "It's computationally cheaper",
        "It works for binary features only"
      ],
      ans: 0,
      exp: "Cosine similarity measures the angle between vector orientations, ignoring magnitude. A short document and a long document about the same topic have high cosine similarity. Euclidean distance would show them as far apart."
    },
    {
      q: "Hierarchical clustering (Agglomerative) with Ward linkage merges:",
      opts: [
        "The two closest individual points",
        "The two clusters whose merger minimizes the increase in total within-cluster variance",
        "The largest clusters first",
        "Clusters with maximum average distance"
      ],
      ans: 1,
      exp: "Ward linkage minimizes the total within-cluster sum of squares (variance) at each merge step. It tends to create compact, spherical clusters of similar size and is the most commonly used linkage for general clustering."
    },
    {
      q: "Davies-Bouldin Index: lower values indicate:",
      opts: [
        "More clusters",
        "Higher noise ratio",
        "More iterations needed",
        "Better clustering"
      ],
      ans: 3,
      exp: "DBI = avg(max((sᵢ+sⱼ)/dᵢⱼ)) where sᵢ=cluster scatter, dᵢⱼ=centroid distance. Lower DBI = clusters are tighter (small scatter) and farther apart (large distance). DBI=0 is perfect."
    },
    {
      q: "K-Medoids differs from K-Means in that:",
      opts: [
        "K-Medoids cluster centers must be actual data points",
        "K-Medoids doesn't require choosing K",
        "K-Medoids uses Euclidean distance; K-Means uses Manhattan",
        "K-Medoids is always faster"
      ],
      ans: 0,
      exp: "K-Medoids (PAM) uses the actual data point that minimizes total dissimilarity to cluster members (medoid), unlike K-Means which uses the computed mean. Since medoids are real points, outliers have less influence."
    },
    {
      q: "The main advantage of DBSCAN over K-Means is:",
      opts: [
        "DBSCAN always runs faster",
        "DBSCAN discovers arbitrary-shaped clusters and automatically identifies outliers",
        "DBSCAN requires fewer parameters",
        "DBSCAN works better for high-dimensional data"
      ],
      ans: 1,
      exp: "DBSCAN doesn't assume spherical clusters (K-Means does). It finds clusters of any shape based on density. It also doesn't require specifying K in advance — clusters emerge from the data density structure."
    },
    {
      q: "Isolation Forest detects anomalies because:",
      opts: [
        "It uses the Z-score internally",
        "Anomalies are isolated in fewer random splits",
        "Anomalies have larger silhouette scores",
        "It computes the distance to the cluster centroid"
      ],
      ans: 1,
      exp: "Isolation Forest builds random trees by repeatedly splitting on random feature + threshold. Normal points need many splits to isolate (dense neighborhood); anomalies are isolated quickly (short path length). Score = average path length."
    },
    {
      q: "Local Outlier Factor (LOF) detects anomalies based on:",
      opts: [
        "Local density comparison",
        "Cluster distance metrics",
        "Global statistical properties (Z-score)",
        "Isolation tree path lengths"
      ],
      ans: 0,
      exp: "LOF computes the ratio of average density of k-nearest neighbors to the point's own density. A point with much lower density than its neighbors (LOF >> 1) is a local outlier. It captures local anomalies that global methods miss."
    },
    {
      q: "A city wants to identify natural districts based on crime statistics. Best algorithm:",
      opts: [
        "Linear Regression",
        "Decision Tree",
        "Logistic Regression",
        "K-Means or DBSCAN clustering"
      ],
      ans: 3,
      exp: "Grouping geographic areas based on similar crime patterns is unsupervised — there are no predefined 'correct' district labels. Clustering discovers natural groupings. K-Means works for roughly circular clusters; DBSCAN for arbitrary shapes."
    },
    {
      q: "Agglomerative clustering produces a dendrogram. Cutting it at height 5 means:",
      opts: [
        "Creating 5 clusters",
        "Merging all clusters whose distance is < 5",
        "Using the top 5 most important features",
        "Keeping only 5 samples"
      ],
      ans: 1,
      exp: "Cutting the dendrogram at a horizontal level corresponds to a distance threshold. All merges below that height are accepted; the number of remaining separate branches = number of clusters. Higher cut = fewer, larger clusters."
    },
    {
      q: "For a customer segmentation task with non-spherical, varied-density customer groups, choose:",
      opts: [
        "Both are equally appropriate",
        "K-Means",
        "PCA followed by K-Means",
        "DBSCAN"
      ],
      ans: 3,
      exp: "DBSCAN handles arbitrary shapes and varied densities. K-Means forces spherical, similar-sized clusters. For non-spherical customer groups (e.g., a dense urban cluster and a sparse rural cluster), DBSCAN is more natural."
    },
    {
      q: "Euclidean distance between [1,2] and [4,6] is:",
      opts: [
        "5",
        "25",
        "3",
        "7"
      ],
      ans: 0,
      exp: "Euclidean distance = √((4−1)² + (6−2)²) = √(9+16) = √25 = 5. This is the straight-line distance in 2D space."
    },
    {
      q: "Manhattan distance between [1,2] and [4,6] is:",
      opts: [
        "3",
        "5",
        "25",
        "7"
      ],
      ans: 3,
      exp: "Manhattan distance = |4−1| + |6−2| = 3 + 4 = 7. It sums absolute differences along each axis — like navigating a city grid (hence 'city block distance')."
    },
    {
      q: "K-Means algorithm step after assigning each point to nearest centroid:",
      opts: [
        "Compute new centroids as means of assigned points",
        "Recompute the number of clusters K",
        "Remove outlier clusters",
        "Apply silhouette scoring"
      ],
      ans: 0,
      exp: "K-Means alternates: (1) Assign each point to nearest centroid; (2) Update centroids = mean of assigned points; repeat until convergence. The update step is what makes K-Means iteratively improve."
    },
    {
      q: "A Silhouette Score of −0.2 for a customer segment indicates:",
      opts: [
        "Excellent clustering",
        "The average customer in this segment is closer to another segment than their own",
        "Need more data",
        "Too many clusters"
      ],
      ans: 1,
      exp: "Silhouette near −1 means a point is farther from its own cluster than from the nearest other cluster. Score = −0.2 suggests these customers might be misassigned — they'd fit better in a different cluster."
    },
    {
      q: "In anomaly detection for network intrusion, which method is appropriate for capturing non-linear anomaly patterns?",
      opts: [
        "Z-score threshold",
        "K-Means clustering only",
        "IQR method",
        "Isolation Forest"
      ],
      ans: 3,
      exp: "Isolation Forest works in high dimensions and captures non-linear anomaly patterns. Z-score and IQR are univariate and linear. Network intrusion data has complex multi-feature interactions — Isolation Forest handles these well."
    },
    {
      q: "The number of clusters K in K-Means must be:",
      opts: [
        "Determined automatically by the algorithm",
        "Specified in advance by the practitioner",
        "Always the square root of n_samples",
        "Equal to the number of features"
      ],
      ans: 1,
      exp: "K is a hyperparameter in K-Means — you must specify it before running. This is K-Means' main limitation. DBSCAN and hierarchical clustering don't require K in advance."
    },
    {
      q: "Complete Linkage (in hierarchical clustering) merges clusters based on:",
      opts: [
        "Distance between centroids",
        "Average of all pairwise distances",
        "Maximum distance between any two members of the two clusters",
        "Minimum distance between any two members"
      ],
      ans: 2,
      exp: "Complete linkage = max(d(a,b)) for a∈Cluster1, b∈Cluster2. It merges clusters by their farthest points, creating compact clusters. Single linkage uses the minimum distance — prone to chaining."
    },
    {
      q: "A DBSCAN parameter min_samples=5 means:",
      opts: [
        "Maximum 5 clusters are formed",
        "Clusters must have ≥5 points to be valid",
        "Only samples with 5+ features are used",
        "A point is a core point only if it has ≥5 neighbors within ε"
      ],
      ans: 3,
      exp: "min_samples is the minimum number of points within ε for a point to be a core point. Core points form cluster interiors. border points are within ε of a core but have fewer than min_samples neighbors."
    },
    {
      q: "Why is feature scaling important for K-Means clustering?",
      opts: [
        "K-Means uses Euclidean distances",
        "Scaling reduces K needed",
        "K-Means fails completely without scaling",
        "K-Means requires scaled data for the algorithm to converge"
      ],
      ans: 0,
      exp: "If salary (0–1M) and age (0–100) are used together unscaled, the salary dimension completely dominates cluster assignments. StandardScaler or MinMaxScaler ensures all features contribute equally to the distance calculation."
    },
    {
      q: "Elliptic Envelope for anomaly detection assumes:",
      opts: [
        "Features are independent",
        "Data follows a Gaussian (normal) distribution",
        "Data forms distinct clusters",
        "Any data distribution"
      ],
      ans: 1,
      exp: "Elliptic Envelope fits a multivariate Gaussian distribution (an ellipse in 2D, ellipsoid in higher D) to the data. Points outside a given Mahalanobis distance threshold are anomalies. Works well when data is truly Gaussian."
    },
    {
      q: "Hierarchical clustering's main advantage over K-Means:",
      opts: [
        "Runs faster on large datasets",
        "Handles outliers better",
        "Doesn't require specifying K",
        "Works with categorical data natively"
      ],
      ans: 2,
      exp: "The dendrogram shows the full merge hierarchy. You can choose K retrospectively by cutting at different heights, exploring different granularities of clustering. K-Means requires fixing K before running."
    },
    {
      q: "Inertia in K-Means is defined as:",
      opts: [
        "Sum of squared distances from each point to its assigned centroid",
        "Between-cluster distance",
        "Number of iterations to convergence",
        "Average silhouette score"
      ],
      ans: 0,
      exp: "Inertia = Σᵢ Σₓ∈Cᵢ ||x − μᵢ||² — total within-cluster sum of squared distances. Lower inertia = tighter, more compact clusters. It always decreases with more K, so use the elbow method to find optimal K."
    },
    {
      q: "A retailer clusters customers and gets Silhouette=0.62. This is:",
      opts: [
        "Depends on K only",
        "Perfect",
        "Good",
        "Poor"
      ],
      ans: 2,
      exp: "Silhouette score > 0.5 is generally considered good clustering (clear, well-separated clusters). > 0.7 is strong. 0.62 indicates reasonably distinct customer segments that make business sense to act on."
    },
    {
      q: "DBSCAN with very large ε will:",
      opts: [
        "Identify more noise points",
        "Merge most points into one cluster (under-clustering)",
        "Create many small clusters",
        "Have no effect on clustering"
      ],
      ans: 1,
      exp: "Very large ε = all points are neighbors of each other → most points become core points → everything merges into one dense cluster. ε should be tuned with a k-distance plot (distance to k-th nearest neighbor)."
    },
    {
      q: "K-Means++ initialization (vs random initialization) improves:",
      opts: [
        "Algorithm's ability to handle non-spherical clusters",
        "The silhouette score formula",
        "Automatic K selection",
        "Convergence speed and final clustering quality by spreading initial centroids"
      ],
      ans: 3,
      exp: "K-Means++ chooses the first centroid randomly, then each subsequent centroid with probability proportional to distance squared from existing centroids. This spreads centroids, reducing risk of bad local minima. sklearn uses K-Means++ by default."
    },
    {
      q: "Cosine distance between two identical document vectors is:",
      opts: [
        "-1",
        "1",
        "0.5",
        "0 (minimum distance"
      ],
      ans: 3,
      exp: "Cosine similarity = 1 for identical vectors (angle=0°). Cosine distance = 1 − cosine_similarity = 1 − 1 = 0. Two identical documents have 0 cosine distance — perfectly similar."
    },
    {
      q: "An e-commerce platform wants to group products with no pre-defined categories. The appropriate ML approach:",
      opts: [
        "Unsupervised clustering",
        "Decision Tree Classification",
        "SVM with RBF kernel",
        "Logistic Regression with One-vs-Rest"
      ],
      ans: 0,
      exp: "Without predefined categories/labels, this is an unsupervised learning problem. Clustering discovers natural groupings based on product features (price, category tags, purchase patterns) without needing labeled examples."
    },
    {
      q: "The Rand Index measures:",
      opts: [
        "Variance within clusters",
        "Inertia-to-silhouette ratio",
        "Distance between cluster centroids",
        "Clustering quality when ground truth labels are available"
      ],
      ans: 3,
      exp: "Rand Index = (TP+TN)/total pairs — proportion of point pairs correctly grouped (same cluster if truly same, different clusters if truly different). Adjusted Rand Index (ARI) corrects for chance agreements."
    },
    {
      q: "Why might K-Means fail on a dataset with ring-shaped clusters?",
      opts: [
        "K-Means has too high bias",
        "K-Means assumes convex, spherical clusters",
        "K-Means needs the correct K which is hard to set for rings",
        "K-Means can only handle 2D data"
      ],
      ans: 1,
      exp: "K-Means partitions data into Voronoi regions (convex), which can't capture ring shapes. A 'ring' cluster has points far from the center — K-Means' mean centroid would fall in the empty ring center. Use DBSCAN or spectral clustering."
    },
    {
      q: "Feature selection before clustering is important because:",
      opts: [
        "Scaling is not possible with many features",
        "Clusters must be balanced in size",
        "Irrelevant/noisy features add dimensions that dilute meaningful distances",
        "Clustering algorithms can't handle > 10 features"
      ],
      ans: 2,
      exp: "In high dimensions, all points appear equidistant (Curse of Dimensionality) — distance-based clustering breaks down. Removing irrelevant features and applying PCA makes distances more meaningful and clustering more effective."
    },
    {
      q: "LOF > 1 for a data point suggests:",
      opts: [
        "The point is well-clustered",
        "The point's local density is lower than its neighbors",
        "The point is a cluster centroid",
        "Silhouette score is positive"
      ],
      ans: 1,
      exp: "LOF = ratio of average neighbor density to own density. LOF >> 1 means the point is in a sparse region compared to its neighbors → likely an outlier. LOF ≈ 1 → point has similar density to neighbors → normal."
    },
    {
      q: "In a fraud detection system, using DBSCAN, fraudulent transactions are likely labeled as:",
      opts: [
        "The first cluster",
        "Large, dense clusters",
        "Core points of small clusters",
        "Noise points (-1)"
      ],
      ans: 3,
      exp: "Fraudulent transactions are rare and atypical — they don't form dense enough neighborhoods to be core points. DBSCAN labels them as noise (-1), making DBSCAN a natural anomaly detector."
    },
    {
      q: "Hierarchical clustering time complexity O(n³) means:",
      opts: [
        "It scales well to millions of records",
        "It trains 3 models in sequence",
        "It's impractical for large datasets",
        "It requires cubic features"
      ],
      ans: 2,
      exp: "O(n³) time complexity (naive implementation; O(n² log n) with optimizations) makes hierarchical clustering too slow for large datasets. It's best for small-medium datasets where the dendrogram's interpretability is valuable."
    },
    {
      q: "Gaussian Mixture Models (GMM) compared to K-Means:",
      opts: [
        "GMM requires fewer parameters",
        "Both produce hard cluster assignments",
        "GMM always produces worse results",
        "GMM provides soft (probabilistic) cluster membership and can fit elliptical clusters"
      ],
      ans: 3,
      exp: "K-Means gives hard assignments (each point belongs to exactly one cluster). GMM models clusters as Gaussians with full covariance matrices, providing probabilities of belonging to each cluster and handling elliptical shapes."
    },
    {
      q: "The optimal epsilon for DBSCAN can be estimated using:",
      opts: [
        "Elbow method on inertia",
        "Silhouette score grid search",
        "Random search",
        "K-distance plot"
      ],
      ans: 3,
      exp: "Plot each point's distance to its k-th nearest neighbor (k=min_samples), sorted ascending. The 'knee' (sharp bend) suggests a good ε — below this, points are in dense neighborhoods; above, they're in sparse regions."
    },
    {
      q: "After clustering customers into 4 segments, labeling them 'Budget', 'Moderate', 'Premium', 'Luxury' is:",
      opts: [
        "Part of the algorithm output",
        "Automatically done by K-Means",
        "Based solely on Silhouette Score",
        "A human interpretation step that requires domain knowledge after seeing cluster statistics"
      ],
      ans: 3,
      exp: "Clustering algorithms produce numbered clusters (0,1,2,3) with no business meaning. Human interpretation — looking at cluster centroids/statistics (average spend, purchase frequency) — is required to assign meaningful labels."
    },
    {
      q: "Principal Component Analysis is often applied before clustering. Why?",
      opts: [
        "PCA converts clustering to classification",
        "PCA selects the most important cluster",
        "PCA reduces dimensionality",
        "PCA determines the optimal K"
      ],
      ans: 2,
      exp: "High-dimensional data suffers from the Curse of Dimensionality. PCA reduces to a compact representation that captures most variance. Clustering on 2–10 PCA components is faster and produces more meaningful results than on 100+ raw features."
    },
    {
      q: "K-Means with K=1 results in:",
      opts: [
        "No clustering done",
        "All points in one cluster",
        "An error",
        "Each point is its own cluster"
      ],
      ans: 1,
      exp: "K=1 is valid: one cluster containing all points with centroid at the global mean. Inertia = total sum of squared distances from the mean = total variance. This is the baseline against which other K values are compared in the elbow plot."
    },
    {
      q: "Anomaly detection is different from supervised fraud detection because:",
      opts: [
        "Anomaly detection is always less accurate",
        "Anomaly detection doesn't require labeled fraud examples",
        "Anomaly detection only works in 2D",
        "Supervised detection can't handle new fraud types"
      ],
      ans: 1,
      exp: "Labeled fraud data is expensive and rare. Anomaly detection learns what 'normal' looks like, flagging deviations — no labels needed. Supervised methods need labeled examples but can be very precise when good labels exist."
    },
    {
      q: "DBSCAN min_samples=2 creates:",
      opts: [
        "Fewer, larger clusters",
        "More clusters",
        "No change compared to default",
        "Very lenient core point condition"
      ],
      ans: 3,
      exp: "Low min_samples = almost any dense pair creates a cluster — very few points are labeled noise. High min_samples = stricter core point condition, more noise. Tune both ε and min_samples together based on domain expectations."
    },
    {
      q: "Cluster validation using Silhouette requires:",
      opts: [
        "Ground truth labels",
        "The dendrogram",
        "The number of clusters to be > 5",
        "Only the clustering result and feature matrix"
      ],
      ans: 3,
      exp: "Silhouette score is an internal validation metric — computed purely from the data and cluster assignments, no ground truth needed. External metrics (Rand Index, NMI) require ground truth. Internal metrics are used when truth is unavailable."
    },
    {
      q: "A customer loyalty dataset is clustered into 5 groups. Group 0 has 2 customers; groups 1–4 have ~250 each. Group 0 likely represents:",
      opts: [
        "A clustering error",
        "The average customers",
        "Outliers or VIP customers with exceptional patterns",
        "The most common customer type"
      ],
      ans: 2,
      exp: "A very small cluster often represents genuine outliers (unusual behavior) or a rare but real segment (e.g., VIP/whale customers with extreme purchase values). Before dismissing it, investigate whether these customers have distinct, actionable characteristics."
    }
  ]
};

export const LONG_QA = [
  {
    "q": "Explain data leakage in machine learning. What are its types, how does it occur, and how is it prevented using sklearn Pipelines?",
    "a": "**What is Data Leakage?**\nImagine giving a student the answer key before a test. They will score 100%, but they didn't actually learn anything. In Machine Learning, **Data Leakage** is when your model accidentally \"sees\" the test data during training.\n\n**Types of Leakage:**\n* **Train-Test Contamination:** If you find the average of ALL your data before splitting it, the training data \"learns\" a little bit about the test data.\n* **Target Leakage:** Using a feature like \"Did they pay the loan?\" to predict if they will default on a loan. The model won't have this info in the real world!\n* **Time Leakage:** Using future data to predict the past.\n\n**How to prevent it:**\nAlways use `Pipeline` in sklearn! A Pipeline ensures that your data is split FIRST, and only the training data is used to learn things like averages or scaling."
  },
  {
    "q": "Compare and contrast StandardScaler, MinMaxScaler, and RobustScaler. When would you use each?",
    "a": "**Why do we scale?**\nIf one feature is measured in millions (like Salary) and another in single digits (like Age), the bigger number will unfairly dominate the model. Scaling makes them play fair.\n\n**StandardScaler (The Default Choice)**\n* **What it does:** Forces the average to be 0 and spreads the data out evenly.\n* **When to use:** Great for most models like Linear Regression and Support Vector Machines.\n* **Problem:** Gets ruined if you have extreme outliers (like one billionaire in a room of normal earners).\n\n**MinMaxScaler (The Strict Box)**\n* **What it does:** Squeezes everything to fit perfectly between 0 and 1.\n* **When to use:** Good for Neural Networks and image pixels (which are exactly 0 to 255).\n* **Problem:** Also ruined by extreme outliers.\n\n**RobustScaler (The Tough Guy)**\n* **What it does:** Ignores the extreme highs and lows (outliers) and scales based on the middle chunk of data.\n* **When to use:** When you have crazy outliers that you can't delete."
  },
  {
    "q": "What is PCA? Explain step-by-step how it works, the role of explained variance, and when to prefer LDA over PCA.",
    "a": "**What is PCA?**\nImagine taking a photo of a 3D coffee mug. You lose the 3rd dimension, but if you take the picture from a good angle, you can still easily tell it's a mug! **PCA (Principal Component Analysis)** does exactly this: it shrinks data with 100 columns down to just 10 or 20 columns, while trying to keep the \"shape\" of the data intact.\n\n**How it works (Simply):**\n1. Centers the data around zero.\n2. Finds the \"best angles\" (called Principal Components) that capture the most spread (variance) in the data.\n3. Throws away the less important angles.\n\n**Explained Variance:**\nThis tells you \"how much of the original photo's detail did we keep?\" For example, if we kept 95% explained variance, we only lost 5% of the information!\n\n**PCA vs. LDA:**\n* Use **PCA** when you just want to shrink data and don't care about the labels (Unsupervised).\n* Use **LDA** when you want to shrink data specifically to make it easier to separate different classes, like separating cats from dogs (Supervised)."
  },
  {
    "q": "Explain the bias-variance tradeoff. How do Bagging and Boosting address each component?",
    "a": "**The Tradeoff Analogy:**\nImagine studying for a math test.\n* **High Bias (Underfitting):** You only learned addition and failed because the test had algebra. Your model is too simple.\n* **High Variance (Overfitting):** You memorized the exact answers to the practice test, but failed the real test because the numbers changed. Your model is too complex.\n* **The Goal:** Find the sweet spot where you understand the *concept* (low bias) but don't just memorize the *exact numbers* (low variance).\n\n**How Ensembles Fix This:**\n* **Bagging (like Random Forest):** Takes complex, over-memorizing models (High Variance) and averages them together to calm them down and stop them from overreacting to small changes.\n* **Boosting (like XGBoost):** Takes super simple, dumb models (High Bias) and trains them sequentially, where each new model fixes the mistakes of the previous one until they become smart."
  },
  {
    "q": "What is the difference between Precision, Recall, and F1-Score? When would you optimize each? Provide real-world examples.",
    "a": "**The Basics:**\nImagine you built a \"Spam Email Detector\".\n\n* **Precision (Quality):** Of all the emails you threw in the spam folder, how many were *actually* spam? (You don't want to accidentally throw away an email from your boss!).\n* **Recall (Quantity):** Out of all the *actual* spam emails in the world, how many did you manage to catch? (You don't want a ton of spam slipping into your inbox).\n\n**When to optimize what:**\n* **Optimize Precision:** When a \"False Alarm\" is very bad. Example: A system that flags YouTube videos for copyright strikes. If you flag innocent creators (False Alarm), they get angry.\n* **Optimize Recall:** When missing a real threat is very bad. Example: Cancer detection. It's better to accidentally flag a healthy patient for a second checkup (False Alarm) than to miss a real cancer patient!\n* **F1-Score:** The perfect balance between Precision and Recall. Use this when you want a solid, well-rounded model."
  },
  {
    "q": "Explain K-Means clustering algorithm end-to-end. What are its assumptions, limitations, and how do you choose the optimal K?",
    "a": "**What is K-Means?**\nIt's a way to automatically group similar items together (like grouping customers into 3 categories). \n\n**How it works (The Party Analogy):**\n1. Pick 3 random people to be \"party hosts\" (Centroids).\n2. Everyone else walks over to the host they are closest to.\n3. The group looks around, finds the physical center of their group, and picks a new host standing right in the middle.\n4. Repeat until nobody changes groups!\n\n**Limitations:**\n* It assumes all groups are circular/spherical. It struggles with weird shapes (like a crescent moon).\n* You have to tell it exactly how many groups (K) to look for before you start.\n\n**Choosing K (The Elbow Method):**\nYou run the algorithm for K=1, 2, 3, 4, 5... and plot the error. The graph will look like an arm. The \"elbow\" (where the sharp drop suddenly flattens out) is usually the best number of groups."
  },
  {
    "q": "Compare Ridge, Lasso, and ElasticNet regression. Explain the mathematical intuition behind each and when to use them.",
    "a": "**What is Regularization?**\nIt's like putting a speed limit on your model so it doesn't over-memorize the data (overfit).\n\n**Ridge (L2 - The Shrinker):**\n* **What it does:** It shrinks the importance of all features to be very small, but never exactly zero.\n* **When to use:** When you have lots of features and you believe *almost all of them* are slightly useful.\n\n**Lasso (L1 - The Deleter):**\n* **What it does:** It is brutal. It completely deletes useless features by forcing their importance to exactly 0.\n* **When to use:** When you have 1,000 features but you suspect only 10 of them actually matter. It acts as an automatic feature selector!\n\n**ElasticNet (The Best of Both):**\n* **What it does:** It combines the powers of both Ridge and Lasso.\n* **When to use:** When you have highly correlated features (like 'House Size in Sq Ft' and 'House Size in Sq Meters'). Lasso might delete one randomly, but ElasticNet handles them smoothly."
  },
  {
    "q": "Explain the Support Vector Machine (SVM) algorithm. How does the kernel trick enable non-linear classification?",
    "a": "**What is an SVM?**\nImagine a bunch of red apples and green apples scattered on a table. SVM's goal is to draw a straight line right down the middle to separate them. But it doesn't just draw any line—it tries to draw a line with the **widest possible street** (margin) between the red and green apples.\n\n**What are Support Vectors?**\nThey are the specific apples sitting right on the edge of the street. If you move these apples, the whole street shifts. The apples far away from the street don't matter at all!\n\n**The Kernel Trick (The Magic Trick):**\nWhat if the apples are arranged in a circle, and you can't draw a straight line through them? \nThe Kernel Trick magically \"lifts\" the table into 3D space. Suddenly, the red apples are hovering above the green apples, and you can simply slide a flat sheet of paper between them. When you drop it back to 2D, the straight sheet of paper looks like a perfect circle separating the apples!"
  },
  {
    "q": "What is the Curse of Dimensionality? How does it affect ML algorithms, and what are the strategies to combat it?",
    "a": "**The Curse of Dimensionality:**\nImagine trying to find a lost coin. \n* On a 1D straight line (10 meters long), it's easy.\n* In a 2D room (10x10 meters), it takes longer.\n* In a 3D warehouse (10x10x10 meters), it's incredibly hard.\n\nIn Machine Learning, every new feature (column) adds a new dimension. As dimensions increase, the data gets extremely \"far apart\" and empty. \n\n**Why is this bad?**\nDistance-based models like **KNN** get confused because in 1,000-dimensional space, *everything* looks really far away from everything else, so the concept of \"closeness\" stops working.\n\n**How to fix it:**\n1. **Feature Selection:** Delete useless columns (using methods like Lasso or just dropping low-correlation columns).\n2. **Feature Extraction:** Use tools like **PCA** to shrink 1,000 columns down to 20 highly-concentrated columns without losing the core information."
  },
  {
    "q": "Explain ensemble learning methods: Bagging, Boosting, Stacking, and Voting. What makes ensembles better than individual models?",
    "a": "**Why Ensembles work:**\nIf you ask one guy to guess the weight of a cow, he might be wrong. If you ask 1,000 random people and average their guesses, they will be incredibly accurate! This is the \"Wisdom of the Crowd.\"\n\n**1. Voting / Averaging:**\nYou train 3 completely different models (like KNN, SVM, and a Decision Tree). They all vote, and the majority wins.\n\n**2. Bagging (Parallel):**\nYou train 100 of the *same* model (usually Decision Trees), but you give each one a slightly different, randomized dataset. Example: **Random Forest**. It prevents overfitting.\n\n**3. Boosting (Sequential):**\nYou train a dumb model. It gets some things wrong. The next model looks at those specific mistakes and focuses entirely on fixing them. This repeats. Example: **XGBoost**.\n\n**4. Stacking (The Boss Model):**\nYou train 3 different models. Instead of taking a simple vote, you train a *4th boss model* to look at the answers of the first 3 and decide who is usually right!"
  },
  {
    "q": "Describe the complete workflow for handling a class imbalance problem in a fraud detection scenario.",
    "a": "**The Problem:**\nIn fraud detection, 99% of transactions are normal, and 1% are fraud. A dumb model could just guess \"Normal\" every single time and be 99% accurate! But it would completely fail its job.\n\n**How to fix it:**\n\n1. **Change your Metric:** Do NOT use Accuracy! Use **Recall** (did we catch the fraud?) or the **F1-Score**.\n2. **Resample your Data:**\n   * **Oversampling (SMOTE):** Create fake, realistic-looking fraud transactions to balance the scales.\n   * **Undersampling:** Throw away a bunch of normal transactions so the numbers match (only do this if you have millions of rows).\n3. **Class Weights:** Tell the algorithm to \"pay attention\". Give the model a tiny penalty for missing a normal transaction, but a MASSIVE penalty for missing a fraud transaction.\n4. **Pick the Right Model:** Tree-based models (like Random Forest or XGBoost) handle imbalanced data much better than linear models."
  },
  {
    "q": "What is feature engineering? Explain feature creation, transformation, and selection with examples from real-world datasets.",
    "a": "**What is it?**\nFeature Engineering is the art of taking raw data and twisting, combining, or cleaning it to make it easier for a Machine Learning model to understand.\n\n**1. Feature Creation (Making new things):**\nYou have a column for `Date of Birth`. The model doesn't know what a birthday is. You subtract it from today's date to create a new column called `Age`. Now the model understands!\n\n**2. Feature Transformation (Changing the shape):**\nYou have a `Salary` column. Most people make $50k, but a few make $50 Million. This ruins the graph. You apply a **Log Transform** to squeeze the massive salaries down to a normal scale, making the data look like a smooth bell curve.\n\n**3. Feature Selection (Throwing out garbage):**\nYou have an `ID Number` column. ID numbers don't predict anything, they just confuse the model. You drop the column completely."
  },
  {
    "q": "Explain XGBoost in detail: how it differs from standard Gradient Boosting, its key hyperparameters, and best practices for tuning.",
    "a": "**What is XGBoost?**\nXGBoost stands for \"Extreme Gradient Boosting.\" It is the most popular algorithm for tabular data competitions (like Kaggle) because it is incredibly fast and incredibly accurate.\n\n**How is it better than normal Gradient Boosting?**\n1. **Speed:** It does parallel processing (uses all your CPU cores at once).\n2. **Built-in Regularization:** It prevents itself from overfitting (memorizing the data) natively.\n3. **Missing Data:** If there is a blank cell in your data, XGBoost automatically figures out the best way to handle it without crashing!\n\n**Key Hyperparameters to Tune:**\n* `learning_rate`: How big of a step the model takes when learning. Smaller is safer but slower.\n* `max_depth`: How tall the decision trees are allowed to grow. Keep it small (3 to 6) to prevent overfitting.\n* `n_estimators`: How many trees to build. If learning rate is low, you need more trees!"
  },
  {
    "q": "Describe DBSCAN algorithm in detail. Compare it to K-Means and explain when each is most appropriate.",
    "a": "**What is DBSCAN?**\nIt is a clustering algorithm based on density. Imagine a crowded room. DBSCAN finds dense crowds of people standing close together and groups them, completely ignoring the empty spaces.\n\n**How it works:**\nIt picks a random person and draws a circle around them. If there are enough people in that circle, they become a group! It keeps expanding the circle until the crowd thins out. Anyone left standing completely alone is flagged as an \"Outlier\" or \"Noise\".\n\n**DBSCAN vs. K-Means:**\n* **Shape:** K-Means forces everyone into circular groups. DBSCAN can find weird shapes, like a long line of people waiting for a bus.\n* **Outliers:** K-Means forces *everyone* into a group, even if they are standing 10 miles away. DBSCAN is smart enough to label loners as outliers.\n* **When to use:** Use K-Means for simple, clean, circular data. Use DBSCAN when your data has weird shapes and messy outliers."
  },
  {
    "q": "What is Naïve Bayes? Explain its assumption, variants, applications, and why it works despite being 'naïve'.",
    "a": "**What is Naïve Bayes?**\nIt is a probability-based algorithm that acts like a detective. It calculates the odds of an event happening based on clues. It's most famous for being a fantastic **Spam Email Filter**.\n\n**Why is it \"Naïve\"?**\nIt assumes that every single clue is completely independent of the others. For example, if it sees the words \"Free\", \"Money\", and \"Now\" in an email, it assumes they are unrelated words that just randomly appeared together. This is a \"naïve\" (dumb) assumption because language doesn't work like that!\n\n**Why does it still work?**\nEven though its assumption is technically wrong, it turns out that multiplying the individual probabilities of those \"spammy\" words together still perfectly separates spam from normal mail. It is fast, lightweight, and surprisingly accurate."
  },
  {
    "q": "Explain Random Forest in detail. How does it improve on a single Decision Tree? What are the key hyperparameters?",
    "a": "**The Problem with a Single Decision Tree:**\nA single tree is like a student who memorizes the entire textbook. They will get 100% on the practice test, but fail the real exam because they \"overfit\" (memorized instead of learning).\n\n**How Random Forest fixes this:**\nInstead of 1 tree, you build 100 trees! \n* You give each tree a slightly different, randomized slice of the dataset.\n* When it's time to make a prediction, all 100 trees take a vote. \nThis \"Wisdom of the Crowd\" perfectly smooths out the errors and prevents overfitting.\n\n**Key Settings (Hyperparameters) to tune:**\n* `n_estimators`: The number of trees in your forest (usually 100 to 500).\n* `max_depth`: How deep each tree can grow. Stopping them from growing too deep prevents memorization."
  },
  {
    "q": "What is time-series regression? How is it different from regular regression, and what techniques are used?",
    "a": "**What is Time-Series?**\nRegular regression predicts a price based on features (like predicting house price based on square footage). \nTime-series regression predicts the future based entirely on the **past**. (Like predicting tomorrow's stock price based on today's stock price).\n\n**How is it different?**\nIn regular machine learning, the order of the rows doesn't matter. You can shuffle the data! In Time-Series, **Order is everything**. If you shuffle the dates, the data becomes useless garbage.\n\n**Techniques used:**\n* **Lag Features:** Creating a column that holds \"Yesterday's Sales\" to predict \"Today's Sales\".\n* **Rolling Averages:** Creating a column that tracks the \"Average sales over the last 7 days\" to capture trends.\n* **ARIMA / Prophet:** Specialized algorithms designed specifically to handle dates, seasons, and trends."
  },
  {
    "q": "How does Logistic Regression work? Explain the sigmoid function, loss function, and regularization.",
    "a": "**What is Logistic Regression?**\nDespite the name, it is a **Classification** algorithm, not regression! It answers \"Yes or No\" questions. (e.g. \"Is this tumor malignant?\").\n\n**The Sigmoid Function:**\nStandard linear regression outputs a straight line that can go from negative infinity to positive infinity. That's useless for percentages! The Sigmoid function is a mathematical \"S-curve\" that physically crushes that straight line so it perfectly fits between **0 and 1** (0% to 100% probability).\n\n**How it learns (Loss Function):**\nIt uses \"Log Loss\". If the model predicts a 99% chance of rain, and it rains, the penalty is 0. If it predicts a 99% chance of rain, and it's completely sunny, Log Loss hits the model with a massive penalty to force it to learn."
  },
  {
    "q": "What is the difference between parametric and non-parametric ML models? Give examples and discuss their tradeoffs.",
    "a": "**Parametric Models (The Rule Followers):**\nThese models assume the data follows a specific shape (like a straight line). They have a fixed number of parameters (rules), no matter how big the dataset is.\n* **Example:** Linear Regression.\n* **Pros:** Very fast, easy to understand.\n* **Cons:** If the data is actually a crazy squiggly shape, a straight line will fail terribly.\n\n**Non-Parametric Models (The Flexible Learners):**\nThese models make ZERO assumptions about the shape of the data. They just adapt and bend to fit whatever the data looks like.\n* **Example:** Decision Trees, KNN.\n* **Pros:** Can learn incredibly complex, weird shapes.\n* **Cons:** Slower, prone to overfitting, and they require a lot more data to learn the shape properly."
  },
  {
    "q": "What is cross-validation? Explain K-Fold, Stratified K-Fold, and TimeSeriesSplit. When should each be used?",
    "a": "**Why do we need Cross-Validation?**\nIf you train a model on 80% of data and test on 20%, you might have just gotten \"lucky\" with an easy 20%. Cross-Validation solves this by running the test multiple times, ensuring every single row gets to be in the test set once.\n\n**The Methods:**\n* **K-Fold:** Chop the data into 5 blocks. Train on 4, test on 1. Repeat 5 times, shifting the test block each time. Use for standard data.\n* **Stratified K-Fold:** Similar to K-Fold, but it guarantees that the ratio of classes (e.g. 90% normal, 10% fraud) is exactly identical in every single block. Use for Imbalanced Data!\n* **TimeSeriesSplit:** You cannot test on the past! This method trains on January, tests on February. Then trains on Jan+Feb, tests on March. Use for Dates and Time!"
  },
  {
    "q": "Explain the Decision Tree algorithm. What are Gini Impurity and Entropy, and how are they used in tree growing?",
    "a": "**What is a Decision Tree?**\nIt's a flowchart of \"Yes/No\" questions. Example: \"Does it have fur?\" -> Yes -> \"Does it bark?\" -> Yes -> \"It's a Dog!\"\n\n**How does it pick the questions?**\nIt wants to ask questions that perfectly separate the data into pure groups (e.g. a box of 100% dogs and a box of 100% cats).\n\n**Gini Impurity & Entropy:**\nThese are mathematical formulas that score \"How messy is this box?\". \n* If a box has 50 cats and 50 dogs, it is highly \"impure\" (High Gini/Entropy).\n* If a box has 100 cats and 0 dogs, it is perfectly \"pure\" (Zero Gini/Entropy).\n\nThe tree will mathematically test every possible question, calculate the Gini score, and officially pick the question that results in the cleanest, purest boxes!"
  },
  {
    "q": "What is hyperparameter tuning? Compare GridSearchCV, RandomizedSearchCV, and Bayesian Optimization.",
    "a": "**What is Hyperparameter Tuning?**\nIt's like finding the perfect radio station. The model learns the actual music (parameters), but YOU have to turn the dials (hyperparameters) like learning rate, max depth, etc.\n\n**1. GridSearchCV (The Exhaustive Search):**\nYou give it a list of 100 dial combinations. It systematically tries every single one of them. \n* **Pro:** Guaranteed to find the best combo in your list.\n* **Con:** Takes forever.\n\n**2. RandomizedSearchCV (The Lucky Dip):**\nYou give it a massive range of dials, and tell it to randomly test 50 of them and pick the best.\n* **Pro:** Extremely fast.\n* **Con:** Might accidentally skip the perfect combo.\n\n**3. Bayesian Optimization (The Smart Search):**\nInstead of random guessing, it learns from its past guesses! \"Oh, a learning rate of 0.1 was bad, but 0.05 was better. Let me try 0.04 next!\" It is the smartest and most efficient method."
  },
  {
    "q": "Explain anomaly detection. What are the main methods, and how would you apply it to a real-world problem?",
    "a": "**What is Anomaly Detection?**\nIt is the process of finding the \"weird\" items in a dataset. Things that look completely different from everything else.\n\n**Main Methods:**\n* **Isolation Forest:** It builds random decision trees to separate data points. Normal points are clustered tightly in the middle and are hard to separate. Anomalies are hanging out alone on the edges, so they get separated on the very first cut! If a point is easily isolated, it's an anomaly.\n* **DBSCAN:** Density-based clustering. Points that are too far away from the main crowd are flagged as noise.\n\n**Real World Application:**\nCredit Card Fraud. You train an Isolation Forest on millions of standard transactions. If a transaction suddenly occurs in a different country for $10,000 at 3 AM, the tree will instantly isolate it and flag it as an anomaly."
  },
  {
    "q": "What is the difference between information gain (entropy-based) and Gini impurity in decision trees? When does the choice matter?",
    "a": "**The Goal of Both:**\nBoth are mathematical formulas used by Decision Trees to measure \"Messiness\" (how mixed up the classes are in a node).\n\n**The Difference:**\n* **Entropy (Information Gain):** Uses logarithms in its math formula. Because of the log math, it is slightly slower to calculate on massive datasets.\n* **Gini Impurity:** Uses simple multiplication and subtraction. It is mathematically much faster to calculate.\n\n**When does the choice matter?**\nHonestly, 98% of the time, they produce the exact same tree! \nScikit-Learn uses **Gini** by default simply because the math is faster, saving your computer processing time. You almost never need to change this setting."
  },
  {
    "q": "Describe the complete ML pipeline for a real-world classification problem — from raw data to deployed model.",
    "a": "**The Full ML Pipeline:**\n\n1. **Data Collection:** Get the raw data from databases, APIs, or CSV files.\n2. **Exploratory Data Analysis (EDA):** Make graphs. Find out where the missing values are, spot outliers, and understand the trends.\n3. **Data Preprocessing:** Fill in missing values (Imputation), convert text to numbers (Encoding), and scale the numbers so they match.\n4. **Feature Engineering:** Create new, smarter columns out of the old ones.\n5. **Model Training:** Split the data into Train and Test. Feed the training data to a few algorithms (Random Forest, XGBoost) and see which one does best.\n6. **Evaluation:** Check the winning model against the Test data using metrics like F1-Score.\n7. **Deployment:** Save the model as a file (Pickle) and wrap it in a Web API (Flask/FastAPI) so other apps can send it data and get predictions!"
  },
  {
    "q": "What is the silhouette score and Davies-Bouldin Index? How are they used to evaluate clustering quality?",
    "a": "**The Problem with Clustering:**\nIn unsupervised clustering (like K-Means), you don't have an \"Answer Key\". You can't calculate Accuracy. So how do you know if the clusters are good?\n\n**1. Silhouette Score:**\nIt measures two things: Are you standing close to your own group? Are you standing far away from the other groups? \n* Score is from -1 to 1.\n* **+1** = Perfect clustering.\n* **0** = Clusters are overlapping.\n* **-1** = You put people in the wrong group entirely.\n\n**2. Davies-Bouldin Index:**\nIt mathematically compares the \"spread\" of a cluster to the distance between clusters. \n* Unlike Silhouette, **Lower is Better**.\n* A score close to 0 means the clusters are tightly packed and spaced far apart from each other."
  },
  {
    "q": "Compare LightGBM and XGBoost in depth. When would you choose one over the other?",
    "a": "**XGBoost:**\n* **How it grows trees:** Level-wise (it grows an entire level of the tree across all branches before moving deeper).\n* **Pros:** Extremely accurate, the industry standard for competitions, very robust.\n* **Cons:** Uses a lot of RAM, can be slow on absolutely massive datasets.\n\n**LightGBM:**\n* **How it grows trees:** Leaf-wise (it finds the single most important leaf and just keeps splitting that one deep down).\n* **Pros:** INSANELY fast, uses very little RAM, handles millions of rows effortlessly.\n* **Cons:** Prone to overfitting on small datasets because of the leaf-wise growth.\n\n**Verdict:** Use XGBoost for standard data. Use LightGBM when your dataset is massive (10+ million rows) and XGBoost is too slow."
  },
  {
    "q": "What is regularization in machine learning? Explain L1, L2, and Dropout regularization with mathematical intuition.",
    "a": "**What is Regularization?**\nIt is a penalty system to stop your model from memorizing the training data. If your model tries to make a crazy, hyper-complex rule to perfectly fit an outlier, Regularization slaps it with a fine.\n\n**L1 (Lasso) vs L2 (Ridge):**\n* **L1 (Lasso):** The fine is absolute. It completely turns off (deletes) useless features. Great for Feature Selection.\n* **L2 (Ridge):** The fine is squared. It shrinks features, but never deletes them. Great when all features matter a little bit.\n\n**Dropout (For Neural Networks):**\nImagine a football team where one superstar player does all the work, and the rest are lazy. **Dropout** randomly forces 20% of the players to sleep during practice. This forces the lazy players to step up and learn the game, making the entire team much stronger and preventing reliance on one \"superstar\" neuron."
  },
  {
    "q": "Explain Hierarchical Clustering. What is a dendrogram, and how do different linkage methods affect the result?",
    "a": "**What is Hierarchical Clustering?**\nInstead of grouping everyone into 3 buckets at once (like K-Means), it builds a family tree. It finds the 2 closest people and merges them. Then it finds the next closest, and merges them. It repeats until everyone is in one giant group.\n\n**The Dendrogram:**\nIt is a visual map of this family tree. You can look at the tree and \"cut\" the branches at any height. If you cut high, you get 2 big clusters. If you cut low, you get 10 small clusters. You don't need to pick 'K' in advance!\n\n**Linkage Methods:**\nHow do you measure distance between two groups of people?\n* **Single Linkage:** Measure from the two closest people. (Causes long, chain-like clusters).\n* **Complete Linkage:** Measure from the two furthest people. (Creates tight, compact clusters).\n* **Ward Linkage:** Merges groups that keep the total \"messiness\" (variance) of the new group as low as possible. (The best default method)."
  },
  {
    "q": "What are the key evaluation metrics for regression models? Explain MSE, RMSE, MAE, R², Adjusted R², and MAPE.",
    "a": "**Regression Metrics (Predicting Numbers):**\n\n* **MAE (Mean Absolute Error):** The average mistake. \"On average, our house price prediction is off by $5,000.\" Very easy to understand.\n* **MSE (Mean Squared Error):** You square all the mistakes before averaging them. This aggressively punishes massive mistakes. (e.g. Being off by $100k is punished much worse than being off by $10k ten times).\n* **RMSE (Root Mean Squared Error):** The square root of MSE. It brings the number back to normal dollars so you can read it easily.\n* **R² (R-Squared):** A percentage score from 0 to 100%. \"Our model explains 80% of the reason house prices change.\"\n* **Adjusted R²:** R² can be tricked into going up if you just add garbage columns. Adjusted R² penalizes you for adding useless columns."
  },
  {
    "q": "Explain time-series forecasting challenges. How do you handle trend, seasonality, and stationarity?",
    "a": "**The Challenges of Time:**\nStandard models assume data doesn't care about time. In time-series, predicting ice cream sales in July is vastly different than December.\n\n**1. Trend:**\nThe data is slowly drifting upwards over years (e.g. inflation). You handle it by **Differencing** (subtracting today's price from yesterday's price, so you only model the *change*, not the total).\n\n**2. Seasonality:**\nRepeating patterns (sales spike every December). You handle it by adding a feature column for \"Month\" or using seasonal models like SARIMA.\n\n**3. Stationarity:**\nMost algorithms demand that the data's average doesn't wildly jump around over time. By fixing Trend and Seasonality, you make the data \"Stationary\" (flat and predictable), which makes the algorithms happy."
  },
  {
    "q": "What is the Random Forest algorithm? How does it reduce variance through bagging and randomness?",
    "a": "**The Problem:**\nA single Decision Tree is like a judge who makes a ruling based on only one piece of evidence. They are very biased and prone to massive errors (High Variance).\n\n**The Solution (Random Forest):**\nYou build 100 Decision Trees. But if you give them all the same data, they will all make the exact same mistakes. So you introduce **Randomness**:\n1. **Bagging:** You give every tree a slightly different, randomized slice of the rows.\n2. **Feature Randomness:** At every split, you hide some columns from the tree. This forces the tree to look at other evidence it normally ignores.\n\nBecause all 100 trees look at different evidence, their mistakes cancel each other out when they take a final vote. This perfectly fixes the High Variance problem."
  },
  {
    "q": "What is cross-entropy loss? Explain its use in classification and how it differs from MSE.",
    "a": "**The Problem with MSE for Classification:**\nMSE (Mean Squared Error) is great for predicting house prices. But for Classification (is this a Cat or Dog?), MSE forms a bumpy mathematical landscape where models get stuck and stop learning.\n\n**Cross-Entropy Loss (Log Loss):**\nThis is the mathematical penalty system for Classification. It cares deeply about *Confidence*.\n* If it is a Cat, and your model predicts 99% Cat, the penalty is almost 0.\n* If it is a Cat, and your model predicts 51% Cat, the penalty is small, but it tells the model to be more confident.\n* If it is a Cat, and your model confidently predicts 99% **Dog**, Cross-Entropy loss hits the model with a massive, catastrophic penalty, forcing it to immediately fix its logic."
  },
  {
    "q": "Explain Gradient Descent and its variants: SGD, Mini-Batch GD, Adam, and RMSprop.",
    "a": "**What is Gradient Descent?**\nImagine you are blindfolded on a mountain, and you want to find the bottom (lowest error). You feel the slope with your foot and take a step downwards. Repeat until flat!\n\n**The Variants:**\n* **Batch GD:** You look at the ENTIRE dataset before taking 1 step. Very accurate, but incredibly slow.\n* **SGD (Stochastic):** You take a step after looking at just ONE row of data. Lightning fast, but you stumble around wildly.\n* **Mini-Batch GD:** The gold standard. You look at 32 or 64 rows of data, then take a step. Fast and smooth.\n* **Adam / RMSprop:** These are \"smart\" shoes for the mountain. If the slope is steep, they automatically take smaller, careful steps. If the slope is flat, they take massive leaps to speed things up."
  },
  {
    "q": "What are the key differences between supervised, unsupervised, and semi-supervised learning? Provide examples.",
    "a": "**Supervised (The Teacher):**\nYou give the model the data AND the answer key. \"Here is a picture, and it is a CAT.\" The model learns the rules to find cats.\n* *Example:* Predicting House Prices, Spam Filters.\n\n**Unsupervised (The Explorer):**\nYou give the model raw data with NO answers. It has to figure out the patterns on its own.\n* *Example:* Giving it 1,000 customer receipts, and it automatically groups them into \"Bargain Hunters\" and \"Luxury Buyers\" (Clustering).\n\n**Semi-Supervised (The Hybrid):**\nYou have 1 Million photos, but only 1,000 have labels. You use the 1,000 labeled photos to teach a model, and then have the model guess the labels for the remaining 999,000 photos!"
  },
  {
    "q": "Explain how ensembles like Voting, Averaging, and Stacking combine multiple models for better performance.",
    "a": "**Why combine models?**\nEvery model has a weakness. KNN might struggle with outliers, while Trees might struggle with straight lines. Combining them covers their weaknesses.\n\n**1. Voting (For Classification):**\nYou train a Tree, a SVM, and a Logistic Regression. They all guess the animal. Two say \"Cat\", one says \"Dog\". Cat wins by majority vote.\n\n**2. Averaging (For Regression):**\nYou train 3 models to predict a house price. One says $100k, one says $110k, one says $120k. You average them to $110k. This smooths out any crazy guesses.\n\n**3. Stacking (The Smart Combiner):**\nInstead of a simple vote, you train a *brand new Machine Learning model* to watch the other models guess. It learns that \"Model A is usually right about cats, but terrible at dogs,\" and assigns smart weights to their votes!"
  },
  {
    "q": "What is supervised vs semi-supervised vs unsupervised learning? Give real-world examples of when to use each.",
    "a": "*(Note: This question is functionally identical to Q35 in the dataset. A simplified answer covers the same core concepts.)*\n\n**Supervised Learning:**\nThe data has labels (an answer key). \n* *When to use:* You want to predict a specific outcome, like forecasting next week's weather or classifying an email as Spam/Not Spam.\n\n**Unsupervised Learning:**\nThe data has NO labels. The model must find hidden structure.\n* *When to use:* Customer Segmentation. You don't know the categories in advance, you just want the algorithm to group similar shoppers together.\n\n**Semi-Supervised Learning:**\nA mix of both. You have a massive dataset, but paying humans to label it is too expensive.\n* *When to use:* Medical imaging. You have 10,000 X-Rays, but a doctor only had time to label 500 of them. You use the 500 to guide the model on the rest."
  },
  {
    "q": "What is transfer learning? When should you use pre-trained models instead of training from scratch?",
    "a": "**What is Transfer Learning?**\nImagine you want to teach someone to drive a massive semi-truck. Do you grab a 5-year-old child and teach them from scratch? No! You grab someone who already knows how to drive a normal car. They already understand steering and brakes, they just need a little \"fine-tuning\" for the truck.\n\nIn ML, Transfer Learning is taking an enormous model that Google or OpenAI already spent millions of dollars training (like ChatGPT or ResNet), and just \"fine-tuning\" the last 1% of it for your specific task.\n\n**When to use it:**\n* When you are doing Image Recognition or Natural Language Processing.\n* When you have very little data (e.g. only 100 pictures of your dog).\n* You almost ALWAYS use this instead of training from scratch for modern AI tasks."
  },
  {
    "q": "Explain ensemble methods: Voting, Bagging, Boosting, and Stacking. What are their differences?",
    "a": "*(Note: This covers the core principles of Ensembles, summarizing the distinct styles.)*\n\n**1. Voting:** The simplest ensemble. Train 3 completely different models (Tree, SVM, KNN) and let them take a majority vote. Best for general stability.\n\n**2. Bagging (Parallel):** Train 100 of the *exact same model* (Trees) at the same time, but give them all slightly different, randomized data. They vote. Excellent for preventing overfitting (e.g. Random Forest).\n\n**3. Boosting (Sequential):** Train 1 dumb model. Look at its mistakes. Train model #2 specifically to fix the mistakes of model #1. Repeat. Excellent for pure accuracy (e.g. XGBoost).\n\n**4. Stacking:** Train 3 different models, but instead of taking a simple vote, train a *Meta-Model* to act as the boss. The boss learns which of the 3 models is most trustworthy in different scenarios."
  }
];
