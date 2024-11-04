import React from 'react';
import NewsItem from './NewsItem';

type NewsDataProps = {
  newsData: {
    id: number;
    title: string;
    time: string;
    content: React.ReactNode;
    videoUrl?: string;
  }[];
};

const NewsList: React.FC<NewsDataProps> = ({ newsData }) => {
  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      {newsData.map((news) => (
        <NewsItem key={news.id} {...news} />
      ))}
    </div>
  );
};

export default NewsList;
