
import React, { useState } from 'react';
import { getPatients } from '@/services/patientService';
import { ChevronDown, ChevronUp, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const PatientQueue = () => {
  const [sort, setSort] = useState<'priority' | 'time'>('priority');
  const [searchTerm, setSearchTerm] = useState('');
  
  const patients = getPatients().filter(p => p.status !== 'Discharged');
  
  const getPriorityOrder = (priority: string): number => {
    switch (priority) {
      case 'Critical': return 1;
      case 'High': return 2;
      case 'Medium': return 3;
      case 'Low': return 4;
      default: return 5;
    }
  };
  
  const sortedPatients = [...patients].filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sort === 'priority') {
      return getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
    } else {
      return a.arrivalTime.getTime() - b.arrivalTime.getTime();
    }
  });
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getWaitingTime = (arrivalTime: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - arrivalTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Patient Queue</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-8 pr-4 py-2 text-sm border rounded-lg w-56 focus:outline-none focus:ring-1 focus:ring-medical-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex">
            <button 
              onClick={() => setSort('priority')}
              className={cn(
                "px-3 py-1.5 text-sm border border-r-0 rounded-l-lg",
                sort === 'priority' 
                  ? "bg-medical-blue text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Priority
            </button>
            <button 
              onClick={() => setSort('time')}
              className={cn(
                "px-3 py-1.5 text-sm border rounded-r-lg",
                sort === 'time' 
                  ? "bg-medical-blue text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Time
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-80">
        {sortedPatients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">{patient.name}</h3>
                  <span className="ml-2 text-sm text-gray-500">{patient.age} y/o, {patient.gender}</span>
                  <span 
                    className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      patient.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      patient.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      patient.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    )}
                  >
                    {patient.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{patient.condition}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {patient.department}
                  </span>
                  <span className="ml-2 flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(patient.arrivalTime)} ({getWaitingTime(patient.arrivalTime)})
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                {patient.status === 'Transfer Required' && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse-subtle">
                    Transfer Required
                  </span>
                )}
                <button className="ml-2 p-1 text-medical-blue hover:bg-gray-100 rounded">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {sortedPatients.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No patients in queue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientQueue;
