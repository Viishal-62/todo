import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import ConfirmModal from "./ConfirmModal";

type FilterType = "all" | "active" | "completed";

const ShowAllTodos = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const [loadingId, setLoadingId] = useState<Id<"todos"> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<"todos"> | null>(null);
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<Id<"todos"> | null>(null);

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleToggle = async (id: Id<"todos">) => {
    try {
      setLoadingId(id);
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = (id: Id<"todos">) => {
    setPendingDeleteId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      setDeletingId(pendingDeleteId);
      setDeleteModalVisible(false);
      await deleteTodo({ id: pendingDeleteId });
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  const handleEdit = (id: Id<"todos">, currentTitle: string) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editText.trim()) return;
    try {
      await updateTodo({ id: editingId, title: editText.trim() });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Done" },
  ];

  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      {filters.map((f) => {
        const isActive = filter === f.key;
        return (
          <Pressable
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={({ pressed }) => [
              styles.filterTab,
              pressed && { opacity: 0.8 },
            ]}
          >
            {isActive ? (
              <LinearGradient
                colors={colors.gradients.primary}
                style={styles.filterTabActive}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.filterTabTextActive}>{f.label}</Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.filterTabInactive,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.filterTabText, { color: colors.textMuted }]}
                >
                  {f.label}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  const renderTodoItem = ({
    item: todo,
  }: {
    item: NonNullable<typeof todos>[number];
  }) => {
    const isEditing = editingId === todo._id;
    const isToggling = loadingId === todo._id;
    const isDeleting = deletingId === todo._id;

    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={styles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Checkbox */}
          <Pressable
            onPress={() => handleToggle(todo._id)}
            disabled={isToggling}
            style={styles.checkbox}
          >
            {isToggling ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <LinearGradient
                colors={
                  todo.completed
                    ? colors.gradients.success
                    : [colors.border, colors.border]
                }
                style={[
                  styles.checkboxInner,
                  !todo.completed && { borderColor: colors.border },
                ]}
              >
                {todo.completed && (
                  <FontAwesome name="check" size={14} color="#fff" />
                )}
              </LinearGradient>
            )}
          </Pressable>

          {/* Content */}
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                value={editText}
                onChangeText={setEditText}
                style={styles.editInput}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.editButtons}>
                <Pressable onPress={handleSaveEdit}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={styles.editButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <FontAwesome name="check" size={12} color="#fff" />
                    <Text style={styles.editButtonText}>Save</Text>
                  </LinearGradient>
                </Pressable>
                <Pressable onPress={handleCancelEdit}>
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={styles.editButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <FontAwesome name="times" size={12} color="#fff" />
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.todoTextContainer}>
              <Text
                style={[
                  styles.todoText,
                  todo.completed && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.7,
                  },
                ]}
              >
                {todo.title}
              </Text>
              <View style={styles.todoActions}>
                <Pressable
                  onPress={() => handleEdit(todo._id, todo.title)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={styles.actionButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <FontAwesome name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </Pressable>
                <Pressable
                  onPress={() => handleDelete(todo._id)}
                  disabled={isDeleting}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={styles.actionButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {isDeleting ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <FontAwesome name="trash-o" size={14} color="#fff" />
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={colors.gradients.empty}
        style={styles.emptyIconContainer}
      >
        <FontAwesome
          name={
            filter === "completed"
              ? "check-circle-o"
              : filter === "active"
                ? "circle-o"
                : "inbox"
          }
          size={48}
          color={colors.textMuted}
        />
      </LinearGradient>
      <Text style={styles.emptyText}>
        {filter === "completed"
          ? "No completed todos"
          : filter === "active"
            ? "All caught up!"
            : "No todos yet"}
      </Text>
      <Text style={styles.emptySubtext}>
        {filter === "completed"
          ? "Complete some tasks to see them here"
          : filter === "active"
            ? "You've completed all your tasks 🎉"
            : "Add your first todo to get started"}
      </Text>
    </View>
  );

  return (
    <View style={styles.todoList}>
      {renderFilterTabs()}
      <FlatList
        data={filteredTodos || []}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[
          styles.todoListContent,
          (!filteredTodos || filteredTodos.length === 0) &&
            styles.emptyListContainer,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
        confirmText="Delete"
        cancelText="Keep it"
        variant="danger"
        icon="trash-o"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setPendingDeleteId(null);
        }}
      />
    </View>
  );
};

export default ShowAllTodos;
