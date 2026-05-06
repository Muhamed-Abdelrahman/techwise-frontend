import React, { useState } from 'react';
import { Zap, Star, TrendingUp, Award, Check } from 'lucide-react';

const RecommendationsPage = () => {
  const [budget, setBudget] = useState('mid');
  const [usage, setUsage] = useState('work');
  const [showResults, setShowResults] = useState(false);

  const recommendations = {
    'budget-student': [
      { name: 'HP Pavilion 15', price: 599, score: 8.5, reason: 'Best value for students' },
      { name: 'Lenovo IdeaPad 3', price: 499, score: 8.2, reason: 'Affordable and reliable' }
    ],
    'budget-work': [
      { name: 'Dell Inspiron 15', price: 649, score: 8.7, reason: 'Solid productivity machine' },
      { name: 'ASUS VivoBook', price: 599, score: 8.4, reason: 'Great battery life' }
    ],
    'budget-gaming': [
      { name: 'Acer Nitro 5', price: 799, score: 8.9, reason: 'Best gaming at this price' },
      { name: 'Lenovo LOQ', price: 749, score: 8.6, reason: 'Good 1080p gaming' }
    ],
    'mid-student': [
      { name: 'MacBook Air M2', price: 1199, score: 9.3, reason: 'Perfect for students' },
      { name: 'Dell XPS 13', price: 1099, score: 9.1, reason: 'Premium build quality' }
    ],
    'mid-work': [
      { name: 'HP EliteBook', price: 1299, score: 9.2, reason: 'Business-grade reliability' },
      { name: 'ThinkPad X1 Carbon', price: 1399, score: 9.4, reason: 'Best keyboard experience' }
    ],
    'mid-gaming': [
      { name: 'ASUS TUF A15', price: 1299, score: 9.0, reason: 'Excellent gaming performance' },
      { name: 'MSI Katana 15', price: 1199, score: 8.8, reason: 'High refresh display' }
    ],
    'premium-student': [
      { name: 'MacBook Pro 14" M3', price: 1999, score: 9.7, reason: 'Ultimate creative machine' },
      { name: 'Dell XPS 15', price: 1899, score: 9.5, reason: 'Stunning OLED display' }
    ],
    'premium-work': [
      { name: 'MacBook Pro 16" M3', price: 2499, score: 9.8, reason: 'Professional powerhouse' },
      { name: 'ThinkPad P1', price: 2299, score: 9.6, reason: 'Workstation performance' }
    ],
    'premium-gaming': [
      { name: 'ASUS ROG Strix Scar', price: 2499, score: 9.7, reason: 'Top-tier gaming beast' },
      { name: 'Razer Blade 15', price: 2399, score: 9.5, reason: 'Premium gaming laptop' }
    ]
  };

  const handleGetRecommendations = () => {
    setShowResults(true);
  };

  const currentRecommendations = recommendations[`${budget}-${usage}`] || [];

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white py-5 text-center">
        <Zap size={64} className="mb-3 text-warning" />
        <h1 className="display-4 fw-bold mb-3">Get Personalized Recommendations</h1>
        <p className="lead text-white-50">
          Answer a few questions and we'll find the perfect device for you
        </p>
      </div>

      <div className="container py-5">
        {!showResults ? (
          <div className="card shadow p-4">
            {/* Question 1: Budget */}
            <div className="mb-4">
              <label className="form-label h5">1. What's your budget range?</label>
              <div className="row g-3">
                {[
                  { value: 'budget', label: 'Budget', range: '$300 - $800', icon: '💰' },
                  { value: 'mid', label: 'Mid-Range', range: '$800 - $1,500', icon: '💵' },
                  { value: 'premium', label: 'Premium', range: '$1,500+', icon: '💎' }
                ].map((option) => (
                  <div className="col-md-4" key={option.value}>
                    <button
                      onClick={() => setBudget(option.value)}
                      className={`btn w-100 text-start border p-4 rounded-3 ${
                        budget === option.value ? 'btn-primary text-white' : 'btn-outline-secondary'
                      }`}
                    >
                      <div className="fs-2 mb-2">{option.icon}</div>
                      <div className="fw-bold mb-1">{option.label}</div>
                      <div className="small text-muted">{option.range}</div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 2: Usage */}
            <div className="mb-4">
              <label className="form-label h5">2. What will you primarily use it for?</label>
              <div className="row g-3">
                {[
                  { value: 'student', label: 'Student', desc: 'Study, notes, research', icon: '📚' },
                  { value: 'work', label: 'Work', desc: 'Office apps, meetings', icon: '💼' },
                  { value: 'gaming', label: 'Gaming', desc: 'AAA games, streaming', icon: '🎮' }
                ].map((option) => (
                  <div className="col-md-4" key={option.value}>
                    <button
                      onClick={() => setUsage(option.value)}
                      className={`btn w-100 text-start border p-4 rounded-3 ${
                        usage === option.value ? 'btn-primary text-white' : 'btn-outline-secondary'
                      }`}
                    >
                      <div className="fs-2 mb-2">{option.icon}</div>
                      <div className="fw-bold mb-1">{option.label}</div>
                      <div className="small text-muted">{option.desc}</div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGetRecommendations}
              className="btn btn-primary w-100 py-3 mt-3 fw-bold shadow"
            >
              Get My Recommendations
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {/* Results Header */}
            <div className="card shadow p-4 text-center">
              <Award size={64} className="mb-3 text-warning" />
              <h2 className="h3 fw-bold mb-2">Your Perfect Matches</h2>
              <p className="text-muted">
                Based on your {budget === 'budget' ? 'Budget' : budget === 'mid' ? 'Mid-Range' : 'Premium'} budget and {usage === 'student' ? 'Student' : usage === 'work' ? 'Work' : 'Gaming'} needs
              </p>
              <button
                onClick={() => setShowResults(false)}
                className="btn btn-link text-primary"
              >
                ← Change Preferences
              </button>
            </div>

            {/* Recommendations */}
            {currentRecommendations.map((device, idx) => (
              <div key={idx} className="card shadow overflow-hidden">
                <div className="bg-primary text-white d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center gap-2">
                    {idx === 0 && (
                      <span className="badge bg-warning text-dark">BEST MATCH</span>
                    )}
                    <span className="fw-bold">Match Score: {device.score}/10</span>
                  </div>
                  <div className="d-flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${i < Math.floor(device.score / 2) ? 'text-warning fill-current' : 'text-white-50'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h3 className="h5 fw-bold">{device.name}</h3>
                      <div className="d-flex align-items-center gap-2 small text-muted">
                        <TrendingUp size={16} className="text-success" />
                        <span>{device.reason}</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="h4 fw-bold text-primary">${device.price}</div>
                      <div className="small text-muted">Starting price</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="fw-semibold">Why This Device?</h6>
                      <ul className="list-unstyled small text-muted">
                        <li className="d-flex align-items-start mb-1">
                          <Check size={20} className="text-success flex-shrink-0 me-2 mt-1" />
                          <span>Perfect for your {usage} needs</span>
                        </li>
                        <li className="d-flex align-items-start mb-1">
                          <Check size={20} className="text-success flex-shrink-0 me-2 mt-1" />
                          <span>Fits within your budget</span>
                        </li>
                        <li className="d-flex align-items-start">
                          <Check size={20} className="text-success flex-shrink-0 me-2 mt-1" />
                          <span>High user satisfaction rating</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-semibold">Key Specs</h6>
                      <div className="small text-muted">
                        <div className="d-flex justify-content-between"><span>Processor:</span><span className="fw-medium">Latest Gen</span></div>
                        <div className="d-flex justify-content-between"><span>RAM:</span><span className="fw-medium">16GB+</span></div>
                        <div className="d-flex justify-content-between"><span>Storage:</span><span className="fw-medium">512GB SSD</span></div>
                        <div className="d-flex justify-content-between"><span>Display:</span><span className="fw-medium">Full HD+</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-primary flex-fill">View Full Details</button>
                    <button className="btn btn-outline-primary flex-fill">Add to Compare</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Call to Action */}
            <div className="card text-center text-white bg-primary p-4">
              <h3 className="h5 fw-bold mb-2">Need More Help?</h3>
              <p className="text-white-50 mb-3">Talk to our AI assistant for personalized advice</p>
              <button className="btn btn-light text-primary">Chat with AI Assistant</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
