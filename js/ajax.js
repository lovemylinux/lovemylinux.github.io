function sendRequest(file, _resultId, getRequestProc){
resultId = _resultId;
$.get(file,{},getRequestProc);
} 

function send_ajax(file){$.get(file,{});} 

function sendRequestPost(url, result) {
$.get(url,{},function (data){$('#'+result).html(data);});
}

function ajax_text_to_div(file, div){
	var div = '#'+div;
	$.get(file,{},function(data){$(div).html(data); $(div).show();});	
}

function sendform(name, url, result) {
	var form=document.getElementById(name);
	//url+="?";
	var data = {};
	for (var i=0; i < form.length; i++){
		var name= form[i].name;
		var value= form[i].value;
		if(name){
			//url+=form[i].name+"="+form[i].value+"&";
			data[name] = value;
		}
	}
	//alert(data);
	//sendRequestPost(url, result);
	$.get(url,data,function(data){$('#'+result).html(data); $('#'+result).show();});
}

var resultId = 0;