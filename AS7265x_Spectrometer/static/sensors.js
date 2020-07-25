$(document).ready(function() {


 function GetRawSpectrum()
{
	$.getJSON( '/GetAS7265x', function( json ) 
	{
		//console.log(json.Array[0]);	  
		//console.log(json);
	    
	    var rawspectrumdata = json;
	    //var data = [];
	    //data = JSON.parse(json.values);
        console.log("received " + rawspectrumdata);

		var ctx = document.getElementById("rawspectrumPieChart"); 
		
		var myChart = new Chart(ctx, { 
		  type: 'pie', 
		  data: { 
		    labels: ['410', '435', '460', '485','510', '535', '560', '585','610','645', '680', '705','730', '760', '810', '860', '900','940'], 
		    datasets: [ 
		      { label: 'Spectral bands', 
			data: rawspectrumdata, 
			backgroundColor :[
				'rgba(129, 63, 191, 0.6)', 
				'rgba(47, 56, 228, 0.6)', 
				'rgba(120, 181, 241, 0.6)', 
				'rgba(120, 217, 241, 0.6)', 
				'rgba(120, 241, 191, 0.6)', 
				'rgba(120, 241, 154, 0.6)',
				'rgba(223, 249, 153, 0.6)', 
				'rgba(241, 235, 64, 0.6)', 
				'rgba(241, 191, 64, 0.6)',
				'rgba(241, 120, 64, 0.6)', 
				'rgba(241, 64, 64, 0.5)', 
				'rgba(167, 15, 15, 0.4)', 
				'rgba(74, 12, 12, 0.6)', 
				'rgba(49, 36, 36, 0.7)',
				'rgba(188, 51, 51, 0.8)', 
				'rgba(216, 185, 185, 0.9)', 
				'rgba(153, 4, 4, 0.8)' ,
				'rgba(0, 0, 0, 0.99)' 
		], 
		  
		borderColor: [ 
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' ,
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' ,
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' 
			    ], 
		borderWidth : 1 
		      } 
		    ] 
		  }, 
		  options: { 
			scales: { 
			    yAxes: [{ 
				ticks: { 
				    beginAtZero:true 
				} 
			    }] 
			} 
		    } 
		});



	 });
}	


  
  function GetSpectrum()
{
	$.getJSON( '/GetCalibrated18CHanSpectrum', function( json ) 
	{
		//console.log(json.Array[0]);	  
		//console.log(json);
	    
	    var spdata = json;
	    //var data = [];
	    //data = JSON.parse(json.values);
        console.log(spdata);
		//config.data.labels.push(data.time);
		//config.data.datasets.data.push(data);
		//myChart.update();

		var ctx = document.getElementById("calibratedSpectrumChart"); 
		
		var myChart = new Chart(ctx, { 
		  type: 'bar', 
		  data: { 
		    labels: ['410', '435', '460', '485','510', '535', '560', '585','610','645', '680', '705','730', '760', '810', '860', '900','940'], 
		    datasets: [ 
		      { label: 'Spectral bands', 
			data: spdata, 
			backgroundColor :[
				'rgba(129, 63, 191, 0.6)', 
				'rgba(47, 56, 228, 0.6)', 
				'rgba(120, 181, 241, 0.6)', 
				'rgba(120, 217, 241, 0.6)', 
				'rgba(120, 241, 191, 0.6)', 
				'rgba(120, 241, 154, 0.6)',
				'rgba(223, 249, 153, 0.6)', 
				'rgba(241, 235, 64, 0.6)', 
				'rgba(241, 191, 64, 0.6)',
				'rgba(241, 120, 64, 0.6)', 
				'rgba(241, 64, 64, 0.5)', 
				'rgba(167, 15, 15, 0.4)', 
				'rgba(74, 12, 12, 0.6)', 
				'rgba(49, 36, 36, 0.7)',
				'rgba(188, 51, 51, 0.8)', 
				'rgba(216, 185, 185, 0.9)', 
				'rgba(153, 4, 4, 0.8)' ,
				'rgba(0, 0, 0, 0.99)' 
		], 
		  
		borderColor: [ 
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' ,
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' ,
				'rgba(255,99,132,1)', 
				'rgba(54, 162, 235, 1)', 
				'rgba(255, 206, 86, 1)', 
				'rgba(75, 192, 192, 1)', 
				'rgba(153, 102, 255, 1)', 
				'rgba(255, 159, 64, 1)' 
			    ], 
		borderWidth : 1 
		      } 
		    ] 
		  }, 
		  options: { 
			scales: { 
			    yAxes: [{ 
				ticks: { 
				    beginAtZero:true 
				} 
			    }] 
			} 
		    } 
		});



	 });
}	

//var interval_id = setInterval(GetSpectrum,2000);

// function(){
	// $('mybutton').click(function(){
		
		// GetSpectrum();
		
		
	// });
// };


$(function() { $("#rspecbutton").click(function (event) 
	{ 
	GetRawSpectrum();
	
	}); });
	

$(function() { $("#mybutton").click(function (event) 
	{ 
	GetSpectrum();
	
	}); });
	

	

$('#whiteLED-button').change(function() {
		console.log('Toggle: ' + $(this).prop('checked'));
		console.log('Toggle: ' + $(this).prop('id'));
		console.log('Toggle: ' + $(this).prop('name'));

		var buttonName = $(this).prop('name');
		var buttonId = $(this).prop('id');
        var buttonStatus = $(this).prop('checked');
		
		var redButton = new Object();
		redButton.id =  buttonId;
		redButton.name = buttonName;
		redButton.status =  buttonStatus;
		
		var buttondata = JSON.stringify(redButton)
		
		console.log(buttondata);
	
			$.ajax({
			  type: "POST",
			  url: "/RGB",
			  data: buttondata,
			  success: function(){},
			  dataType: "json",
			  contentType : "application/json"
			});

    })
	
$('#ir-button').change(function() {
	
		var buttonName = $(this).prop('name');
		var buttonId = $(this).prop('id');
        var buttonStatus = $(this).prop('checked');
		
		var greenButton = new Object();
		greenButton.id =  buttonId;
		greenButton.name = buttonName;
		greenButton.status =  buttonStatus;

		var buttondata = JSON.stringify(greenButton)
		console.log(buttondata);
		
		$.ajax({
			  type: "POST",
			  url: "/RGB",
			  data: buttondata,
			  success: function(){},
			  dataType: "json",
			  contentType : "application/json"
			});
    })
	
	
$('#uv-button').change(function() {
	  
		var buttonName = $(this).prop('name');
		var buttonId = $(this).prop('id');
        var buttonStatus = $(this).prop('checked');
		
		var blueButton = new Object();
		blueButton.id =  buttonId;
		blueButton.name = buttonName;
		blueButton.status =  buttonStatus;

		var buttondata = JSON.stringify(blueButton)
		console.log(buttondata);
		
		$.ajax({
			  type: "POST",
			  url: "/RGB",
			  data: buttondata,
			  success: function(){},
			  dataType: "json",
			  contentType : "application/json"
			});
	  
  })

});
