"""
Flask API for Tomato Leaf Disease Detection
Serves predictions using UNet-guided Xception model
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend 

# ==================== CONFIG =====================
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
UNET_IMG_SIZE = (256, 256)
XCP_IMG_SIZE = (299, 299)

MODEL_PATH = "../xception_tomato_unet_guided(proper test).pth"
UNET_PATH = "../unet_best(6class).pth"

# ==================== UNET MODEL ====================
class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.ReLU(inplace=True),
        )
    def forward(self, x):
        return self.net(x)

class UNet(nn.Module):
    def __init__(self, in_channels=3, out_channels=1):
        super().__init__()
        self.down1 = DoubleConv(in_channels, 32)
        self.pool1 = nn.MaxPool2d(2)
        self.down2 = DoubleConv(32, 64)
        self.pool2 = nn.MaxPool2d(2)
        self.down3 = DoubleConv(64, 128)
        self.pool3 = nn.MaxPool2d(2)
        self.down4 = DoubleConv(128, 256)
        self.pool4 = nn.MaxPool2d(2)
        self.bottleneck = DoubleConv(256, 512)

        self.up6 = nn.ConvTranspose2d(512, 256, 2, 2)
        self.conv6 = DoubleConv(512, 256)
        self.up7 = nn.ConvTranspose2d(256, 128, 2, 2)
        self.conv7 = DoubleConv(256, 128)
        self.up8 = nn.ConvTranspose2d(128, 64, 2, 2)
        self.conv8 = DoubleConv(128, 64)
        self.up9 = nn.ConvTranspose2d(64, 32, 2, 2)
        self.conv9 = DoubleConv(64, 32)
        self.out_conv = nn.Conv2d(32, out_channels, 1)

    def forward(self, x):
        c1 = self.down1(x)
        c2 = self.down2(self.pool1(c1))
        c3 = self.down3(self.pool2(c2))
        c4 = self.down4(self.pool3(c3))
        c5 = self.bottleneck(self.pool4(c4))
        x = self.conv6(torch.cat([self.up6(c5), c4], 1))
        x = self.conv7(torch.cat([self.up7(x),  c3], 1))
        x = self.conv8(torch.cat([self.up8(x),  c2], 1))
        x = self.conv9(torch.cat([self.up9(x),  c1], 1))
        return self.out_conv(x)

# ==================== LOAD MODELS ====================
print(f"Loading models on device: {DEVICE}")

# Load UNet
unet = UNet().to(DEVICE)
unet.load_state_dict(torch.load(UNET_PATH, map_location=DEVICE))
unet.eval()
for p in unet.parameters():
    p.requires_grad = False
print("✅ UNet loaded successfully")

# Load Xception model
import timm
checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)

class_map = checkpoint.get('class_map', {})
num_classes = len(class_map)

model = timm.create_model(
    "xception",
    pretrained=False,
    in_chans=4,
    num_classes=num_classes
).to(DEVICE)

model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

# Reverse class map for predictions
idx_to_class = {v: k for k, v in class_map.items()}

print(f"✅ Xception model loaded successfully")
print(f"Classes: {list(class_map.keys())}")
print(f"Best validation accuracy: {checkpoint.get('val_acc', 'N/A'):.2f}%")

# ==================== PREPROCESSING ====================
def preprocess_image(image_bytes):
    """
    Preprocess image exactly as in training:
    1. Generate UNet mask
    2. Resize image for Xception
    3. Concatenate RGB + mask
    """
    # Decode image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Generate UNet mask
    u = cv2.resize(img, UNET_IMG_SIZE)
    u = u.astype(np.float32) / 255.0
    u = torch.tensor(u).permute(2, 0, 1).unsqueeze(0).to(DEVICE)
    
    with torch.no_grad():
        mask = torch.sigmoid(unet(u))[0, 0]
    
    mask = cv2.resize(mask.cpu().numpy(), XCP_IMG_SIZE)
    
    # Prepare Xception input
    x = cv2.resize(img, XCP_IMG_SIZE)
    x = x.astype(np.float32) / 255.0
    x = torch.tensor(x).permute(2, 0, 1)
    x = torch.cat([x, torch.tensor(mask).unsqueeze(0)], dim=0)
    
    return x.unsqueeze(0).to(DEVICE)

# ==================== API ENDPOINTS ====================
@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'device': DEVICE,
        'model_loaded': True,
        'num_classes': num_classes
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict disease from uploaded image
    Expects: multipart/form-data with 'image' file
    Returns: JSON with prediction and confidence
    """
    try:
        # Check if image is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Read image bytes
        image_bytes = file.read()
        
        # Preprocess
        input_tensor = preprocess_image(image_bytes)
        
        # Predict
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
        
        predicted_class = idx_to_class[predicted_idx.item()]
        confidence_score = confidence.item()
        
        # Get top 3 predictions
        top3_prob, top3_idx = torch.topk(probabilities, min(3, num_classes), dim=1)
        top3_predictions = [
            {
                'class': idx_to_class[idx.item()],
                'confidence': prob.item()
            }
            for idx, prob in zip(top3_idx[0], top3_prob[0])
        ]
        
        return jsonify({
            'success': True,
            'prediction': predicted_class,
            'confidence': float(confidence_score),
            'top_predictions': top3_predictions
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/classes', methods=['GET'])
def get_classes():
    """Get all available disease classes"""
    return jsonify({
        'classes': list(class_map.keys()),
        'num_classes': num_classes
    })

# ==================== RUN ====================
if __name__ == '__main__':
    print("\n" + "="*50)
    print("🍅 Tomato Disease Detection API")
    print("="*50)
    print(f"Server running on: http://0.0.0.0:5000")
    print(f"Device: {DEVICE}")
    print(f"Classes: {num_classes}")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
