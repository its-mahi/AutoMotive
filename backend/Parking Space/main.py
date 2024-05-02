import cv2
import pickle
import cvzone
import numpy as np

# Video feed
cap = cv2.VideoCapture('upload/input_video.mp4')

with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

width, height = 107, 48

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'X264')            # specifies the H.264 codec for encoding the output video. H.264 is known for high compression efficiency and good video quality.
out = cv2.VideoWriter('result/result_video.mp4', fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))

def checkParkingSpace(imgPro):
    spaceCounter = 0

    for pos in posList:
        x, y = pos

        imgCrop = imgPro[y:y + height, x:x + width]
        count = cv2.countNonZero(imgCrop)

        if count < 900:
            color = (0, 255, 0)
            thickness = 4
            spaceCounter += 1
        else:
            color = (0, 0, 255)
            thickness = 2

        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        # cv2.putText(img, str(count), (x, y + height - 3), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)
        cvzone.putTextRect(img, str(count), (x, y + height - 3), scale=1.2, thickness=1, offset=0, colorR=(0, 0, 255));

    # cv2.putText(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 200, 0), 5, cv2.LINE_AA)
    cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3, thickness=5, offset=20, colorR=(0, 200, 0));

while True:
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        break

    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3, 3), np.uint8)
    imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

    checkParkingSpace(imgDilate)
    cv2.imshow("Image", img)
    out.write(img)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

# Release everything if job is finished
cap.release()
out.release()
cv2.destroyAllWindows()
