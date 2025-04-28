import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import TaskList from '../pages/MyTasks';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

import styles from './styles.module.css';
import './styles.css';

function App() {
  const {user} = useSelector((state) => state.auth);
  return (
    <div className={styles.appContainer}>
    <Router>
        {user && (
            <>
            <Navbar />
            <Sidebar />
            </>
        )}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
