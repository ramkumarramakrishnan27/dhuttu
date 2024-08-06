import Header from "./Header";
//// import Example from './Example';
import Footer from "./Footer";
import Content from "./Content";
import AddItem from "./AddItem";
import { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setItems(JSON.parse(localStorage.getItem("todo_list")) || [])
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not found");
        const listItems = await response.json();
        //console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }finally{
        setIsLoading(false)
      }
    };

    setTimeout(()=>{
      (async () => await fetchItems())();
    },10)
  }, []);

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems));
    var myItem = listItems.filter(item=>item.id === id)

    const updateOptions = {
      method : 'PATCH',
      Headers : {
        'Content-Type' : 'Application/json'
      },
      body : JSON.stringify({checked:myItem[0].checked})
    }
    var reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems));
    const updateOptions = {
      method : 'DELETE'
    }
    var reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item };
    const listItems = [...items, newItem];
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems));
    const postOptions = {
      method : 'POST',
      Headers : {
        'Content-Type' : 'Application/json'
      },
      body : JSON.stringify(newItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  };

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p> }  
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      {/* <Example /> */}
      <Footer length={items.length} />
    </div>
  );
}

export default App;
