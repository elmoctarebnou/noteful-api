BEGIN;
INSERT INTO notes (name, content, folder_id)
VALUES
  ('workout', 'try to workout every day for at least 20 minutes', 10000),
  ('Streching', 'stand of the chair and stretch for 5 minutes every hour', 10000),
  ('visit parent', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor.', 20000),
  ('go to gym', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper.', 20000),
  ('read a book', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur.', 30000),
  ('pay bills', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan.', 30000);
COMMIT;