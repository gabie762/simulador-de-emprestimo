import React, { useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { globalStyles } from '../styles';

interface LoginScreenProps {
  onLogin: (usuario: string, senha: string) => void;
  testID?: string; // Added testID as an optional prop
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, testID }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{texto: string, tipo: 'erro' | 'sucesso'} | null>(null);
  
  // Animations for toast
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-50);

  const mostrarToast = (texto: string, tipo: 'sucesso' | 'erro') => {
    setMensagem({ texto, tipo });

    // Completely bypass animations in tests
    if (process.env.JEST_WORKER_ID) {
      // Auto-hide após 3 segundos (still use setTimeout for testing)
      setTimeout(() => {
        esconderToast();
      }, 3000);
      return;
    }

    // Reset das animações
    fadeAnim.setValue(0);
    slideAnim.setValue(-50);

    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide após 3 segundos
    setTimeout(() => {
      esconderToast();
    }, 3000);
  };

  const esconderToast = () => {
    // Immediately hide toast in test environment
    if (process.env.JEST_WORKER_ID) {
      setMensagem(null);
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMensagem(null);
    });
  };

  const handleLogin = async () => {
    if (!usuario.trim() || !senha.trim()) {
      mostrarToast('Por favor, preencha todos os campos.', 'erro');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula uma validação de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Login simples - aceita qualquer usuário/senha não vazios
      if (usuario.trim().length >= 3 && senha.trim().length >= 3) {
        mostrarToast('Login realizado com sucesso!', 'sucesso');
        
        setTimeout(() => {
          onLogin(usuario, senha);
        }, 300);
      } else {
        mostrarToast('Usuário e senha devem ter pelo menos 3 caracteres.', 'erro');
      }
    } catch {
      mostrarToast('Erro ao fazer login. Tente novamente.', 'erro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container} testID={testID}> {/* Applied testID to the root View */}
      {/* Toast Notification */}
      {mensagem && (
        <Animated.View 
          style={[
            styles.toast,
            mensagem.tipo === 'sucesso' ? styles.toastSucesso : styles.toastErro,
            process.env.JEST_WORKER_ID
              ? { opacity: 1, transform: [{ translateY: 0 }] } // Force visibility in tests
              : {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
          ]}
        >
          <Text style={styles.toastTexto}>{mensagem.texto}</Text>
        </Animated.View>
      )}

      <View style={styles.loginContainer}>
        <Text style={styles.titulo}>Simulador de Crédito</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>
        
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
          editable={!isLoading}
        />
        
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          editable={!isLoading}
        />
        
        <TouchableOpacity 
          style={[globalStyles.buttonOrange, styles.loginButton, isLoading && globalStyles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 
            <ActivityIndicator color="#fff" testID="loading-indicator" /> : 
            <Text style={globalStyles.buttonText}>Entrar</Text>
          }
        </TouchableOpacity>
        
        <Text style={styles.infoTexto}>
          Digite qualquer usuário e senha com pelo menos 3 caracteres
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066B3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066B3',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Caixa',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Caixa',
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  infoTexto: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Caixa',
  },
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toastSucesso: {
    backgroundColor: '#4CAF50',
  },
  toastErro: {
    backgroundColor: '#F44336',
  },
  toastTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Caixa',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
