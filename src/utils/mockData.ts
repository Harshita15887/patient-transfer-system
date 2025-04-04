
export interface Hospital {
  id: string;
  name: string;
  address: string;
  totalBeds: number;
  availableBeds: number;
  specialties: string[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  arrivalTime: Date;
  department: string;
  status: 'Waiting' | 'In Progress' | 'Completed' | 'Transfer Required';
}

export interface MedicineItem {
  id: string;
  name: string;
  category: string;
  inStock: number;
  minRequired: number;
  unit: string;
}

// Generate hospitals with different bed availability statuses
export const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Main Street, Delhi',
    totalBeds: 200,
    availableBeds: 45,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine']
  },
  {
    id: '2',
    name: 'East Delhi Medical Center',
    address: '456 Park Avenue, Delhi',
    totalBeds: 150,
    availableBeds: 12,
    specialties: ['Pediatrics', 'Obstetrics', 'General Surgery', 'Oncology']
  },
  {
    id: '3',
    name: 'North Delhi Hospital',
    address: '789 North Road, Delhi',
    totalBeds: 100,
    availableBeds: 0,
    specialties: ['Cardiology', 'Gastroenterology', 'Pulmonology']
  },
  {
    id: '4',
    name: 'South Delhi Medical Institute',
    address: '321 South Boulevard, Delhi',
    totalBeds: 250,
    availableBeds: 78,
    specialties: ['Neurosurgery', 'Orthopedics', 'Trauma Care', 'Rehabilitation']
  },
  {
    id: '5',
    name: 'West Delhi Community Hospital',
    address: '654 West Avenue, Delhi',
    totalBeds: 120,
    availableBeds: 3,
    specialties: ['General Medicine', 'Psychiatry', 'Dermatology']
  }
];

// Generate sample patients for the queue
export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'Raj Kumar',
    age: 67,
    gender: 'Male',
    condition: 'Chest pain, shortness of breath',
    priority: 'High',
    arrivalTime: new Date('2025-04-04T08:30:00'),
    department: 'Cardiology',
    status: 'Waiting'
  },
  {
    id: 'P002',
    name: 'Priya Singh',
    age: 28,
    gender: 'Female',
    condition: 'Pregnancy checkup',
    priority: 'Medium',
    arrivalTime: new Date('2025-04-04T08:45:00'),
    department: 'Obstetrics',
    status: 'In Progress'
  },
  {
    id: 'P003',
    name: 'Amit Patel',
    age: 42,
    gender: 'Male',
    condition: 'Severe headache for 3 days',
    priority: 'Medium',
    arrivalTime: new Date('2025-04-04T09:15:00'),
    department: 'Neurology',
    status: 'Waiting'
  },
  {
    id: 'P004',
    name: 'Sunita Gupta',
    age: 73,
    gender: 'Female',
    condition: 'Stroke symptoms',
    priority: 'Critical',
    arrivalTime: new Date('2025-04-04T09:20:00'),
    department: 'Emergency',
    status: 'Transfer Required'
  },
  {
    id: 'P005',
    name: 'Rohit Sharma',
    age: 12,
    gender: 'Male',
    condition: 'Fractured arm',
    priority: 'High',
    arrivalTime: new Date('2025-04-04T09:30:00'),
    department: 'Orthopedics',
    status: 'Waiting'
  },
  {
    id: 'P006',
    name: 'Ananya Reddy',
    age: 35,
    gender: 'Female',
    condition: 'Abdominal pain',
    priority: 'Medium',
    arrivalTime: new Date('2025-04-04T09:45:00'),
    department: 'Gastroenterology',
    status: 'Waiting'
  },
  {
    id: 'P007',
    name: 'Vikram Malhotra',
    age: 58,
    gender: 'Male',
    condition: 'Diabetic emergency',
    priority: 'High',
    arrivalTime: new Date('2025-04-04T10:00:00'),
    department: 'Endocrinology',
    status: 'Waiting'
  }
];

// Generate sample inventory items
export const inventory: MedicineItem[] = [
  {
    id: 'M001',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    inStock: 1200,
    minRequired: 500,
    unit: 'tablets'
  },
  {
    id: 'M002',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    inStock: 850,
    minRequired: 400,
    unit: 'capsules'
  },
  {
    id: 'M003',
    name: 'Atorvastatin 10mg',
    category: 'Cardiac',
    inStock: 320,
    minRequired: 300,
    unit: 'tablets'
  },
  {
    id: 'M004',
    name: 'Insulin Regular',
    category: 'Diabetes',
    inStock: 78,
    minRequired: 100,
    unit: 'vials'
  },
  {
    id: 'M005',
    name: 'Salbutamol Inhaler',
    category: 'Respiratory',
    inStock: 95,
    minRequired: 120,
    unit: 'inhalers'
  },
  {
    id: 'M006',
    name: 'IV Fluids Normal Saline',
    category: 'Fluids',
    inStock: 450,
    minRequired: 200,
    unit: 'bags'
  },
  {
    id: 'M007',
    name: 'Surgical Masks',
    category: 'PPE',
    inStock: 3500,
    minRequired: 1000,
    unit: 'pieces'
  },
  {
    id: 'M008',
    name: 'Surgical Gloves',
    category: 'PPE',
    inStock: 2200,
    minRequired: 1500,
    unit: 'pairs'
  }
];

// Aggregated statistics
export const stats = {
  totalPatients: {
    today: 124,
    week: 843,
    month: 3219
  },
  averageWaitTime: {
    emergency: 12, // minutes
    urgent: 34,
    standard: 68
  },
  bedOccupancy: {
    total: hospitals.reduce((sum, h) => sum + h.totalBeds, 0),
    occupied: hospitals.reduce((sum, h) => sum + (h.totalBeds - h.availableBeds), 0),
    available: hospitals.reduce((sum, h) => sum + h.availableBeds, 0)
  },
  transfersInitiated: {
    today: 8,
    pending: 3,
    completed: 5
  }
};
