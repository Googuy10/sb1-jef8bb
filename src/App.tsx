import React, { useState, useEffect } from 'react';
import { AlertCircle, Camera, BarChart } from 'lucide-react';
import VideoFeed from './components/VideoFeed';
import AlertSystem from './components/AlertSystem';
import Dashboard from './components/Dashboard';

interface Alert {
  id: number;
  message: string;
  severity: 'high' | 'medium';
  time: string;
}

interface DailyData {
  name: string;
  安全帽违规: number;
  危险操作: number;
  设备异常: number;
}

function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([
    { name: '周一', 安全帽违规: 4, 危险操作: 2, 设备异常: 1 },
    { name: '周二', 安全帽违规: 3, 危险操作: 1, 设备异常: 2 },
    { name: '周三', 安全帽违规: 2, 危险操作: 3, 设备异常: 0 },
    { name: '周四', 安全帽违规: 5, 危险操作: 2, 设备异常: 1 },
    { name: '周五', 安全帽违规: 1, 危险操作: 4, 设备异常: 3 },
  ]);

  const addAlert = (message: string, severity: 'high' | 'medium') => {
    const newAlert = {
      id: Date.now(),
      message,
      severity,
      time: new Date().toLocaleTimeString(),
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);

    // Update daily data
    const today = new Date().getDay();
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayName = dayNames[today];

    setDailyData(prevData => {
      const updatedData = [...prevData];
      const todayIndex = updatedData.findIndex(item => item.name === dayName);
      if (todayIndex !== -1) {
        if (message.includes('安全帽')) {
          updatedData[todayIndex].安全帽违规 += 1;
        } else if (message.includes('危险行为')) {
          updatedData[todayIndex].危险操作 += 1;
        } else {
          updatedData[todayIndex].设备异常 += 1;
        }
      }
      return updatedData;
    });
  };

  useEffect(() => {
    // Simulate random alerts
    const interval = setInterval(() => {
      const randomAlert = Math.random() > 0.5 
        ? '危险行为检测：工人未佩戴安全帽' 
        : '设备异常：机器振动过大';
      addAlert(randomAlert, 'medium');
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <AlertCircle className="mr-2" />
          工厂安全监测系统
        </h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Camera className="mr-2" />
              实时视频监控
            </h2>
            <VideoFeed onAlert={(message) => addAlert(message, 'high')} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <AlertCircle className="mr-2" />
              警报系统
            </h2>
            <AlertSystem alerts={alerts} />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <BarChart className="mr-2" />
            安全数据分析
          </h2>
          <Dashboard data={dailyData} />
        </div>
      </main>
    </div>
  );
}

export default App;