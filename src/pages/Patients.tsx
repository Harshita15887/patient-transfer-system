
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Patient } from '@/utils/mockData';
import { getPatients, deletePatient } from '@/services/patientService';
import PatientForm from '@/components/PatientForm';
import DischargePatient from '@/components/DischargePatient';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Load patients on mount
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    const loadedPatients = getPatients();
    setPatients(loadedPatients);
  };

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
    if (filter === 'discharged') return matchesSearch && patient.status === 'Discharged';
    
    return matchesSearch;
  });

  // Format date to display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
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
    setSelectedPatient(null);
    setIsFormOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    loadPatients();
  };

  const confirmDeletePatient = (patientId: string) => {
    setPatientToDelete(patientId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePatient = () => {
    if (patientToDelete) {
      const success = deletePatient(patientToDelete);
      if (success) {
        loadPatients();
      }
    }
    setIsDeleteDialogOpen(false);
    setPatientToDelete(null);
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
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleAddPatient}
                className="bg-medical-blue hover:bg-medical-blue-dark flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0">
              <PatientForm 
                patient={selectedPatient || undefined} 
                onSuccess={handleFormSuccess}
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
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
        <Button 
          variant={filter === 'discharged' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('discharged')}
          className={filter === 'discharged' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
        >
          Discharged
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.age} y/o, {patient.gender}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">{patient.condition}</div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {patient.department}
                </TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${patient.status === 'Waiting' ? 'bg-blue-100 text-blue-800' : 
                      patient.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Discharged' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'}`}>
                    {patient.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(patient.arrivalTime)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {patient.status !== 'Discharged' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPatient(patient)}
                          title="Edit patient"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        
                        <DischargePatient 
                          patientId={patient.id} 
                          onSuccess={loadPatients} 
                        />
                      </>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => confirmDeletePatient(patient.id)}
                      title="Delete patient"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No patients found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePatient} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Patients;
