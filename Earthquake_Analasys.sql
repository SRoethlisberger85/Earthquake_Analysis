CREATE TABLE suicide_data (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Location VARCHAR(255),
    Year INT,
    Mag DECIMAL(5,2),
    SuicideRatePer100k DECIMAL(5,2)
);

CREATE TABLE EarthquakeData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Time TIMESTAMP,
    LocationName VARCHAR(255),
    Country VARCHAR(255),
    Magnitude DECIMAL(5,2),
    Deaths INT,
    Injuries INT,
    Damage DECIMAL(5,2),
    Year INT,
    Geometry GEOMETRY
);

CREATE TABLE GDPData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Location VARCHAR(255),
    Year INT,
    Value DECIMAL(15, 2)
);

CREATE TABLE MasterLocationYear (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Location VARCHAR(255),
    Year INT
);

ALTER TABLE suicide_data
ADD COLUMN LocationYearID INT,
ADD FOREIGN KEY (LocationYearID) REFERENCES MasterLocationYear(ID);

ALTER TABLE EarthquakeData
ADD COLUMN LocationYearID INT,
ADD FOREIGN KEY (LocationYearID) REFERENCES MasterLocationYear(ID);

ALTER TABLE GDPData
ADD COLUMN LocationYearID INT,
ADD FOREIGN KEY (LocationYearID) REFERENCES MasterLocationYear(ID);
