-- UNCOMMENT ONLY FOR DEBUGGING BEFORE SITE GOES LIVE
-- DELETE BEFORE SITE GOES LIVE TO PREVENT RISK OF DATA LOSS
-- drop table if exists form.application;
-- drop table if exists form.eviction;
-- drop table if exists form.criminal_history;
-- drop table if exists form.person;

create table if not exists form.person (
	person_id serial primary key,
	organization varchar(50),
	email varchar(50),
	user_type varchar(50),
	race varchar(50),
	ethnicity varchar(50),
	age int,
	income int,
	credit_score int,
	rental_debt int
);

create table if not exists form.application (
	application_id serial primary key,
	person_id int,
	application_date date,
	street varchar(50),
	unit varchar(50),
	city varchar(50),
	"state" varchar(15),
	zipcode int constraint zip_five_digits check (zipcode > 999 and zipcode < 100000),
	rent int,
	property_manager varchar(50),
	screening_company varchar(50),
	fee int,
	fee_type varchar(3),
	application_method varchar(50),
	assessment_outcome varchar(10),
	assessment_details text,
	denial_reason varchar(50),
	denial_details text,
	alternate_denial_notes text,
	additional_details text,
	constraint application_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);

create table if not exists form.eviction (
	eviction_id serial primary key,
	person_id int,
	eviction_date date,
	reason varchar(50),
	constraint eviction_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);

create table if not exists form.criminal_history (
	criminal_history_id serial primary key,
	person_id int,
	"type" varchar(50),
	conviction_date date,
	offense varchar(50),
	constraint criminal_history_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);
