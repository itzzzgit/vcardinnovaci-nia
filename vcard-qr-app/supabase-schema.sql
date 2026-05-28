-- ============================================
-- SQL para crear la tabla vcards en Supabase
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================

-- Crear la tabla vcards
CREATE TABLE public.vcards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    short_id VARCHAR(6) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(150),
    company VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    work_phone VARCHAR(50),
    email VARCHAR(150) NOT NULL,
    website VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    linkedin VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    twitter VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.vcards ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT a usuarios anónimos
CREATE POLICY "Allow anonymous insert" ON public.vcards
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Política para permitir SELECT a usuarios anónimos
CREATE POLICY "Allow anonymous select" ON public.vcards
    FOR SELECT 
    TO anon
    USING (true);

-- Crear índice en el campo created_at para mejor rendimiento
CREATE INDEX idx_vcards_created_at ON public.vcards(created_at DESC);

-- Crear índice en el campo short_id para búsquedas rápidas
CREATE INDEX idx_vcards_short_id ON public.vcards(short_id);

-- Comentario en la tabla
COMMENT ON TABLE public.vcards IS 'Tabla para almacenar información de tarjetas de contacto vCard';
