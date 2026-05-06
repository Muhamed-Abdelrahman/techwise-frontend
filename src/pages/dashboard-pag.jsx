import React from 'react';
import { TrendingUp, Star, Clock, ShoppingCart, BarChart3, Zap, Award, Bell } from 'lucide-react';

const DashboardPage = ({ setCurrentPage }) => {
  const recentSearches = [
    { name: 'Gaming Laptops', date: '2 hours ago' },
    { name: 'Budget Tablets', date: 'Yesterday' },
    { name: 'Workstation PCs', date: '3 days ago' }
  ];

  const savedDevices = [
    { name: 'MacBook Pro 16" M3', price: '$2,499', rating: 4.8, image: '💻' },
    { name: 'Dell XPS 15', price: '$1,899', rating: 4.6, image: '💻' },
    { name: 'ASUS ROG Strix', price: '$2,199', rating: 4.7, image: '🎮' }
  ];

  const recommendations = [
    { title: 'Price Drop Alert', description: 'MacBook Pro M3 is now $200 off!', type: 'deal', icon: TrendingUp },
    { title: 'New Match Found', description: 'HP Spectre matches your preferences', type: 'match', icon: Star },
    { title: 'Review Ready', description: 'Your Dell XPS comparison is ready', type: 'info', icon: BarChart3 }
  ];

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold">Welcome back, John! 👋</h1>
          <p className="text-muted">Here's what's happening with your tech journey</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-5">
          {[
            { icon: Star, label: 'Saved Devices', value: '12', color: 'primary' },
            { icon: BarChart3, label: 'Comparisons', value: '8', color: 'success' },
            { icon: TrendingUp, label: 'Price Alerts', value: '3', color: 'warning' },
            { icon: Award, label: 'Smart Score', value: '94', color: 'info' }
          ].map((stat, idx) => (
            <div key={idx} className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <div className={`bg-${stat.color}-100 rounded p-2 d-flex align-items-center justify-content-center`} style={{width:'50px', height:'50px'}}>
                      <stat.icon className={`text-${stat.color}-600`} size={24} />
                    </div>
                    <span className="text-success fw-bold">+12%</span>
                  </div>
                  <h3 className="fw-bold mb-1">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* Recommendations */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="card-title mb-0">Recommendations For You</h5>
                  <button className="btn btn-link p-0" onClick={() => setCurrentPage('recommendations')}>View All →</button>
                </div>
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="d-flex align-items-center p-3 mb-2 rounded bg-light">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-3`} 
                         style={{width:'45px', height:'45px', backgroundColor: rec.type==='deal'?'#d1e7dd': rec.type==='match'?'#cfe2ff':'#e0d3ff'}}>
                      <rec.icon size={20} className={rec.type==='deal'?'text-success': rec.type==='match'?'text-primary':'text-purple'} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{rec.title}</h6>
                      <small className="text-muted">{rec.description}</small>
                    </div>
                    <button className="btn btn-link p-0">View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Devices */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="card-title mb-0">Saved Devices</h5>
                  <button className="btn btn-link p-0" onClick={() => setCurrentPage('compare')}>Compare All →</button>
                </div>
                <div className="row g-3">
                  {savedDevices.map((device, idx) => (
                    <div key={idx} className="col-md-4">
                      <div className="card h-100 text-center">
                        <div className="card-body d-flex flex-column">
                          <div className="fs-1 mb-2">{device.image}</div>
                          <h6 className="fw-bold">{device.name}</h6>
                          <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
                            <span className="text-primary fw-bold">{device.price}</span>
                            <div className="d-flex align-items-center">
                              <Star size={16} className="text-warning me-1" />
                              <span>{device.rating}</span>
                            </div>
                          </div>
                          <button className="btn btn-primary btn-sm">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Recent Activity</h5>
                {recentSearches.map((search, idx) => (
                  <div key={idx} className="d-flex align-items-center justify-content-between p-3 mb-2 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width:'40px', height:'40px'}}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <h6 className="mb-0">{search.name}</h6>
                        <small className="text-muted">{search.date}</small>
                      </div>
                    </div>
                    <button className="btn btn-link p-0">View →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Quick Actions */}
            <div className="card mb-4">
              <div className="card-body">
                <h6 className="card-title mb-3">Quick Actions</h6>
                <button className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2" onClick={() => setCurrentPage('compare')}>
                  <BarChart3 size={18} /> Compare Devices
                </button>
                <button className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center gap-2" onClick={() => setCurrentPage('recommendations')}>
                  <Zap size={18} /> Get Recommendations
                </button>
                <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => setCurrentPage('chatbot')}>
                  <Star size={18} /> Ask AI Assistant
                </button>
              </div>
            </div>

            {/* Tech Score */}
            <div className="card text-white mb-4" style={{background: 'linear-gradient(to bottom right, #0d6efd, #6610f2)'}}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Your Tech Score</h6>
                  <Award size={20} />
                </div>
                <div className="text-center mb-3">
                  <h2 className="display-4 mb-1">94</h2>
                  <p className="mb-0">Excellent</p>
                </div>
                <p className="small text-white-50">You're making great tech decisions! Keep comparing and learning.</p>
                <button className="btn btn-outline-light btn-sm mt-2">Learn More →</button>
              </div>
            </div>

            {/* Notifications */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Notifications</h6>
                  <button className="btn btn-link p-0" onClick={() => setCurrentPage('notifications')}>
                    <Bell size={18} />
                  </button>
                </div>
                {[
                  { text: 'Price dropped on MacBook Pro', time: '1h ago', unread: true },
                  { text: 'New review available', time: '3h ago', unread: true },
                  { text: 'Comparison ready', time: '1d ago', unread: false }
                ].map((notif, idx) => (
                  <div key={idx} className={`p-2 rounded mb-2 ${notif.unread ? 'bg-primary bg-opacity-10' : 'bg-light'}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className={`mb-0 ${notif.unread ? 'fw-bold text-dark' : 'text-muted'}`}>{notif.text}</p>
                      {notif.unread && <span className="bg-primary rounded-circle" style={{width:'8px', height:'8px'}}></span>}
                    </div>
                    <small className="text-muted">{notif.time}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
