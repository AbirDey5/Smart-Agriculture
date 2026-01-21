# Farmer Activity Manager - Component Level Design

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Analysis Class                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FarmerActivityManager                   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ + farmerId: Long                                     │   │
│  │ + name: String                                       │   │
│  │ + email: String                                      │   │
│  │ + password: String                                   │   │
│  │ + phone: String                                      │   │
│  │ + location: String                                   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ + manageFields()                                     │   │
│  │ + manageCrops()                                      │   │
│  │ + manageTasks()                                      │   │
│  │ + askQuestion()                                      │   │
│  │ + updateProfile()                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │      Design Component                  │
        │                                        │
        │  ┌──────────────────────┐             │
        │  │  manageFields        │◄────────┐   │
        │  └──────────────────────┘         │   │
        │           │                        │   │
        │  ┌──────────────────────┐         │   │
        │  │  FarmerActivity      │         │   │
        │  │  Manager             │─────────┘   │
        │  └──────────────────────┘             │
        │           │                            │
        │  ┌──────────────────────┐             │
        │  │  manageCrops         │             │
        │  └──────────────────────┘             │
        │           │                            │
        │  ┌──────────────────────┐             │
        │  │  manageTasks         │             │
        │  └──────────────────────┘             │
        └───────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Elaborated Design Class                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         <<interface>>                                │   │
│  │         FarmerActivityService                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ + manageFields()                                     │   │
│  │ + manageCrops()                                      │   │
│  │ + manageTasks()                                      │   │
│  │ + askQuestion()                                      │   │
│  └──────────────────────────┬──────────────────────────┘   │
│                              │                               │
│                              │ implements                    │
│                              ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         FarmerActivityManagerImpl                    │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ - farmerId: Long                                     │   │
│  │ - name: String                                       │   │
│  │ - email: String                                      │   │
│  │ - password: String                                   │   │
│  │ - phone: String                                      │   │
│  │ - village: String                                    │   │
│  │ - city: String                                       │   │
│  │ - district: String                                   │   │
│  │ - country: String                                    │   │
│  │ - numberOfFields: Integer                            │   │
│  │ - numberOfCrops: Integer                             │   │
│  │ - numberOfTasks: Integer                             │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ + registerFarmer(farmer: Farmer): Farmer             │   │
│  │                                                       │   │
│  │ + authenticateFarmer(email: String,                  │   │
│  │                      password: String): Boolean      │   │
│  │                                                       │   │
│  │ + updateFarmerProfile(farmer: Farmer): Farmer        │   │
│  │                                                       │   │
│  │ + addField(farmerId: Long, field: Field): Field      │   │
│  │                                                       │   │
│  │ + getFieldsByFarmer(farmerId: Long): List<Field>     │   │
│  │                                                       │   │
│  │ + updateField(fieldId: Long, field: Field): Field    │   │
│  │                                                       │   │
│  │ + deleteField(fieldId: Long): void                   │   │
│  │                                                       │   │
│  │ + addCrop(fieldId: Long, crop: Crop): Crop           │   │
│  │                                                       │   │
│  │ + getCropsByFarmer(farmerId: Long): List<Crop>       │   │
│  │                                                       │   │
│  │ + updateCropStage(cropId: Long, stage: String): Crop │   │
│  │                                                       │   │
│  │ + updateCropHealth(cropId: Long, health: String):    │   │
│  │                    Crop                               │   │
│  │                                                       │   │
│  │ + addTask(fieldId: Long, task: Task): Task           │   │
│  │                                                       │   │
│  │ + getTasksByField(fieldId: Long): List<Task>         │   │
│  │                                                       │   │
│  │ + updateTaskStatus(taskId: Long, status: String):    │   │
│  │                    Task                               │   │
│  │                                                       │   │
│  │ + getPendingTasks(farmerId: Long): List<Task>        │   │
│  │                                                       │   │
│  │ + askQuestion(farmerId: Long, content: String):      │   │
│  │               Question                                │   │
│  │                                                       │   │
│  │ + getQuestionsByFarmer(farmerId: Long):               │   │
│  │                        List<Question>                 │   │
│  │                                                       │   │
│  │ + getDashboardSummary(farmerId: Long):                │   │
│  │                       DashboardData                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### Analysis Class: FarmerActivityManager

High-level abstraction representing a farmer who manages agricultural activities including fields, crops, and daily tasks.

**Key Attributes:**

- Farmer identification and contact information
- Location details (village, city, district, country)
- Activity counters

**Key Operations:**

- Manage agricultural fields
- Track crop growth and health
- Schedule and complete farming tasks
- Seek expert advice through questions
- Update personal profile

### Design Component

Architectural middle layer connecting the analysis model to the implementation, showing the main farmer activities:

- **manageFields**: Add, view, update field information
- **manageCrops**: Plant crops, monitor growth stages and health
- **manageTasks**: Create and track farming tasks (irrigation, fertilization, etc.)
- Bidirectional flow between different management operations

### Elaborated Design Class: FarmerActivityManagerImpl

**Interface: FarmerActivityService**
Defines the contract for farmer activity operations

**Implementation: FarmerActivityManagerImpl**
Complete implementation with detailed attributes and methods for:

1. **Profile Management**
   - Register new farmer accounts
   - Authenticate farmer login
   - Update farmer profile information
   - Store location data for regional insights

2. **Field Management**
   - Add new agricultural fields
   - View all fields owned by farmer
   - Update field details (name, area, crop type)
   - Delete unused fields
   - Track total number of fields

3. **Crop Management**
   - Plant new crops in fields
   - Monitor crop growth stages (seeding, growing, flowering, harvesting)
   - Track crop health status (healthy, needs attention, diseased)
   - Update expected harvest dates
   - Calculate days remaining to harvest
   - View all crops across farmer's fields

4. **Task Management**
   - Create farming tasks (irrigation, fertilization, pest control)
   - Assign tasks to specific fields
   - Track task status (pending, completed)
   - View pending tasks by priority
   - Update task completion status
   - Set due dates for scheduled activities

5. **Advisory System Integration**
   - Ask questions to agricultural experts
   - View question history
   - Receive expert answers
   - Access community knowledge base

6. **Dashboard & Analytics**
   - View summary of all activities
   - Track field productivity
   - Monitor crop health trends
   - View upcoming tasks
   - Get weather-based recommendations

## Related Entities

- **Field**: Agricultural land parcels owned by farmer
- **Crop**: Plants being cultivated in fields
- **Task**: Scheduled farming activities (irrigation, fertilization, harvesting)
- **Question**: Farmer queries to experts
- **IrrigationSchedule**: Automated watering schedules
- **Farmer**: Core entity representing the agricultural producer

## Data Flow

1. Farmer registers and logs into the system
2. Farmer adds field information (location, size, soil type)
3. Farmer plants crops and assigns them to fields
4. System generates automated tasks based on crop lifecycle
5. Farmer creates custom tasks for field activities
6. Farmer monitors crop health and updates status
7. Farmer marks tasks as completed
8. Farmer asks questions when facing challenges
9. Dashboard provides comprehensive activity overview

## Integration Points

- **ProfileController**: RESTful endpoints for profile and field operations
- **CropController**: RESTful endpoints for crop management
- **TaskController**: RESTful endpoints for task operations
- **QuestionController**: RESTful endpoints for farmer questions
- **IrrigationController**: RESTful endpoints for irrigation scheduling
- **DashboardController**: RESTful endpoints for activity summaries
- **FarmerRepo**: Data persistence for farmer profiles
- **FieldRepo**: Data persistence for field information
- **CropRepo**: Data persistence for crop data
- **TaskRepo**: Data persistence for task management
- **QuestionRepository**: Data persistence for questions

## Key Features

### Multi-Field Management

Farmers can manage multiple agricultural fields simultaneously, each with different crops and specific requirements.

### Activity Tracking

Complete lifecycle tracking from field preparation through planting, maintenance, and harvest.

### Task Automation

System suggests tasks based on crop type, growth stage, and seasonal requirements while allowing manual task creation.

### Expert Consultation

Direct integration with expert advisory system for immediate agricultural guidance.

### Real-time Monitoring

Track crop health, field conditions, and task completion in real-time through dashboard interface.
