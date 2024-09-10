import { Link } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";
import { useFirebase } from "@/context/Firebase";


export const Home = () => {
  const { isLoggedIn } = useFirebase();

  return (
    <div className="bg-black bg-axiom-pattern min-h-screen flex flex-col items-center justify-center p-4 text-white font-mono">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-10 h-10 text-blue-500" />
          <h1 className="text-4xl font-bold tracking-tight">Heally</h1>
        </div>

        <p className="text-xl text-center text-gray-400">
          Your next-generation healthcare portal
        </p>
        {!isLoggedIn ? (
          <div className="space-y-4">
            <Link to="signup" className="block">
              <button className="w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-between group">
                <span>Create an account</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="signin" className="block">
              <button className="w-1/2 mx-auto bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-between group">
                <span>Sign in</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="dashboard">
              <button className="w-1/2 mx-auto bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-between group">
                <span>Open Dashboard</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
