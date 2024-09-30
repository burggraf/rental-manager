import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dmarie.rentalmanager',
  appName: 'Rental Manager',
  webDir: 'build',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'automatic'
  }  
};

export default config;
