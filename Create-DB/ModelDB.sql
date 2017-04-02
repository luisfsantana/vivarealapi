CREATE TABLE Provinces(
	ProvinceID int not null,
	Name varchar(200),
	xL integer,
	yL integer,
	xR integer,
	yR integer,
	PRIMARY key (ProvinceID)
)

CREATE TABLE Properties(
	PropertyID int not null,
	Title varchar(255),
	Price INTEGER,
	Description varchar(255),
	x integer,
	y integer,
	Beds integer,
	Baths integer,	
	SquareMeter integer,
	PRIMARY Key (PropertyID)
)

CREATE TABLE Maps(
	MapsID int not null,
	x integer,
	y integer,
	ProvincesNames varchar(255),
	PRIMARY KEY (MapsID),
	PropertyID int,
	FOREIGN KEY (PropertyID) REFERENCES vivarealdb.Properties(PropertyID)
)

#Criar registro no banco
INSERT INTO Properties (PropertyID, Title, Price, Description, x, y, Beds, Baths, SquareMeter)
VALUES (1, 'Titulo Casa do Luis', 25000, '', 200, 300, 2, 2, 100)


INSERT INTO Properties (PropertyID, Title, Price, Description, x, y, Beds, Baths, SquareMeter)
VALUES (1, 'Titulo Casa do Luis', 25000, '', 200, 300, 2, 2, 100)


Insert into Maps (MapsID, x, y, ProvincesNames, PropertyID)
VALUES (1, 200, 300, 'Groovy', 1)


Insert into Provinces (ProvinceID, Name, xL, yL, xR, yR)
VALUES (1, 'Maua', 100, 400, 400, 100)


SELECT P.*, M.ProvincesNames from Properties as P inner join Maps as M ON P.PropertyID = M.PropertyID AND P.PropertyID = '1'


SELECT * from Maps
SELECT * from Provinces
SELECT * from Properties




select 1+1 

