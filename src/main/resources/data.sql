-- Datos iniciales para Emark GM
-- Contraseñas cifradas con BCrypt:
-- 'admin123': $2a$10$daex8ho7BTnICk5mD4Qm1eeZsyM.a25hFydF1Dpb13Q9YJuF5.Z7W (admin@emarkgm.com)
-- 'cliente123': $2a$10$WwKUdZ00Y0vasBZFfWM/uuHPpc8FXR9llAyyPKJUSiUMzJ3oxS54K (cliente@emarkgm.com)

INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES 
('Administrador Emark', 'admin@emarkgm.com', '$2a$10$daex8ho7BTnICk5mD4Qm1eeZsyM.a25hFydF1Dpb13Q9YJuF5.Z7W', 'ROLE_ADMINISTRADOR'),
('Juan Perez Cliente', 'cliente@emarkgm.com', '$2a$10$WwKUdZ00Y0vasBZFfWM/uuHPpc8FXR9llAyyPKJUSiUMzJ3oxS54K', 'ROLE_COMPRADOR')
ON CONFLICT (correo) DO UPDATE SET contrasena = EXCLUDED.contrasena;

-- Categorías
INSERT INTO categorias (id, nombre, descripcion) VALUES
(1, 'Filtros', 'Filtros de aceite, combustible, aire y transmisión'),
(2, 'Bombas', 'Bombas hidráulicas, de combustible, agua y frenos'),
(3, 'Kits', 'Kits de sellos y empaquetaduras hidráulicas'),
(4, 'Hidráulica', 'Válvulas, enfriadores, visores y accesorios hidráulicos'),
(5, 'Transmisión', 'Ejes, crucetas, piñones y convertidores'),
(6, 'Sensores', 'Sensores de temperatura y termostatos'),
(7, 'Motor', 'Tensores, poleas, tapas y componentes de motor'),
(8, 'Dirección', 'Terminales y componentes de dirección'),
(9, 'Estructura', 'Guías y componentes estructurales'),
(10, 'Fijación', 'Seguros y pasadores de sujeción')
ON CONFLICT (id) DO NOTHING;

-- Catálogo completo de productos de Emark GM
INSERT INTO productos (id, nombre, precio, stock, categoria_id, marca, maquinaria, url_imagen, descripcion, especificaciones) VALUES
(1, 'Filtro de aceite', 184.00, 12, 1, 'Donaldson', 'Excavadora', 'imagenes/FILTRO DE ACEITE.jpg', 'Filtro de aceite para línea pesada. Rosca estándar y alta retención de partículas.', 'Micraje 10 μm, Rosca 1 3/8-12 UNF, Compatible CAT / Komatsu'),
(2, 'Filtro de combustible', 156.00, 18, 1, 'Fleetguard', 'Cargador frontal', 'imagenes/FILTRO DE COMBUSTIBLE.jpg', 'Filtración de combustible para motores diésel en operación continua.', 'Separación de agua, Cambio cada 500 h, Alta eficiencia'),
(3, 'Filtro de transmisión', 368.00, 8, 1, 'Caterpillar', 'Excavadora', 'imagenes/FILTRO DE TRANSMISIÓN.jpg', 'Elemento filtrante para circuito de transmisión hidrostática.', 'OEM equivalente, Presión de trabajo alta, Stock verificado'),
(4, 'Conjunto filtro de aire', 298.00, 6, 1, 'Komatsu', 'Excavadora', 'imagenes/CONJUNTO DE FILTRO DE AIRE.jpg', 'Conjunto primario y secundario para polvo severo.', 'Doble etapa, Sellado reforzado, Línea profesional'),
(5, 'Bomba de agua', 890.00, 4, 2, 'Cummins', 'Motoniveladora', 'imagenes/BOMBA DE AGUA.jpg', 'Bomba de circulación para sistema de enfriamiento de motor.', 'Aleación resistente, Rodamiento sellado, Incluye junta'),
(6, 'Bomba de combustible', 1240.00, 3, 2, 'Caterpillar', 'Cargador frontal', 'imagenes/BOMBA DE COMBUSTIBLE.jpg', 'Bomba de alimentación para inyección diésel.', 'Presión calibrada, Conexiones OEM, Prueba de flujo'),
(7, 'Bomba de freno', 756.00, 5, 2, 'Komatsu', 'Excavadora', 'imagenes/BOMBA DE FRENO.jpg', 'Bomba hidráulica para sistema de frenos de servicio.', 'Cuerpo fundido, Eje endurecido, Garantía comercial'),
(8, 'Bomba de freno 3D Plus', 812.00, 4, 2, 'Caterpillar', 'Excavadora', 'imagenes/BOMBA DE FRENO 3D PLUS.jpg', 'Versión reforzada para modelos 3D Plus.', 'Mayor caudal, Sellos viton, Kit montaje'),
(9, 'Bomba de transmisión', 2180.00, 2, 2, 'Caterpillar', 'Cargador frontal', 'imagenes/BOMBA DE TRANSMISIÓN.jpg', 'Bomba para circuito de potencia de transmisión.', 'Revisión en banco, Número de parte verificado, Despacho coordinado'),
(10, 'Bomba hidráulica', 3450.00, 2, 2, 'Komatsu', 'Excavadora', 'imagenes/BOMBA HIDRAULICA.jpg', 'Bomba principal para implementos y giro.', 'Caudal nominal OEM, Prueba de presión, Soporte técnico'),
(11, 'Kit sellos hidráulicos 320DL', 326.00, 10, 3, 'Caterpillar', 'Excavadora', 'imagenes/KIT SELLOS HIDRÁULICOS 320DL.jpg', 'Kit de sellos para cilindros y válvulas 320DL.', 'Material NBR/PU, Listado por posición, Incluye guía de montaje'),
(12, 'Kit sellos hidráulicos CAT 320D', 318.00, 9, 3, 'Caterpillar', 'Excavadora', 'imagenes/KIT SELLOS HIDRÁULICOS CAT 320D.jpg', 'Repuesto completo para mantenimiento programado.', 'Compatibilidad verificada, Empaque industrial, Stock local'),
(13, 'Kit sellos hidráulicos 3C Plus', 302.00, 11, 3, 'Caterpillar', 'Cargador frontal', 'imagenes/KIT SELLOS HIDRÁULICOS 3C PLUS.jpg', 'Sellos para cargador frontal serie 3C Plus.', 'Alta temperatura, Juego completo, Línea profesional'),
(14, 'Kit sellos hidráulicos L120 C-E', 340.00, 7, 3, 'Caterpillar', 'Cargador frontal', 'imagenes/KIT SELLOS HIDRÁULICOS L120 C-E.jpg', 'Kit para transmisión y dirección L120 C-E.', 'Codificación por cilindro, Calidad ISO, Entrega 24 h Lima'),
(15, 'Kit sello reparación bomba hidráulica', 278.00, 8, 3, 'Komatsu', 'Excavadora', 'imagenes/KIT DE SELLO REPARACIÓN BOMBA HIDRÁULICA.jpg', 'Reparación menor sin cambiar bomba completa.', 'Plato y émbolo, O-rings incluidos, Ahorro vs bomba nueva'),
(16, 'Kit discos de freno', 468.00, 6, 3, 'Caterpillar', 'Motoniveladora', 'imagenes/KIT DISCOS DE FRENO.jpg', 'Juego de discos para freno de servicio.', 'Material composite, Par torsión especificado, Montaje asistido'),
(17, 'Válvula de alivio principal', 520.00, 5, 4, 'Caterpillar', 'Excavadora', 'imagenes/VALVULA DE ALIVIO PRINCIPAL.jpg', 'Válvula de protección del circuito principal.', 'Ajuste de presión, Cuerpo templado, Prueba en taller'),
(18, 'Válvula de alivio ARV EX', 498.00, 4, 4, 'Komatsu', 'Excavadora', 'imagenes/VÁLVULA DE ALIVIO ARV EX.jpg', 'Válvula de alivio para línea EX.', 'Respuesta rápida, Sellos de repuesto, Código cruzado'),
(19, 'Visor de nivel tanque hidráulico', 86.00, 22, 4, 'Donaldson', 'Cargador frontal', 'imagenes/VISOR DE NIVEL DEL TANQUE HIDRÁULICO.jpg', 'Indicador visual de nivel con escala.', 'Vidrio templado, Rosca NPT, Instalación rápida'),
(20, 'Tapa tanque hidráulico', 64.00, 30, 4, 'Fleetguard', 'Excavadora', 'imagenes/TAPA DE TANQUE HIDRÁULICO.jpg', 'Tapa con respiradero integrado.', 'Anti-derrame, Compatible múltiples modelos, Stock permanente'),
(21, 'Enfriador de aceite', 1120.00, 3, 4, 'Cummins', 'Cargador frontal', 'imagenes/ENFRIADOR DE ACEITE.jpg', 'Intercambiador para control de temperatura de aceite.', 'Aletas de alta densidad, Conexiones SAE, Limpieza interna'),
(22, 'Conjunto enfriador aceite', 1285.00, 2, 4, 'Caterpillar', 'Excavadora', 'imagenes/CONJUNTO DE ENFRIADOR ACEITE.jpg', 'Conjunto listo para montaje en línea.', 'Incluye soportes, Mangueras opcionales, Revisión visual'),
(23, 'Crucetas de transmisión', 198.00, 14, 5, 'Komatsu', 'Motoniveladora', 'imagenes/CRUCETAS DE TRANSMISION.jpg', 'Crucetas para eje cardán maquinaria pesada.', 'Grasa de fábrica, Balanceo recomendado, Acero forjado'),
(24, 'Eje transmisión eje trasero', 2890.00, 1, 5, 'Caterpillar', 'Cargador frontal', 'imagenes/EJE DE TRANSMISIÓN DEL EJE TRASERO.jpg', 'Componente estructural para tracción trasera.', 'Tratamiento térmico, Número grabado, Coordinación logística'),
(25, 'Convertidor de par JBC', 4200.00, 1, 5, 'Caterpillar', 'Cargador frontal', 'imagenes/CONVERTIDOR DE PAR JBC.jpg', 'Convertidor para transmisión powershift.', 'Reacondicionado / nuevo, Prueba estática, Garantía por escrito'),
(26, 'Piñón de cubo', 380.00, 7, 5, 'Komatsu', 'Excavadora', 'imagenes/PIÑON DE CUBO.jpg', 'Piñón para conjunto de cubo final.', 'Dureza HRC, Engranaje rectificado, Par de apriete guía'),
(27, 'Piñón central cubo', 410.00, 6, 5, 'Caterpillar', 'Excavadora', 'imagenes/PIÑON CENTRAL CUBO.jpg', 'Piñón central de tracción.', 'Tratamiento superficial, Compatible varios tonelajes, Stock B2B'),
(28, 'Sensor de temperatura', 142.00, 16, 6, 'Cummins', 'Excavadora', 'imagenes/SENSOR DE TEMPERATURA.jpg', 'Sensor NTC para ECU y panel.', 'Conector original, Rango -40 a 150 °C, Calibración OEM'),
(29, 'Termostato JBC', 118.00, 20, 6, 'Caterpillar', 'Cargador frontal', 'imagenes/TERMOSTATO JBC.jpg', 'Termostato para circuito de enfriamiento JBC.', 'Apertura nominal 82 °C, Válvula bypass, Prueba de estanqueidad'),
(30, 'Tensor de correa', 165.00, 12, 7, 'Fleetguard', 'Motoniveladora', 'imagenes/TENSOR DE CORREA.jpg', 'Tensor automático para correa de accesorios.', 'Rodamiento sellado, Ajuste dinámico, Montaje sencillo'),
(31, 'Tensor de polea', 172.00, 10, 7, 'Komatsu', 'Excavadora', 'imagenes/TENSOR DE POLEA.jpg', 'Polea tensora con rodamiento integrado.', 'Alineación precisa, Material polímero, Larga vida útil'),
(32, 'Terminales de dirección', 224.00, 9, 8, 'Caterpillar', 'Cargador frontal', 'imagenes/TERMINALES DE DIRECCIÓN.jpg', 'Terminales para sistema de dirección hidráulica.', 'Roscas protegidas, Niple incluido, Par especificado'),
(33, 'Guías brazo extensible', 890.00, 3, 9, 'Komatsu', 'Excavadora', 'imagenes/GUIAS DEL BRAZO EXTENSIBLE.jpg', 'Guías deslizantes para brazo extensible.', 'Tratamiento anti-fricción, Juego par, Instalación en campo'),
(34, 'Seguro pin 45 mm', 48.00, 40, 10, 'Caterpillar', 'Excavadora', 'imagenes/SEGURO PIN 45MM.jpg', 'Seguro elástico para pasadores de 45 mm.', 'Acero aleado, Zincado, Alta rotación'),
(35, 'Spool short', 385.00, 5, 4, 'Komatsu', 'Excavadora', 'imagenes/SPOOL SHORT.jpg', 'Carrete corto para válvula de control.', 'Rectificado CNC, Lapizado, Prueba de fugas'),
(36, 'Tapa de combustible', 72.00, 25, 7, 'Fleetguard', 'Cargador frontal', 'imagenes/TAPA DE COMBUSTIBLE.jpg', 'Tapa con llave y venteo.', 'Anti-sifón, Sellos de repuesto, UV resistente'),
(37, 'Cebedor manual', 95.00, 15, 7, 'Cummins', 'Motoniveladora', 'imagenes/CEBADOR MANUAL.jpg', 'Bomba de cebo para arranque en frío.', 'Palanca ergonómica, Manguera flexible, Diésel compatible')
ON CONFLICT (id) DO NOTHING;

-- Ajustar la secuencia de IDs de productos y categorias para los siguientes inserts
SELECT setval(pg_get_serial_sequence('categorias', 'id'), COALESCE(MAX(id), 1)) FROM categorias;
SELECT setval(pg_get_serial_sequence('productos', 'id'), COALESCE(MAX(id), 1)) FROM productos;
