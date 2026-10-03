-- SAPTHA — Learn · Inspire · Together · Achieve
-- Seed Data for Supabase

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', 'Web', 'web', 'Full-stack web applications, frameworks, progressive web apps, and online services'),
    ('c0000000-0000-0000-0000-000000000002', 'Mobile', 'mobile', 'Native and cross-platform mobile experiences for iOS, Android, and tablets'),
    ('c0000000-0000-0000-0000-000000000003', 'AI/ML', 'ai-ml', 'Machine learning models, natural language processing, computer vision, and neural applications'),
    ('c0000000-0000-0000-0000-000000000004', 'Data', 'data', 'Data visualization, analytics pipelines, telemetry processing, and ETL infrastructure'),
    ('c0000000-0000-0000-0000-000000000005', 'Cybersecurity', 'cybersecurity', 'Defensive security utilities, vulnerability analyzers, cryptography, and network security'),
    ('c0000000-0000-0000-0000-000000000006', 'IoT', 'iot', 'Connected hardware, embedded firmware, sensor arrays, and microcontroller integrations'),
    ('c0000000-0000-0000-0000-000000000007', 'Design', 'design', 'Design systems, UI kits, interactive typography, generative art, and spatial canvases'),
    ('c0000000-0000-0000-0000-000000000008', 'Other', 'other', 'Developer tooling, CLI utilities, libraries, and multidisciplinary innovations')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Seed Projects (Sample Demo Projects with real showcase content)
INSERT INTO public.projects (
    id,
    title,
    slug,
    description,
    image_url,
    image_path,
    project_url,
    github_url,
    category_id,
    creator_name,
    technologies,
    status,
    featured,
    views
)
VALUES
    (
        'p0000000-0000-0000-0000-000000000001',
        'Smart Campus Companion',
        'smart-campus-companion',
        'A comprehensive university campus dashboard featuring interactive venue mapping, real-time shuttle transit tracking, library study-pod availability, and student guild schedules.',
        '/src/assets/images/project_smart_campus_1790956583139.jpg',
        'project_smart_campus_1790956583139.jpg',
        'https://smart-campus-companion.example.com',
        'https://github.com/saptha-showcase/smart-campus-companion',
        'c0000000-0000-0000-0000-000000000001',
        'Arjun Sharma',
        ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Mapbox GL'],
        'published',
        true,
        342
    ),
    (
        'p0000000-0000-0000-0000-000000000002',
        'AI Study Assistant',
        'ai-study-assistant',
        'An intelligent research synthesis environment that indexes lecture recordings, transforms research papers into structured concept maps, and creates active-recall quiz decks.',
        '/src/assets/images/project_ai_study_1790956595313.jpg',
        'project_ai_study_1790956595313.jpg',
        'https://aistudy.example.com',
        'https://github.com/saptha-showcase/ai-study-assistant',
        'c0000000-0000-0000-0000-000000000003',
        'Elena Rostova',
        ARRAY['React', 'FastAPI', 'Python', 'Vector DB', 'PyTorch'],
        'published',
        true,
        518
    ),
    (
        'p0000000-0000-0000-0000-000000000003',
        'AgroFlow AI',
        'agroflow-ai',
        'Satellite and ground-sensor precision agriculture platform predicting microclimate pest risks, soil moisture depletion rates, and optimal irrigation cycles.',
        '/src/assets/images/project_agroflow_ai_1790956608752.jpg',
        'project_agroflow_ai_1790956608752.jpg',
        'https://agroflow-ai.example.com',
        'https://github.com/saptha-showcase/agroflow-ai',
        'c0000000-0000-0000-0000-000000000003',
        'Kofi Mensah',
        ARRAY['TypeScript', 'TensorFlow', 'IoT Telemetry', 'Next.js', 'GeoJSON'],
        'published',
        true,
        289
    ),
    (
        'p0000000-0000-0000-0000-000000000004',
        'Cybersecurity Voice Detection',
        'cybersecurity-voice-detection',
        'Real-time neural audio spectrogram analyzer detecting synthetic deepfake speech artifacts, spoofed vocal synthesis, and telephony fraud vectors.',
        '/src/assets/images/project_cyber_voice_1790956622340.jpg',
        'project_cyber_voice_1790956622340.jpg',
        'https://cyber-voice.example.com',
        'https://github.com/saptha-showcase/cyber-voice-detector',
        'c0000000-0000-0000-0000-000000000005',
        'Marcus Vance',
        ARRAY['Rust', 'WebAssembly', 'Audio Worklet', 'React', 'Tailwind'],
        'published',
        false,
        194
    ),
    (
        'p0000000-0000-0000-0000-000000000005',
        'Developer Portfolio',
        'developer-portfolio',
        'Minimalist editorial software engineer portfolio featuring interactive WebGL shader canvases, typographic hierarchy, open-source metrics, and case studies.',
        '/src/assets/images/project_dev_portfolio_1790956635628.jpg',
        'project_dev_portfolio_1790956635628.jpg',
        'https://portfolio.saptha.example.com',
        'https://github.com/saptha-showcase/minimal-dev-portfolio',
        'c0000000-0000-0000-0000-000000000001',
        'Siddharth Patel',
        ARRAY['React', 'Three.js', 'Tailwind CSS', 'Vite', 'Motion'],
        'published',
        false,
        412
    ),
    (
        'p0000000-0000-0000-0000-000000000006',
        'Campus Lost & Found',
        'campus-lost-and-found',
        'Community-driven campus lost and found service with verified student ID claims, secure message relays, photo matching, and pickup lockers.',
        '/src/assets/images/project_smart_campus_1790956583139.jpg',
        'project_smart_campus_1790956583139.jpg',
        'https://lostfound.campus.example.com',
        'https://github.com/saptha-showcase/campus-lost-found',
        'c0000000-0000-0000-0000-000000000001',
        'Priya Nair',
        ARRAY['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Supabase Auth'],
        'published',
        false,
        175
    )
ON CONFLICT (slug) DO UPDATE
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    category_id = EXCLUDED.category_id,
    creator_name = EXCLUDED.creator_name,
    technologies = EXCLUDED.technologies,
    project_url = EXCLUDED.project_url;
