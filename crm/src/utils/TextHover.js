import {motion, useAnimationControls} from 'framer-motion'

const TextHover = ({ children }) => {
    const bounceEffect = () => {
        return {
            transform: [
                "scale3d(1, 1, 1)", 
                "scale3d(1.4, .55, 1)", 
                "scale3d(.7, 1.3, 1)", 
                "scale3d(1.25, .85, 1)", 
                "scale3d(0.9, 1.1, 1)", 
                "scale3d(1, 1, 1)", 
            ]
        }
    }

    return (
      <motion.span whileHover={() => bounceEffect()}>
        {children}
      </motion.span>
    );
  };

export default TextHover;