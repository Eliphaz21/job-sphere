import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  searchLocation: string;
  setFilters: (filters: any) => void;
  filters: any;
}

export const SearchBar = ({ searchQuery, searchLocation, setFilters, filters }: SearchBarProps) => (
  <div className="bg-white p-2 rounded-2xl shadow-sm flex items-center gap-2 border border-gray-200 mb-8">
    <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-100">
      <Search className="w-4 h-4 text-gray-900" />
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        placeholder="Job title, Keywords, or Company name" 
        className="w-full outline-none text-xs font-medium placeholder:text-gray-400" 
      />
    </div>
    <div className="flex-1 flex items-center gap-3 px-4">
      <MapPin className="w-4 h-4 text-gray-900" />
      <input 
        type="text" 
        value={searchLocation}
        onChange={(e) => setFilters({ ...filters, searchLocation: e.target.value })}
        placeholder="Location" 
        className="w-full outline-none text-xs font-medium placeholder:text-gray-400" 
      />
    </div>
    <button className="px-8 py-2.5 bg-[#0046D5] text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-all">
      Search
    </button>
  </div>
);
