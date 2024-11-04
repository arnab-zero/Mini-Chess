import React from 'react';
import NewsList from '../components/NewsList';

type NewsItem = {
  id: number;
  title: string;
  time: string;
  content: React.ReactNode;
  videoUrl?: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Magnus Carlsen Triumphs Over Praggnanandhaa in Intense Showdown',
    time: '2 months ago',
    content: 'In a thrilling encounter, Magnus Carlsen secures victory against the young prodigy Praggnanandhaa, showcasing his experience and tactical prowess. The match kept viewers on the edge of their seats as both players displayed extraordinary skill.',
    videoUrl: 'https://www.youtube.com/embed/5SAw3OIrNk0'
  },
  {
    id: 2,
    title: 'Upcoming Quick Chess Tournament',
    time: '5 hours ago',
    content: 'Join the upcoming 6x5 tournament...',
  },
  {
    id: 3,
    title: 'World Chess Announces Plans to Launch the World Chess Tour',
    time: '2 days ago',
    content: (
      <span>
        World Chess has announced plans to launch the World Chess Tour, which aims to increase the global reach of chess and bring together the chess community through a series of events and competitions. The tour will feature various formats and locations, providing players with opportunities to showcase their talents and engage with fans. 
        For more details, visit the full announcement <a href="https://worldchess.com/news/world-chess-announces-plans-to-launch-the-world-chess-tour" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.
      </span>
    ),
  },
  {
    id: 4,
    title: 'Advitiya, the Youngest Chess Player from the State, Participates in Tournament',
    time: '1 day ago',
    content: 'Advitiya, an 8-year-old chess player, is making headlines as the youngest participant from the state in a prestigious chess tournament. His passion and skills at such a young age are inspiring many young players across the region.',
    videoUrl: 'https://www.youtube.com/embed/oPRW1gn3T4M'
  }
];

const NewsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-5 font-sans">
      <h1 className="text-3xl font-bold mb-8">News</h1>
      <NewsList newsData={newsData} />
    </div>
  );
};

export default NewsPage;
