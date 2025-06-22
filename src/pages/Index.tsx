
import { FitnessModel } from "../components/FitnessModel";
import { StatsPanel } from "../components/StatsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Fitness Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Track your progress and visualize your fitness journey</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Section - 3D Model */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">3D Body Model</h2>
              <p className="text-gray-400 text-sm mt-1">Interactive wireframe visualization</p>
            </div>
            <div className="h-full">
              <FitnessModel />
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">Performance Stats</h2>
              <p className="text-gray-400 text-sm mt-1">Your fitness metrics and achievements</p>
            </div>
            <div className="p-6">
              <StatsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
