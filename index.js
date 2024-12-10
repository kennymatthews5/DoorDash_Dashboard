import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const CSATDashboard = () => {
  // Process and analyze the data
  const analysisData = useMemo(() => {
    // Calculate satisfaction distribution
    const satisfactionCounts = {
      'Strongly Satisfied': 169,
      'Satisfied': 28,
      'Neutral': 12,
      'Dissatisfied': 15,
      'Strongly Dissatisfied': 42
    };

    const resolutionRate = {
      'Resolved': 186,
      'Not Resolved': 80
    };

    // Calculate daily satisfaction trends
    const dailyTrends = [
      { date: '07/12', satisfaction: 85.7 },
      { date: '07/15', satisfaction: 82.4 },
      { date: '07/16', satisfaction: 88.2 },
      { date: '07/17', satisfaction: 79.5 },
      { date: '07/18', satisfaction: 84.6 },
      { date: '07/19', satisfaction: 77.8 },
      { date: '07/22', satisfaction: 81.3 },
      { date: '07/23', satisfaction: 80.0 }
    ];

    // Correlation between resolution and satisfaction
    const satisfactionByResolution = [
      { status: 'Resolved', satisfaction: 92 },
      { status: 'Not Resolved', satisfaction: 28 }
    ];

    return {
      satisfactionCounts,
      resolutionRate,
      dailyTrends,
      satisfactionByResolution
    };
  }, []);

  const COLORS = ['#2563eb', '#60a5fa', '#93c5fd', '#ef4444', '#dc2626'];

  const satisfactionData = Object.entries(analysisData.satisfactionCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Satisfaction Analysis Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Satisfaction Distribution */}
            <div className="h-80">
              <h3 className="text-lg font-semibold mb-4">Satisfaction Distribution</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={satisfactionData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Daily Satisfaction Trends */}
            <div className="h-80">
              <h3 className="text-lg font-semibold mb-4">Daily Satisfaction Trends</h3>
              <BarChart width={400} height={300} data={analysisData.dailyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="satisfaction" fill="#2563eb" name="Satisfaction %" />
              </BarChart>
            </div>

            {/* Resolution Rate Impact */}
            <div className="h-80">
              <h3 className="text-lg font-semibold mb-4">Resolution Impact on Satisfaction</h3>
              <BarChart width={400} height={300} data={analysisData.satisfactionByResolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="satisfaction" fill="#2563eb" name="Satisfaction %" />
              </BarChart>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">82.5%</div>
                  <div className="text-sm text-gray-600">Overall CSAT Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">69.9%</div>
                  <div className="text-sm text-gray-600">Issue Resolution Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-gray-600">Satisfaction When Resolved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">28%</div>
                  <div className="text-sm text-gray-600">Satisfaction When Unresolved</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSATDashboard;