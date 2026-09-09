import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';
import { View, Spinner } from 'amogamobileds-v1';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size='lg' variant='circle' />
      </View>
    );
  }

  if (session) {
    return <Redirect href='/(chat)' />;
  }

  return <Redirect href='/(auth)/sign-in' />;
}
