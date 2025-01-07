"use client";

import React, { createContext, useContext, useState } from "react";

// Define the type for the data structure
export interface DataType {
  details: Array<{
    id: string;
    type: string;
    date: string;
    likes: number;
    shares: number;
    comments: number;
  }>;
  dates: string[];
  likes: number[];
  shares: number[];
  comments: number[];
  reel: number;
  carousel: number;
  static: number;
}

interface DataContextType {
  data: DataType | null;
  setData: (data: DataType | null) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataType | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
