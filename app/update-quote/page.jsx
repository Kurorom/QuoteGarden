"use client"
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const UpdateQuote = dynamic(() => import('@components/UpdateQuote'), {
  ssr: false, // Disable server-side rendering
});

const UpdateQuotePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateQuote />
    </Suspense>
  );
};

export default UpdateQuotePage;
