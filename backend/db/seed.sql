-- Przykładowe przepisy (parytet z frontend/mocks/recipes.json)
-- Uruchom po schema.sql: psql -d blog_kulinarny -f backend/db/seed.sql
-- category_id wyznaczamy po category_key, więc nie zależymy od kolejności id.

INSERT INTO recipes (title, image_url, category_id, cooking_time_minutes, servings, ingredients, steps, created_at) VALUES
('Sernik wiedeński', 'http://localhost:3001/uploads/sernik.png',
 (SELECT id FROM categories WHERE category_key = 'desery'), 90, 12,
 ARRAY['twaróg sernikowy 1 kg','cukier 200 g','jajka 6 szt.','masło 100 g','cukier waniliowy 2 łyżki'],
 ARRAY['Oddziel białka od żółtek i ubij białka na sztywno.','Utrzyj masło z cukrem i żółtkami, dodaj twaróg.','Delikatnie wmieszaj ubite białka.','Przelej masę do formy i piecz 60 minut w 170°C.'],
 '2026-05-12'),

('Pomidorowa z ryżem', 'http://localhost:3001/uploads/pomidorowa.png',
 (SELECT id FROM categories WHERE category_key = 'zupy'), 40, 4,
 ARRAY['passata pomidorowa 500 ml','bulion warzywny 1 l','ryż 100 g','śmietana 18% 100 ml','sól i pieprz do smaku'],
 ARRAY['Zagotuj bulion i ugotuj w nim ryż.','Dodaj passatę i zagotuj całość.','Zahartuj śmietanę i wmieszaj do zupy.','Dopraw solą i pieprzem.'],
 '2026-05-20'),

('Spaghetti bolognese', 'http://localhost:3001/uploads/spaghetti.png',
 (SELECT id FROM categories WHERE category_key = 'dania-obiadowe'), 50, 4,
 ARRAY['makaron spaghetti 400 g','mięso mielone wołowe 500 g','passata pomidorowa 500 ml','cebula 1 szt.','czosnek 2 ząbki','oliwa, sól, pieprz, oregano'],
 ARRAY['Podsmaż cebulę i czosnek na oliwie.','Dodaj mięso i smaż do zrumienienia.','Wlej passatę, dopraw i duś 25 minut.','Ugotuj makaron al dente i podawaj z sosem.'],
 '2026-05-28'),

('Jajecznica na maśle', 'http://localhost:3001/uploads/jajecznica.png',
 (SELECT id FROM categories WHERE category_key = 'sniadania'), 10, 2,
 ARRAY['jajka 4 szt.','masło 20 g','szczypiorek 1 łyżka','sól i pieprz do smaku'],
 ARRAY['Rozgrzej masło na patelni.','Wbij jajka i mieszaj na małym ogniu.','Dopraw solą i pieprzem, posyp szczypiorkiem.'],
 '2026-05-29'),

('Brownie czekoladowe', 'http://localhost:3001/uploads/brownie.png',
 (SELECT id FROM categories WHERE category_key = 'desery'), 45, 9,
 ARRAY['czekolada gorzka 200 g','masło 150 g','cukier 180 g','jajka 3 szt.','mąka pszenna 100 g'],
 ARRAY['Rozpuść czekoladę z masłem w kąpieli wodnej.','Wymieszaj z cukrem i jajkami.','Dodaj mąkę i połącz składniki.','Piecz 30 minut w 180°C.'],
 '2026-04-30'),

('Żurek staropolski', 'http://localhost:3001/uploads/zurek.png',
 (SELECT id FROM categories WHERE category_key = 'zupy'), 75, 6,
 ARRAY['zakwas na żurek 500 ml','biała kiełbasa 400 g','bulion 1,5 l','ziemniaki 4 szt.','jajka 3 szt.','majeranek, czosnek, sól, pieprz'],
 ARRAY['Ugotuj kiełbasę i ziemniaki w bulionie.','Wlej zakwas i zagotuj, mieszając.','Dopraw majerankiem, czosnkiem, solą i pieprzem.','Podawaj z połówką jajka.'],
 '2026-05-05'),

('Kotlet schabowy z ziemniakami', 'http://localhost:3001/uploads/schabowy.png',
 (SELECT id FROM categories WHERE category_key = 'dania-obiadowe'), 60, 4,
 ARRAY['schab 4 plastry','jajka 2 szt.','bułka tarta 150 g','mąka pszenna 100 g','ziemniaki 1 kg','olej, sól, pieprz'],
 ARRAY['Rozbij i dopraw plastry schabu.','Panieruj w mące, jajku i bułce tartej.','Smaż na rozgrzanym oleju z obu stron.','Podawaj z gotowanymi ziemniakami.'],
 '2026-05-15'),

('Owsianka z owocami', 'http://localhost:3001/uploads/owsianka.png',
 (SELECT id FROM categories WHERE category_key = 'sniadania'), 15, 1,
 ARRAY['płatki owsiane 50 g','mleko 250 ml','banan 1 szt.','borówki garść','miód 1 łyżka'],
 ARRAY['Zagotuj mleko i wsyp płatki owsiane.','Gotuj na małym ogniu około 5 minut.','Przełóż do miski, dodaj owoce i miód.'],
 '2026-05-25');

-- Konto administratora aplikacji (login: admin, hasło: zaq1@WSX — bcrypt, cost 10)
INSERT INTO users (username, password_hash) VALUES
  ('admin', '$2b$10$W.NS23OOeWpwTqzCqZZEqOl5FvK25GLwbt19JDcexboYYW1x4pPc.');
