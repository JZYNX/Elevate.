import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -1;
`;

function Dashboard() {
  // Example data for tasks and notifications
  const todayTasks = [
    { id: 1, title: 'Complete project report', time: '10:00 AM' },
    { id: 2, title: 'Meeting with client', time: '02:00 PM' },
    // Add more tasks
  ];

  const recentNotifications = [
    { id: 1, text: 'New email from John Doe', time: '2 minutes ago' },
    { id: 2, text: 'Upcoming event reminder', time: '1 hour ago' },
    // Add more notifications
  ];

  return (
    <DashboardContainer>
      <SidebarColumn>
        <Sidebar />
      </SidebarColumn>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <div className="dashboard"> 
        <h2>Dashboard</h2>
        <div className="task-list"> 
          <h3>Today's Tasks</h3>
          <ul>
            {todayTasks.map(task => (
              <li key={task.id} className="task">{task.title} - {task.time}</li> 
            ))}
          </ul>
        </div>
        <div className="notification-list"> 
          <h3>Recent Notifications</h3>
          <ul>
            {recentNotifications.map(notification => (
              <li key={notification.id} className="notification">{notification.text} - {notification.time}</li> 
            ))}
          </ul>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default Dashboard;
