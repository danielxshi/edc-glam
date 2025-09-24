import React from 'react';

interface ParagraphProps {
  title: string;
  content: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ title, content }) => {
  return (
    <section>
      <h2 className="text-xl font-medium mt-8 mb-4 uppercase">{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default Paragraph;