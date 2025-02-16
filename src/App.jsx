import React from 'react'
import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify'


/**
 * Planning Frontend Task
 * 
 * 
 * @returns 
 */

const App = () => {
    return (
        <div className="w-100 h-100">
            <AppRoutes />
            <ToastContainer autoClose={900} hideProgressBar={false} newestOnTop closeOnClick />
        </div>
    )
}

export default App