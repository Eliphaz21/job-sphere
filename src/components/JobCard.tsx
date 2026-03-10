import React from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Job } from '../types';
import logo from '../assets/logo.png';
interface JobCardProps {
  job: Job;
  onClick: () => void;
  key?: React.Key;
}

export const JobCard = ({ job, onClick }: JobCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer group mb-4"
    onClick={onClick}
  >
    <div className="flex gap-4">
      <div className="w-14 h-14 rounded-xl bg-[#F8F9FB] flex items-center justify-center overflow-hidden border border-gray-100 p-2 shrink-0">
        <img src={logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0046D5] transition-colors">{job.title}</h3>
            <p className="text-sm text-gray-500 font-medium mb-2">{job.company}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-[#0046D5] hover:bg-blue-50 rounded-lg transition-colors">
              <Bookmark className={`w-5 h-5 ${job.isBookMarked ? 'fill-[#0046D5] text-[#0046D5]' : ''}`} />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#0046D5] hover:bg-blue-50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-[#F1F2F4] text-gray-600 text-xs font-semibold rounded-md">{job.location}</span>
          <span className="px-3 py-1 bg-[#F1F2F4] text-gray-600 text-xs font-semibold rounded-md">{job.type}</span>
          <span className="px-3 py-1 bg-[#F1F2F4] text-gray-600 text-xs font-semibold rounded-md">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: job.currency || 'USD', maximumFractionDigits: 0 }).format(job.salary)}
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
          {job.description}
        </p>
      </div>
    </div>
  </motion.div>
);
