import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Producto } from "../data/productos";

type Props = {
  producto: Producto;
  esFavorito: boolean;
  onPress: () => void;
  onToggleFavorito: () => void;
};

export default function ProductoCard({
  producto,
  esFavorito,
  onPress,
  onToggleFavorito,
}: Props) {
  const [errorImagen, setErrorImagen] = useState(false);

  const esNuevo = producto.estado.startsWith("Nuevo");

  const precio = producto.precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

  return (
    <Pressable style={styles.tarjeta} onPress={onPress}>
      <View style={styles.imagenContenedor}>
        {/* Icono de respaldo */}
        <Ionicons name={producto.icono} size={50} color="#78A99E" />

        {/* Fotografía del producto */}
        {!errorImagen && (
          <Image
            source={{ uri: producto.imagen }}
            style={styles.imagen}
            resizeMode="cover"
            onError={() => setErrorImagen(true)}
          />
        )}

        {/* Estado */}
        <View style={[styles.etiqueta, esNuevo ? styles.nuevo : styles.usado]}>
          <Text style={styles.etiquetaTexto}>
            {esNuevo ? "Nuevo" : "Usado"}
          </Text>
        </View>

        {/* Favorito */}
        <Pressable
          style={styles.botonFavorito}
          accessibilityRole="button"
          accessibilityLabel={
            esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorito();
          }}
        >
          <Ionicons
            name={esFavorito ? "heart" : "heart-outline"}
            size={21}
            color={esFavorito ? "#E11D48" : "#475569"}
          />
        </Pressable>
      </View>

      <View style={styles.informacion}>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>

        <Text style={styles.categoria} numberOfLines={1}>
          {producto.categoria}
        </Text>

        <Text style={styles.precio}>{precio}</Text>

        <Text style={styles.estado} numberOfLines={1}>
          {producto.estado}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  imagenContenedor: {
    height: 145,
    backgroundColor: "#E8F3F0",
    alignItems: "center",
    justifyContent: "center",
  },
  imagen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  etiqueta: {
    position: "absolute",
    top: 9,
    left: 9,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },
  nuevo: {
    backgroundColor: "#0F766E",
  },
  usado: {
    backgroundColor: "#475569",
  },
  etiquetaTexto: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  botonFavorito: {
    position: "absolute",
    top: 9,
    right: 9,
    backgroundColor: "#FFFFFF",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  informacion: {
    padding: 12,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    minHeight: 36,
  },
  categoria: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 5,
  },
  precio: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#156B5A",
    marginTop: 9,
  },
  estado: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 5,
  },
});
