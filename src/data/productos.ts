import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export const CATEGORIAS = [
  "Todos",
  "Tecnología",
  "Libros",
  "Material escolar",
  "Accesorios",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: Exclude<Categoria, "Todos">;
  estado: string;
  descripcion: string;
  vendedor: string;
  imagen: string;
  icono: IconName;
};

export const ICONOS_CATEGORIAS: Record<Categoria, IconName> = {
  Todos: "grid-outline",
  Tecnología: "laptop-outline",
  Libros: "book-outline",
  "Material escolar": "school-outline",
  Accesorios: "bag-outline",
};

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 3500,
    categoria: "Tecnología",
    estado: "Usado - Buen estado",
    descripcion: "Laptop funcional, ideal para tareas y proyectos.",
    vendedor: "Estudiante CESUN",
    icono: "laptop-outline",
    imagen:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=75",
  },
  {
    id: 2,
    nombre: "Calculadora científica",
    precio: 180,
    categoria: "Material escolar",
    estado: "Usado - Excelente estado",
    descripcion: "Calculadora científica para matemáticas.",
    vendedor: "Estudiante CESUN",
    icono: "calculator-outline",
    imagen:
      "https://images.unsplash.com/photo-1511377107391-116a9d5d20b5?w=600&q=75",
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
    imagen:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=75",
  },
  {
    id: 4,
    nombre: "Mochila escolar",
    precio: 300,
    categoria: "Accesorios",
    estado: "Usado - Buen estado",
    descripcion: "Mochila con espacio para laptop.",
    vendedor: "Estudiante CESUN",
    icono: "bag-outline",
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=75",
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
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=75",
  },
  {
    id: 6,
    nombre: "Paquete de cuadernos",
    precio: 80,
    categoria: "Material escolar",
    estado: "Nuevo",
    descripcion: "Cuadernos sin utilizar.",
    vendedor: "Estudiante CESUN",
    icono: "documents-outline",
    imagen:
      "https://images.unsplash.com/photo-1444730558009-b7f0368e1264?w=600&q=75",
  },
];
