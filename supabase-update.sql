-- ============================================
-- SQL para ACTUALIZAR la tabla vcards existente
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================

-- Agregar columna short_id a la tabla existente
ALTER TABLE public.vcards 
ADD COLUMN IF NOT EXISTS short_id VARCHAR(6) UNIQUE;

-- Crear índice en el campo short_id para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_vcards_short_id ON public.vcards(short_id);
