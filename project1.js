
var expresss    = require('express'),
    mysql      = require('mysql');
var express    = require('express'),
    mysql      = require('mysql');


connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'someUser',
    password : 'numbers'
});

var app = module.exports = express.createServer();


connection.query('USE nseiger', function (err) {
    if (err) throw err;
});


app.use(express.bodyParser());


var htmlHeader = '<html><head><title>Sonoma Antiques Sales Assistant</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

function buildCustomerView(result) {

    var responseHTML = htmlHeader + '<h1>Result of Customer Input</h1>';

    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Customer Name: ' + result[i].CustName + '</li>'
                     + '<li>Customer Email: ' + result[i].Email + '</li>'
                     + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildDealerView(result)
{
	var responseHTML = htmlHeader + '<h1>Result of Dealer Input</h1>';

	for(var i = 0; i < result.length; i++)
	{
		responseHTML += '<ul><li>Dealer Name: ' + result[i].DealerName + '</li>'
			      + '<li>Dealer Email: ' + result[i].DealerEmail + '</li>'
			      + '<li>Store the Dealer was added to: ' + result[i].StoreName
			       + '</li></ul>'
	}
	responseHTML += htmlFooter;
	
	return responseHTML;
}



function buildStoreView(result)
{
        var responseHTML = htmlHeader + '<h1>Result of Store Input</h1>';

        for(var i = 0; i < result.length; i++)
        {
                responseHTML += '<ul><li>Store Name: ' + result[i].StoreName + '</li>'
                              + '<li>Store Location: ' + result[i].Town + '</li>'
                              + '<li>Store Address: ' + result[i].Address + '</li>'
                              + '<li>Store Contact: ' + result[i].Contact + '</li>'
                              + '<li>Phone #: ' + result[i].ContactPhone + '</li></ul>'
        }
        responseHTML += htmlFooter;

        return responseHTML;
}



function buildProductView(result)
{
        var responseHTML = htmlHeader + '<h1>Result of Product Input</h1>';

        for(var i = 0; i < result.length; i++)
        {
                responseHTML += '<ul><li>Product ID: ' + result[i].PID + '</li>'
                              + '<li>Product Description: ' + result[i].ProductDesc + '</li>'
                               + '</li></ul>'
        }
        responseHTML += htmlFooter;

        return responseHTML;
}



function buildCityView(result)
{
        var responseHTML = htmlHeader + '<h1>Result of City Input</h1>';

        for(var i = 0; i < result.length; i++)
        {
                responseHTML += '<ul><li>City ID: ' + result[i].CID + '</li>'
                              + '<li>City Name: ' + result[i].Town + '</li>'
                              + '</li></ul>'
        }
        responseHTML += htmlFooter;

        return responseHTML;
}

function buildGlobalInventoryView(result)
{
        var responseHTML = htmlHeader + '<h1>Result of Inventory Input</h1>';

        for(var i = 0; i < result.length; i++)
        {
                responseHTML += '<ul><li>Inventory Control Number: ' + result[i].IID + '</li>'
                              + '<li>Dealer Number: ' + result[i].DealerName + '</li>'
                              + '<li>Store ID where the item is located: ' + result[i].StoreName + '</li>'
                              + '<li>Product Description ID: ' + result[i].ProductDesc + '</li>'
			      + '</li></ul>'
        }
        responseHTML += htmlFooter;

        return responseHTML;
}


function buildCustomerRequestView(result)
{
	var responseHTML = htmlHeader + '<h1>Result of Inventory Request Input</h1>';
    
	for(var i  = 0; i < result.length; i++)
	{
		responseHTML += '<li>Customer Name that wants Item: ' + result[i].CustName + '</li>'
                     + '<li>Customer Email that wants Item: ' + result[i].Email + '</li>'
                     + '<li>Item Customer is looking for: ' + result[i].ProductDesc + '</li>'
                     + '<li>Dealer Name that has Item: ' + result[i].DealerName + '</li>'
                     + '<li>Dealer Email that has Item: ' + result[i].DealerEmail + '</li>'
                     + '<li>Store Location that has Item: ' + result[i].StoreName + '</li></br>'

                     + '</li></ul>'
	}
	responseHTML += htmlFooter;

	return responseHTML;
}






function buildCustomerUpdateView(result)
{
    var responseHTML = htmlHeader + '<h1>Result of Inventory Request Input</h1>';
    
    for(var i  = 0; i < result.length; i++)
    {
        responseHTML += '<li>Customer Name that wants Item: ' + result[i].CustName + '</li>'
        + '<li>Customer Email that wants Item: ' + result[i].Email + '</li>'
        + '<li>Item Customer is looking for: ' + result[i].Product + '</li>'
        + '</li></ul>'
    }
    responseHTML += htmlFooter;
    
    return responseHTML;
}





app.get('/', function(req, res) {
    req.query.name
    res.send('<html><head><title>Sonoma Antiques Add Page</title></head><body>'
             + '<a href="/city/add">Add a City</a><br />'
             + '<a href="/product/add">Add a Product</a><br />'
             + '<a href="/store/add">Add a Store</a><br />'
             + '<a href="/dealer/add">Add a Dealer</a><br />'
                + '<a href="/customer/add">Add a Customer</a><br />'
             + '<a href="/inventoryItem/add">Add an Inventory Item</a><br />'
             + '<a href="/inventoryRequest/add">Add an Inventory Request</a><br />'
             + '<a href="/city/view/table">View City HTML Table</a>' +
                 '<br />' + '<a href="/product/view/table">View Product HTML Table</a>' +
                 '<br />' + '<a href="/store/view/table">View Store HTML Table</a>' +
                 '<br />' + '<a href="/dealer/view/table">View Dealer HTML Table</a>' +
                 '<br />' + '<a href="/customer/view/table">View Customer HTML Table</a>' +
                 '<br />' + '<a href="/inventoryItem/view/table">View Inventory Item HTML Table</a>' +
                 '<br />' + '<a href="/inventoryRequest/view/table">View Inventory Request HTML Table</a>' +
                 '<br />' + '<a href="/city/view/dropdown">View City Drop Down Table</a>' +
                 '<br />' + '<a href="/product/view/dropdown">View Product Drop Down Table</a>' +
                 '<br />' + '<a href="/store/view/dropdown">View Store Drop Down Table</a>' +
                 '<br />' + '<a href="/dealer/view/dropdown">View Dealer Drop Down Table</a>' +
                 '<br />' + '<a href="/customer/view/dropdown">View Customer Drop Down Table</a>' +
                 '<br />' + '<a href="/inventoryItem/view/dropdown">View Inventory Item Drop Down Table</a>' +
                 '<br />' + '<a href="/inventoryRequest/view/dropdown">View Inventory Request Drop Down Table</a>' +
                 '<br />' +
		 '</body></html>'
    );
});

app.get('/city/add', function (req,  res)
{
	var responseHTML = htmlHeader;

	responseHTML += '<h1> Insert a City</h1>'
		     +  '<form action="/city/insert" method="GET">'
		     +  '<label for="Town">City name</label> <input type="text" name="Town" id="Town" /><br>'
		     +  '<input type="submit" />'
		     +  '</form>';

		     responseHTML += htmlFooter;
		     res.send(responseHTML);
});

app.get('/product/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert a Product</h1>'
                     +  '<form action="/product/insert" method="GET">'
                     +  '<label for="ProductDesc">Product Description</label> <input type="text" name="ProductDesc" id="ProductDesc" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});



app.get('/store/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert a Store</h1>'
                     +  '<form action="/store/insert" method="GET">'
                     +  '<label for="StoreName">Store Name</label> <input type="text" name="StoreName" id="StoreName" /><br>'
                     +  '<label for="Location">Store Location</label> <input type="text" name="Location" id="Location" /><br>'
                     +  '<label for="Address">Store Address</label> <input type="text" name="Address" id="Address" /><br>'
                     +  '<label for="Contact">Name of Store Manager</label> <input type="text" name="Contact" id="Contact" /><br>'
                     +  '<label for="ContactPhone">Contact Phone Number</label> <input type="text" name="ContactPhone" id="ContactPhone" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});


app.get('/dealer/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert a Dealer</h1>'
                     +  '<form action="/dealer/insert" method="GET">'
                     +  '<label for="DealerName">Dealer Name</label> <input type="text" name="DealerName" id="DealerName" /><br>'
                     +  '<label for="DealerEmail">Dealer Email</label> <input type="text" name="DealerEmail" id="DealerEmail" /><br>'
                     +  '<label for="DealerStore">Store the Deaer participates in</label> <input type="text" name="DealerStore" id="DealerStore" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});



app.get('/customer/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert a Customer</h1>'
                     +  '<form action="/customer/insert" method="GET">'
                     +  '<label for="CustName">Customer Name</label> <input type="text" name="CustName" id="CustName" /><br>'
                     +  '<label for="Email">Customer Email</label> <input type="text" name="Email" id="Email" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});



app.get('/inventoryItem/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert an Inventory Item</h1>'
                     +  '<form action="/inventoryItem/insert" method="GET">'
                     +  '<label for="DealerName">Dealer adding Item</label> <input type="text" name="DealerName" id="DealerName" /><br>'
                     +  '<label for="Store">Store Name for this Item</label> <input type="text" name="Store" id="StoreName" /><br>'
                     +  '<label for="ProductDescription">Item Description</label> <input type="text" name="ProductDescription" id="ProductDescription" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});



app.get('/inventoryRequest/add', function (req,  res)
{
        var responseHTML = htmlHeader;

        responseHTML += '<h1> Insert an Item request</h1>'
                     +  '<form action="/inventoryRequest/insert" method="GET">'
                     +  '<label for="CustName">Name of Customer Seeking Item</label> <input type="text" name="CustName" id="CustName" /><br>'
                     +  '<label for="CustEmail">Customer Email</label> <input type="text" name="CustEmail" id="CustEmail" /><br>'
                     +  '<label for="Product">Item Customer is looking for</label> <input type="text" name="Product" id="Product" /><br>'
                     +  '<input type="submit" />'
                     +  '</form>';

                     responseHTML += htmlFooter;
                     res.send(responseHTML);
});







app.get('/city/insert', function (req, res)
{
	var myQry = 'INSERT INTO City (Town) VALUES ('
                    + '\'' + req.query.Town + '\')';
	console.log(myQry);

	connection.query(myQry, function (err, result)
	{
		if(err)
		{
			console.log(err);
			res.send('There was an insert Error!');
		}
		else
		{
			connection.query('SELECT * FROM City WHERE Town = "' + req.query.Town + '"',
				function(err, result)
				{
					if(err)
					{
						console.log(err);
						res.send('There was a Town select error');
					}
					else if(result.length==1)
					{
						res.send(buildCityView(result));
					}
					else
					{
						res.send('There was a Town select error.');
					}
				});
		}
	});
});





app.get('/product/insert', function (req, res)
{
        var myQry = 'INSERT INTO Product (ProductDesc) VALUES ('
                    + '\'' + req.query.ProductDesc + '\')';
        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if(err)
                {
                        console.log(err);
                        res.send('There was an insert Error!');
                }
                else
                {
                        connection.query('SELECT * FROM Product WHERE ProductDesc = "' + req.query.ProductDesc + '"',
                                function(err, result)
                                {
                                        if(err)
                                        {
                                                console.log(err);
                                                res.send('There was a Product select error');
                                        }
                                        else if(result.length==1)
                                        {
                                                res.send(buildProductView(result));
                                        }
                                        else
                                        {
                                                res.send('There was a Product select error');
                                        }
                                });
                }
        });
});




app.get('/store/insert', function (req, res)
{
        
        var responseHTML2;
        var myQry = 'SELECT CID FROM City c WHERE c.Town = ' + '\''  + req.query.Location + '\'';
        console.log(myQry);
        connection.query(myQry, function (err, result)
        {
            if (err)
            {
                console.log(err);
                res.send('Error selecting Town from City Table.');
            }
            else
            {
                for(var j = 0; j < result.length; j++)
                {
                    responseHTML2 = result[j].CID;
                }
            }
        var myQry = 'INSERT INTO Stores (StoreName, LocationID, Address, Contact, ContactPhone) VALUES ('
                    + '\'' + req.query.StoreName + '\''
                    + ',' + '\'' + responseHTML2 + '\''
                    + ',' + '\'' + req.query.Address + '\''
                    + ',' + '\'' + req.query.Contact + '\''
                    + ',' + '\'' + req.query.ContactPhone + '\')';
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
        {
                if(err)
                {
                        console.log(err);
                        res.send('There was an insert Error! Be sure you are entering a valid Store Location!');
                }
                else
                {
                                connection.query('SELECT * FROM Stores s JOIN City c ON c.CID = s.LocationID WHERE s.StoreName = '
                                                 + '\'' + req.query.StoreName + '\'',
                                function(err, result)
                                {
                                        if(err)
                                        {
                                                console.log(err);
                                                res.send('There was a Store select error');
                                        }
                                        else if(result.length==1)
                                        {
                                                res.send(buildStoreView(result));
                                        }
                                        else
                                        {
                                                res.send('There was a Store select error');
                                        }
                                });
                }
                         
                         });
        });
});







app.get('/dealer/insert', function (req, res)
{
        
        var responseHTML2;
        var myQry = 'SELECT SID FROM Stores s WHERE s.StoreName = ' + '\'' + req.query.DealerStore + '\'';
        console.log(myQry);
        connection.query(myQry, function (err, result)
                         {
                         if (err)
                         {
                         console.log(err);
                         res.send('Error selecting Town from Store Table.');
                         }
                         else
                         {
                         for(var j = 0; j < result.length; j++)
                         {
                         responseHTML2 = result[j].SID;
                         }
                         }
        var myQry = 'INSERT INTO Dealers (DealerName, DealerEmail, DealerStoreID) VALUES ('
                    + '\'' + req.query.DealerName + '\''
                    + ',' + '\'' + req.query.DealerEmail + '\''
                    + ',' + responseHTML2 + ')';
        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if(err)
                {
                        console.log(err);
                        res.send('There was an insert Error!');
                }
                else
                {
                        connection.query('SELECT * FROM Dealers d JOIN Stores s ON d.DealerStoreID = s.SID WHERE d.DealerEmail = '
                                         + '\'' + req.query.DealerEmail + '\'' ,
                                function(err, result)
                                {
                                        if(err)
                                        {
                                                console.log(err);
                                                res.send('There was a Dealer select error');
                                        }
                                        else if(result.length==1)
                                        {
                                                res.send(buildDealerView(result));
                                        }
                                        else
                                        {
                                                res.send('Select from Dealers failed');
                                        }
                                });
                }
                         });
        });
});








app.get('/customer/insert', function (req, res)
{
        var myQry = 'INSERT INTO Customers (CustName, Email) VALUES ('
                    + '\'' + req.query.CustName + '\''
                    + ',' + '\'' + req.query.Email + '\')';
        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if(err)
                {
                        console.log(err);
                        res.send('There was an insert Error!');
                }
                else
                {
                        connection.query('SELECT * FROM Customers WHERE Email = "' + req.query.Email + '"',
                                function(err, result)
                                {
                                        if(err)
                                        {
                                                console.log(err);
                                                res.send('There was a Customer select error');
                                        }
                                        else if(result.length==1)
                                        {
                                                res.send(buildCustomerView(result));
                                        }
                                        else
                                        {
                                                res.send('There was a Customer select error');
                                        }
                                });
                }
        });
});






app.get('/inventoryItem/insert', function (req, res)
{
        
        var NameOfProduct;
        var NameOfDealer;
        var NameOfStore;
       
        
        var IDofStore;
        var myQry3 = 'SELECT SID, StoreName FROM Stores s WHERE s.StoreName = ' + '\'' + req.query.Store + '\'';
        console.log(myQry3);
        connection.query(myQry3, function (err, result)
                         {
                            if (err)
                         {
                            console.log(err);
                            res.send('There was a Stores StoreName, SID select error');
                         }
                         else
                         {
                            for(var j = 0; j < result.length; j++)
                            {
                                IDofStore = result[j].SID;
                         NameOfStore = result[j].StoreName;
                            }
                         }
        var IDofDealer;
        var myQry4 = 'SELECT DID, DealerName FROM Dealers d WHERE d.DealerName = ' + '\'' + req.query.DealerName + '\'';
        console.log(myQry4);
                        
        connection.query(myQry4, function (err, result)
                         {
                         if (err)
                            {
                            console.log(err);
                            }
                            else
                            {
                            for(var j = 0; j < result.length; j++)
                            {
                                IDofDealer = result[j].DID;
                                NameOfDealer = result[j].DealerName;
                            }
                         }
                        
        var myQry7 = 'INSERT INTO Product (ProductDesc) VALUES (' + '\'' + req.query.ProductDescription + '\')';
                         console.log(myQry7);
                         connection.query(myQry7, function (err, result)
                         {
                            if(err)
                            {
                                console.log(err);
                            }
                            
                         })
    
        
                         
        var IDofProduct;
        var myQry5 = 'SELECT PID FROM Product p WHERE p.ProductDesc = ' + '\'' + req.query.ProductDescription + '\'';
                         console.log(myQry5);
                         connection.query(myQry5, function(err, result)
                         {
                            if(err)
                            {
                                console.log(err);
                                res.send('Product ');
                            }
                            else
                            {
                                for(var j  = 0; j < result.length; j++)
                                {
                                    IDofProduct = result[j].PID;
                                    NameOfProduct = result[j].ProductDesc;
                                }
                            }
                                          
        
                                          
                                          
        var myQry6 = 'INSERT INTO GlobalInventory (DealerID, StoreID, ProductDescriptionID) VALUES ('
                    + IDofDealer + ', ' + IDofStore + ', ' + IDofProduct + ')';
        console.log(myQry6);
        connection.query(myQry6, function (err, result)
                         {
                         if(NameOfDealer == null)
                         {
                         res.send('Dealer must be inserted before items <a href="/dealer/add">Add a Dealer</a><br />');
                         }
                         if(NameOfStore == null)
                         {
                         res.send('Store must be inserted before items <a href="/store/add">Add a Store');
                         }
                         
                if(err)
                {

                        console.log(err);
                        res.send('Click back then Re-Submit to save input Item');
                }
                else
                {
                         connection.query('SELECT * FROM GlobalInventory g JOIN Product p ON g.ProductDescriptionID = p.PID JOIN Stores s ON g.StoreID = s.SID JOIN Dealers d ON g.DealerID = d.DID WHERE g.DealerID = ' + IDofDealer
                                          + ' AND g.StoreID = ' + IDofStore
                                          + ' AND g.ProductDescriptionID = ' + IDofProduct,
                                          function(err, result)
                                          {
                                          if(err)
                                          {
                                          
                                          console.log(err);
                                          res.send('There was a Global Inventory select error');
                                          }
                                          else if(result.length==1)
                                          {
                                          res.send(buildGlobalInventoryView(result));
                                          }
                                          else
                                          {
                                          res.send('There was a Global Inventory select error');
                                          }
                                          });
                }
          
        });
});
                               });});});



app.get('/inventoryRequest/insert', function (req, res)
        {
        
        var checkIfExistsCustomer = 'SELECT CustName FROM Customers c WHERE c.CustName = ' + '\'' + req.query.CustName + '\'';
        var myQry;
        connection.query(checkIfExistsCustomer, function (err, result)
                         {
                         myQry = 'INSERT INTO Customers (CustName, Email) VALUES ('
                         + '\'' + req.query.CustName + '\''
                         + ',' + '\'' + req.query.CustEmail + '\')';
                         console.log(myQry);
                         
                         
                         
                         
                         
                         connection.query(myQry, function (err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('Duplicate Customer not allowed Error!');
                                          }
                                          else
                                          {
                                          var checkIfExistsProduct = 'SELECT ProductDesc FROM Product p WHERE p.ProductDesc = ' + '\'' + req.query.Product + '\'';
                                          
                                          if(checkIfExistsProduct == null)
                                          {
                                          
                                          var productInsertQuery = 'INSERT INTO Product (ProductDesc) VALUES (' + '\'' + req.query.Product + '\')';
                                          console.log(productInsertQuery);
                                          
                                          
                                          connection.query(productInsertQuery, function (err, result)
                                                           {
                                                           if(err)
                                                           {
                                                           console.log(err)
                                                           res.send('There was a new Product insert error');
                                                           }
                                                           });
                                          }
                                          // fix this to send CustName and Email
                                          
                                          var request_response = 'SELECT * FROM GlobalRequests r JOIN Customers c ON r.CustLookingForID = c.CUID JOIN Product p ON r.Product = p.ProductDesc JOIN GLobalInventory i ON p.PID = i.ProductDescriptionID JOIN Stores s ON i.StoreID = s.SID JOIN Dealers d ON i.DealerID = d.DID WHERE p.ProductDesc = ' + '\'' + req.query.Product + '\'';
                                          /*
                                          var request_response = 'SELECT * FROM GlobalInventory g JOIN Product p ON g.ProductDescriptionID = p.PID JOIN Stores s ON g.StoreID = s.SID JOIN Dealers d ON g.DealerID = d.DID WHERE p.ProductDesc = ' + '\'' + req.query.Product + '\'';
                                          */
                                          
                                          connection.query(request_response,
                                                           
                                                           
                                                           
                                                           function(err, result)
                                                           {
                                                           if(err)
                                                           {
                                                           console.log(err);
                                                           res.send('There is no product in Inventory matching that description');
                                                           }
                                                           else if(result.length > 0)
                                                           {
                                                           res.send(buildCustomerRequestView(result));
                                                           }
                                                           else
                                                           {
                                                           console.log(err);
                                                           res.send('There were no ' + req.query.Product + '\'' + 's found in inventory');
                                                           }
                                                           });
                                          }
                                          })
                         });
        });














app.get('/city/view/table', function (req, res) {

    var myQry = 'SELECT * FROM City c ORDER BY c.CID';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                     console.log(err);
                     
                     res.send('An error occured');
            }
            else {
                var responseHTML = '<h1>City Table</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>City ID Number</th>' +
                    '<th>City Name</th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].CID
                                 + '</td>' + '<td>' + result[i].Town
                                 + '<td><a href="/city/edit?CID='
                                 + result[i].CID + '">edit</a>'
                                 + '<td><a href="/city/delete?CID='
                                 + result[i].CID + '">delete</a>'
                                 + '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});


app.get('/city/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM City WHERE CID=' + req.query.CID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit City error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit City Information</h1>';
                         
                         responseHTML += '<form action="/city/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'CID: ' + result[0].CID + '<br />'
                                      + 'City Name was: ' + result[0].Town
                                      + ', set to: <input type="text" name="Town" id="Town" value=' + '\''
                                      + result[0].Town + '\'' + ' /><br />'
                                      + '<input type="hidden" name="CID" id="CID" value='
                                      + result[0].CID + '><br>' + '<input type="submit" />'
                                      + '</form>'
                                      + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });




app.get('/city/update', function(req, res)
        {
        var myQry = 'UPDATE City SET Town=' + '\'' + req.query.Town
        + '\'' + ' WHERE CID=' + req.query.CID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM City WHERE CID=' + req.query.CID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking City update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildCityView(result));
                                          }
                                          else
                                          {
                                          res.send('No City found for that CID number.');
                                          }
                                          });
                         }
                         });
        });


app.get('/city/delete', function(req, res)
        {
        var myQry = 'DELETE FROM City WHERE CID=' + req.query.CID;
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete error, all Stores must be removed manually before removing a City as a Safety Measure!');
                         }
                         else
                         {
                         res.send('City with CID: ' + req.query.CID + ' successfully deleted.');
                         }
                         });
        });



app.get('/city/view/dropdown', function (req, res) {

  var myQry = 'SELECT * FROM City';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>City Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/city/">';
              responseHTML += 'Select an ID: <select name="CID" id="CID">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].CID + '">'
                           + result[i].Town
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/city/', function (req, res) {

	  var myQry = 'SELECT * FROM City WHERE CID="' + req.query.CID + '"';
  
  console.log(myQry);
  
  connection.query(myQry,  
        function (err, result) {
            if (err) {
              console.log(err);
	    
	      res.send('An early select * error occured');
              
            }
            else {
             
              var responseHTML = '<h1>Participating Cities</h1>'; 
              
            
      for (var i=0; i < result.length; i++) {
	responseHTML += '<ul><li>City ID: ' + result[i].CID + '</li>' 
		      + '<li>City Name: ' + result[i].Town + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});






app.get('/product/view/table', function (req, res) 
{
	var myQry = 'SELECT * FROM Product p ORDER BY p.PID';

	console.log(myQry);

	connection.query(myQry, function (err, result) 
	{
    		if (err) 
		{
    			console.log(err);
			res.send('Error selecting from Product Table.');
		}
		else
		{
			var responseHTML = '<h1>Product Table</h1>';
			responseHTML += '<table border=1>'
				      + '<tr><th>Product ID</th>'
				      + '<th>Product Description</th>'
				      + '<th><!-- Edit Info Column --></th>'
				      + '<th><!-- Delete Column --></th>'
				      + '<tr>';

			for(var i = 0; i < result.length; i++)
			{
				responseHTML += '<tr><td>' + result[i].PID + '</td>'
					      + '<td>' + result[i].ProductDesc + '</td>'
					      + '<td><a href="/product/edit?PID=' + result[i].PID + '">edit</a>'
					      + '<td><a href="/product/delete?PID=' + result[i].PID + '">delete</a>'
					      + '</tr>'
			}

			responseHTML += '</table>';
			res.send(responseHTML);
		}
	});
});
    

app.get('/product/view/dropdown', function (req, res) {

  var myQry = 'SELECT * FROM Product';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>Product Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/product/">';
              responseHTML += 'Select an ID: <select name="PID" id="PID">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].PID + '">'
                           + result[i].ProductDesc
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/product/', function (req, res) {

          var myQry = 'SELECT * FROM Product WHERE PID = "' + req.query.PID + '"';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);

              res.send('An early select * error occured');

            }
            else {

              var responseHTML = '<h1>Products in Inventory</h1>';


      for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Inventory control ID: ' + result[i].PID + '</li>'
                      + '<li>Product Description: ' + result[i].ProductDesc + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});





app.get('/product/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM Product WHERE PID=' + req.query.PID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Product error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Product Information</h1>';
                         
                         responseHTML += '<form action="/product/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'PID: ' + result[0].PID + '<br />'
                         + 'Product Description was: ' + result[0].ProductDesc
                         + ', set to: <input type="text" name="ProductDesc" id="ProductDesc" value=' + '\''
                         + result[0].ProductDesc + '\'' + ' /><br />'
                         + '<input type="hidden" name="PID" id="PID" value='
                         + result[0].PID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });


//cascading feature needed??????????
//
//
//
//
//
//
//
//


app.get('/product/update', function(req, res)
        {
        var myQry = 'UPDATE Product SET ProductDesc=' + '\'' + req.query.ProductDesc
        + '\'' + ' WHERE PID=' + req.query.PID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM Product WHERE PID=' + req.query.PID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking City update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildProductView(result));
                                          }
                                          else
                                          {
                                          res.send('No Product found for that PID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/product/delete', function(req, res)
        {
        var myQry = 'DELETE FROM Product WHERE PID="' + req.query.PID + '"';
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete error');
                         }
                         else
                         {
                         res.send('Product with PID: ' + req.query.PID + ' successfully deleted.');
                         }
                         });
        });











app.get('/store/view/table', function (req, res)
{
	var myQry = 'SELECT SID, StoreName FROM Stores ORDER BY SID';

	console.log(myQry);

	connection.query(myQry, function (err, result) 
	{
    		if (err) 
		{
    			console.log(err);
			res.send('Error selecting from Stores Table.');
		}
		else
		{
			var responseHTML = '<h1>Stores Table</h1>';
			responseHTML += '<table border=1>'
				      + '<tr><th>Store ID</th>'
				      + '<th>Store Name</th>'
				      + '<th><!-- More Info Column --></th>'
				      + '<th><!-- Edit Info Column --></th>'
				      + '<th><!-- Delete Column --></th>'
				      + '<tr>';

			for(var i = 0; i < result.length; i++)
			{
				responseHTML += '<tr><td>' + result[i].SID + '</td>'
					      + '<td>' + result[i].StoreName + '</td>'
					      + '<td><a href="/store/?SID=' + result[i].SID + '">more info</a>'
					      + '<td><a href="/store/edit?SID=' + result[i].SID + '">edit</a>'
					      + '<td><a href="/store/delete?SID=' + result[i].SID + '">delete</a>'
					      + '</tr>'
			}

			responseHTML += '</table>';
			res.send(responseHTML);
		}
	});
});
    




app.get('/store/view/dropdown', function (req, res) {

  var myQry = 'SELECT SID, StoreName FROM Stores ORDER BY SID';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>Store Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/store/">';
              responseHTML += 'Select an ID: <select name="SID" id="SID">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].SID + '">'
                           + result[i].StoreName
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/store/', function (req, res) {

          var myQry = 'SELECT * FROM Stores s JOIN City c ON s.LocationID = c.CID WHERE SID = ' + '\'' + req.query.SID + '\'';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);

              res.send('An early select * error occured');

            }
            else {

              var responseHTML = '<h1>Participating Store</h1>';


      for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Store ID: ' + result[i].SID + '</li>'
                      + '<li>Store Name: ' + result[i].StoreName + '</li>'
		      + '<li>Store Location ID: ' + result[i].Town + '</li>'
		      + '<li>Store Address: ' + result[i].Address + '</li>'
		      + '<li>Store Phone #: ' + result[i].ContactPhone + '</li>'
		      + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});






app.get('/store/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM Stores WHERE SID=' + req.query.SID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Store error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Store Information</h1>';
                         
                         responseHTML += '<form action="/store/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'SID: ' + result[0].SID + '<br />'
                         + 'Store Name was: ' + result[0].StoreName
                         + ', set to: <input type="text" name="StoreName" id="StoreName" value=' + '\''
                         + result[0].StoreName + '\'' + ' /><br />'
                         + 'Store Location is: ' + result[0].LocationID
                         + '<input type="hidden" name="LocationID" id="LocationID" value=' + '\''
                         + result[0].LocationID + '\'' + ' /><br />'
                         + 'Store Address was: ' + result[0].Address
                         + ', set to: <input type="text" name="Address" id="Address" value=' + '\''
                         + result[0].Address + '\'' + ' /><br />'
                         + 'Store Contact was: ' + result[0].Contact
                         + ', set to: <input type="text" name="Contact" id="Contact" value=' + '\''
                         + result[0].Contact + '\'' + ' /><br />'
                         + 'Store Phone was: ' + result[0].ContactPhone
                         + ', set to: <input type="text" name="ContactPhone" id="ContactPhone" value=' + '\''
                         + result[0].ContactPhone + '\'' + ' /><br />'
                         + '<input type="hidden" name="SID" id="SID" value='
                         + result[0].SID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });




app.get('/store/update', function(req, res)
        {
        var myQry = 'UPDATE Stores SET StoreName=' + '\'' + req.query.StoreName + '\', ' +
                        'LocationID=' + req.query.LocationID +
                        ', Address=' + '\'' + req.query.Address + '\', ' +
                        'Contact=' + '\'' + req.query.Contact + '\', ' +
                        'ContactPhone=' + '\'' + req.query.ContactPhone + '\'' +
                        ' WHERE SID=' + req.query.SID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM Stores s JOIN City c ON s.LocationID = c.CID WHERE SID=' + req.query.SID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking City update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildStoreView(result));
                                          }
                                          else
                                          {
                                          res.send('No Store found for that SID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/store/delete', function(req, res)
        {
        var myQry = 'DELETE FROM GlobalInventory WHERE StoreID=' + req.query.SID;
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete error');
                         }
                         else
                         {
                         var delQry = 'DELETE FROM Stores WHERE SID=' + req.query.SID;
                         connection.query(delQry, function (err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('Delete From Stores error');
                                          }
                                          else
                                          {
                                          console.log(delQry);
                                          res.send('Store with SID: ' + req.query.SID + ' successfully deleted.');
                                          }
                                          })
                         }
                         });
        });















app.get('/dealer/view/table', function (req, res)
{
        var myQry = 'SELECT DISTINCT DealerName FROM Dealers';

        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if (err)
                {
                        console.log(err);
                        res.send('Error selecting from Dealer Table.');
                }
                else
                {
                        var responseHTML = '<h1>Dealer Table</h1>';
                        responseHTML += '<table border=1>'
                                      + '<tr><th>Dealer ID</th>'
                                      + '<th>Dealer Name</th>'
                                      + '<th><!-- Edit Info Column --></th>'
                                      + '<th><!-- Delete Column --></th>'
                                      + '<tr>';

                        for(var i = 0; i < result.length; i++)
                        {
                                responseHTML += '<tr><td>' + result[i].DealerName + '</td>'
                                              + '<td><a href="/dealer/?DealerName=' + result[i].DealerName + '">more info</a>'
                                              + '<td><a href="/dealer/edit?DealerName=' + result[i].DealerName + '">edit</a>'
                                              + '<td><a href="/dealer/delete?DealerName=' + result[i].DealerName + '">delete</a>'
                                              + '</tr>'
                        }

                        responseHTML += '</table>';
                        res.send(responseHTML);
                }
        });
});






app.get('/dealer/view/dropdown', function (req, res) {

  var myQry = 'SELECT DISTINCT DealerName FROM Dealers';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>Dealer Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/dealer/">';
              responseHTML += 'Select an Name: <select name="DealerName" id="DealerName">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].DealerName + '">'
                           + result[i].DealerName
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/dealer/', function (req, res) {
 
          var myQry = 'SELECT * FROM Dealers d JOIN Stores s ON d.DealerStoreID = s.SID WHERE d.DealerName = '
                       + '\'' + req.query.DealerName + '\'';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);

              res.send('An early select * error occured');

            }
            else {

              var responseHTML = '<h1>Participating Dealer</h1>';


      for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Dealer ID: ' + result[i].DID + '</li>'
                      + '<li>Dealer Name: ' + result[i].DealerName + '</li>'
                      + '<li>Dealer Email: ' + result[i].DealerEmail + '</li>'
                      + '<li>Store the Dealer Participates in: ' + result[i].StoreName + '</li>'
                      + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});
      






app.get('/dealer/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM Dealers d JOIN Stores s ON d.DealerStoreID = s.SID WHERE d.DealerName='
                  + '\'' + req.query.DealerName + '\'';
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Dealer error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Dealer Information</h1>';
                         
                         responseHTML += '<form action="/dealer/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'DID: ' + result[0].DID + '<br />'
                         + 'Dealer Name was: ' + result[0].DealerName
                         + ', set to: <input type="text" name="DealerName" id="DealerName" value=' + '\''
                         + result[0].DealerName + '\'' + ' /><br />'
                         + 'Dealer Email was: ' + result[0].DealerEmail
                         + ', set to: <input type="text" name="DealerEmail" id="DealerEmail" value=' + '\''
                         + result[0].DealerEmail + '\'' + ' /><br />'
                         + 'Dealer Store is: ' + result[0].StoreName
                         + '<input type="hidden" name="DID" id="DID" value='
                         + result[0].DID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });


//
//
//
//  when entering updated data and clicking the back arrow, if the page is not refreshed, the response when
//  clicking the edit button again on the same as previous states multiple inputs.  If the page is refreshed,
//  it properly allows editing.  How do I fix this?


app.get('/dealer/update', function(req, res)
        {
        var myQry = 'UPDATE Dealers d SET d.DealerName=' + '\'' + req.query.DealerName + '\', '
        + 'd.DealerEmail=' + '\'' + req.query.DealerEmail + '\'' +
        'WHERE DID=' + req.query.DID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM Dealers d JOIN Stores s ON d.DealerStoreID = s.SID WHERE d.DealerName='
                                          + '\'' + req.query.DealerName + '\'', function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking City update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildDealerView(result));
                                          }
                                          else
                                          {
                                          res.send('No Store found for that SID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/dealer/delete', function(req, res)
        {
        var myQry = 'DELETE FROM Dealers WHERE DealerName="' + req.query.DealerName + '"';
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete Dealer error');
                         }
                         else
                         {
                         res.send('Dealer with Name: ' + req.query.DealerName + ' successfully deleted.');
                         }
                         });
        });












app.get('/customer/view/table', function (req, res)
{
        var myQry = 'SELECT * FROM Customers';

        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if (err)
                {
                        console.log(err);
                        res.send('Error selecting from Customer Table.');
                }
                else
                {
                        var responseHTML = '<h1>Customer Table</h1>';
                        responseHTML += '<table border=1>'
                                      + '<tr><th>Customer ID</th>'
                                      + '<th>Customer Name</th>'
                                      + '<th><!-- Edit Info Column --></th>'
                                      + '<th><!-- Delete Column --></th>'
                                      + '<tr>';

                        for(var i = 0; i < result.length; i++)
                        {
                                responseHTML += '<tr><td>' + result[i].CUID + '</td>'
                                              + '<td>' + result[i].CustName + '</td>'
                                              + '<td><a href="/customer/?CUID=' + result[i].CUID + '">more info</a>'
                                              + '<td><a href="/customer/edit?CUID=' + result[i].CUID + '">edit</a>'
                                              + '<td><a href="/customer/delete?CUID=' + result[i].CUID + '">delete</a>'
                                              + '</tr>'
                        }

                        responseHTML += '</table>';
                        res.send(responseHTML);
                }
        });
});







app.get('/customer/view/dropdown', function (req, res)
{

var myQry = 'SELECT * FROM Customers';

  console.log(myQry);

        
        connection.query(myQry,
                         function (err, result) {
                         if (err) {
                         console.log(err);
                         res.send('A select *  error occured');
                         
                         }
                         else {
                         
                         var responseHTML = '<h1>Customer Drop Down Menu</h1>';
                         responseHTML += '<form method="GET" action="/customer/">';
                         responseHTML += 'Select a Customer Name: <select name="CUID" id="CUID">';
                         
                         
                         for (var i=0; i < result.length; i++)
                         {
                         responseHTML += '<option value="'
                         + result[i].CUID + '">'
                         + result[i].CustName
                         + '</option>';
                         }
                         
                         responseHTML += '</select>';
                         responseHTML += '&nbsp;<input type="submit" />';
                         responseHTML += '</form>';
                         res.send(responseHTML);
                         }
                         }
                         );
        });



app.get('/customer/', function (req, res) {

          var myQry = 'SELECT * FROM Customers WHERE CUID = "' + req.query.CUID + '"';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);

              res.send('An early select * error occured');

            }
            else {

              var responseHTML = '<h1>Customer Information</h1>';


      for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Customer ID: ' + result[i].CUID + '</li>'
                      + '<li>Customer Name: ' + result[i].CustName + '</li>'
                      + '<li>Customer Email: ' + result[i].Email + '</li>'
                      + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});








app.get('/customer/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM Customers WHERE CUID = ' + req.query.CUID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Customer error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Customer Information</h1>';
                         
                         responseHTML += '<form action="/customer/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'CUID: ' + result[0].CUID + '<br />'
                         + 'Dealer Name was: ' + result[0].CustName
                         + ', set to: <input type="text" name="CustName" id="CustName" value=' + '\''
                         + result[0].CustName + '\'' + ' /><br />'
                         + 'Customer Email was: ' + result[0].Email
                         + ', set to: <input type="text" name="Email" id="Email" value=' + '\''
                         + result[0].Email + '\'' + ' /><br />'
                         + '<input type="hidden" name="CUID" id="CUID" value='
                         + result[0].CUID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });






app.get('/customer/update', function(req, res)
        {
        var myQry = 'UPDATE Customers c SET c.CustName=' + '\'' + req.query.CustName + '\', '
        + 'c.Email=' + '\'' + req.query.Email + '\'' +
        'WHERE CUID=' + req.query.CUID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM Customers WHERE CUID = ' + req.query.CUID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking Customer update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildCustomerView(result));
                                          }
                                          else
                                          {
                                          res.send('No Customer found for that CID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/customer/delete', function(req, res)
        {
        var CustName;
        var custQuery = 'SELECT CustName FROM Customers WHERE CUID=' + '\'' + req.query.CUID + '\'';
        console.log(custQuery);
        connection.query(custQuery, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was a custQuery error');
                         }
                         else
        {
                         for(var i = 0;i < result.length; i++)
                         {
                         CustName = result[i].CustName;
                         }
                         }
                         })
        
        
        
        var myQry = 'DELETE FROM Customers WHERE CUID="' + req.query.CUID + '"';
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete Customer error');
                         }
                         else
                         {
                         res.send('Customer named: ' + CustName + ' successfully deleted.');
                         }
                         });
        });














app.get('/inventoryItem/view/table', function (req, res)
{
        var myQry = 'SELECT * FROM GlobalInventory i JOIN Product p ON i.ProductDescriptionID = p.PID ORDER BY p.ProductDesc';

        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if (err)
                {
                        console.log(err);
                        res.send('Error selecting from Inventory Table.');
                }
                else
                {
                        var responseHTML = '<h1>Inventory Table</h1>';
                        responseHTML += '<table border=1>'
                                      + '<th>Description</th>'
                                      + '<th><!-- More Info Column --></th>'
                                      + '<th><!-- Edit Info Column --></th>'
                                      + '<th><!-- Delete Column --></th>'
                                      + '<tr>';

                        for(var i = 0; i < result.length; i++)
                        {
                                responseHTML += '<tr><td>' + result[i].ProductDesc + '</td>'
                                              + '<td><a href="/inventoryItem/?IID=' + result[i].IID + '">more info</a>'
                                              + '<td><a href="/inventoryItem/edit?IID=' + result[i].IID + '">edit</a>'
                                              + '<td><a href="/inventoryItem/delete?IID=' + result[i].IID + '">delete</a>'
                                              + '</tr>'
                        }

                        responseHTML += '</table>';
                        res.send(responseHTML);
                }
        });
});



app.get('/inventoryItem/view/dropdown', function (req, res)
{
var myQry = 'SELECT * FROM GlobalInventory i JOIN Product p ON i.ProductDescriptionID = p.PID';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>Inventory Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/inventoryItem/">';
              responseHTML += 'Select an ID: <select name="IID" id="IID">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].IID + '">'
                           + result[i].ProductDesc
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/inventoryItem/', function (req, res) {

        var myQry = 'SELECT * FROM GlobalInventory i JOIN Dealers d ON i.DealerID = d.DID JOIN Product p ON p.PID = i.ProductDescriptionID JOIN Stores s ON s.SID = i.StoreID WHERE IID = ' + req.query.IID;

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);


            }
            else {

              var responseHTML = '<h1>Inventory Information</h1>';


                   
                   
                   for (var i=0; i < result.length; i++) {
                   responseHTML += '<ul><li>Inventory ID: ' + result[i].IID + '</li>'
                   + '<li>Procuct Description: ' + result[i].ProductDesc + '</li>'
                   + '<li>Dealer Name: ' + result[i].DealerName + '</li>'
                   + '<li>Store Name: ' + result[i].StoreName + '</li>'
                   + '</li></ul>';
                   }

      res.send(responseHTML);
    }
});
});








app.get('/inventoryItem/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM GlobalInventory i JOIN Dealers d ON i.DealerID = d.DID JOIN Product p ON p.PID = i.ProductDescriptionID JOIN Stores s ON s.SID = i.StoreID WHERE IID = ' + req.query.IID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Inventory error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Global Inventory Information</h1>';
                         
                         responseHTML += '<form action="/inventoryItem/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'IID: ' + result[0].IID + '<br />'
                         + 'Product Description was: ' + result[0].ProductDesc
                         + ', set to: <input type="text" name="ProductDesc" id="ProductDesc" value=' + '\''
                         + result[0].ProductDesc + '\'' + ' /><br />'
                         + 'Dealer offering Item was: ' + result[0].DealerName
                         + '<input type="text" name="DealerName" id="DealerName" value=' + '\''
                         + result[0].DealerName + '\'' + ' /><br />'
                         + 'Store Name is: ' + result[0].StoreName
                         + '<input type="hidden" name="StoreName" id="StoreName" value='
                         + result[0].StoreName + '<br />'
                         + '<input type="hidden" name="IID" id="IID" value='
                         + result[0].IID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });




app.get('/inventoryItem/update', function(req, res)
        {
        
        var myQry = 'UPDATE GlobalInventory i JOIN Dealers d ON i.DealerID = d.DID JOIN Product p ON p.PID = i.ProductDescriptionID SET p.ProductDesc='
            + '\'' + req.query.ProductDesc + '\', ' + 'd.DealerName=' + '\'' + req.query.DealerName + '\''
            + ' WHERE IID=' + req.query.IID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM GlobalInventory i JOIN Dealers d ON i.DealerID = d.DID JOIN Product p ON p.PID = i.ProductDescriptionID JOIN Stores s ON s.SID = i.StoreID WHERE IID = ' + req.query.IID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking Inventory update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildGlobalInventoryView(result));
                                          }
                                          else
                                          {
                                          res.send('No Item found for that IID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/inventoryItem/delete', function(req, res)
        {
        var myQry = 'DELETE FROM GlobalInventory WHERE IID="' + req.query.IID + '"';
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete IID error');
                         }
                         else
                         {
                         res.send('Inventory Item with IID: ' + req.query.IID + ' successfully deleted.');
                         }
                         });
        });











app.get('/inventoryRequest/view/table', function (req, res)
{
        var myQry = 'SELECT * FROM GlobalRequests g JOIN Customers c ON g.CustLookingForID = c.CUID';

        console.log(myQry);

        connection.query(myQry, function (err, result)
        {
                if (err)
                {
                        console.log(err);
                        res.send('Error selecting from Inventory Requests Table.');
                }
                else
                {
                        var responseHTML = '<h1>Inventory Requests Table</h1>';
                        responseHTML += '<table border=1>'
                                      + '<tr><th>Request ID</th>'
                                      + '<th>Customer Requesting ID</th>'
                                      + '<th><!-- More Info Column --></th>'
                                      + '<th><!-- Edit Info Column --></th>'
                                      + '<th><!-- Delete Column --></th>'
                                      + '<tr>';

                        for(var i = 0; i < result.length; i++)
                        {
                                responseHTML += '<tr><td>' + result[i].RID + '</td>'
                                              + '<td>' + result[i].CustName + '</td>'
                                              + '<td><a href="/inventoryRequest/?RID=' + result[i].RID + '">more info</a>'
                                              + '<td><a href="/inventoryRequest/edit?RID=' + result[i].RID + '">edit</a>'
                                              + '<td><a href="/inventoryrequest/delete?RID=' + result[i].RID + '">delete</a>'
                                              + '</tr>'
                        }

                        responseHTML += '</table>';
                        res.send(responseHTML);
                }
        });
});








app.get('/inventoryRequest/edit', function (req, res)
        {
        var myQry = 'SELECT * FROM GlobalRequests g JOIN Customers c ON g.CustLookingForID = c.CUID WHERE RID=' + req.query.RID;
        
        console.log(myQry);
        
        connection.query(myQry, function (err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an edit Inventory Request error');
                         }
                         else
                         {
                         var responseHTML = htmlHeader + '<h1>Edit Inventory Request Information</h1>';
                         
                         responseHTML += '<form action="/inventoryRequest/update" method="GET">';
                         
                         if(result.length==1)
                         {
                         responseHTML += 'RID: ' + result[0].RID + '<br />'
                         + 'Customer Name was: ' + result[0].CustName
                         + ', set to: <input type="text" name="CustName" id="CustName" value=' + '\''
                         + result[0].CustName + '\'' + ' /><br />'
                         + 'Product looking for was: ' + result[0].Product
                         + ', set to: <input type="text" name="Product" id="Product" value=' + '\''
                         + result[0].Product + '\'' + ' /><br />'
                         + '<input type="hidden" name="RID" id="RID" value='
                         + result[0].RID + '><br>' + '<input type="submit" />'
                         + '</form>'
                         + htmlFooter;
                         
                         res.send(responseHTML);
                         }
                         else
                         {
                         res.send('More than one record was returned.');
                         }
                         }
                         });
        });






app.get('/inventoryRequest/update', function(req, res)
        {
        var myQry = 'UPDATE GlobalRequests r JOIN Customers c ON r.CustLookingForID = c.CUID SET c.CustName=' + '\'' + req.query.CustName + '\', '
        + 'r.Product =' + '\'' + req.query.Product + '\'' +
        'WHERE RID=' + req.query.RID;
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('There was an error, updating');
                         }
                         else
                         {
                         connection.query('SELECT * FROM GlobalRequests r JOIN Customers c ON r.CustLookingForID = c.CUID WHERE RID = ' + req.query.RID, function(err, result)
                                          {
                                          if(err)
                                          {
                                          console.log(err);
                                          res.send('An error occurred checking Inventory Request update');
                                          }
                                          else if(result.length == 1)
                                          {
                                          res.send(buildCustomerUpdateView(result));
                                          }
                                          else
                                          {
                                          res.send('No Customer found for that RID number.');
                                          }
                                          });
                         }
                         });
        });



app.get('/inventoryRequest/delete', function(req, res)
        {
        var myQry = 'DELETE FROM GlobalRequests WHERE RID="' + req.query.RID + '"';
        
        console.log(myQry);
        
        connection.query(myQry, function(err, result)
                         {
                         if(err)
                         {
                         console.log(err);
                         res.send('Delete Customer error');
                         }
                         else
                         {
                         res.send('Customer Request ID: ' + req.query.RID + ' successfully deleted.');
                         }
                         });
        });













app.get('/inventoryRequest/view/dropdown', function (req, res)
{
var myQry = 'SELECT * FROM GlobalRequests';

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
              res.send('A select *  error occured');

            }
            else {

              var responseHTML = '<h1>Requests Drop Down Menu</h1>';
              responseHTML += '<form method="GET" action="/inventoryRequest/">';
              responseHTML += 'Select an ID: <select name="RID" id="RID">';


              for (var i=0; i < result.length; i++)
              {
              responseHTML += '<option value="'
                           + result[i].RID + '">'
                           + result[i].Product
                           + '</option>';
              }

              responseHTML += '</select>';
              responseHTML += '&nbsp;<input type="submit" />';
              responseHTML += '</form>';
              res.send(responseHTML);
            }
        }
    );
});


app.get('/inventoryRequest/', function (req, res) {

          var myQry = 'SELECT * FROM GlobalRequests r JOIN Customers c ON r.CustLookingForID = c.CUID WHERE RID = ' + req.query.RID;

  console.log(myQry);

  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);

              res.send('An early select * error occured');

            }
            else {

              var responseHTML = '<h1>Request Information</h1>';


      for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>request ID: ' + result[i].RID + '</li>'
                      + '<li>ID of Interested Customer: ' + result[i].CustLookingForID + '</li>'
                      + '<li>Customer Name: ' + result[i].CustName + '</li>'
                      + '<li>Customer Email: ' + result[i].Email + '</li>'
                      + '<li>Product Customer is Looking for: ' + result[i].Product + '</li>'
                      + '</li></ul>';
      }

      res.send(responseHTML);
    }
});
});






app.listen(8888);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
