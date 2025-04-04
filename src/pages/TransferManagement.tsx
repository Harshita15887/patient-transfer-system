
import React, { useState } from 'react';
import { hospitals, patients } from '@/utils/mockData';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BedDouble, Search, ArrowRight, Ambulance, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const TransferManagement = () => {
  const transferPatients = patients.filter(p => p.status === 'Transfer Required');
  const availableHospitals = hospitals.filter(h => h.availableBeds > 0);
  
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null);
  const [showAllHospitals, setShowAllHospitals] = useState(false);
  
  const { toast } = useToast();
  
  // Transfer the patient to the selected hospital
  const handleTransfer = () => {
    if (!selectedPatient || !selectedHospital) return;
    
    // In a real application, this would be an API call to update the database
    toast({
      title: "Transfer Initiated",
      description: `${selectedPatient.name} is being transferred to ${selectedHospital.name}`,
      variant: "default",
    });
    
    setSelectedPatient(null);
    setSelectedHospital(null);
  };
  
  // Calculate distance between hospitals (mock function)
  const calculateDistance = (hospitalId: string) => {
    // This would typically use geolocation APIs in a real application
    // For now, we'll return random distances between 1-20 km
    return (parseInt(hospitalId) * 2.5) % 20 + 1;
  };
  
  // Helper function to calculate wait time
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
  
  // Filter hospitals based on patient specialty needs
  const getFilteredHospitals = () => {
    if (!selectedPatient) return [];
    
    let filteredHospitals = availableHospitals;
    
    if (!showAllHospitals) {
      filteredHospitals = filteredHospitals.filter(h => 
        h.specialties.includes(selectedPatient.department)
      );
    }
    
    // Sort by distance (in a real app) and then by available beds
    return filteredHospitals.sort((a, b) => {
      const distanceA = calculateDistance(a.id);
      const distanceB = calculateDistance(b.id);
      
      if (distanceA === distanceB) {
        return b.availableBeds - a.availableBeds;
      }
      return distanceA - distanceB;
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Patient Transfer Management</h2>
            <p className="text-sm text-gray-500">Transfer patients to hospitals with available beds</p>
          </div>
          <div className="bg-amber-50 px-4 py-2 rounded-md border border-amber-200 flex items-center">
            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-amber-700 text-sm">{transferPatients.length} patients awaiting transfer</span>
          </div>
        </div>
        
        <Table>
          <TableCaption>Patients requiring immediate transfer</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Waiting Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transferPatients.map(patient => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    patient.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                    patient.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  )}>
                    {patient.priority}
                  </span>
                </TableCell>
                <TableCell>{patient.department}</TableCell>
                <TableCell className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-gray-400" />
                  {getWaitingTime(patient.arrivalTime)}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowAllHospitals(false);
                        }}
                        className="bg-medical-blue hover:bg-medical-blue-dark text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                      >
                        Find Beds <Search className="ml-1 h-3 w-3" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Available Hospitals for Transfer</DialogTitle>
                        <DialogDescription>
                          Finding available beds for <span className="font-medium">{selectedPatient?.name}</span> requiring <span className="font-medium">{selectedPatient?.department}</span> specialty
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="my-4">
                        {getFilteredHospitals().length === 0 && !showAllHospitals && (
                          <div className="flex justify-center p-4 bg-amber-50 rounded-md border border-amber-200 mb-4">
                            <div className="text-center">
                              <p className="text-amber-700 mb-2">No hospitals with {selectedPatient?.department} specialty have available beds</p>
                              <button 
                                onClick={() => setShowAllHospitals(true)}
                                className="bg-medical-blue hover:bg-medical-blue-dark text-white px-3 py-1.5 rounded-md text-sm"
                              >
                                Show All Available Hospitals
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {getFilteredHospitals().map(hospital => (
                            <div 
                              key={hospital.id} 
                              onClick={() => setSelectedHospital(selectedHospital?.id === hospital.id ? null : hospital)}
                              className={cn(
                                "border rounded-lg p-4 cursor-pointer transition-all",
                                selectedHospital?.id === hospital.id ? "border-2 border-medical-blue bg-blue-50" : "hover:bg-gray-50"
                              )}
                            >
                              <div className="flex justify-between">
                                <h3 className="font-medium">{hospital.name}</h3>
                                <span className="text-xs flex items-center text-gray-600">
                                  <BedDouble className="h-3 w-3 mr-1" />
                                  {hospital.availableBeds} beds
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{hospital.address}</p>
                              
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex flex-wrap gap-1">
                                  {hospital.specialties.includes(selectedPatient?.department || '') ? (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                      {selectedPatient?.department} Available
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                                      No {selectedPatient?.department}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ~{calculateDistance(hospital.id)} km away
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Ambulance className="h-5 w-5 text-amber-500 mr-2" />
                            <span className="text-sm text-gray-600">Ambulance will be dispatched automatically</span>
                          </div>
                          <button
                            onClick={handleTransfer}
                            disabled={!selectedHospital}
                            className={cn(
                              "flex items-center px-4 py-2 rounded-md",
                              selectedHospital ? "bg-medical-blue hover:bg-medical-blue-dark text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            )}
                          >
                            Confirm Transfer <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            
            {transferPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No patients currently require transfer
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Hospital Beds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map(hospital => (
            <div key={hospital.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{hospital.name}</h3>
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full", 
                  hospital.availableBeds > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                )}>
                  {hospital.availableBeds > 0 ? 'Available' : 'Full'}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <BedDouble className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">
                  <span className="font-medium">{hospital.availableBeds}</span> of <span className="font-medium">{hospital.totalBeds}</span> beds available
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <div 
                  className={cn(
                    "h-2.5 rounded-full",
                    hospital.availableBeds > 10 ? 'bg-medical-success' : 
                    hospital.availableBeds > 0 ? 'bg-medical-warning' : 
                    'bg-medical-error'
                  )} 
                  style={{ width: `${(hospital.availableBeds / hospital.totalBeds) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-2">
                <h4 className="text-xs font-medium text-gray-700 mb-1">Specialties:</h4>
                <div className="flex flex-wrap gap-1">
                  {hospital.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-medical-blue text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                  {hospital.specialties.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{hospital.specialties.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferManagement;
