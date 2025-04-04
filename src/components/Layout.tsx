
import React from 'react';
import { Bell, ChevronDown, Home, Activity, UserRound, Pill, Box, LayoutDashboard } from "lucide-react";
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-medical-blue">MediQueue</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-medical-blue-light text-white">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Activity className="mr-3 h-5 w-5" />
                Patient Queue
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <UserRound className="mr-3 h-5 w-5" />
                Patient Transfers
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Pill className="mr-3 h-5 w-5" />
                Inventory
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Box className="mr-3 h-5 w-5" />
                Reports
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-medical-blue rounded-full">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-medical-blue">
                  <span className="text-sm font-medium leading-none text-white">DR</span>
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dr. Sharma</p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-medical-blue">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800 md:hidden">MediQueue</h1>
                <h2 className="ml-2 md:ml-0 text-lg md:text-xl font-medium text-gray-800 hidden md:block">City General Hospital Dashboard</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue-light">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
                
                <div className="flex items-center">
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue-light" id="user-menu-button">
                    <span className="flex items-center">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-medical-blue">
                        <span className="text-sm font-medium leading-none text-white">DR</span>
                      </span>
                      <span className="ml-2 text-sm text-gray-700 hidden md:block">Dr. Rajesh Sharma</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-400 hidden md:block" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
