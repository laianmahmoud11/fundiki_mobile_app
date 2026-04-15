import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  activeTab: 'active' | 'past';
  setActiveTab: (value: 'active' | 'past') => void;
};

export default function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={activeTab === 'active' ? styles.activeTab : styles.tab}
        onPress={() => setActiveTab('active')}
      >
        <Text style={activeTab === 'active' ? styles.activeText : styles.text}>
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={activeTab === 'past' ? styles.activeTab : styles.tab}
        onPress={() => setActiveTab('past')}
      >
        <Text style={activeTab === 'past' ? styles.activeText : styles.text}>
          Past
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    flexWrap: 'wrap'
  },
  tab: {
    marginRight: 12,
    marginBottom: 8
  },
  activeTab: {
    borderWidth: 1,
    borderColor: '#1f4ba5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginRight: 12,
    marginBottom: 8
  },
  activeText: {
    color: '#1f4ba5',
    fontSize: 14
  },
  text: {
    color: 'black',
    fontSize: 14
  }
});