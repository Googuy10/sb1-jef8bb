import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DailyData {
  name: string;
  安全帽违规: number;
  危险操作: number;
  设备异常: number;
}

interface DashboardProps {
  data: DailyData[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [focusBar, setFocusBar] = useState<string | null>(null);

  const handleMouseEnter = (o: any) => {
    const dataKey = o.dataKey;
    setFocusBar(dataKey);
  };

  const handleMouseLeave = () => {
    setFocusBar(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Bar 
            dataKey="安全帽违规" 
            fill="#8884d8" 
            opacity={focusBar === '安全帽违规' || !focusBar ? 1 : 0.5}
          />
          <Bar 
            dataKey="危险操作" 
            fill="#82ca9d"
            opacity={focusBar === '危险操作' || !focusBar ? 1 : 0.5}
          />
          <Bar 
            dataKey="设备异常" 
            fill="#ffc658"
            opacity={focusBar === '设备异常' || !focusBar ? 1 : 0.5}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h3 className="font-semibold">统计说明：</h3>
        <ul className="list-disc list-inside">
          <li>图表显示过去一周每天的安全事件统计</li>
          <li>将鼠标悬停在图例上可以突出显示特定类型的事件</li>
          <li>点击图例可以切换显示/隐藏特定类型的事件</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;