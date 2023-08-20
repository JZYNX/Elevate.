import React from 'react';

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
  );
}

export default Dashboard;
