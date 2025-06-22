import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

export default function ListaPastas({ navigation }) {
  const [pastas, setPastas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let q = collection(db, "clientes");

    if (search.trim() !== "") {
      q = query(q, where("numeroProcesso", "==", search.trim()));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setPastas(lista);
    });

    return () => unsubscribe();
  }, [search]);

  const confirmarExclusao = (id) => {
    Alert.alert("Excluir Cliente", "Tem certeza que deseja excluir este cliente?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "clientes", id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar pelo número do processo"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        keyboardType="numeric"
      />

      <FlatList
        data={pastas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Processo: {item.numeroProcesso}</Text>
            <Text>Abertura: {item.dataAbertura}</Text>
            <Text>Fechamento: {item.dataFechamento || "-"}</Text>
            <Text>Motivo: {item.motivo || "-"}</Text>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.editar}
                onPress={() => navigation.navigate("CadastroCliente", { cliente: item })}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.excluir}
                onPress={() => confirmarExclusao(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum cliente encontrado</Text>}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("CadastroCliente")}
      >
        <Text style={styles.botaoTexto}>+ Adicionar Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  nome: { fontWeight: "bold", fontSize: 16 },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editar: {
    backgroundColor: "#ffc107",
    padding: 8,
    borderRadius: 5,
  },
  excluir: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
  },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  botao: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  botaoTexto: { color: "white", fontWeight: "bold", fontSize: 16 },
});
