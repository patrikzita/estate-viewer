import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-500 bg-opacity-50 flex items-center justify-center z-50">
      <Loader2 className="mr-2 h-16 w-16 animate-spin text-red-400" />
    </div>
  );
};

export default Loader;

