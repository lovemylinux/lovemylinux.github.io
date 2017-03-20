// JavaScript Document

function flash_init_search(params){
    var self=this;
    this.frame=1;
    this.access=1;
	this.offset=0;
	this.count_frames = params.count_frames;
	this.params = params;
    this.holder=this.find('div.holder');
    this.next=$(this).parent().find('.next');
    this.prev=$(this).parent().find('.prev');
	
	this.flash_go=flash_animate_search;
	this.check_count=check_count;
	this.load_frames=load_next_frame;
	
    this.next.click(function() {self.flash_go('up'); return false;});
    this.prev.click(function() {self.flash_go('down'); return false;});
	//this.check_count();
	hide_button(this.prev);
	
	
	this.load_frames(this.offset,params);
	this.count = params.count;
	if(this.count <= this.count_frames){hide_button(this.next);}
}
    
function check_count(){
	var count = this.holder.find(this.slide).size();
	this.holder.css({'width' : this.delta*(count)});
}
	
function hide_button(obj){
	//$(obj).fadeTo(300,0.3);
	$(obj).css({'background-position':'left bottom','cursor':'none'});
	}	
	
function show_button(obj){
	//$(obj).fadeTo(300,1);
	$(obj).css({'background-position':'left top','cursor':'pointer'});
	}	
	
function load_next_frame(offset,params){
	//alert(offset+'  -  '+id_razdel+'  -  '+tag_select);
	var holder = this.find('div.holder');
	var self = this;
	this.access=0; 
	params.offset = offset;
	$.post("/ajax/load_karusel.php",params,function(msg){
	holder.append(msg);
	holder.show();
	self.access=1;
	self.offset+=10;
	self.check_count();
	});
}
	
function flash_animate_search(act){		
    var self=this;
    if(!act){act='up';}
    if(!self.access){return false;}
    this.access=0;    
    if(act=='up'){this.frame+=this.count_frames;  show_button(this.prev);}
	if(act=='down'){this.frame-=this.count_frames; show_button(this.next);}
	//alert(this.frame);
	if(this.frame > (this.count - this.count_frames)+1){this.frame = (this.count-this.count_frames)+1;}
	//alert(this.frame);
	if(this.frame < 1 ){this.frame = 1;}
    if(this.frame >= (this.count-this.count_frames)){ hide_button(this.next);}
    if(this.frame<2){hide_button(this.prev);}
	
	
	
    this.holder.animate({'margin-left': -this.delta*(this.frame-1)+ 'px'},500, function(){self.access=1;});
	
	if((this.frame+this.count_frames)>=this.offset){
		//alert(this.frame + ' - ' + this.offset);
	this.load_frames(this.offset,this.params);
	}
}



