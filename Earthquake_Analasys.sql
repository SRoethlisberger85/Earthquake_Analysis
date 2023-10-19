CREATE TABLE suicide_data (
    Location VARCHAR(255),      
    PeriodType VARCHAR(255),   
    Period INT,              
    IsLatestYear BIT,        
    Dim1Type VARCHAR(255)      
);

CREATE TABLE EarthquakeData (
    Time TIMESTAMP,          
    Place VARCHAR(255),      
    Magnitude DECIMAL(5,2),  
    Type VARCHAR(50),        
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