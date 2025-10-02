import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import articleData from "../assets/article-data"
import { useState } from 'react';

export default function App() {

  const [query, setQuery] = useState("")

  const filteredArticles = query.length > 0 ? articleData.filter(article => {
    return (article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase()))
  }) : []

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const HighlightedText = ({ text, query, style }) => {
    if (!query) return <Text style={style}>{text}</Text>;
    const regex = new RegExp(`(${escapeRegExp(query)})`, "ig");
    const parts = String(text).split(regex);
    return (
      <Text style={style}>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={i} style={styles.highlight}>{part}</Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Article Database Search</Text>
      <TextInput
        style={styles.searchBar}
        placeholder='Search articles'
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <View key={index} style={styles.card}>
              <HighlightedText text={article.title} query={query} style={styles.title} />
              <HighlightedText text={article.publishDate} query={query} style={styles.date} />
              <HighlightedText text={article.content.slice(0, 200) + "..."} query={query} style={styles.content} />
            </View>
          ))
        ) : query.length > 0 ? (
          <Text style={styles.noResults}>No results found</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  list: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 30,
  },
  highlight: { backgroundColor: "yellow", fontWeight: "bold" },
});
