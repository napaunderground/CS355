use someDatabase;

drop table if exists GlobalRequests;
drop table if exists Customers;
drop table if exists GlobalInventory;
drop table if exists Product;
drop table if exists Dealers;
drop table if exists Stores;
drop table if exists City;


create table City (CID INT primary key auto_increment, Town varchar(255) unique);



create table Product (PID INT primary key auto_increment, ProductDesc varchar(255) unique);

create table Stores (SID INT primary key auto_increment, StoreName varchar(255) unique,
					 LocationID INT, Address varchar(255), Contact varchar(255), 
                     ContactPhone varchar(255) unique, foreign key (LocationID) 
                     references City (CID) ON DELETE CASCADE ON UPDATE CASCADE);
                     
                   
                     
                     
create table Dealers (DID INT primary key auto_increment, DealerName varchar(255) unique, 
					  DealerEmail varchar(255) unique, DealerStoreID INT, 
                      foreign key (DealerStoreID) references Stores (SID)
                      ON DELETE CASCADE ON UPDATE CASCADE);




create table GlobalInventory (IID INT primary key auto_increment, DealerID INT, StoreID INT, 
							  ProductDescriptionID INT,
                              foreign key (DealerID) references
						      Dealers (DID) ON DELETE CASCADE ON UPDATE CASCADE,
                              foreign key (StoreID) references Stores (SID), 
							  foreign key (ProductDescriptionID) references Product (PID) 
                              ON DELETE CASCADE ON UPDATE CASCADE,
                              CONSTRAINT who_where_what 
                              unique (DealerID, StoreID, ProductDescriptionID));
                        

create table Customers (CUID INT primary key auto_increment, CustName varchar(255), 
						Email varchar(255), CONSTRAINT id_Email unique (CUID, Email));
                        
                        
create table GlobalRequests (RID INT primary key auto_increment, CustLookingForID INT,
							 Product varchar(255) unique, foreign key(CustLookingForID)
                             references Customers (CUID) ON DELETE CASCADE ON UPDATE CASCADE);
 
					
                        

                              
insert into City (Town) values ('Petaluma');       
insert into City (Town) values ('Sonoma');
insert into City (Town) values ('Rhonert Park');
insert into City (Town) values ('Freestone');
insert into City (Town) values ('Elk');
insert into City (Town) values ('Annapolis');                              
insert into City (Town) values ('Santa Rosa');
insert into City (Town) values ('Healdsburg');
insert into City (Town) values ('Geyserville');

insert into Product (ProductDesc) values ('chair');
insert into Product (ProductDesc) values ('table');
insert into Product (ProductDesc) values ('coffee cup');
insert into Product (ProductDesc) values ('josef');
insert into Product (ProductDesc) values ('edison phonograph');
insert into Product (ProductDesc) values ('clear stapler');
insert into Product (ProductDesc) values ('JFK newspaper');
insert into Product (ProductDesc) values ('Elvis outfit');
insert into Product (ProductDesc) values ('Commedore 8');
insert into Product (ProductDesc) values ('fireplace screen');
insert into Product (ProductDesc) values ('keep calm and carry on print');
insert into Product (ProductDesc) values ('train set');


insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Hens Pick', '123 Main St', 1,
                    'George Smith', '123-456-6789');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Bens Pick', '123 Main St', 2,
                    'Mira Otis', '123-321-6789');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Ceramics Emporium', '345 Last Ct.', 3, 
                    'Mike James', '345-234-4675');
insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Railroad Square Antiques', '123 Second St', 3,
                    'Paul Johnson', '123-456-3219');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Basement Antiques', '555 Main St', 2,
                    'Nat Cole', '123-454-6789');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Memories', '999 Mast Ct.', 1, 
                    'George Smith', '654-234-4675');
insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Things Remembered', '123 Jefferson St', 4,
                    'Hap Winston', '823-456-6789');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Otis Place Collective', '10 Main St', 5,
                    'Mira Otis', '123-454-6489');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Antique Trove', '345 Back st.', 6, 
                    'Jim Takahashi', '345-852-4695');
insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Recycled Things', '1211 Main St', 6,
                    'Lewis Carroll', '123-456-6719');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Clutter Heaven', '123 1st st', 7,
                    'Alice Potter', '123-454-6780');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Patina', '445 River Rd.', 7, 
                    'Alice Potter', '345-234-4677');
insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('All Old Prints', '123 Grain St', 7,
                    'Alice Potter', '123-456-6769');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Antique Art', '123 Main St', 9,
                    'John Johnson', '123-459-6789');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Visit The Past Antiques', '74 Mast Ct.', 9, 
                    'John Johnson', '345-234-6475');
insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('New Life ANtiques', '173 Main St', 8,
                    'M. A. D-Hatter', '123-496-6789');

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
					values ('Nates Old Junk', '323 Main St', 4,
                    'Luisa Park', '193-454-6789');                    

insert into Stores (StoreName, Address, LocationID, Contact, ContactPhone) 
				    values ('Technology Antiquity Emporium', '345 Mast Ct.', 6, 
                    'Bill Miller', '385-789-4675');


insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('George Smith', 'gs@email.com', 1);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Paul Johnson', 'pj@email.com', 1);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Mira Otis', 'mo@email.com', 2);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Paaul Johnson', 'pj1@email.com', 3);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Moira Otis', 'mo1@email.com', 5);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Bob Smyth', 'bs@email.com', 7);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('John Johnson', 'jj@email.com', 9);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Bill Miller', 'bm@email.com', 6);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Hap Winston', 'hw@email.com', 4);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Jan Guerrero', 'jg@email.com', 1);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Luisa Park', 'lp@email.com', 4);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Nat Cole', 'nc@email.com', 2);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Paula Abdo', 'pa@email,com', 1);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Jim Takahashi', 'jt@email,com', 6);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Lewis Carroll', 'lc@email,com', 6);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('Alice Potter', 'ap@email,com', 7);
insert into Dealers (DealerName, DealerEmail, DealerStoreID) values ('M. A. D-Hatter', 'mad@email.com', 8);







insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (1, 1, 1);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (2, 1, 2);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (3, 2, 3);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (4, 2, 4);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (5, 3, 5);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (3, 2, 6);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (4, 2, 7);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (8, 9, 8);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (9, 6, 9);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (11, 1, 10);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (12, 4, 11);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (5, 3, 12);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (6, 5, 12);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (4, 2, 10);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (2, 1, 5);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (7, 7, 7);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (9, 6, 2);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (11, 1, 5);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (10, 4, 4);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (14, 1, 7);
insert into GlobalInventory (DealerID, StoreID, ProductDescriptionID) values (5, 3, 11);



                        
insert into Customers (CustName, Email) values
							  ('George Jones', 'noshow@country.com');
insert into Customers (CustName, Email) values
							  ('Willie Nelson', 'oldschool@country.com');
insert into Customers (CustName, Email) values
							  ('Bob Thornton', 'bt@email.com');
insert into Customers (CustName, Email) values
							  ('Gina DeWitt', 'gdw@email.com');
insert into Customers (CustName, Email) values
							  ('Rachel Ashwell', 'shabbychica@email.com');
insert into Customers (CustName, Email) values
							  ('Williamina Frost', 'wf@email.com');
insert into Customers (CustName, Email) values
							  ('Helen Smith', 'hs@email.com');
        
        
insert into GlobalRequests (CustLookingForID, Product) values (1, 'steel guitar');
insert into GlobalRequests (CustLookingForID, Product) values (3, 'boots');
insert into GlobalRequests (CustLookingForID, Product) values (1, 'chair');
insert into GlobalRequests (CustLookingForID, Product) values (6, 'table');
insert into GlobalRequests (CustLookingForID, Product) values (7, 'coffee cup');
insert into GlobalRequests (CustLookingForID, Product) values (4, 'JFK newspaper');
insert into GlobalRequests (CustLookingForID, Product) values (2, 'book');
insert into GlobalRequests (CustLookingForID, Product) values (7, 'josef');
insert into GlobalRequests (CustLookingForID, Product) values (3, 'fishing pole');
insert into GlobalRequests (CustLookingForID, Product) values (1, 'pool cue');
