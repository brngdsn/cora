revoke all privileges on DATABASE cora from cora_user;
revoke all privileges on all tables in schema public from cora_user;
revoke all privileges on all sequences in schema public from cora_user;
drop owned by cora_user cascade;

drop database if exists cora;
drop user if exists cora_user;

create database cora;

\connect cora;

drop table if exists messages;

CREATE EXTENSION vector;

create user cora_user with encrypted password 'cora';
grant all privileges on database cora to cora_user;
grant all privileges on all tables in schema public to cora_user;
grant usage, select on all sequences in schema public to cora_user;

CREATE TABLE messages (
  mid SERIAL PRIMARY KEY not null,
  mconversationid TEXT unique not null,
  membedding VECTOR(1536) not null,
  mcontent TEXT not null,
  mrole TEXT not null,
  mchunkindex INTEGER not null,
  moriginalmessageid INTEGER not null
);

grant all privileges on all tables in schema public to cora_user;
grant usage, select on all sequences in schema public to cora_user;
