import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function CadastroCliente({ navigation, route }) {
  const cliente = route.params?.cliente;

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [dataFechamento, setDataFechamento] = useState("");
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setNumeroProcesso(cliente.numeroProcesso);
      setDataAbertura(cliente.dataAbertura);
      setDataFechamento(cliente.dataFechamento || "");
      setMotivo(cliente.motivo || "");
    }
  }, [cliente]);

  const salvarCliente = async () => {
    if (!nome || !cpf || !numeroProcesso || !dataAbertura) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (cliente?.id) {
        // Editar
        await updateDoc(doc(db, "clientes", cliente.id), {
          nome, cpf, numeroProcesso, dataAbertura, dataFechamento, motivo,
        });
        Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
      } else {
        // Novo
        await addDoc(collection(db, "clientes"), {
          nome, cpf, numeroProcesso, dataAbertura, dataFechamento, motivo,
        });
        Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar o cliente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>CPF *</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Número do Processo *</Text>
      <TextInput
        style={styles.input}
        value={numeroProcesso}
        onChangeText={setNumeroProcesso}
      />

      <Text style={styles.label}>Data de Abertura *</Text>
      <TextInput
        style={styles.input}
        value={dataAbertura}
        onChangeText={setDataAbertura}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Data de Fechamento</Text>
      <TextInput
        style={styles.input}
        value={dataFechamento}
        onChangeText={setDataFechamento}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Motivo da Aposentadoria</Text>
      <TextInput
        style={styles.input}
        value={motivo}
        onChangeText={setMotivo}
        placeholder="Ex: idade, invalidez, etc."
      />

      <TouchableOpacity style={styles.botao} onPress={salvarCliente}>
        <Text style={styles.botaoTexto}>
          {cliente ? "Atualizar" : "Salvar"} Cliente
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: "bold", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  botao: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 24,
  },
  botaoTexto: { color: "white", fontWeight: "bold", fontSize: 16 },
});
