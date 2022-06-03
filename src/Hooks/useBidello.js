import { useContext, useRef } from "react";
import { gameContext } from "./useContext";

const useBidello = () => {
  const { bidello1Ref } = useContext(gameContext);

  const bidelli = useRef([
    {
      name: "bidello1",
      step: 48,
      x: {
        min: 1344,
        max: 4032,
        current: 4032,
      },
      y: {
        min: 3648,
        max: 3168,
        current: 1296,
      },
      direction: "left",
      ref: bidello1Ref,
      imgIndex: 1,
    },
  ]);

  const getBidello = (nomeBidello) => {
    for (let i = 0; i < bidelli.current.length; i++) {
      if (bidelli.current[i].name === nomeBidello) {
        return bidelli.current[i];
      }
    }
  };

  const changeImg = (bidelloRef, direction, bidelloImgIndex) => {
    bidelloRef.current.src =
      "/KikisKeyWebGame/img/characters/bidello/" +
      direction +
      "/" +
      bidelloImgIndex +
      ".png";
  };

  const moveBidello = (nomeBidello) => {
    for (let i = 0; i < bidelli.current.length; i++) {
      if (bidelli.current[i].name === nomeBidello) {
        if (bidelli.current[i].x.current === bidelli.current[i].x.max) {
          bidelli.current[i].direction = "left";
        }

        if (bidelli.current[i].x.current === bidelli.current[i].x.min) {
          bidelli.current[i].direction = "right";
        }

        if (bidelli.current[i].direction === "left") {
          bidelli.current[i].x.current -= bidelli.current[i].step;
        }
        if (bidelli.current[i].direction === "right") {
          bidelli.current[i].x.current += bidelli.current[i].step;
        }

        changeImg(
          bidelli.current[i].ref,
          bidelli.current[i].direction,
          bidelli.current[i].imgIndex
        );

        if (bidelli.current[i].imgIndex >= 3) {
          bidelli.current[i].imgIndex = 1;
        } else {
          bidelli.current[i].imgIndex++;
        }
      }
    }
  };

  return { getBidello, moveBidello };
};

export default useBidello;
