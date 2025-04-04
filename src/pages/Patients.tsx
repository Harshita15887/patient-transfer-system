
import React, { useState } from 'react';
import { patients } from '@/utils/mockData';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  // Filter patients based on search term and filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'waiting') return matchesSearch && patient.status === 'Waiting';
    if (filter === 'inProgress') return matchesSearch && patient.status === 'In Progress';
    if (filter === 'completed') return matchesSearch && patient.status === 'Completed';
    if (filter === 'transfer') return matchesSearch && patient.status === 'Transfer Required';
    
    return matchesSearch;
  });

  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle actions
  const handleAddPatient = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add patients will be available in future updates.",
    });
  };

  const handleEditPatient = (patientId: string) => {
    toast({
      title: "Edit patient",
      description: `Editing patient with ID: ${patientId}`,
    });
  };

  const handleDeletePatient = (patientId: string) => {
    toast({
      title: "Delete patient",
      description: `Deleting patient with ID: ${patientId}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Patient Management</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button 
            onClick={handleAddPatient}
            className="bg-medical-blue hover:bg-medical-blue-dark flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Patient
          </Button>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          All
        </Button>
        <Button 
          variant={filter === 'waiting' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('waiting')}
          className={filter === 'waiting' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          Waiting
        </Button>
        <Button 
          variant={filter === 'inProgress' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('inProgress')}
          className={filter === 'inProgress' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          In Progress
        </Button>
        <Button 
          variant={filter === 'completed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          Completed
        </Button>
        <Button 
          variant={filter === 'transfer' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('transfer')}
          className={filter === 'transfer' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          Transfer Required
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age} y/o, {patient.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.condition}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${patient.status === 'Waiting' ? 'bg-blue-100 text-blue-800' : 
                      patient.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(patient.arrivalTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditPatient(patient.id)}
                      title="Edit patient"
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeletePatient(patient.id)}
                      title="Delete patient"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No patients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
