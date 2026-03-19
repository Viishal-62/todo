import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface headerProps {
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  progressText?: number | string;
}

const Headers = ({ title, icon, progressText }: headerProps) => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <FontAwesome name={icon} size={24} color="black" />
      <Text style={{ fontSize: 24, marginLeft: 10 }}>{title}</Text>
      <Text style={{ fontSize: 14, marginLeft: 10, color: "gray" }}>
        {progressText}
      </Text>
    </View>
  );
};

export default Headers;
