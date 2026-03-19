import { Text, View  , StyleSheet} from "react-native";

interface createTodoProps {
  title: string;
}

const CreateTodo = ({ title }: createTodoProps) => {
  return (
    <View>
      <Text>We are creating todo list for testing.</Text>
    </View>
  );
};





export default CreateTodo;
