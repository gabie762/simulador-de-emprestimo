import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens';
import { globalStyles } from '../styles';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (usuario: string, senha: string) => {
    console.log('Login realizado:', { usuario });
    login(usuario, senha);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LoginScreen testID="login-screen" onLogin={handleLogin} />
    </SafeAreaView>
  );
}
