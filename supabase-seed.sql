-- =========================================
-- EDUTECH WEBSITE - SEED DATA
-- Sample data for testing and development
-- =========================================

-- =========================================
-- INSTRUCTORS (Sample Data)
-- =========================================

INSERT INTO instructors (id, name_he, name_en, email, phone, title_he, title_en, bio_he, bio_en, specialties, experience_years, is_active, profile_image) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'רונית כהן',
  'Ronit Cohen',
  'ronit@edutech.co.il',
  '050-1234567',
  'מדריכת AI בכירה',
  'Senior AI Instructor',
  'רונית היא מהנדסת תוכנה עם 8 שנות ניסיון בפיתוח מערכות AI. היא בעלת תואר שני במדעי המחשב מהטכניון והתמחתה בלמידת מכונה. רונית מלמדת קורסי AI למבוגרים ובני נוער כבר 4 שנים ומתמחה ביכולתה להסביר מושגים מורכבים בצורה פשוטה ומעשית.',
  'Ronit is a software engineer with 8 years of experience in AI systems development. She holds an MSc in Computer Science from the Technion and specializes in machine learning. Ronit has been teaching AI courses for adults and teens for 4 years.',
  ARRAY['Python', 'Machine Learning', 'TensorFlow', 'ChatGPT'],
  8,
  true,
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
),
(
  '00000000-0000-0000-0000-000000000002',
  'דני לוי',
  'Danny Levy',
  'danny@edutech.co.il',
  '050-7654321',
  'מדריך תכנות לילדים',
  'Kids Programming Instructor',
  'דני הוא מדריך מנוסה בעל יכולת ייחודית לחבר ילדים לעולם התכנות. עם רקע בהנדסת תוכנה וחינוך, דני מתמחה ביצירת חוויות למידה מהנות ומעוררות השראה לילדים מגיל 6 ומעלה.',
  'Danny is an experienced instructor with a unique ability to connect children to the world of programming. With a background in software engineering and education, Danny specializes in creating fun and inspiring learning experiences.',
  ARRAY['Scratch', 'Python for Kids', 'Robotics', 'Game Development'],
  6,
  true,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
),
(
  '00000000-0000-0000-0000-000000000003',
  'מיכל אברהם',
  'Michal Abraham',
  'michal@edutech.co.il',
  '050-9876543',
  'מומחית פיתוח אפליקציות',
  'App Development Expert',
  'מיכל היא מפתחת Full-Stack עם התמחות בפיתוח אפליקציות מובייל ו-Web. היא מלמדת קורסים מקצועיים למבוגרים והדריכה מאות תלמידים במעבר קריירה לתחום ההייטק.',
  'Michal is a Full-Stack developer specializing in mobile and web app development. She teaches professional courses for adults and has guided hundreds of students in career transitions to high-tech.',
  ARRAY['React', 'React Native', 'Node.js', 'MongoDB'],
  10,
  true,
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
);

-- =========================================
-- ACTIVITIES (Sample Data)
-- =========================================

INSERT INTO activities (
  id, slug, title_he, title_en, description_he, description_en,
  track, type, duration_hours, session_count, location,
  is_online, is_onsite, difficulty_level,
  base_price, currency, is_available,
  max_participants, instructor_id, status, published_at,
  featured_image, technologies,
  learning_outcomes_he, content_he
) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'ai-fundamentals-adults',
  'יסודות בינה מלאכותית למבוגרים',
  'AI Fundamentals for Adults',
  'קורס מקיף המיועד למבוגרים המעוניינים להבין את עולם הבינה המלאכותית. נלמד על למידת מכונה, רשתות נוירונים, ו-ChatGPT.',
  'A comprehensive course for adults interested in understanding the world of AI. We will learn about machine learning, neural networks, and ChatGPT.',
  'ai',
  'course',
  24,
  8,
  'תל אביב - רחוב ההייטק 123',
  true,
  true,
  'beginner',
  2500.00,
  'ILS',
  true,
  15,
  '00000000-0000-0000-0000-000000000001',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  ARRAY['Python', 'TensorFlow', 'ChatGPT', 'Pandas'],
  ARRAY['הבנה מעמיקה של מושגי AI בסיסיים', 'יכולת לפתח מודלים פשוטים של ML', 'שימוש ב-ChatGPT API', 'ניתוח נתונים עם Python'],
  '# יסודות בינה מלאכותית למבוגרים

## על הקורס

קורס מקיף בן 8 מפגשים (24 שעות) המיועד למבוגרים המעוניינים להיכנס לעולם הבינה המלאכותית.

## מה נלמד?

### מודול 1: מבוא לבינה מלאכותית
- מהי בינה מלאכותית?
- תחומי שימוש ב-AI
- סוגי למידת מכונה

### מודול 2: Python לבינה מלאכותית
- יסודות Python
- עבודה עם Pandas ו-NumPy
- ויזואליזציה של נתונים

### מודול 3: למידת מכונה
- אלגוריתמים בסיסיים
- Training ו-Testing
- Evaluation Metrics

### מודול 4: רשתות נוירונים
- מבנה רשת נוירונים
- TensorFlow ו-Keras
- פרויקט מעשי

### מודול 5: עבודה עם ChatGPT
- OpenAI API
- Prompt Engineering
- בניית יאשימון צ''אט

## דרישות קדם
- ידע בסיסי במחשבים
- רצון ללמוד!

## מה תקבלו?
- 8 מפגשים בני 3 שעות
- חומרי לימוד מקיפים
- תעודת סיום
- תמיכה גם אחרי הקורס
'
),
(
  '10000000-0000-0000-0000-000000000002',
  'scratch-kids-summer-camp',
  'קייטנת Scratch לילדים - קיץ 2025',
  'Scratch Kids Summer Camp 2025',
  'קייטנה מהנה ומעשירה לילדים בגילאי 8-12. נלמד תכנות עם Scratch, נפתח משחקים ואנימציות מגניבות!',
  'A fun and enriching camp for children aged 8-12. We will learn programming with Scratch, develop cool games and animations!',
  'kids',
  'camp',
  40,
  10,
  'תל אביב - קמפוס EduTech',
  false,
  true,
  'beginner',
  1800.00,
  'ILS',
  true,
  20,
  '00000000-0000-0000-0000-000000000002',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  ARRAY['Scratch', 'Game Design', 'Animation'],
  ARRAY['יכולת לפתח משחקים פשוטים', 'הבנת מושגי תכנות בסיסיים', 'חשיבה לוגית ופתרון בעיות', 'עבודת צוות'],
  '# קייטנת Scratch לילדים - קיץ 2025

## על הקייטנה

קייטנה בת שבועיים מלאה בכיף, יצירתיות ולמידה! הילדים ילמדו תכנות דרך יצירת משחקים ואנימציות עם Scratch.

## מה נעשה בקייטנה?

- **יום 1-2:** היכרות עם Scratch - יצירת דמויות ורקעים
- **יום 3-4:** תנועה ואנימציה - נעניק חיים לדמויות שלנו
- **יום 5-6:** משחק ראשון - נבנה משחק Catch!
- **יום 7-8:** שיפור המשחק - נוסיף ניקוד ורמות
- **יום 9-10:** פרויקט אישי ומסיבת סיום!

## פרטים חשובים

- **גילאים:** 8-12
- **שעות:** 9:00-16:00 (כולל ארוחת צהריים)
- **מקסימום משתתפים:** 20 ילדים
- **כולל:** חומרים, אוכל, טריקו קייטנה

## תאריכים

- **מחזור א׳:** 1-12 ביולי 2025
- **מחזור ב׳:** 15-26 ביולי 2025
- **מחזור ג׳:** 29 ביולי - 9 באוגוסט 2025
'
),
(
  '10000000-0000-0000-0000-000000000003',
  'react-professional-bootcamp',
  'Bootcamp מקצועי - React ו-Node.js',
  'Professional Bootcamp - React & Node.js',
  'תוכנית הכשרה אינטנסיבית בת 12 שבועות למעבר קריירה להייטק. נלמד React, Node.js, MongoDB ונבנה פרויקטים אמיתיים.',
  'An intensive 12-week training program for career transition to high-tech. Learn React, Node.js, MongoDB and build real projects.',
  'pro',
  'course',
  144,
  36,
  'תל אביב + אונליין',
  true,
  true,
  'intermediate',
  18000.00,
  'ILS',
  true,
  12,
  '00000000-0000-0000-0000-000000000003',
  'published',
  NOW(),
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
  ARRAY['פיתוח אפליקציות Full-Stack מלאות', 'עבודה עם React ו-Hooks', 'בניית RESTful APIs', 'עבודה עם בסיסי נתונים', 'פריסה ל-Production'],
  '# Bootcamp מקצועי - React & Node.js

## תוכנית הכשרה מקצועית למעבר קריירה

Bootcamp אינטנסיבי בן 12 שבועות שיעניק לך את כל הכלים לעבוד כמפתח Full-Stack.

## מבנה התוכנית

### שבועות 1-4: Frontend עם React
- JavaScript מתקדם (ES6+)
- React יסודות ו-Hooks
- State Management עם Redux
- Styled Components & Tailwind

### שבועות 5-8: Backend עם Node.js
- Node.js ו-Express
- RESTful API Design
- MongoDB ו-Mongoose
- Authentication & Authorization

### שבועות 9-12: פרויקט מסכם
- תכנון ארכיטקטורה
- פיתוח פרויקט מלא
- Testing & Deployment
- הכנה לראיונות

## למי זה מתאים?

- בעלי ידע בסיסי בתכנות
- מעוניינים במעבר קריירה להייטק
- מחפשים הכשרה מעשית ואינטנסיבית

## מה כלול?

- 36 מפגשים (144 שעות)
- פרויקטים מעשיים
- ליווי אישי
- עזרה בחיפוש עבודה
- גישה לקהילת בוגרים
'
);

-- =========================================
-- BLOG POSTS (Sample Data)
-- =========================================

INSERT INTO blog_posts (
  slug, title_he, title_en, excerpt_he, excerpt_en,
  content_he, content_en, category, tags,
  author_id, featured_image, reading_time,
  status, published_at
) VALUES
(
  'ai-revolution-2025',
  'מהפכת הבינה המלאכותית ב-2025',
  'The AI Revolution in 2025',
  'כיצד בינה מלאכותית משנה את עולם העבודה והחינוך ב-2025? סקירה מקיפה של המגמות החמות ביותר.',
  'How is AI changing the world of work and education in 2025? A comprehensive overview of the hottest trends.',
  '# מהפכת הבינה המלאכותית ב-2025

## המגמות שמעצבות את העתיד

בשנת 2025 אנחנו עדים למהפכה אמיתית בתחום הבינה המלאכותית...

[התוכן המלא של המאמר]',
  '# The AI Revolution in 2025

## Trends Shaping the Future

In 2025, we are witnessing a real revolution in artificial intelligence...

[Full article content]',
  'ai-trends',
  ARRAY['AI', 'טכנולוגיה', 'עתיד'],
  '00000000-0000-0000-0000-000000000001',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  8,
  'published',
  NOW()
),
(
  'teach-kids-programming',
  '5 טיפים ללמד ילדים תכנות',
  '5 Tips for Teaching Kids Programming',
  'איך הופכים למידת תכנות למהנה ומעניינת עבור ילדים? הנה 5 טיפים מנוסים שעובדים.',
  'How to make learning programming fun and interesting for kids? Here are 5 proven tips that work.',
  '# 5 טיפים ללמד ילדים תכנות

## הפיכת למידה לחוויה מהנה

### 1. התחל עם משחקים

הדרך הטובה ביותר...

[התוכן המלא]',
  '# 5 Tips for Teaching Kids Programming

## Making Learning a Fun Experience

### 1. Start with Games

The best way...

[Full content]',
  'education',
  ARRAY['ילדים', 'תכנות', 'חינוך'],
  '00000000-0000-0000-0000-000000000002',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  6,
  'published',
  NOW()
);

-- =========================================
-- TESTIMONIALS (Sample Data)
-- =========================================

INSERT INTO testimonials (
  content_he, content_en, author_name, author_title, rating,
  is_featured, is_approved, display_order
) VALUES
(
  'הקורס שינה לי את הקריירה! תוך 3 חודשים מסיום הBootcamp מצאתי עבודה כמפתח Full-Stack. תודה ענקית לצוות EduTech!',
  'This course changed my career! Within 3 months of completing the Bootcamp, I found a job as a Full-Stack developer. Huge thanks to the EduTech team!',
  'יוסי כהן',
  'בוגר Bootcamp React',
  5,
  true,
  true,
  1
),
(
  'הילד שלי (בן 9) השתתף בקייטנת Scratch והתאהב בתכנות. עכשיו הוא מפתח משחקים בבית וכבר נרשם לקורס הבא!',
  'My son (9 years old) participated in the Scratch camp and fell in love with programming. Now he develops games at home and has already signed up for the next course!',
  'שרה לוי',
  'אמא לתלמיד',
  5,
  true,
  true,
  2
),
(
  'קורס AI המקיף והמעשי ביותר שעברתי. רונית מדריכה מעולה שמסבירה מושגים מורכבים בצורה פשוטה וברורה.',
  'The most comprehensive and practical AI course I have taken. Ronit is an excellent instructor who explains complex concepts in a simple and clear way.',
  'מיכל אברהם',
  'מהנדסת תוכנה',
  5,
  true,
  true,
  3
);

-- =========================================
-- JOBS (Sample Data)
-- =========================================

INSERT INTO jobs (
  slug, title_he, title_en, description_he, description_en,
  track, employment_type, location, is_remote,
  requirements_he, responsibilities_he,
  is_active
) VALUES
(
  'ai-instructor-2025',
  'מדריך/ת AI',
  'AI Instructor',
  'אנחנו מחפשים מדריך/ת AI מנוסה להצטרף לצוות שלנו ולהדריך קורסים מתקדמים.',
  'We are looking for an experienced AI instructor to join our team and teach advanced courses.',
  'ai',
  'part-time',
  'תל אביב',
  false,
  ARRAY['ניסיון בהוראה - יתרון', 'ידע עמוק ב-AI ו-Machine Learning', 'Python ברמה גבוהה', 'יכולת הסבר והדרכה'],
  ARRAY['הדרכת קורסי AI למבוגרים', 'פיתוח חומרי לימוד', 'ליווי תלמידים בפרויקטים'],
  true
),
(
  'kids-instructor-2025',
  'מדריך/ת תכנות לילדים',
  'Kids Programming Instructor',
  'מחפשים מדריך/ת אנרגטי/ת ויצירתי/ת ללמד ילדים תכנות.',
  'Looking for an energetic and creative instructor to teach children programming.',
  'kids',
  'part-time',
  'תל אביב',
  false,
  ARRAY['אהבה לילדים וסבלנות', 'ידע ב-Scratch ו/או Python', 'ניסיון בהוראה - יתרון'],
  ARRAY['הדרכת קורסים וקייטנות לילדים', 'יצירת אווירה מהנה ומעוררת השראה', 'תקשורת עם הורים'],
  true
);
