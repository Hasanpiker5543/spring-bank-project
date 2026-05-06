INSERT INTO client (id, username, phone) VALUES (1, 'toufik', '0600000001');
INSERT INTO client (id, username, phone) VALUES (2, 'mehdi', '0600000002');
INSERT INTO client (id, username, phone) VALUES (3, 'admin-demo', '0600000003');

INSERT INTO app_user (id, username, password, role, client_id) VALUES (1, 'admin', 'admin123', 'ADMIN', 3);
INSERT INTO app_user (id, username, password, role, client_id) VALUES (2, 'toufik', '123456', 'CLIENT', 1);
INSERT INTO app_user (id, username, password, role, client_id) VALUES (3, 'mehdi', '123456', 'CLIENT', 2);

INSERT INTO account (id, account_number, balance, client_id) VALUES (1, 'ACC-TOUFIK-001', 5000.00, 1);
INSERT INTO account (id, account_number, balance, client_id) VALUES (2, 'ACC-MEHDI-001', 2600.00, 2);
INSERT INTO account (id, account_number, balance, client_id) VALUES (3, 'ACC-ADMIN-001', 10000.00, 3);

INSERT INTO transaction (id, type, amount, date, account_id) VALUES (1, 'CREDIT', 5000.00, CURRENT_TIMESTAMP, 1);
INSERT INTO transaction (id, type, amount, date, account_id) VALUES (2, 'CREDIT', 2600.00, CURRENT_TIMESTAMP, 2);
INSERT INTO transaction (id, type, amount, date, account_id) VALUES (3, 'CREDIT', 10000.00, CURRENT_TIMESTAMP, 3);

ALTER TABLE client ALTER COLUMN id RESTART WITH 4;
ALTER TABLE account ALTER COLUMN id RESTART WITH 4;
ALTER TABLE transaction ALTER COLUMN id RESTART WITH 4;
ALTER TABLE app_user ALTER COLUMN id RESTART WITH 4;
