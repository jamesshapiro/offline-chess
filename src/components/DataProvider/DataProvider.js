import React from 'react';
import { UserContext } from '../UserProvider';

export const DataContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_API_URL;

function DataProvider({ children }) {
  const randomItem = 'random item';
  const [items, setItems] = React.useState([]);
  const [apiWasRequested, setApiWasRequested] = React.useState(false);
  const [requestWasHandled, setRequestWasHandled] = React.useState(false);

  //const { token } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchData() {
      const URL = ENDPOINT + 'video';

      const request = new Request(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        timeout: 100000,
      });
      console.log(`API Was Requested!`);
      console.log(`${ENDPOINT}`);

      const response = await fetch(request);
      const json = await response.json();
      console.log(json);
      return json;
    }
    console.log('data fetch requested');
    console.log(
      `apiWasRequested: ${apiWasRequested} && requestWasHandled: ${requestWasHandled}`
    );
    if (apiWasRequested && !requestWasHandled) {
      fetchData();
      setApiWasRequested(false);
      setRequestWasHandled(true);
    }
  }, [apiWasRequested, requestWasHandled]);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
