# vCard QR Generator

Sistema de generación de tarjetas de contacto digitales con códigos QR.

## 🚀 Demo

Visita: `https://GaelCMora.github.io/vcard-qr/`

## ✨ Características

- Crear tarjetas de contacto digitales (vCard)
- Generar códigos QR únicos para cada contacto
- Página de visualización de contacto elegante
- Descargar contacto como archivo .vcf
- Diseño responsive para móviles

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (ES6+)
- Supabase (base de datos)
- QRCode.js (generación de QR)
- GitHub Pages (hosting)

## 📦 Instalación en GitHub Pages

### 1. Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `vcard-qr`
3. Selecciona **Public**
4. Click en **Create repository**

### 2. Subir archivos

```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "Initial commit - vCard QR Generator"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/vcard-qr.git
git push -u origin main
```

### 3. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En "Source", selecciona **Deploy from a branch**
5. En "Branch", selecciona **main** y carpeta **/ (root)**
6. Click en **Save**

### 4. ¡Listo!

Tu sitio estará disponible en: `https://GaelCMora.github.io/vcard-qr/`

## 📝 Configuración de Supabase

La tabla `vcards` ya debe estar creada. Si no, ejecuta el contenido de `supabase-schema.sql` en el SQL Editor de Supabase.

## 📄 Licencia

MIT License
