import React from 'react';
import { useSpring, animated } from '@react-spring/web'
import { AvatarGenerator } from 'random-avatar-generator';
import Markdown from 'react-markdown'


const generator = new AvatarGenerator();

const Sentence = ({ sentence, delay }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-10px)' },
    config: { mass: 1, tension: 300, friction: 20 },
    delay
  });

  return (
    <animated.div style={{ marginBottom: '10px', ...props }}>
      <Markdown>{sentence}</Markdown>
    </animated.div>
  );
};

const ChatMessage = ({ msg }) => {
  const indexOfColon = msg.indexOf(":");
  const name = msg.substring(0, indexOfColon).trim();
  const text = msg.substring(indexOfColon + 1).trim();
  const avatar = generator.generateRandomAvatar(name);

  const sentences = text.split('. ');

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h4>{name}</h4>
      </div>
      <div style={{ textAlign: 'left', padding: '10px', margin: '10px', borderRadius: '5px', background: '#4CAF50', color: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        {sentences.map((sentence, index) => (
          <Sentence key={index} sentence={sentence} delay={index * 200} />
        ))}
      </div>
    </div>
  );

};


export default ChatMessage;
