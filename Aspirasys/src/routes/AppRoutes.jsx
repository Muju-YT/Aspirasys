import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import MyCourses from '../pages/MyCourses';
import MyProjects from '../pages/MyProjects';
import MyTimesheets from '../pages/MyTimesheets';
import MyInterviews from '../pages/MyInterviews';
import Achievements from '../pages/Achievements';
import DailyGoals from '../pages/DailyGoals';
import Announcements from '../pages/Announcements';
import MyProfile from '../pages/MyProfile';
import Login from '../pages/Auth/Login';
import Settings from '../pages/Settings';
import Security from '../pages/Security';


const AppRoutes = () => {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {isAuthenticated ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="my-timesheets" element={<MyTimesheets />} />
          <Route path="my-interviews" element={<MyInterviews />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="daily-goals" element={<DailyGoals />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="security" element={<Security />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
