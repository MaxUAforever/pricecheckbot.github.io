import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ColorVariant } from '../App';

interface ColorVariantInputProps {
  onAdd: (variant: Omit<ColorVariant, 'id'>) => void;
}

export function ColorVariantInput({ onAdd }: ColorVariantInputProps) {
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!color.trim()) return;

    onAdd({
      color: color.trim(),
      price: price ? parseFloat(price) : undefined,
    });

    setColor('');
    setPrice('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-[#17212b] border border-[#313d4f] rounded-lg p-3 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Color name"
          className="bg-[#242f3d] border-[#313d4f] text-white placeholder:text-[#8b98a5]"
        />
        <Input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Price (optional)"
          className="bg-[#242f3d] border-[#313d4f] text-white placeholder:text-[#8b98a5]"
        />
      </div>
      <Button
        type="button"
        onClick={handleAdd}
        disabled={!color.trim()}
        className="w-full bg-[#5288c1] hover:bg-[#6099d1] text-white"
        size="sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Color Variant
      </Button>
    </div>
  );
}
