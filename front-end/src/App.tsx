import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { cloneDeep } from 'lodash';
import axios from 'axios';

interface Person {
  id: string | number;
  firstName: string;
  lastName: string;
}

const sortAndUpdateState = (
  newState: any[],
  setState: Dispatch<SetStateAction<Person[]>>
): void => {
  setState((prevState) => {
    return [...cloneDeep(prevState), ...newState].sort((a, b) => a.id - b.id);
  });
};

const App: React.FC = () => {
  const [personsState, setPersonsState] = useState<Person[]>([]);

  useEffect((): void => {
    const fetchFirstApiData = async (): Promise<void> => {
      const apiOneData = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/API1`
      );
      const personsArr = apiOneData?.data?.person?.person;
      if (personsArr) {
        sortAndUpdateState(personsArr, setPersonsState);
      }
    };

    const fetchSecondApiData = async (): Promise<void> => {
      const apiTwoData = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/API2`
      );
      const personsArr = apiTwoData?.data?.persons?.person;
      if (personsArr) {
        sortAndUpdateState(personsArr, setPersonsState);
      }
    };

    fetchFirstApiData();
    fetchSecondApiData();
  }, []);

  return (
    <div className='App'>
      <ul>
        {personsState.map((el) => (
          <li key={el.id}>{`${el.firstName} - ${el.lastName}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
