import { Loader2 } from 'lucide-react';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#242f3d] rounded-lg p-6 flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-[#5288c1] animate-spin" />
        <p className="text-white">Processing your item...</p>
      </div>
    </div>
  );
}
