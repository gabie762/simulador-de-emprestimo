import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LogoutIcon } from './LogoutIcon';

interface CaixaHeaderProps {
  tipo?: 'positiva' | 'negativa' | 'chapado';
  showLogout?: boolean;
  onLogout?: () => void;
}

export const CaixaHeader: React.FC<CaixaHeaderProps> = ({ 
  tipo = 'negativa', 
  showLogout = false, 
  onLogout 
}) => {
  let source;
  if (tipo === 'chapado') {
    source = require('../assets/images/caixa_elemento_cor_chapado_negativo.png');
  } else if (tipo === 'negativa') {
    source = require('../assets/images/caixa_2cores_negativa.png');
  } else {
    source = require('../assets/images/caixa_2cores_positiva.png');
  }

  return (
    <View style={styles.headerContainer}>
      <Image
        source={source}
        style={styles.logo}
        resizeMode="contain"
        testID="header-logo"
      />
      
      {showLogout && onLogout && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          testID="logout-button"
        >
          <LogoutIcon size={22} color="#fff" variant="exit" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0066B3',
    minHeight: 60,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoutButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    minHeight: 32,
  },
});
