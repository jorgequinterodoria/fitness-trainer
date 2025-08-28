# Agente de Fitness y Nutrición

Una aplicación React moderna construida con Vite que proporciona planes personalizados de fitness y nutrición basados en la información del usuario.

## 🚀 Características

- **Interfaz paso a paso**: Proceso guiado de 4 pasos para recopilar información del usuario
- **Cálculos precisos**: BMR (Tasa Metabólica Basal) y TDEE (Gasto Energético Diario Total)
- **Validación de objetivos**: Análisis de la viabilidad de las metas de peso
- **Planes personalizados**: Generación de planes de nutrición y ejercicio adaptados
- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio
- **Interfaz moderna**: Construida con Tailwind CSS y Lucide React icons

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd fitness-nutrition-agent
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter

## 📱 Uso

1. **Información Personal**: Ingresa datos básicos como género, edad, peso, altura y objetivos
2. **Rutina Diaria**: Describe tu estilo de vida y disponibilidad para ejercitarte
3. **Alimentación**: Especifica tus preferencias y restricciones alimentarias
4. **Generar Plan**: Revisa tu información y genera tu plan personalizado

## 🧮 Funcionalidades Técnicas

### Cálculos Implementados

- **BMR (Basal Metabolic Rate)**: Usando las fórmulas de Harris-Benedict
  - Hombres: 88.362 + (13.397 × peso) + (4.799 × altura) - (5.677 × edad)
  - Mujeres: 447.593 + (9.247 × peso) + (3.098 × altura) - (4.330 × edad)

- **TDEE (Total Daily Energy Expenditure)**: BMR × factor de actividad
  - Sedentario: 1.2
  - Actividad ligera: 1.375
  - Actividad moderada: 1.55
  - Actividad intensa: 1.725
  - Muy intenso: 1.9

### Validación de Objetivos

- Pérdida de peso saludable: 0.5-1 kg por semana
- Ganancia de peso saludable: 0.25-0.5 kg por semana
- Recomendaciones automáticas para objetivos no realistas

## 🎨 Estructura del Proyecto

```
src/
├── components/
│   └── FitnessAgent.tsx    # Componente principal
├── App.tsx                 # Componente raíz
├── main.tsx               # Punto de entrada
└── index.css             # Estilos globales
```

## 🔧 Personalización

El componente `FitnessAgent` está diseñado para ser fácilmente personalizable:

- Modifica los pasos del formulario editando las funciones `renderStep1-4`
- Ajusta los cálculos en las funciones `calculateBMR` y `calculateTDEE`
- Personaliza los planes generados en `generatePersonalizedPlan`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.