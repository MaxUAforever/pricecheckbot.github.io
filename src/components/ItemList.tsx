import { Item } from '../App';
import { ItemCard } from './ItemCard';

interface ItemListProps {
  items: Item[];
  onDeleteItem: (id: string) => void;
}

export function ItemList({ items, onDeleteItem }: ItemListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDeleteItem} />
      ))}
    </div>
  );
}
