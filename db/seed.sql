USE employees;


insert into department(name)

values ('Engineer'),
        ('HR'),
        ('Accountant');

insert into role(
    title,
    salary,
    department_id
)
values('Software engineer', 80000, 1),
       ('HR Rep', 70000, 2),
       ( 'Accounting transactions', 90000, 3);

insert into employees(
    first_name,
    last_name,
    role_id,
    manager_id
)

values('John','James',1,null),
      ('Mike','Smith',2,null),
      ('Chris','Doe',3,null);

