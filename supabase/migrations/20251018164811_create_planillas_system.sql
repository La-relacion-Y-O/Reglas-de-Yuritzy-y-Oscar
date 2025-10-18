/*
  # Sistema de Planillas - Reglas de la Relación

  ## Descripción
  Este sistema permite a Oscar y Yuritzy marcar si cumplen o no cada regla,
  manteniendo un historial completo y público de todas las evaluaciones.

  ## Nuevas Tablas

  ### `planillas`
  Tabla principal que almacena cada planilla completada
  - `id` (uuid, primary key) - Identificador único de la planilla
  - `user_name` (text) - Nombre del usuario (Oscar o Yuritzy)
  - `completed_at` (timestamptz) - Fecha y hora de completado
  - `created_at` (timestamptz) - Fecha de creación del registro

  ### `planilla_items`
  Tabla que almacena cada respuesta individual de la planilla
  - `id` (uuid, primary key) - Identificador único
  - `planilla_id` (uuid, foreign key) - Referencia a la planilla
  - `rule_number` (integer) - Número de la regla (1-31)
  - `rule_text` (text) - Texto completo de la regla
  - `cumple` (boolean) - Si cumple o no la regla
  - `created_at` (timestamptz) - Fecha de creación

  ## Seguridad
  - RLS habilitado en ambas tablas
  - Políticas permiten lectura pública (para ver el historial de ambos)
  - Políticas permiten inserción sin autenticación (app simple sin login)

  ## Notas Importantes
  - El sistema NO requiere autenticación tradicional
  - Los usuarios simplemente seleccionan su nombre al llenar la planilla
  - Todo el historial es público y visible para ambos
*/

-- Crear tabla de planillas
CREATE TABLE IF NOT EXISTS planillas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL CHECK (user_name IN ('Oscar', 'Yuritzy')),
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de items de planilla
CREATE TABLE IF NOT EXISTS planilla_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  planilla_id uuid NOT NULL REFERENCES planillas(id) ON DELETE CASCADE,
  rule_number integer NOT NULL CHECK (rule_number >= 1 AND rule_number <= 31),
  rule_text text NOT NULL,
  cumple boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE planillas ENABLE ROW LEVEL SECURITY;
ALTER TABLE planilla_items ENABLE ROW LEVEL SECURITY;

-- Políticas para planillas (acceso público total)
CREATE POLICY "Permitir lectura pública de planillas"
  ON planillas FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Permitir inserción pública de planillas"
  ON planillas FOR INSERT
  TO anon
  WITH CHECK (true);

-- Políticas para planilla_items (acceso público total)
CREATE POLICY "Permitir lectura pública de items"
  ON planilla_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Permitir inserción pública de items"
  ON planilla_items FOR INSERT
  TO anon
  WITH CHECK (true);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_planillas_user_name ON planillas(user_name);
CREATE INDEX IF NOT EXISTS idx_planillas_completed_at ON planillas(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_planilla_items_planilla_id ON planilla_items(planilla_id);
CREATE INDEX IF NOT EXISTS idx_planilla_items_rule_number ON planilla_items(rule_number);