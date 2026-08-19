import React from 'react';

export const LoadingCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/3 bg-slate-200 rounded-lg"></div>
        <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
      </div>
      <div className="h-4 w-3/4 bg-slate-200 rounded-md"></div>
      <div className="h-4 w-1/2 bg-slate-200 rounded-md"></div>
      <div className="pt-4 flex items-center space-x-3">
        <div className="h-9 w-28 bg-slate-200 rounded-xl"></div>
        <div className="h-9 w-24 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export const LoadingPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LoadingCardSkeleton />
        <LoadingCardSkeleton />
        <LoadingCardSkeleton />
      </div>
    </div>
  );
};
