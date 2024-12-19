import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetailView/JobDetails';
import NotFound from './components/NotFound';

import './App.css';


function App() {

  return (
    <div className="App">
      <Routes >
        <Route exact path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Route>
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>

    </div>
  );
}

export default App;
