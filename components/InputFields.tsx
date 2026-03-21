import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  title: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

const InputField = ({
  title,
  onChangeText,
  placeholder,
  onSubmit,
}: InputFieldProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={title}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          {
            backgroundColor: colors.backgrounds.input,
            borderColor: isFocused ? colors.primary : colors.border,
            color: colors.text,
            shadowColor: isFocused ? colors.primary : "transparent",
          },
        ]}
        placeholder={placeholder || "What needs to be done?"}
        placeholderTextColor={colors.textMuted}
        multiline
        maxLength={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 17,
    maxHeight: 120,
    fontWeight: "500",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default InputField;
