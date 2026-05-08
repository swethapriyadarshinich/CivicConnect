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

const manifestoData = [
  { year: '2014', education: 2.8, welfare: 3.5, industries: 2.1, healthcare: 1.2 },
  { year: '2015', education: 2.9, welfare: 3.6, industries: 2.2, healthcare: 1.3 },
  { year: '2016', education: 3.0, welfare: 3.8, industries: 2.4, healthcare: 1.4 },
  { year: '2017', education: 3.1, welfare: 4.0, industries: 2.6, healthcare: 1.5 },
  { year: '2018', education: 3.2, welfare: 4.2, industries: 2.8, healthcare: 1.6 },
  { year: '2019', education: 3.4, welfare: 4.5, industries: 3.0, healthcare: 1.8 },
  { year: '2020', education: 3.5, welfare: 5.2, industries: 2.9, healthcare: 2.2 },
  { year: '2021', education: 3.6, welfare: 5.5, industries: 3.2, healthcare: 2.5 },
  { year: '2022', education: 3.8, welfare: 5.2, industries: 3.5, healthcare: 2.3 },
  { year: '2023', education: 4.0, welfare: 4.8, industries: 3.8, healthcare: 2.4 },
  { year: '2024', education: 4.2, welfare: 5.0, industries: 4.1, healthcare: 2.6 },
];

export default function DataInsightsPage() {
  const [activeFilters, setActiveFilters] = useState({
    education: true,
    welfare: true,
    industries: true,
    healthcare: true,
  });

  const toggleFilter = (key: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 flex items-center justify-center border-2 border-blue-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-black uppercase text-xl">Historical Turnout</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage of eligible voters</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={turnoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 flex items-center justify-center border-2 border-purple-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Users className="w-5 h-5 text-purple-900" />
              </div>
              <div>
                <h3 className="font-black uppercase text-xl">Voting Method by Age</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage usage of voting methods</p>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demographicData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
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
                <h3 className="font-black uppercase text-xl">Government Budget Allocation (10 Yrs)</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Percentage of total GDP</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 border-2 border-slate-200 p-2 lg:p-3 bg-slate-50">
              <button 
                onClick={() => toggleFilter('education')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activeFilters.education ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activeFilters.education ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Education
              </button>
              <button 
                onClick={() => toggleFilter('welfare')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activeFilters.welfare ? 'border-red-600 bg-red-50 text-red-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activeFilters.welfare ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Welfare
              </button>
              <button 
                onClick={() => toggleFilter('industries')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activeFilters.industries ? 'border-green-600 bg-green-50 text-green-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activeFilters.industries ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Industries
              </button>
              <button 
                onClick={() => toggleFilter('healthcare')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-colors ${activeFilters.healthcare ? 'border-amber-600 bg-amber-50 text-amber-800' : 'border-slate-300 text-slate-400 bg-white hover:border-slate-400'}`}
              >
                {activeFilters.healthcare ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                Healthcare
              </button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={manifestoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  contentStyle={{ border: '2px solid #0f172a', borderRadius: '0', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                  itemStyle={{ color: '#0f172a' }}
                  formatter={(value: number) => [`${value}%`, undefined]}
                />
                
                {activeFilters.education && <Line type="monotone" dataKey="education" name="Education" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />}
                {activeFilters.welfare && <Line type="monotone" dataKey="welfare" name="Welfare" stroke="#dc2626" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />}
                {activeFilters.industries && <Line type="monotone" dataKey="industries" name="Industries" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />}
                {activeFilters.healthcare && <Line type="monotone" dataKey="healthcare" name="Healthcare" stroke="#d97706" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />}
                
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
