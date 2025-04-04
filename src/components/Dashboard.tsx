
import React, { useState } from 'react';
import { hospitals } from '@/utils/mockData';
import Stats from './Stats';
import HospitalCard from './HospitalCard';
import PatientQueue from './PatientQueue';
import PatientTransfer from './PatientTransfer';
import InventoryManager from './InventoryManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, UserRound, Package, Activity } from 'lucide-react';

const Dashboard = () => {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Hospital Management Dashboard</h1>
        <p className="text-gray-600">Manage patient queue, bed availability, transfers, and inventory</p>
      </div>
      
      <Stats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Hospital Bed Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitals.map((hospital) => (
                <HospitalCard 
                  key={hospital.id} 
                  hospital={hospital} 
                  onClick={() => setSelectedHospital(hospital.id === selectedHospital ? null : hospital.id)}
                />
              ))}
            </div>
          </div>
          
          <InventoryManager />
        </div>
        
        <div className="space-y-6">
          <PatientQueue />
          <PatientTransfer />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <Tabs defaultValue="queue">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queue" className="flex items-center justify-center">
              <UserRound className="h-4 w-4 mr-2" /> Patient Queue
            </TabsTrigger>
            <TabsTrigger value="transfer" className="flex items-center justify-center">
              <BedDouble className="h-4 w-4 mr-2" /> Patient Transfer
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center justify-center">
              <Package className="h-4 w-4 mr-2" /> Inventory
            </TabsTrigger>
          </TabsList>
          <TabsContent value="queue">
            <div className="p-4">
              <PatientQueue />
            </div>
          </TabsContent>
          <TabsContent value="transfer">
            <div className="p-4">
              <PatientTransfer />
            </div>
          </TabsContent>
          <TabsContent value="inventory">
            <div className="p-4">
              <InventoryManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
