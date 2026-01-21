# Crop Disease Detection - Visual Component Diagrams

## Figure 1: Analysis Class to Design Component

```
┌──────────────────────────┐
│   Analysis Class         │
├──────────────────────────┤
│ • detectionId: String    │
│ • farmerId: String       │
│ • imageUrl: String       │
│ • cropType: String       │
│ • detectedDisease: String│
│ • confidence: double     │
│ • severity: String       │
│ • timestamp: DateTime    │
│ • affectedArea: double   │
│ • location: Location     │
│                          │
│ +processDetection()      │
│ +validateImage()         │
│ +preprocessImage()       │
│ +analyzeResults()        │
└─────────────┬────────────┘
              │ ViewBy
              │
              │
        ┌─────▼──────┐
        │  Design    │
        │ Component  │
        ├────────────┤
        │  Detection │
        │ Service    │
        └────────────┘
```

## Figure 2: Detection Service Component

```
┌────────────────────────────────────────────────────────┐
│     Elaborated Design Class: Detection Service         │
├──────────────────────┬─────────────────────────────────┤
│  ◇ Detection Info    │  ◆ Service Operations          │
├──────────────────────┼─────────────────────────────────┤
│ - detectionId        │ • uploadImage()                 │
│ - farmerId           │ • detectDisease()               │
│ - imageUrl           │ • getDetectionHistory()         │
│ - cropType           │ • validateImage()               │
│ - detectedDisease    │ • preprocessImage()             │
│ - confidence         │ • analyzeResults()              │
│ - severity           │ • storeResult()                 │
│ - timestamp          │ • sendAlert()                   │
│ - affectedArea       │                                 │
│ - location           │ • getDetectionStats()           │
├──────────────────────┴─────────────────────────────────┤
│ Database: Detections, Detection_History, Disease_DB   │
└────────────────────────────────────────────────────────┘
```

## Figure 3: ML Model Component

```
┌────────────────────────────────────────────────────────┐
│         Analysis Class: ML Model                       │
├────────────────────────────────────────────────────────┤
│ • modelId: String                                      │
│ • modelVersion: String                                 │
│ • accuracy: double                                     │
│ • framework: String                                    │
│ • lastTrained: DateTime                                │
│ • inputSize: int                                       │
│ • outputClasses: int                                   │
│                                                        │
│ +predictDisease()                                      │
│ +loadModel()                                           │
│ +trainModel()                                          │
│ +evaluateModel()                                       │
│ +optimizeModel()                                       │
└─────────────┬────────────────────────────────────────┘
              │ ViewBy
              │
              │
        ┌─────▼──────────┐
        │   Design       │
        │  Component     │
        ├────────────────┤
        │  ML Service    │
        │  Component     │
        └────────────────┘
```

## Figure 4: Treatment Recommendation Component

```
┌────────────────────────────────────────────────────────┐
│  Elaborated Design Class: Treatment Recommendation     │
├──────────────────────┬─────────────────────────────────┤
│  ◇ Treatment Info    │  ◆ Service Operations          │
├──────────────────────┼─────────────────────────────────┤
│ - treatmentId        │ • getRecommendations()          │
│ - diseaseId          │ • getTreatmentDetails()         │
│ - treatmentName      │ • provideFeedback()             │
│ - type               │ • calculateCost()               │
│ - products           │ • considerWeather()             │
│ - dosage             │ • validateTreatment()           │
│ - frequency          │ • estimateEffectiveness()       │
│ - duration           │ • generateReport()              │
│ - cost               │ • trackTreatmentProgress()      │
│ - effectiveness      │                                 │
├──────────────────────┴─────────────────────────────────┤
│ Database: Treatments, Treatment_History, Products_DB  │
└────────────────────────────────────────────────────────┘
```

## Figure 5: Complete Disease Detection Workflow

```
                        ┌──────────────┐
                        │  Farmer App  │
                        └──────┬───────┘
                               │
                               │ Upload Image
                               ▼
                    ┌────────────────────────┐
                    │   Detection Service    │
                    ├────────────────────────┤
                    │ • imageProcessor       │
                    │ • mlEngine             │
                    │ • diseaseRecognizer    │
                    └─────────┬──────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
         ┌────────────┐ ┌──────────┐ ┌────────────┐
         │   Image    │ │  ML      │ │  Disease  │
         │  Service   │ │ Service  │ │  Service  │
         └────────────┘ └──────────┘ └────────────┘
                │             │             │
                └─────────────┼─────────────┘
                              │
                              ▼
                    ┌────────────────────────┐
                    │  Treatment Service     │
                    ├────────────────────────┤
                    │ • treatmentAnalyzer    │
                    │ • knowledgeBase        │
                    │ • costCalculator       │
                    └──────────┬─────────────┘
                               │
                               ▼
                    ┌────────────────────────┐
                    │   Alert Service        │
                    ├────────────────────────┤
                    │ • sendNotification()   │
                    │ • scheduleAlert()      │
                    │ • trackAlert()         │
                    └────────────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  Notification│
                        │  to Farmer   │
                        └──────────────┘
```

## Figure 6: Data Flow - Disease Detection Pipeline

```
┌─────────────┐
│   Image     │
│   Upload    │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│ Image Validation & Preprocessing │
├──────────────────────────────────┤
│ • Format Check                   │
│ • Size Validation                │
│ • Quality Enhancement            │
│ • Normalization                  │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│    ML Model Prediction           │
├──────────────────────────────────┤
│ • Load Trained Model             │
│ • Extract Features               │
│ • Run Inference                  │
│ • Generate Confidence Scores     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│   Disease Identification         │
├──────────────────────────────────┤
│ • Match with Disease Database    │
│ • Determine Confidence Level     │
│ • Assess Severity                │
│ • Identify Affected Area         │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Treatment Recommendation        │
├──────────────────────────────────┤
│ • Query Treatment Database       │
│ • Calculate Costs                │
│ • Check Weather Impact           │
│ • Rank by Effectiveness          │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│   Generate Report & Alert        │
├──────────────────────────────────┤
│ • Create Summary                 │
│ • Attach Recommendations         │
│ • Store in Database              │
│ • Send Notification              │
└──────────────────────────────────┘
```

## Component Interactions

| Component             | Purpose            | Key Operations                              |
| --------------------- | ------------------ | ------------------------------------------- |
| **Detection Service** | Main orchestrator  | uploadImage, detectDisease, getHistory      |
| **Image Service**     | Image handling     | storeImage, validateImage, preprocessImage  |
| **ML Service**        | Disease prediction | predict, loadModel, evaluateModel           |
| **Treatment Service** | Recommendations    | getRecommendations, calculateCost           |
| **Disease Service**   | Disease info       | getDiseaseInfo, listDiseases, trackOutbreak |
| **Alert Service**     | Notifications      | sendAlert, scheduleNotification             |

## Key Relationships

```
┌─────────────────────────────────────────────────┐
│       Disease Detection System Overview         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Detection Service ←→ Image Service             │
│         ↓                                       │
│    ML Service ←→ Disease Service                │
│         ↓                                       │
│  Treatment Service ←→ Knowledge Base            │
│         ↓                                       │
│    Alert Service ←→ Notification System         │
│                                                 │
└─────────────────────────────────────────────────┘
```
