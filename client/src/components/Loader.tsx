import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-50">
      <Loader2 className="mr-2 h-16 w-16 animate-spin text-red-400" />
    </div>
  );
};

export default Loader;
