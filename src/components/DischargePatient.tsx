
import React, { useState } from 'react';
import { dischargePatient, getPatientById } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Check, FileText } from 'lucide-react';
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

interface DischargePatientProps {
  patientId: string;
  onSuccess: () => void;
}

const DischargePatient: React.FC<DischargePatientProps> = ({ patientId, onSuccess }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDischarge = () => {
    const result = dischargePatient(patientId);
    
    if (result) {
      toast({
        title: "Patient Discharged",
        description: `${result.name} has been successfully discharged`,
      });
      onSuccess();
    }
    
    setIsConfirmOpen(false);
  };
  
  // Get patient details for confirmation dialog
  const patient = getPatientById(patientId);
  
  if (!patient) {
    return null;
  }
  
  return (
    <>
      <Button 
        onClick={() => setIsConfirmOpen(true)}
        variant="outline" 
        size="sm"
        className="flex items-center text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
      >
        <Check className="h-4 w-4 mr-2" /> Discharge
      </Button>
      
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Patient Discharge</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to discharge <span className="font-medium">{patient.name}</span>.
              <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                <div className="flex items-start mb-2">
                  <FileText className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Patient Summary</h4>
                    <p className="text-blue-700 text-sm">Name: {patient.name}</p>
                    <p className="text-blue-700 text-sm">Age: {patient.age}, Gender: {patient.gender}</p>
                    <p className="text-blue-700 text-sm">Condition: {patient.condition}</p>
                    <p className="text-blue-700 text-sm">Department: {patient.department}</p>
                    <p className="text-blue-700 text-sm">
                      Admission Date: {patient.arrivalTime.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-blue-600">
                  Discharging this patient will update their status to "Discharged" and record the current time as discharge date.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDischarge} className="bg-green-600 hover:bg-green-700">
              Confirm Discharge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DischargePatient;
