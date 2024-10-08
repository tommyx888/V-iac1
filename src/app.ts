import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AppNavigator } from './navigation/AppNavigator';
import { ClerkProvider } from '@clerk/clerk-expo';
import { supabase } from './lib/supabase';

// Controls react-nativescript log verbosity.
// - true: all logs;
// - false: only error logs.
Object.defineProperty(global, '__DEV__', { value: false });

const CLERK_PUBLISHABLE_KEY = 'your_clerk_publishable_key';

ReactNativeScript.start(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <AppNavigator />
  </ClerkProvider>
);