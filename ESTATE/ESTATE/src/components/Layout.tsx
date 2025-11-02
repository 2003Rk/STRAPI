import React from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigateToHome?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToLearning?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToChecklist?: () => void;
}

export default function Layout({
  children,
  currentView,
  onNavigateToHome,
  onNavigateToUserManagement,
  onNavigateToLearning,
  onNavigateToFAQ,
  onNavigateToLogin,
  onNavigateToApartmentSearch,
  onNavigateToPropertyManagement,
  onNavigateToInputSupport,
  onNavigateToChecklist
}: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigateToHome={onNavigateToHome}
        onNavigateToUserManagement={onNavigateToUserManagement}
        onNavigateToLearning={onNavigateToLearning}
        onNavigateToFAQ={onNavigateToFAQ}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToApartmentSearch={onNavigateToApartmentSearch}
        onNavigateToPropertyManagement={onNavigateToPropertyManagement}
        onNavigateToInputSupport={onNavigateToInputSupport}
        onNavigateToChecklist={onNavigateToChecklist}
      />

      {/* Main content */}
      <div className="flex-1 bg-green-50">
        {children}
      </div>
    </div>
  
  );
}
