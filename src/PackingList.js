import { useState } from 'react';
import { Item } from './Item';

//basically creating forms in Javascript with empty arrays and then
//maping the length with the lements to create an option list with them
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onDeleteAllItems,
}) {
  const [sortby, setSortBy] = useState('input');

  let sortedItems;

  if (sortby === 'input') sortedItems = items;

  if (sortby === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortby} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description"> Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={() => onDeleteAllItems(items)}> Clear list</button>
      </div>
    </div>
  );
}
