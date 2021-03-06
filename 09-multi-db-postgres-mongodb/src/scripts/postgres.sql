DROP TABLE IF EXISTS HEROES;

CREATE TABLE HEROES (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  name text not null,
  power text not null
);

INSERT INTO HEROES (NAME, POWER) VALUES ('Batman', 'Money');
INSERT INTO HEROES (NAME, POWER) VALUES ('Flash', 'Speed');

SELECT * FROM HEROES;
SELECT * FROM HEROES WHERE NAME = 'Flash';

UPDATE HEROES SET NAME = 'Goku', POWER = 'God' WHERE ID = 1;

DELETE FROM HEROES WHERE ID = 3;
