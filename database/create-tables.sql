create table if not exists form.person (
	person_id serial primary key,
	case_number varchar(10) unique not null,
	organization varchar(50),
	email varchar(50),
	race varchar(20),
	age int,
	income int,
	credit_score int
);

create table if not exists form.application (
	application_id serial primary key,
	person_id int,
	application_date date,
	street varchar(50),
	unit varchar(50),
	city varchar(50),
	state varchar(15),
	zipcode varchar(5),
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
	additional_details text
);

create table if not exists form.eviction (
	eviction_id serial primary key,
	person_id int,
	eviction_date date,
	reason varchar(50)
);

create table if not exists form.criminal_history (
	eviction_id serial primary key,
	person_id int,
	type varchar(50),
	conviction_date date,
	offense varchar(50)
);
