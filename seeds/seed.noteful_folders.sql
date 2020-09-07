BEGIN;
INSERT INTO folders (id, name) 
VALUES 
  (10000, 'Daily notes'),
  (20000, 'Weekly notes'),
  (30000, 'Monthly notes');

COMMIT;
