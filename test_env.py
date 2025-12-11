import sys
print(f"Python execution successful: {sys.version}")
try:
    import numpy as np
    print(f"Numpy imported: {np.__version__}")
except ImportError as e:
    print(f"Numpy import failed: {e}")
except Exception as e:
    print(f"Numpy import crashed: {e}")

try:
    import cv2
    print(f"OpenCV imported: {cv2.__version__}")
except ImportError as e:
    print(f"OpenCV import failed: {e}")
except Exception as e:
    print(f"OpenCV import crashed: {e}")
