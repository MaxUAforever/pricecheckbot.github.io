import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ItemList } from './components/ItemList';
import { AddItemSheet } from './components/AddItemSheet';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { sendUrlToTelegramBot } from './lib/telegram';

export interface ColorVariant {
  id: string;
  color: string;
  price?: number;
}

export interface Item {
  id: string;
  name: string;
  photo?: string;
  colorVariants: ColorVariant[];
  createdAt: Date;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async (url: string) => {
    setIsLoading(true);
    setIsAddSheetOpen(false);

    try {
      const result = await sendUrlToTelegramBot(url);

      if (result.success && result.data) {
        const newItem: Item = {
          id: Date.now().toString(),
          name: result.data.name,
          photo: result.data.photo,
          colorVariants: result.data.colorVariants.map((variant, index) => ({
            id: `${Date.now()}-${index}`,
            color: variant.color,
            price: variant.price,
          })),
          createdAt: new Date(),
        };
        setItems([newItem, ...items]);
        toast.success('Item added successfully!');
      } else {
        toast.error(result.error || 'Failed to add item');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#17212b]">
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'bg-[#242f3d] border-[#313d4f] text-white',
        }}
      />
      
      {isLoading && <LoadingOverlay />}
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#242f3d] border-b border-[#313d4f] px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-white">My Items</h1>
            <p className="text-[#8b98a5] text-xs">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <Button
            onClick={() => setIsAddSheetOpen(true)}
            className="bg-[#5288c1] hover:bg-[#6099d1] text-white rounded-full h-10 w-10 p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-[#242f3d] flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-[#5288c1]" />
            </div>
            <h2 className="text-white mb-2">No items yet</h2>
            <p className="text-[#8b98a5] mb-6 max-w-xs">
              Start tracking your items by adding your first one
            </p>
            <Button
              onClick={() => setIsAddSheetOpen(true)}
              className="bg-[#5288c1] hover:bg-[#6099d1] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        ) : (
          <ItemList items={items} onDeleteItem={handleDeleteItem} />
        )}
      </main>

      {/* Add Item Sheet */}
      <AddItemSheet
        open={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
}