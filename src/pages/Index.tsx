
import { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import TransferManagement from '@/pages/TransferManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, Activity, UserRound } from 'lucide-react';
import Patients from '@/pages/Patients';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  return (
    <Layout>
      <div className="mb-6">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center justify-center">
              <Activity className="h-4 w-4 mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="transfers" className="flex items-center justify-center">
              <BedDouble className="h-4 w-4 mr-2" /> Transfer Management
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center justify-center">
              <UserRound className="h-4 w-4 mr-2" /> Patients
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="transfers">
            <TransferManagement />
          </TabsContent>
          <TabsContent value="patients">
            <Patients />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
