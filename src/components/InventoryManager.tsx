
import React, { useState } from 'react';
import { inventory } from '@/utils/mockData';
import { Package, Search, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const InventoryManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(inventory.map(item => item.category)));
  
  // Filter and sort inventory
  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory ? item.category === filterCategory : true;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort with low stock items first
      const aIsLow = a.inStock < a.minRequired;
      const bIsLow = b.inStock < b.minRequired;
      
      if (aIsLow && !bIsLow) return -1;
      if (!aIsLow && bIsLow) return 1;
      
      // Then sort alphabetically
      return a.name.localeCompare(b.name);
    });
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Inventory Management</h2>
          <p className="text-sm text-gray-500">Track and manage medical supplies</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-8 pr-4 py-2 text-sm border rounded-lg w-56 focus:outline-none focus:ring-1 focus:ring-medical-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={cn(
            "px-3 py-1 text-xs rounded-full",
            filterCategory === null ? "bg-medical-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
          onClick={() => setFilterCategory(null)}
        >
          All Categories
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={cn(
              "px-3 py-1 text-xs rounded-full",
              filterCategory === category ? "bg-medical-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setFilterCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                In Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => {
              const isLowStock = item.inStock < item.minRequired;
              
              return (
                <tr key={item.id} className={isLowStock ? "bg-red-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        <Package className={cn(
                          "h-6 w-6",
                          isLowStock ? "text-red-500" : "text-medical-blue"
                        )} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.inStock} {item.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      Min: {item.minRequired}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isLowStock ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-medical-blue hover:text-medical-blue-dark mr-3">
                      Update
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager;
