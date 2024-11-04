import React from 'react';

type VideoPlayerProps = {
  videoUrl: string;
  title: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
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
  );
};

export default VideoPlayer;
