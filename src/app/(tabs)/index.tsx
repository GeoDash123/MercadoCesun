import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useState, type ComponentProps } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];

const CATEGORIAS = [
  "Todos",
  "Tecnología",
  "Libros",
  "Material escolar",
  "Accesorios",
] as const;

type Categoria = (typeof CATEGORIAS)[number];

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: Exclude<Categoria, "Todos">;
  estado: string;
  descripcion: string;
  vendedor: string;
  icono: IconName;
  imagen?: string;
};

const ICONOS_CATEGORIAS: Record<Categoria, IconName> = {
  Todos: "grid-outline",
  Tecnología: "laptop-outline",
  Libros: "book-outline",
  "Material escolar": "school-outline",
  Accesorios: "bag-outline",
};

// Productos simulados para desarrollar la interfaz.
const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 3500,
    categoria: "Tecnología",
    estado: "Usado - Buen estado",
    descripcion: "Laptop funcional, ideal para tareas y proyectos.",
    vendedor: "Estudiante CESUN",
    icono: "laptop-outline",
  },
  {
    id: 2,
    nombre: "Calculadora científica",
    precio: 180,
    categoria: "Material escolar",
    estado: "Usado - Excelente estado",
    descripcion: "Calculadora científica para clases de matemáticas.",
    vendedor: "Estudiante CESUN",
    icono: "calculator-outline",
  },
  {
    id: 3,
    nombre: "Libro de programación",
    precio: 220,
    categoria: "Libros",
    estado: "Usado - Buen estado",
    descripcion: "Libro introductorio de programación.",
    vendedor: "Estudiante CESUN",
    icono: "book-outline",
  },
  {
    id: 4,
    nombre: "Mochila escolar",
    precio: 300,
    categoria: "Accesorios",
    estado: "Usado - Buen estado",
    descripcion: "Mochila con espacio para laptop y cuadernos.",
    vendedor: "Estudiante CESUN",
    icono: "bag-outline",
  },
  {
    id: 5,
    nombre: "Audífonos",
    precio: 450,
    categoria: "Tecnología",
    estado: "Usado - Excelente estado",
    descripcion: "Audífonos para estudiar y escuchar música.",
    vendedor: "Estudiante CESUN",
    icono: "headset-outline",
  },
  {
    id: 6,
    nombre: "Paquete de cuadernos",
    precio: 80,
    categoria: "Material escolar",
    estado: "Nuevo",
    descripcion: "Cuadernos sin utilizar para diferentes materias.",
    vendedor: "Estudiante CESUN",
    icono: "documents-outline",
  },
];

function formatoPrecio(precio: number) {
  return precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export default function Inicio() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("Todos");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    const coincideCategoria =
      categoria === "Todos" || producto.categoria === categoria;

    const texto = normalizarTexto(busqueda);

    const coincideBusqueda =
      normalizarTexto(producto.nombre).includes(texto) ||
      normalizarTexto(producto.categoria).includes(texto) ||
      normalizarTexto(producto.descripcion).includes(texto);

    return coincideCategoria && coincideBusqueda;
  });

  const cambiarFavorito = (id: number) => {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((item) => item !== id)
        : [...actuales, id],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="storefront-outline" size={26} color="#FFFFFF" />
          </View>

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>Mercado CESUN</Text>
            <Text style={styles.subtitulo}>Tu comunidad, tu mercado</Text>
          </View>
        </View>

        {/* BUSCADOR */}
        <View style={styles.buscador}>
          <Ionicons name="search-outline" size={21} color="#64748B" />
          <TextInput
            style={styles.input}
            placeholder="¿Qué estás buscando?"
            placeholderTextColor="#94A3B8"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            returnKeyType="search"
          />
          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda("")}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitulo}>
            ¡Dale una segunda vida a tus artículos!
          </Text>

          <Text style={styles.bannerDescripcion}>
            Compra, vende e intercambia con estudiantes de CESUN.
          </Text>

          <Pressable
            style={styles.bannerBoton}
            onPress={() => router.push("/publicar")}
          >
            <Ionicons name="add-circle-outline" size={18} color="#156B5A" />
            <Text style={styles.bannerBotonTexto}>Publicar artículo</Text>
          </Pressable>
        </View>

        {/* CATEGORÍAS */}
        <Text style={styles.seccionTitulo}>Categorías</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categorias}
        >
          {CATEGORIAS.map((item) => {
            const activo = categoria === item;

            return (
              <Pressable
                key={item}
                onPress={() => setCategoria(item)}
                style={[
                  styles.categoriaBoton,
                  activo && styles.categoriaActiva,
                ]}
              >
                <Ionicons
                  name={ICONOS_CATEGORIAS[item]}
                  size={17}
                  color={activo ? "#FFFFFF" : "#475569"}
                />
                <Text
                  style={[
                    styles.categoriaTexto,
                    activo && styles.categoriaTextoActivo,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* PUBLICACIONES */}
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Publicaciones recientes</Text>
          <Text style={styles.contador}>
            {productosFiltrados.length} artículos
          </Text>
        </View>

        <View style={styles.grid}>
          {productosFiltrados.map((producto) => {
            const esFavorito = favoritos.includes(producto.id);

            return (
              <Pressable
                key={producto.id}
                style={styles.tarjeta}
                onPress={() => setSeleccionado(producto)}
              >
                {/* IMAGEN O ICONO PROVISIONAL */}
                <View style={styles.imagenContenedor}>
                  {producto.imagen ? (
                    <Image
                      source={{ uri: producto.imagen }}
                      style={styles.imagen}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name={producto.icono} size={55} color="#78A99E" />
                  )}

                  <Pressable
                    style={styles.favoritoBoton}
                    onPress={(event) => {
                      event.stopPropagation();
                      cambiarFavorito(producto.id);
                    }}
                  >
                    <Ionicons
                      name={esFavorito ? "heart" : "heart-outline"}
                      size={21}
                      color={esFavorito ? "#E11D48" : "#475569"}
                    />
                  </Pressable>
                </View>

                {/* INFORMACIÓN DEL PRODUCTO */}
                <View style={styles.tarjetaInfo}>
                  <Text style={styles.productoNombre} numberOfLines={2}>
                    {producto.nombre}
                  </Text>

                  <Text style={styles.productoCategoria}>
                    {producto.categoria}
                  </Text>

                  <Text style={styles.productoPrecio}>
                    {formatoPrecio(producto.precio)}
                  </Text>

                  <Text style={styles.productoEstado} numberOfLines={1}>
                    {producto.estado}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {productosFiltrados.length === 0 && (
          <View style={styles.sinResultados}>
            <Ionicons name="search-outline" size={40} color="#94A3B8" />
            <Text style={styles.sinResultadosTexto}>
              No encontramos artículos con esos filtros.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* DETALLE DEL PRODUCTO */}
      <Modal
        visible={seleccionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSeleccionado(null)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Pressable
              style={styles.modalCerrar}
              onPress={() => setSeleccionado(null)}
            >
              <Ionicons name="close" size={24} color="#334155" />
            </Pressable>

            {seleccionado && (
              <>
                <View style={styles.modalImagen}>
                  <Ionicons
                    name={seleccionado.icono}
                    size={70}
                    color="#78A99E"
                  />
                </View>

                <Text style={styles.modalTitulo}>{seleccionado.nombre}</Text>

                <Text style={styles.modalPrecio}>
                  {formatoPrecio(seleccionado.precio)}
                </Text>

                <Text style={styles.modalDato}>
                  Categoría: {seleccionado.categoria}
                </Text>

                <Text style={styles.modalDato}>
                  Estado: {seleccionado.estado}
                </Text>

                <Text style={styles.modalDato}>
                  Vendedor: {seleccionado.vendedor}
                </Text>

                <Text style={styles.modalDescripcion}>
                  {seleccionado.descripcion}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contenido: {
    padding: 18,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: "#156B5A",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTexto: {
    marginLeft: 12,
    flex: 1,
  },
  titulo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitulo: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },
  buscador: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  banner: {
    backgroundColor: "#156B5A",
    borderRadius: 17,
    padding: 20,
    marginBottom: 26,
  },
  bannerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 27,
  },
  bannerDescripcion: {
    color: "#E0F2ED",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
    marginBottom: 18,
  },
  bannerBoton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 7,
  },
  bannerBotonTexto: {
    color: "#156B5A",
    fontSize: 13,
    fontWeight: "bold",
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  categorias: {
    gap: 9,
    paddingVertical: 15,
  },
  categoriaBoton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoriaActiva: {
    backgroundColor: "#156B5A",
    borderColor: "#156B5A",
  },
  categoriaTexto: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  categoriaTextoActivo: {
    color: "#FFFFFF",
  },
  seccionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  contador: {
    fontSize: 12,
    color: "#64748B",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },
  tarjeta: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  imagenContenedor: {
    height: 135,
    backgroundColor: "#E8F3F0",
    alignItems: "center",
    justifyContent: "center",
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  favoritoBoton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tarjetaInfo: {
    padding: 12,
  },
  productoNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    minHeight: 36,
  },
  productoCategoria: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 5,
  },
  productoPrecio: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#156B5A",
    marginTop: 9,
  },
  productoEstado: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 5,
  },
  sinResultados: {
    alignItems: "center",
    padding: 30,
    gap: 12,
  },
  sinResultadosTexto: {
    color: "#64748B",
    fontSize: 13,
    textAlign: "center",
  },
  modalFondo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 22,
  },
  modalContenido: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
  },
  modalCerrar: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalImagen: {
    height: 130,
    backgroundColor: "#E8F3F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },
  modalPrecio: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#156B5A",
    marginTop: 8,
    marginBottom: 16,
  },
  modalDato: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 8,
  },
  modalDescripcion: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
});
