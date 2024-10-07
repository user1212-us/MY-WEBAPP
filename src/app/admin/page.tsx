"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart2,
  Signal,
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Active Users",
      value: 1250,
      icon: Users,
      color: "text-[#1877F2]",
    },
    {
      title: "Active Signals",
      value: 15,
      icon: Signal,
      color: "text-[#28A745]",
    },
    {
      title: "Total Stocks",
      value: 500,
      icon: BarChart2,
      color: "text-[#FFA500]",
    },
    {
      title: "Positive Trends",
      value: 8,
      icon: TrendingUp,
      color: "text-[#28A745]",
    },
    { title: "Alerts", value: 3, icon: AlertTriangle, color: "text-[#DC3545]" },
    {
      title: "Revenue",
      value: "$12,500",
      icon: DollarSign,
      color: "text-[#1877F2]",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-[#003E77] mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-[#1877F2]" />
                    <span>New user registration: John Doe</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Signal className="w-5 h-5 text-[#28A745]" />
                    <span>New signal created: AAPL (Buy)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-[#DC3545]" />
                    <span>Alert triggered: GOOGL price drop</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-[#28A745]" />
                    <span>Positive trend detected: TSLA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
