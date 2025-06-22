
import { FitnessModel } from "../components/FitnessModel";
import { StatsPanel } from "../components/StatsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-orange-100">
      {/* Header */}
      <header className="px-6 py-4 border-b border-orange-500/20 backdrop-blur-sm bg-slate-950/80">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Fitness Command Center
          </h1>
          <p className="text-orange-200/70 mt-1">Advanced performance monitoring and analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Section - 3D Model */}
          <div className="bg-slate-900/60 rounded-2xl border border-orange-500/30 backdrop-blur-sm overflow-hidden shadow-2xl shadow-orange-500/10">
            <div className="p-6 border-b border-orange-500/30">
              <h2 className="text-xl font-semibold text-orange-100">Biometric Analysis</h2>
              <p className="text-orange-200/60 text-sm mt-1">3D anatomical performance mapping</p>
            </div>
            <div className="h-full">
              <FitnessModel />
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="bg-slate-900/60 rounded-2xl border border-orange-500/30 backdrop-blur-sm shadow-2xl shadow-orange-500/10">
            <div className="p-6 border-b border-orange-500/30">
              <h2 className="text-xl font-semibold text-orange-100">Performance Metrics</h2>
              <p className="text-orange-200/60 text-sm mt-1">Real-time capability assessment</p>
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
