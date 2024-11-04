import React from 'react';

type NewsItemProps = {
  id: number;
  title: string;
  time: string;
  content: React.ReactNode;
  videoUrl?: string;
};

const NewsItem: React.FC<NewsItemProps> = ({ title, time, content, videoUrl }) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-5 w-full transform transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{time}</p>
      <p className="text-gray-700 mt-3">{content}</p>
      {videoUrl && (
        <div className="mt-4">
          <iframe
            src={videoUrl}
            title={title}
            width="100%"
            height="200"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
