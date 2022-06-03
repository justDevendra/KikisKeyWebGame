import "./InfoScreen.css";
import React, { useContext } from "react";
import { gameContext } from "../../Hooks/useContext";
import { motion } from "framer-motion";

const InfoScreen = () => {
  const { infoScreenText } = useContext(gameContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="contenitoreInfoScreen"
    >
      <p className="contenutoInfoScreen">{infoScreenText}</p>
    </motion.div>
  );
};

export default InfoScreen;
