"use client";

import { useState, useEffect } from 'react';
import { getContactInfo } from '@/lib/database-actions';
import { SerializedContactInfo } from '@/types';

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<SerializedContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getContactInfo();
        
        if (result.success && result.data) {
          setContactInfo(result.data);
        } else {
          setError(result.error || 'Failed to fetch contact information');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading, error };
}
