import {motion, useAnimationControls} from 'framer-motion'
import { useState, useEffect } from 'react';
import { primaryColor, secondaryColor } from '../utils/Color';

const TextHover = ({ children }) => {
    const controls = useAnimationControls();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currColor, setCurrColor] = useState(primaryColor);

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

    useEffect(() => {
        bounceEffect();
    }, []); 

    return (
      <motion.span animate = {controls} 
        onMouseOver={() => {
            setCurrColor(secondaryColor);
            if (!isPlaying){
                bounceEffect()
            }
        }} 
        onMouseOut={() => {
            setCurrColor(primaryColor);
        }}
        onAnimationComplete={() => {
            setIsPlaying(false)
        }}
        style={{
            color: currColor, 
            fontWeight: 'bold',
            cursor: 'default'
        }}>
            {children}
      </motion.span>
    );
  };

export default TextHover;