# 🍅 Tomato Disease Detection - Flask ML Service

Flask API for serving predictions using the UNet-guided Xception model.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Server runs on: **http://localhost:5000**

## API Endpoints

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Get Classes
```bash
curl http://localhost:5000/classes
```

### 3. Predict Disease
```bash
curl -X POST -F "image=@tomato_leaf.jpg" http://localhost:5000/predict
```

## Testing with Python

```python
import requests

url = "http://localhost:5000/predict"
files = {'image': open('tomato_leaf.jpg', 'rb')}
response = requests.post(url, files=files)
print(response.json())
```

## Production Deployment

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
