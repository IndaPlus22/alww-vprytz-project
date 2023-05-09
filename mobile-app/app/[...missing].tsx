import { Link, Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "./app.style";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <TouchableOpacity onPress={() => router.push("/")}>
        <View style={styles.container}>
          <Text style={styles.title}>This screen doesn't exist.</Text>

          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </Link>
        </View>
      </TouchableOpacity>
    </>
  );
}
