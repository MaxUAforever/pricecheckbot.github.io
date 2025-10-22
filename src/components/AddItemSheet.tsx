import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Item } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { isValidUrl } from '../lib/telegram';

interface AddItemSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (url: string) => void;
}

export function AddItemSheet({ open, onOpenChange, onAddItem }: AddItemSheetProps) {
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUrl = photo.trim();
    
    if (!trimmedUrl) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    onAddItem(trimmedUrl);
    
    // Reset form
    setPhoto('');
    setError('');
  };

  const handleCancel = () => {
    setPhoto('');
    setError('');
    onOpenChange(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="bg-[#242f3d] border-t border-[#313d4f] text-white h-auto flex flex-col p-0"
      >
        <SheetHeader className="px-4 py-3 border-b border-[#313d4f]">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white">Add New Item</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 w-8 p-0 text-[#8b98a5] hover:text-white hover:bg-[#17212b]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-4">
            <Input
              id="photo"
              value={photo}
              onChange={handleInputChange}
              placeholder="Paste photo URL here"
              className="bg-[#17212b] border-[#313d4f] text-white placeholder:text-[#8b98a5]"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Footer with action buttons */}
          <div className="p-4 pt-0">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 bg-transparent border-[#313d4f] text-white hover:bg-[#17212b]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!photo.trim()}
                className="flex-1 bg-[#5288c1] hover:bg-[#6099d1] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}