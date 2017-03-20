// JavaScript Document
$(document).ready(function(){
	$('.main_menu li').hover(
	function(){
		var rel = $(this).attr('rel');
		var div = $('.main_menu ul[rel="'+rel+'"]');
		if(!$(div).size()){return;}
		$(div).stop().fadeTo(300,1);
		$('a[rel='+rel+']',this).addClass('select');
		},
	function(){
		var rel = $(this).attr('rel');
		var div = $('.main_menu ul[rel="'+rel+'"]');
		if(!$(div).size()){return;}
		//$(div).slideUp(300);
		$(div).stop().fadeTo(300,0,function(){
			$(div).hide();
			});
		$('a[rel='+rel+']',this).removeClass('select');
		}
	);
});