import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

const WeightPickerModal = ({ visible, onClose, onWeightSelect, styles }) => {
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
            <Text style={styles.modalTitle}>Select Weight</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.pickerScrollView}>
            <View style={styles.weightPickerContainer}>
              {/* Weight from 80 to 400 lbs in increments of 5 */}
              {Array.from({length: (400 - 80) / 5 + 1}, (_, i) => 80 + i * 5).map((weight) => (
                <TouchableOpacity
                  key={weight}
                  style={styles.weightButton}
                  onPress={() => onWeightSelect(weight)}
                >
                  <Text style={styles.weightText}>{weight} lbs</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default WeightPickerModal;
