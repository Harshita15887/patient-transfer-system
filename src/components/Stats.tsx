
import React from 'react';
import { Activity, Users, Clock, BedDouble, Ambulance } from 'lucide-react';
import { stats } from '@/utils/mockData';

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
      <div className="stat-card">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Users className="h-6 w-6 text-medical-blue" />
          </div>
          <div>
            <div className="stat-value">{stats.totalPatients.today}</div>
            <div className="stat-label">Patients Today</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-medical-success" />
          </div>
          <div>
            <div className="stat-value">{stats.averageWaitTime.standard} min</div>
            <div className="stat-label">Avg. Wait Time</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <BedDouble className="h-6 w-6 text-medical-warning" />
          </div>
          <div>
            <div className="stat-value">{stats.bedOccupancy.available}</div>
            <div className="stat-label">Available Beds</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="rounded-full bg-orange-100 p-3 mr-4">
            <Activity className="h-6 w-6 text-medical-alert" />
          </div>
          <div>
            <div className="stat-value">{stats.transfersInitiated.today}</div>
            <div className="stat-label">Transfers Today</div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <Ambulance className="h-6 w-6 text-medical-error" />
          </div>
          <div>
            <div className="stat-value">{stats.transfersInitiated.pending}</div>
            <div className="stat-label">Pending Transfers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
