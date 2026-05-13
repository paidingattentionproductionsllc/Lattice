import { useContext } from 'react';
import { PlatformContext } from '@/contexts/PlatformContext';

export function usePlatforms() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error('usePlatforms must be used within PlatformProvider');
  return context;
}
