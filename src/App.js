import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

   //NOT ALLOOWED TO MUTATE STATES 
  function handleAddItems(item) {
    setItems(items => [...items , item])
  }

  function handlDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  //Looping through the array to find the correct ID through mapping
  function handleToggleItem(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem = {handlDeleteItem} onToggleItems={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return <h1> Far Away </h1>;
}

//basically creating forms in Javascript with empty arrays and then
//maping the length with the lements to create an option list with them
function Form({onAddItems}) {
  //Controlled elements to keep data and push it , need to use the function useState
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip ? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items , onDeleteItem , onToggleItems}) {
  const [sortby, setSortBy] = useState("input")

  let sortedItems;

  if(sortby === "input") sortedItems = items;

  if(sortby === "description") 
    sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))

  if(sortby === "packed") sortedItems = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed))
    
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} 
          key={item.id} 
          onDeleteItem={onDeleteItem} 
          onToggleItems={onToggleItems}/>
        ))}
      </ul>

      <div className="actions">
        <select value = {sortby} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="input">
            Sort by input order
          </option>
          <option value="description"> Sort by description</option>
          <option value="packed">Sort by packed 
          </option>
        </select>
      </div>
    </div>
  );
}

function Item({ item , onDeleteItem , onToggleItems}) {
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItems(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick = {() => {
        console.log(item.id);
        
        onDeleteItem(item.id)}}> ❌ </button>
    </li>
  );
}

function Stats({items}) {
  if(!items.length) return (
    <p className="stats">
      <em>Start adding some items to your packing list </em>
    </p>)

  const numItems = items.length
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked / numItems )* 100);

  return (
    <footer className="stats">
      <em>
      {percentage === 100 ? 
      "You got everything! Ready to go " :  
      `You need ${numItems} item on your trip, and you already packed ${numPacked} (${percentage} %) of your items`
      } 
      </em>
    </footer>
  );
}
