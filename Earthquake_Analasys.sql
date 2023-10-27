CREATE TABLE suicide_data (
    Location VARCHAR(255),      
    PeriodType VARCHAR(255),   
    Period INT,              
    IsLatestYear BIT,        
    Dim1Type VARCHAR(255)      
);

CREATE TABLE EarthquakeData (
    Time TIMESTAMP,          
    Location Name VARCHAR(255)
    Country VARCHAR(255),      
    Magnitude DECIMAL(5,2),  
    Deaths INT,
    Injuries INT,
    Damage DECIMAL(5,2),
    Year INT        
    Geometry GEOMETRY        
);

CREATE TABLE GDPData (
    Country VARCHAR(255),
    Year INT,                  
    GDP DECIMAL(15, 2),        
    GDPPctChange DECIMAL(5, 2) 
);

ALTER TABLE suicide_data
ADD Year INT;

ALTER TABLE suicide_data
ADD CONSTRAINT FK_Earthquake_Year
FOREIGN KEY (Year)
REFERENCES EarthquakeData (Year);

ALTER TABLE suicide_data
ADD CONSTRAINT FK_GDP_Year
FOREIGN KEY (Year)
REFERENCES GDPData (Year);