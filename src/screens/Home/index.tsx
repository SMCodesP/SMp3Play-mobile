import React from 'react';

import {Container, Title} from './styles';

const Home: React.FC = () => {
  const currentTime = new Date();

  return (
    <Container>
      <Title>
        {currentTime.getHours() >= 6 && currentTime.getHours() < 12
          ? 'Bom dia'
          : currentTime.getHours() > 12 && currentTime.getHours() < 17
          ? 'Boa tarde'
          : 'Boa noite'}
      </Title>
    </Container>
  );
};

export default Home;
