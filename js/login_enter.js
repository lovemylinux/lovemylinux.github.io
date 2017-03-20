// JavaScript Document

$(document).ready(function(){
	$('a.enter').hover(
	function(){
		var div = $('.cabinet_login');
		var obj = $(div).get(0);
		clearTimeout(obj.t);
		$(div).fadeTo(300,1);
		},
	function(){
		var div = $('cabinet_login');
		var obj = $(div).get(0);
		var code = function(){$(div).slideUp(300);}
		obj.t =  setTimeout(code,300);
		}
	);
	
	$('.cabinet_login').hover(
	function(){
		var obj = $(this).get(0);
		clearTimeout(obj.t);
		$(this).show();
		},
	function(){
		var obj = $(this).get(0);
		var code = function(){$(obj).slideUp(300);}
		obj.t =  setTimeout(code,300);
		}
	);
	
});