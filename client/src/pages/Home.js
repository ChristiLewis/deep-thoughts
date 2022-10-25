import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  //USEQUERY HOOK TO MAKE QUERY REQUEST
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //GET THE THOUGHT OUT OF THE QUERY
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT THOUGHT LIST */}</div>
      </div>
    </main>
  );
};

export default Home;