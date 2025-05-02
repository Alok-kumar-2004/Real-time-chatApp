import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, LogIn, MessageCircle } from 'react-feather';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10"
    >
        <MessageCircle className="text-indigo-600" size={24}/> 
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-xl font-bold text-indigo-600"> Real time chat App
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-4"
      >
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Welcome, <span className="text-indigo-600">{user.name}</span></span>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut 
                className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" 
                onClick={handleUserLogout}
                size={20}
              />
            </motion.div>
          </div>
        ) : (
          <Link to="/login">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogIn 
                className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" 
                size={20}
              />
            </motion.div>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Header;