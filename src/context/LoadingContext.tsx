import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  progress: number;
  setProgress: (progress: number) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ progress, setProgress, isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
