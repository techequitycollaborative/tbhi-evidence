-- UNCOMMENT ONLY FOR DEBUGGING BEFORE SITE GOES LIVE
-- DELETE BEFORE SITE GOES LIVE TO PREVENT RISK OF DATA LOSS
-- drop table if exists form.application;
-- drop table if exists form.eviction_history;
-- drop table if exists form.criminal_history;
-- drop table if exists form.person;

create table if not exists form.person (
	person_id serial primary key,
	organization text,
	email text,
	user_type text,
	share_consent text,
	race text,
	ethnicity text,
	age int,
	income int,
	credit_score text,
	rental_debt text
);

create table if not exists form.application (
	application_id serial primary key,
	person_id int,
	form_submission_date timestamptz,
	street text,
	unit text,
	city text,
	"state" text,
	zipcode text,
	rent int,
	property_manager text,
	screening_company text,
	application_date date,
	fee int,
	fee_type text,
	application_method text,
	portal_name text,
	housing_voucher text,
	income_certification text,
	assessment_outcome text,
	assessment_details text,
	denial_reason text,
	denial_details text,
	alternate_denial_notes text,
	additional_details text,
	constraint application_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);

create table if not exists form.eviction_history (
	eviction_history_id serial primary key,
	person_id int,
	question text,
	answer boolean,
	constraint eviction_history_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);

create table if not exists form.criminal_history (
	criminal_history_id serial primary key,
	person_id int,
	question text,
	answer boolean,
	constraint criminal_history_fk_person_id foreign key (person_id) references form.person(person_id) on delete cascade
);