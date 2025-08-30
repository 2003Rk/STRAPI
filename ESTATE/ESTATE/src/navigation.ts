// Navigation helper to connect all components
export interface NavigationProps {
  onNavigateBack?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToLearning?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToDashboard?: () => void;
}

// This file helps ensure consistent navigation across all components
export const createNavigationProps = (navigationFunctions: {
  navigateToLogin?: () => void;
  navigateToDashboard?: () => void;
  navigateToHome?: () => void;
  navigateToLearning?: () => void;
  navigateToFAQ?: () => void;
  navigateToUserManagement?: () => void;
}): NavigationProps => {
  return {
    onNavigateBack: navigationFunctions.navigateToDashboard,
    onNavigateToUserManagement: navigationFunctions.navigateToUserManagement,
    onNavigateToHome: navigationFunctions.navigateToHome,
    onNavigateToLearning: navigationFunctions.navigateToLearning,
    onNavigateToFAQ: navigationFunctions.navigateToFAQ,
    onNavigateToDashboard: navigationFunctions.navigateToDashboard,
  };
};
