import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

const HeightPickerModal = ({ visible, onClose, onHeightSelect, styles }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.pickerModalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Height</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.pickerScrollView}>
            <View style={styles.heightPickerContainer}>
              {/* Feet (4-8) and Inches (0-11) */}
              {Array.from({length: 5}, (_, i) => i + 4).map((feet) => (
                <View key={feet} style={styles.feetSection}>
                  <Text style={styles.feetHeader}>{feet} feet</Text>
                  <View style={styles.inchesGrid}>
                    {Array.from({length: 12}, (_, inches) => (
                      <TouchableOpacity
                        key={inches}
                        style={styles.heightButton}
                        onPress={() => onHeightSelect(feet, inches)}
                      >
                        <Text style={styles.heightText}>{feet}' {inches}"</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default HeightPickerModal;
