import { useContext, useRef } from "react";

import { gameContext } from "./useContext";
import useCollisionDetector from "./useCollisionDetector";
import useStanze from "./useStanze";

const usePlayer = () => {
  const { playerRef } = useContext(gameContext);

  const { checkCambioStanza, updatePlayerPos } = useStanze();
  const { collisionDetectorX, collisionDetectorY } = useCollisionDetector();

  const player = useRef({
    x: 1008,
    y: 384,
    dim: 96,
    step: 48,
  });

  const setPlayer = (dato, val) => {
    if (dato === "x") {
      player.current.x = val;
    } else if (dato === "y") {
      player.current.y = val;
    } else if (dato === "dim") {
      player.current.dim = val;
    } else {
      player.current.step = val;
    }
  };

  const getPlayer = (dato) => {
    if (dato === "x") {
      return player.current.x;
    } else if (dato === "y") {
      return player.current.y;
    } else if (dato === "dim") {
      return player.current.dim;
    } else {
      return player.current.step;
    }
  };

  const playerCmds = [
    {
      name: "left",
      keys: ["arrowleft", "a"],
      func: () => {
        if (
          collisionDetectorX(getPlayer("x"), getPlayer("y"), -getPlayer("step"))
        ) {
          setPlayer("x", getPlayer("x") - getPlayer("step"));
        }
      },
    },
    {
      name: "right",
      keys: ["arrowright", "d"],
      func: () => {
        if (
          collisionDetectorX(getPlayer("x"), getPlayer("y"), getPlayer("step"))
        ) {
          setPlayer("x", getPlayer("x") + getPlayer("step"));
        }
      },
    },
    {
      name: "up",
      keys: ["arrowup", "w"],
      func: () => {
        if (
          collisionDetectorY(getPlayer("x"), getPlayer("y"), -getPlayer("step"))
        ) {
          setPlayer("y", getPlayer("y") - getPlayer("step"));
        }
      },
    },
    {
      name: "down",
      keys: ["arrowdown", "s"],
      func: () => {
        if (
          collisionDetectorY(getPlayer("x"), getPlayer("y"), getPlayer("step"))
        ) {
          setPlayer("y", getPlayer("y") + getPlayer("step"));
        }
      },
    },
  ];

  let playerImgIndex = 1;

  const animate = (cmdName) => {
    playerRef.current.src =
      "/KikisKeyWebGame/img/characters/kiki/" +
      cmdName +
      "/" +
      playerImgIndex +
      ".png";

    if (playerImgIndex >= 3) {
      playerImgIndex = 1;
    } else {
      playerImgIndex++;
    }
  };

  const playerController = (pressedKey) => {
    for (let cmd of playerCmds) {
      if (cmd["keys"].includes(pressedKey)) {
        cmd["func"]();
        let cmdName = cmd["name"];
        animate(cmdName);

        let returnCheckCambioStanza = checkCambioStanza(
          getPlayer("x"),
          getPlayer("y"),
          cmdName
        );

        if (Array.isArray(returnCheckCambioStanza)) {
          updatePlayerPos(setPlayer, returnCheckCambioStanza);
        }
      }
    }
  };

  return { setPlayer, getPlayer, playerController };
};

export default usePlayer;
