
import { Patient } from '@/utils/mockData';
import { toast } from 'sonner';

// In a real application, this would be an API service that communicates with a backend
// For now, we'll use localStorage to persist data between sessions

const STORAGE_KEY = 'hospital-patients';

// Load initial patients from localStorage or use mock data if none exists
const loadPatients = (): Patient[] => {
  const storedPatients = localStorage.getItem(STORAGE_KEY);
  
  if (storedPatients) {
    try {
      return JSON.parse(storedPatients);
    } catch (e) {
      console.error('Error parsing stored patients:', e);
      return getInitialPatients();
    }
  }
  
  // First time - initialize with mock data
  const initialPatients = getInitialPatients();
  savePatients(initialPatients);
  return initialPatients;
};

// Get initial patients from mock data in a real app this would be an API call
const getInitialPatients = (): Patient[] => {
  // Import the patients from mockData, but we'll create a deep copy
  // to avoid reference issues
  const { patients } = require('@/utils/mockData');
  return JSON.parse(JSON.stringify(patients));
};

// Save patients to localStorage
const savePatients = (patients: Patient[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};

// Get all patients
export const getPatients = (): Patient[] => {
  return loadPatients();
};

// Get a single patient by id
export const getPatientById = (id: string): Patient | undefined => {
  const patients = loadPatients();
  return patients.find(patient => patient.id === id);
};

// Create a new patient
export const createPatient = (patientData: Omit<Patient, 'id'>): Patient => {
  const patients = loadPatients();
  
  // Generate a new ID (in a real app, the backend would handle this)
  const newId = `P${String(patients.length + 1).padStart(3, '0')}`;
  
  const newPatient: Patient = {
    id: newId,
    ...patientData,
  };
  
  savePatients([...patients, newPatient]);
  toast.success('Patient added successfully');
  
  return newPatient;
};

// Update an existing patient
export const updatePatient = (id: string, patientData: Partial<Patient>): Patient | null => {
  const patients = loadPatients();
  const patientIndex = patients.findIndex(patient => patient.id === id);
  
  if (patientIndex === -1) {
    toast.error(`Patient with ID ${id} not found`);
    return null;
  }
  
  const updatedPatient = {
    ...patients[patientIndex],
    ...patientData,
  };
  
  patients[patientIndex] = updatedPatient;
  savePatients(patients);
  toast.success('Patient updated successfully');
  
  return updatedPatient;
};

// Delete a patient
export const deletePatient = (id: string): boolean => {
  const patients = loadPatients();
  const filteredPatients = patients.filter(patient => patient.id !== id);
  
  if (filteredPatients.length === patients.length) {
    toast.error(`Patient with ID ${id} not found`);
    return false;
  }
  
  savePatients(filteredPatients);
  toast.success('Patient deleted successfully');
  
  return true;
};
