// Dale Savage
// lab 10 Ajax
// 4/5/23
// Dr. Johnson

var loadAvgCounter=0;
var networkCounter=0;
var rootProcessesCounter=0;
var errorCounter=0;
loadAvg();
network();
rootProcesses();


function loadAvg(){
    a=$.ajax({
        url: "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/loadavg",
        method: "GET"
    }).done(function(data) {
        loadAvgCounter++;
        //clear out old data
        $("#loadRun").html(loadAvgCounter);
        $("#onemin").html(data.loadavg.OneMinAvg);
        $("#fivemin").html(data.loadavg.FiveMinAvg);
        $("#fifteenmin").html(data.loadavg.FifteenMinAvg);
        $("#numRunning").html(data.loadavg.NumRunning);
        $("#ttlProc").html(data.loadavg.TtlProcesses);
        setTimeout(loadAvg,5000);

    }).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("loadAvg error "+new Date()+"<br>");
		
		setTimeout(loadAvg,5000);
	});
}

function network(){
    a=$.ajax({
        url: "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/network",
        method: "GET"
    }).done(function(data) {
        networkCounter++;
        //clear out old data
        $("#networkRun").html(networkCounter);
        $("#txbytes").html(data.network.txbytes);
        $("#rxbytes").html(data.network.rxbytes);
        $("#txavg").html(data.network.txbytes/5);
        $("#rxavg").html(data.network.rxbytes/5);

        setTimeout(network,5000);
    }).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("network error "+new Date()+"<br>");
		
		setTimeout(network,5000);
	});
}

function rootProcesses() {

 	a=$.ajax({
 		url: "https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/ps",
 		method: "GET"
 	}).done(function(data) {
        rootProcessesCounter++;
 		//clear out old data
 		$("#processRun").html(rootProcessesCounter);
 		$("#processes").html("");
 		len = data.ps.length;
 		for (i=0;i<len;i++) {
 			$("#processes").append("<tr><td>" + data.ps[i].user+"</td><td>" + data.ps[i].pid + "</td><td>" + data.ps[i].runTime + "</td><td>"+ data.ps[i].cmd +"</td></tr>");
 		}

 		setTimeout(rootProcesses,5000);
 	}).fail(function(error) {
 		errorCounter++;
 		$("#logRun").html(errorCounter);
 		console.log("error",error.statusText);
 		$("#log").prepend("Root process error "+new Date()+"<br>");
		
 		setTimeout(rootProcesses,5000);
 	});
}
