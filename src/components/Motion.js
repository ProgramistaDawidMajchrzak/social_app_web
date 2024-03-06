import { motion } from "framer-motion";


export const Motion = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
    >
        {children}
    </motion.div>
)