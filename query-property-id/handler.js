'use strict';

var mysql = require('mysql');


const connectionData = {
                    'host': 'vivareal.ciquzszqdlu7.us-east-1.rds.amazonaws.com',
                    'user': 'root',
                    'password': 'ufabc2010',
                    'port': '3306',
                    'database': 'vivarealdb'
                };

function buildSimpleResponse(statusCode, response) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(response)
    };
}

function connectDatabase() {
    var connection = mysql.createConnection(connectionData);

    connection.connect(function (err) {
        if (err) {
            callback(null, buildSimpleResponse(400, errorResponse(400, 'Error fetching data')));
        }
    });

    return connection;
}


function actionResponse(action, url, version, downloadDate, installDate, description) {
    return {
        'action': action,
        'url': url,
        'version': version,
        'dateToDownload': downloadDate,
        'dateToInstall': installDate,
        'message': description
    };
}

function errorResponse(code, message) {
    return {
        'code': code,
        'message': message
    };
}


function actionResponse(result) {
	
	const id = result[0].PropertyID;
	const title = result[0].Title;
	const price = result[0].Price;
	const description = result[0].Description;
	const x = result[0].x; 
	const y = result[0].y; 
	const beds = result[0].Beds; 
	const baths = result[0].Baths; 
	var provinces = result[0].ProvincesNames; 
	var provinces = new Array(result[0].ProvincesNames);
	if (result.length > 1){
		for (var i = 1; i < result.length; i++) {
			provinces.push(result[i].ProvincesNames);	
		}
	}
	const squareMeters = result[0].SquareMeter;
	
    return {
  		"id": id,
  		"title": title,
  		"price": price,
  		"description": description,
  		"x": x,
  		"y": y,
  		"beds": beds,
  		"baths": baths,
  		"provinces" : provinces,
  		"squareMeters": squareMeters
	};
}

/**
* Get properties by ID
*/
module.exports.hello = (event, context, callback) => {
  
    console.log("event = " + event);

	if (event === undefined || event.pathParameters === null) 
	{
    	callback(null, buildSimpleResponse(400, errorResponse(400, 'Bad parameters')));
	}
	else
	{
	
		const parameters = event.pathParameters;

		
		var connection = connectDatabase();
		
    	connection.query('SELECT P.*, M.ProvincesNames from Properties as P inner join Maps as M ON P.PropertyID = M.PropertyID AND P.PropertyID ='+parameters["id"], function (error, results, fields) {
  			if (error) throw error;
  				connection.end();
  				//actionResponse(results)
   				const resp = actionResponse(results);
  				callback(null, buildSimpleResponse(200, resp));
			});
     	}  
    	
};




