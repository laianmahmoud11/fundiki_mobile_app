import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>
        Fundi<Text style={styles.yellow}>k</Text>i
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 72,
    backgroundColor: '#1f4ba5',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  yellow: {
    color: '#FFD700'
  }
});