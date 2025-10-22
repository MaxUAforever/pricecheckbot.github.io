import { Trash2, Image as ImageIcon } from 'lucide-react';
import { Item } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  return (
    <div className="bg-[#242f3d] rounded-lg overflow-hidden">
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div className="flex-shrink-0">
          {item.photo ? (
            <ImageWithFallback
              src={item.photo}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-[#17212b] flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-[#5288c1]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white truncate">{item.name}</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-[#8b98a5] hover:text-red-500 hover:bg-[#17212b] flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#242f3d] border-[#313d4f] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete item?</AlertDialogTitle>
                  <AlertDialogDescription className="text-[#8b98a5]">
                    Are you sure you want to delete "{item.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[#17212b] border-[#313d4f] text-white hover:bg-[#1e2a36]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Color Variants */}
          {item.colorVariants.length > 0 && (
            <div className="space-y-1.5">
              {item.colorVariants.map((variant) => (
                <div key={variant.id} className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#17212b] text-[#8b98a5] hover:bg-[#17212b] border border-[#313d4f]"
                  >
                    {variant.color}
                  </Badge>
                  {variant.price !== undefined && (
                    <span className="text-[#8b98a5] text-sm">
                      ${variant.price.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {item.colorVariants.length === 0 && (
            <p className="text-[#8b98a5] text-sm">No color variants</p>
          )}
        </div>
      </div>
    </div>
  );
}
