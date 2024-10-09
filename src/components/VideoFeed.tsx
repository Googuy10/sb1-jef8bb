import React, { useRef, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const VideoFeed: React.FC<{ onAlert: (message: string) => void }> = ({ onAlert }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = 'http://www.w3school.com.cn/i/movie.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Error playing the video:", error);
      });
    }
  }, []);

  const handleAlert = () => {
    onAlert('危险行为检测：工人未佩戴安全帽');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg"
          loop
          muted
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-factory-workers-working-on-an-assembly-line-4778-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full flex items-center">
          <AlertTriangle className="mr-1" size={16} />
          <span className="text-sm">实时检测中</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">摄像头 1 - 主要生产线</h3>
        <p className="text-sm text-gray-600">状态: 正常运行</p>
        <button
          onClick={handleAlert}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          模拟检测危险行为
        </button>
      </div>
    </div>
  );
};

export default VideoFeed;