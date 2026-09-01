  import {
    FaceLandmarker,
    FilesetResolver,
  } from "@mediapipe/tasks-vision";
  
 export const init = async ({landmarkerRef,videoRef,streamRef}) => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

        streamRef = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoRef.current.srcObject = streamRef;

        await videoRef.current.play();

      } catch (error) {
        console.error("Error initializing face detection:", error);
      }
    };

  export  const detect = ({landmarkerRef,videoRef,setExpression}) => {
      if (!landmarkerRef.current || !videoRef.current) {
        return;
      }

      const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "Neutral";

        if (smileLeft > 0.5 && smileRight > 0.5) {
          currentExpression = "happy";
        } else if (jawOpen > 0.06 && browUp > 0.05) {
          currentExpression = "surprised";
        } else if (frownLeft > 0.005 && frownRight > 0.005) {
          currentExpression = "sad";
        }

        setExpression(currentExpression);

        return currentExpression
      } 

    //   animationRef.current = requestAnimationFrame(detect);
    };