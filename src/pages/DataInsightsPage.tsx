import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { SEO } from '../components/SEO';
import { ArrowLeft, TrendingUp, DollarSign, Users, Activity, CheckSquare, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

const turnoutData = [
  { year: '2004', turnout: 56.7 },
  { year: '2008', turnout: 61.6 },
  { year: '2012', turnout: 58.2 },
  { year: '2016', turnout: 60.1 },
  { year: '2020', turnout: 66.8 },
  { year: '2024', turnout: 68.2 },
];

const fundingData = [
  { name: 'Individual Contributions', value: 450 },
  { name: 'Electoral Bonds', value: 300 },
  { name: 'Self-financing', value: 100 },
  { name: 'Party Funds', value: 150 },
];

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#eab308', '#8b5cf6'];

const demographicData = [
  { age: '18-29', postalBallot: 5, evmVoting: 95 },
  { age: '30-44', postalBallot: 10, evmVoting: 90 },
  { age: '45-59', postalBallot: 15, evmVoting: 85 },
  { age: '60+', postalBallot: 35, evmVoting: 65 },
];

const partyAffiliationData = [
  { name: 'Independent', value: 140 },
  { name: 'Democrat', value: 320 },
  { name: 'Republican', value: 290 },
  { name: 'Other', value: 50 },
];

const partyManifestoData = [
  { party: 'Prog. Alliance', feasible: 45, planned: 35, aspirational: 20 },
  { party: 'Cons. Front', feasible: 65, planned: 25, aspirational: 10 },
  { party: 'Dem. Union', feasible: 30, planned: 40, aspirational: 30 },
  { party: 'Liberty Party', feasible: 50, planned: 35, aspirational: 15 },
  { party: 'Nat. Unity', feasible: 55, planned: 30, aspirational: 15 },
];

export default function DataInsightsPage() {
  const [activePlanFilters, setActivePlanFilters] = useState({
    feasible: true,
    planned: true,
    aspirational: true,
  });

  const [startYear, setStartYear] = useState('2004');
  const [endYear, setEndYear] = useState('2024');

  const [activeAgeGroups, setActiveAgeGroups] = useState({
    '18-29': true,
    '30-44': true,
    '45-59': true,
    '60+': true,
  });

  const togglePlanFilter = (key: keyof typeof activePlanFilters) => {
    setActivePlanFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAgeFilter = (key: keyof typeof activeAgeGroups) => {
    setActiveAgeGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredTurnoutData = turnoutData.filter(d => parseInt(d.year) >= parseInt(startYear) && parseInt(d.year) <= parseInt(endYear));
  const filteredDemographicData = demographicData.filter(d => activeAgeGroups[d.age as keyof typeof activeAgeGroups]);

  const years = turnoutData.map(d => d.year);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SEO 
        title="Election Data Insights" 
        description="Visualize historical election data, funding distribution, and demographic patterns."
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4">
            Data Insights
          </h1>
          <div className="h-1 w-24 bg-blue-600 mb-6"></div>
          <p className="text-slate-600 font-medium max-w-2xl text-lg">
            Explore comprehensive visualizations of election trends, candidate funding, and demographic voting patterns to better understand the electoral landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Historical Turnout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center border-2 border-blue-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <TrendingUp className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-xl">Historical Turnout</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage of eligible voters</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2 border-2 border-slate-200">
                <span className="text-xs font-bold uppercase tracking-widest">From:</span>
                <select 
                  value={startYear} 
                  onChange={(e) => setStartYear(e.target.value)}
                  className="bg-white border-2 border-slate-300 text-xs font-bold p-1 outline-none focus:border-slate-900"
                >
                  {years.map(y => <option key={`start-${y}`} value={y}>{y}</option>)}
                </select>
                <span className="text-xs font-bold uppercase tracking-widest ml-2">To:</span>
                <select 
                  value={endYear} 
                  onChange={(e) => setEndYear(e.target.value)}
                  className="bg-white border-2 border-slate-300 text-xs font-bold p-1 outline-none focus:border-slate-900"
                >
                  {years.map(y => <option key={`end-${y}`} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredTurnoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#0f172a' }}
                    formatter={(value: number) => [`${value}%`, 'Turnout']}
                  />
                  <Area type="monotone" dataKey="turnout" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnout)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Funding Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 flex items-center justify-center border-2 border-green-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <DollarSign className="w-5 h-5 text-green-900" />
              </div>
              <div>
                <h3 className="font-black uppercase text-xl">Campaign Funding</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Average distribution sources (Crores)</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="#0f172a"
                    strokeWidth={2}
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                    formatter={(value: number) => [`₹${value} Cr`, 'Estimated Amount']}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Demographic Voting Methods */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 flex items-center justify-center border-2 border-purple-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Users className="w-5 h-5 text-purple-900" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-xl">Voting Method by Age</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage usage of voting methods</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 border-2 border-slate-200 p-2 bg-slate-50">
                {Object.keys(activeAgeGroups).map((age) => (
                  <button 
                    key={age}
                    onClick={() => toggleAgeFilter(age as keyof typeof activeAgeGroups)}
                    className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-2 py-1 border-2 transition-colors ${activeAgeGroups[age as keyof typeof activeAgeGroups] ? 'border-purple-600 bg-purple-50 text-purple-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
                  >
                    {activeAgeGroups[age as keyof typeof activeAgeGroups] ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                    {age}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredDemographicData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    labelStyle={{ color: '#0f172a', marginBottom: '8px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
                  <Bar dataKey="postalBallot" name="Postal Ballot" stackId="a" fill="#3b82f6" stroke="#0f172a" strokeWidth={2} />
                  <Bar dataKey="evmVoting" name="EVM Voting" stackId="a" fill="#eab308" stroke="#0f172a" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Budget Allocation Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 flex items-center justify-center border-2 border-rose-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Activity className="w-5 h-5 text-rose-900" />
              </div>
              <div>
                <h3 className="font-black uppercase text-xl">Party Manifesto Feasibility</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage of promises by type</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 border-2 border-slate-200 p-2 lg:p-3 bg-slate-50">
              <button 
                onClick={() => togglePlanFilter('feasible')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activePlanFilters.feasible ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activePlanFilters.feasible ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Feasible
              </button>
              <button 
                onClick={() => togglePlanFilter('planned')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activePlanFilters.planned ? 'border-red-600 bg-red-50 text-red-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activePlanFilters.planned ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Planned
              </button>
              <button 
                onClick={() => togglePlanFilter('aspirational')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activePlanFilters.aspirational ? 'border-green-600 bg-green-50 text-green-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activePlanFilters.aspirational ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Aspirational
              </button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partyManifestoData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="party" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  labelStyle={{ color: '#0f172a', marginBottom: '8px' }}
                />
                
                {activePlanFilters.feasible && <Bar dataKey="feasible" name="Feasible" stackId="a" fill="#2563eb" stroke="#0f172a" strokeWidth={2} />}
                {activePlanFilters.planned && <Bar dataKey="planned" name="Planned" stackId="a" fill="#dc2626" stroke="#0f172a" strokeWidth={2} />}
                {activePlanFilters.aspirational && <Bar dataKey="aspirational" name="Aspirational" stackId="a" fill="#16a34a" stroke="#0f172a" strokeWidth={2} />}
                
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
