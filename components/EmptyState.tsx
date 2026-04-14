import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onPressButton?: () => void;
  hideButton?: boolean;
};

export default function EmptyState({
  title = 'No bookings yet',
  subtitle = 'Sign in or create an account to get started.',
  buttonText = 'Sign in',
  onPressButton,
  hideButton = false
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {!hideButton && (
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.link}>Import booking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    maxWidth: 300
  },
  button: {
    backgroundColor: '#1f4ba5',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 140,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  link: {
    color: '#1f4ba5'
  }
});