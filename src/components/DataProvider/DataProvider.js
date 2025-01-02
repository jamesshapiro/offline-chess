import React from 'react';

import styled from 'styled-components';

export const DataContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_API_URL;

function DataProvider({ children }) {
  const randomItem = 'random item';
  const [items, setItems] = React.useState([]);
  const [apiWasRequested, setApiWasRequested] = React.useState(true);
  const [requestWasHandled, setRequestWasHandled] = React.useState(false);
  const [tags, setTags] = React.useState('');
  const [toggle, setToggle] = React.useState('training');
  const [notes, setNotes] = React.useState('');
  const [isPlanningMode, setIsPlanningMode] = React.useState(false);
  const [isMistake, setIsMistake] = React.useState(false);
  const [playerSolvedExercise, setPlayerSolvedExercise] = React.useState(false);
  const [playerFailedExercise, setPlayerFailedExercise] = React.useState(false);
  const [numCorrectExercisePlan, setNumCorrectExercisePlan] = React.useState(0);
  const [exercisePlans, setExercisePlans] = React.useState([]);
  const [moveHistory, setMoveHistory] = React.useState([]);
  const [selectedMove, setSelectedMove] = React.useState(null);

  function resetAll() {
    // setTags('');
    setToggle('training');
    setNotes('');
    setPlayerSolvedExercise(false);
    setPlayerFailedExercise(false);
    setNumCorrectExercisePlan(0);
    setExercisePlans([]);
  }

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const URL = ENDPOINT + 'last-tag';

  //     const request = new Request(URL, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       timeout: 100000,
  //     });
  //     console.log(`API Was Requested!`);
  //     console.log(`${URL}`);

  //     const response = await fetch(request);
  //     const json = await response.json();
  //     const data = json.data;
  //     const lastTag = data.LAST_TAG;
  //     setTags(lastTag);

  //     console.log(`json=${JSON.stringify(json)}`);

  //     return json;
  //   }
  //   if (apiWasRequested && !requestWasHandled && token) {
  //     fetchData();
  //     setApiWasRequested(false);
  //     setRequestWasHandled(true);
  //   }
  // }, [apiWasRequested, requestWasHandled, token]);

  function createItem(content, variant) {
    const nextItems = [
      ...items,
      {
        id: crypto.randomUUID(),
        content,
        variant,
      },
    ];

    setItems(nextItems);
  }

  function clearItem(id) {
    const nextItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(nextItems);
  }

  return (
    <DataContext.Provider
      value={{
        items,
        createItem,
        clearItem,
        randomItem,
        setApiWasRequested,
        setRequestWasHandled,
        tags,
        setTags,
        resetAll,
        toggle,
        setToggle,
        notes,
        setNotes,
        isPlanningMode,
        isMistake,
        setIsPlanningMode,
        setIsMistake,
        playerSolvedExercise,
        setPlayerSolvedExercise,
        playerFailedExercise,
        setPlayerFailedExercise,
        numCorrectExercisePlan,
        setNumCorrectExercisePlan,
        exercisePlans,
        setExercisePlans,
        moveHistory,
        setMoveHistory,
        selectedMove,
        setSelectedMove,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;

const CheckboxLabel = styled.label`
  display: block;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
