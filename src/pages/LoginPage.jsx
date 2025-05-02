import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const LoginPage = () => {
  const {user ,handleUserLogin} = useAuth()
  const [credentials, setCredentials] = useState({email:"", password:""})
  const navigate = useNavigate()


  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value 

    setCredentials({...credentials, [name]:value})
    console.log('CREDS:', credentials)
  }

  // const handleUserLogin = (e) => {
  //   e.preventDefault();
  //   // Login functionality would be implemented here
  //   console.log('Logging in with:', credentials);
  // };

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </motion.div>

          <div onSubmit={(e)=>handleUserLogin(e,credentials)}>
            <motion.div 
              className="space-y-6" 
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter password..."
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e)=>handleUserLogin(e,credentials)}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Sign in
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <motion.span
                whileHover={{ color: '#4F46E5' }}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-200"
              >
                <Link to="/register">Register here</Link>
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage