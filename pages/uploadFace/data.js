var exampleFaceResult = { "0": { "image_id": "hQhOp9C6fi7AsN0csv9XZQ==", "request_id": "1537371256,56c81988-8c68-4051-9fc7-d01799525d5d", "time_used": 276, "faces": [{ "attributes": { "emotion": { "sadness": 0.001, "neutral": 0.24, "disgust": 0.0, "anger": 0.0, "surprise": 0.0, "fear": 0.0, "happiness": 99.757 }, "beauty": { "female_score": 90.311, "male_score": 88.568 }, "gender": { "value": "Female" }, "age": { "value": 33 }, "mouthstatus": { "close": 100.0, "surgical_mask_or_respirator": 0.0, "open": 0.0, "other_occlusion": 0.0 }, "glass": { "value": "None" }, "skinstatus": { "dark_circle": 3.23, "stain": 3.998, "acne": 2.231, "health": 86.245 }, "headpose": { "yaw_angle": -15.033561, "pitch_angle": 8.274192, "roll_angle": 29.702925 }, "blur": { "blurness": { "threshold": 50.0, "value": 0.725 }, "motionblur": { "threshold": 50.0, "value": 0.725 }, "gaussianblur": { "threshold": 50.0, "value": 0.725 } }, "smile": { "threshold": 50.0, "value": 98.077 }, "eyestatus": { "left_eye_status": { "normal_glass_eye_open": 0.034, "no_glass_eye_close": 0.0, "occlusion": 0.0, "no_glass_eye_open": 99.966, "normal_glass_eye_close": 0.0, "dark_glasses": 0.0 }, "right_eye_status": { "normal_glass_eye_open": 0.015, "no_glass_eye_close": 0.0, "occlusion": 0.0, "no_glass_eye_open": 99.985, "normal_glass_eye_close": 0.0, "dark_glasses": 0.0 } }, "facequality": { "threshold": 70.1, "value": 50.782 }, "ethnicity": { "value": "ASIAN" }, "eyegaze": { "right_eye_gaze": { "position_x_coordinate": 0.404, "vector_z_component": 0.961, "vector_x_component": -0.277, "vector_y_component": -0.011, "position_y_coordinate": 0.428 }, "left_eye_gaze": { "position_x_coordinate": 0.445, "vector_z_component": 0.975, "vector_x_component": -0.222, "vector_y_component": 0.021, "position_y_coordinate": 0.422 } } }, "face_rectangle": { "width": 201, "top": 161, "left": 238, "height": 201 }, "face_token": "e2b7b4148bc45d47ea75753c1a536b38" }] },}

// 定义数据出口
module.exports = {
  exampleFaceResult: exampleFaceResult
}