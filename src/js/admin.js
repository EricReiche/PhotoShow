/**
 * This file implements admin.
 * 
 * PHP versions 4 and 5
 *
 * LICENSE:
 * 
 * This file is part of PhotoShow.
 *
 * PhotoShow is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PhotoShow is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PhotoShow.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package	  PhotoShow
 * @category  Website
 * @author	  Thibaud Rohmer <thibaud.rohmer@gmail.com>
 * @copyright 2011 Thibaud Rohmer
 * @license	  http://www.gnu.org/licenses/
 * @link	  http://github.com/thibaud-rohmer/PhotoShow-v2
 */

function init_admin(){

	$(".menu_title").draggable({
		cursor: 		"move",
		zIndex: 		1000,
		helper: 		'clone',
		appendTo: 		'body',
		scroll: 		false,
		revert: 		true
	});

	$(".panel .item").draggable({
		cursor: 		"move",
		zIndex: 		1000,
		helper: 		'clone',
		appendTo: 		'body',
		scroll: 		false,
		revert: 		true
	});


	$(".menu_title").droppable({
		hoverClass: "hovered",
		drop: 		function(event, ui){
						var dragg = ui.draggable;

						dragg.draggable('option','revert',false);
						from  = dragg.children(".path").text();
						to 	  = $(this).children(".path").text();

						if($(dragg).hasClass("menu_title")){
							$(".menu").load(".?t=Adm&a=Mov&j=Men",{'pathFrom' : from,'pathTo' : to, 'move':'directory'},init_menu);						
						}else{
							$(".panel").load(".?t=Adm&a=Mov&j=Pan",{'pathFrom' : from,'pathTo' : to, 'move':'directory'},init_menu);	
						}

					}
	});


	$(".bin").droppable({
		hoverClass: "hovered",
		drop: 		function(event, ui){
						var dragg = ui.draggable;
						dragg.draggable('option','revert',false);

						file  = dragg.children(".path").text();

						if($(dragg).hasClass("menu_title")){
							$("#page").load("?t=Adm&a=Del&j=Pag",{'del' : file },function(){
								init_panel();
								init_infos();
								init_admin();
							});
						}else{
							$(".panel").load("?t=Adm&a=Del&j=Pan",{'del' : file },init_panel);
						}

					}
	});

	$(".accountitem").draggable({
		cursor: 		"move",
		zIndex: 		1000,
		opacity: 		0.5,
		helper: 		'clone',
		appendTo: 		'body',
		scroll: 		false,
		revert: 		true
	});

	$(".groupitem").droppable({
		hoverClass: 	"hovered",
		drop: 			function(event,ui){

							var dragg = ui.draggable;
							if($(dragg).hasClass("accountitem")){
								dragg.draggable('option','revert',false);
								acc = dragg.children(".name").text();
								group = $(this).children(".name").text();
								$(".panel").load("?t=Adm&a=AGA&j=Acc",{'acc' : acc, 'group' : group },init_admin);
							}
						}
	})

	$(".rmacc").click(function(){
		group 	= $(this).parent().parent().children(".name").text();
		acc 	= $(this).parent().children(".accname").text();
		$(".panel").load("?t=Adm&a=AGR&j=Acc",{'acc' : acc, 'group' : group },init_admin);
	});

	$(".rmgroup").click(function(){
		acc		= $(this).parent().parent().children(".name").text();
		group 	= $(this).parent().children(".groupname").text();
		$(".panel").load("?t=Adm&a=AGR&j=Acc",{'acc' : acc, 'group' : group },init_admin);
	});

	$(".addgroup").submit(function(){
		$(".panel").load($(this).attr('action') + "&j=Acc",{"group": $(this).find("input[type='text']").val() },init_admin);
		return false;
	});


}