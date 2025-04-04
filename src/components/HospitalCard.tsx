
import React from 'react';
import { BedDouble, Phone } from 'lucide-react';
import { Hospital } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface HospitalCardProps {
  hospital: Hospital;
  onClick?: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
  const bedPercentage = (hospital.availableBeds / hospital.totalBeds) * 100;
  
  let statusClass = 'hospital-card-available';
  let statusText = 'Available';
  
  if (bedPercentage === 0) {
    statusClass = 'hospital-card-full';
    statusText = 'Full';
  } else if (bedPercentage <= 10) {
    statusClass = 'hospital-card-warning';
    statusText = 'Limited';
  }
  
  return (
    <div 
      className={cn("hospital-card", statusClass, "cursor-pointer")} 
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
        <span className={cn(
          "px-2 py-1 text-xs rounded-full", 
          statusText === 'Available' ? 'bg-green-100 text-green-800' : 
          statusText === 'Limited' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        )}>
          {statusText}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 mb-3">{hospital.address}</p>
      
      <div className="flex items-center mb-3">
        <BedDouble className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm">
          <span className="font-medium">{hospital.availableBeds}</span> of <span className="font-medium">{hospital.totalBeds}</span> beds available
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={cn(
            "h-2.5 rounded-full",
            statusText === 'Available' ? 'bg-medical-success' : 
            statusText === 'Limited' ? 'bg-medical-warning' : 
            'bg-medical-error'
          )} 
          style={{ width: `${(hospital.availableBeds / hospital.totalBeds) * 100}%` }}
        ></div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {hospital.specialties.slice(0, 3).map((specialty, index) => (
          <span key={index} className="px-2 py-1 bg-blue-50 text-medical-blue text-xs rounded-full">
            {specialty}
          </span>
        ))}
        {hospital.specialties.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{hospital.specialties.length - 3} more
          </span>
        )}
      </div>
      
      <button className="mt-4 text-sm text-medical-blue flex items-center">
        <Phone className="h-3 w-3 mr-1" /> Contact
      </button>
    </div>
  );
};

export default HospitalCard;
