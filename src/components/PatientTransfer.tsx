
import React, { useState } from 'react';
import { patients, hospitals } from '@/utils/mockData';
import { ArrowRight, BedDouble, Clock, Ambulance, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { useToast } from "@/hooks/use-toast";

const PatientTransfer = () => {
  // Filter patients that need transfer
  const transferPatients = patients.filter(p => p.status === 'Transfer Required');
  
  // Sort hospitals by available beds descending
  const sortedHospitals = [...hospitals].sort((a, b) => b.availableBeds - a.availableBeds);
  
  // State to track which patient's details are expanded
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  
  // State for transfer confirmation dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [transferDetails, setTransferDetails] = useState<{
    patient: typeof patients[0] | null;
    hospital: typeof hospitals[0] | null;
  }>({ patient: null, hospital: null });
  
  const { toast } = useToast();
  
  const togglePatientExpanded = (patientId: string) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
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
  
  // Initiate transfer process
  const initiateTransfer = (patient: typeof patients[0], hospital: typeof hospitals[0]) => {
    setTransferDetails({ patient, hospital });
    setIsConfirmOpen(true);
  };
  
  // Execute the transfer
  const executeTransfer = () => {
    if (!transferDetails.patient || !transferDetails.hospital) return;
    
    // In a real application, this would be an API call to update the database
    // For our mock implementation, we'll just show a toast notification
    
    setTimeout(() => {
      toast({
        title: "Transfer Initiated",
        description: `${transferDetails.patient?.name} is being transferred to ${transferDetails.hospital?.name}`,
        variant: "default",
      });
      
      // Close the dialog and reset expanded state
      setIsConfirmOpen(false);
      setExpandedPatient(null);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Patient Transfers</h2>
        <p className="text-sm text-gray-500">Patients requiring transfer to available facilities</p>
      </div>
      
      <div className="space-y-4">
        {transferPatients.map(patient => (
          <div key={patient.id} className="border rounded-lg overflow-hidden">
            <div 
              onClick={() => togglePatientExpanded(patient.id)}
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">{patient.name}</h3>
                  <span 
                    className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      patient.priority === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    )}
                  >
                    {patient.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{patient.condition}</p>
              </div>
              <div className="flex items-center">
                <span className="text-xs flex items-center text-gray-500 mr-3">
                  <Clock className="h-3 w-3 mr-1" />
                  Waiting: {getWaitingTime(patient.arrivalTime)}
                </span>
                <span className="animate-pulse-subtle bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  Transfer Required
                </span>
              </div>
            </div>
            
            {expandedPatient === patient.id && (
              <div className="p-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hospitals:</h4>
                <div className="space-y-3">
                  {sortedHospitals
                    .filter(h => h.availableBeds > 0 && h.specialties.includes(patient.department))
                    .map(hospital => (
                      <div key={hospital.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-sm">{hospital.name}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                            {hospital.address}
                          </div>
                          <div className="flex items-center mt-1 text-xs">
                            <BedDouble className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-medical-success font-medium">{hospital.availableBeds}</span>
                            <span className="text-gray-500"> / {hospital.totalBeds} beds available</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => initiateTransfer(patient, hospital)}
                          className="bg-medical-blue hover:bg-medical-blue-dark text-white px-3 py-1.5 rounded-lg text-sm flex items-center"
                        >
                          Transfer <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  
                  {sortedHospitals.filter(h => h.availableBeds > 0 && h.specialties.includes(patient.department)).length === 0 && (
                    <div className="text-center p-3 bg-red-50 rounded border border-red-100">
                      <p className="text-red-600 text-sm">No available hospitals with {patient.department} specialty</p>
                      <button 
                        onClick={() => {
                          toast({
                            title: "Searching all hospitals",
                            description: "Expanding search to include all available hospitals regardless of specialty",
                          });
                        }}
                        className="mt-2 bg-medical-blue hover:bg-medical-blue-dark text-white px-3 py-1.5 rounded-lg text-sm"
                      >
                        Check All Hospitals
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {transferPatients.length === 0 && (
          <div className="text-center p-6">
            <p className="text-gray-500">No patients currently require transfer</p>
          </div>
        )}
      </div>
      
      {/* Transfer Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Patient Transfer</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to transfer <span className="font-medium">{transferDetails.patient?.name}</span> to <span className="font-medium">{transferDetails.hospital?.name}</span>.
              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center">
                <Ambulance className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-700 text-sm">An ambulance will be dispatched for this transfer.</span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeTransfer} className="bg-medical-blue hover:bg-medical-blue-dark">
              Confirm Transfer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PatientTransfer;
