import {motion, useAnimationControls} from 'framer-motion'
import { useState } from 'react';

const TextHover = ({ children }) => {
    const controls = useAnimationControls();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currColor, setCurrColor] = useState('white');

    const bounceEffect = () => {
        controls.start({
            transform: [
                "scale3d(1, 1, 1)", 
                "scale3d(1.3, .65, 1)", 
                "scale3d(.7, 1.3, 1)", 
                "scale3d(1.25, .85, 1)", 
                "scale3d(0.95, 1.05, 1)", 
                "scale3d(1, 1, 1)", 
            ]
        })
        setIsPlaying(true);
    }

    return (
      <motion.span animate = {controls} 
        onMouseOver={() => {
            setCurrColor('#F9C1E2');
            if (!isPlaying){
                bounceEffect()
            }
        }} 
        onMouseOut={() => {
            setCurrColor('white');
        }}
        onAnimationComplete={() => {
            setIsPlaying(false)
        }}
        style={{
            color: currColor, 
            fontWeight: 'bold'
        }}>
            {children}
      </motion.span>
    );
  };

export default TextHover;