const urldata = "recipe.json";

$(document).ready(function(){

	loadlist();
	//paginator(3);

	$("#btnFilter").click(function(e) {	


	// $(document).bind('keypress', function(e) {
 //            if(e.keyCode==13){
 //                 $('#btnFilter').trigger('click');
 //             }
 //     });

		//$("#btnFilter").submit(function() {


		var val = $("#filter").val();
		// let re = /\s*,\s*/;
		// var initialVal = $("#filter").val();
		// var val = initialVal.split(re);
		


		var option = $("#ddnFilter :selected").attr('id');



	 	filterlist(val,option);
	 	// for(let i = 0; i < val.length; i++) {
	 	// 	filterlist
	 	// }

	 	event.stopPropagation();
		console.log(val);

	});
 	
});


function loadlist(){
	var html = '';
	$.ajax({
		url:urldata,
		async: false,
		success:function(data){			
			if(data != undefined){
				data.recipes.map((recipe, index) => {
					html += `<li id=${index} class="col-lg-4 col-md-4 col-xs-12">	
							 <a class="recipe-link" href="recipe.source_url">    			  
							  <img src=${recipe.image_url} class="recipe-img" />
							  <span class="recipe-title">
							   <p><b>Title:</b> ${recipe.title}</p>
							   <p><b>Publisher:</b> ${recipe.publisher}</p>
							   <p><b>Social Rank:</b> ${recipe.social_rank}</p>
							  </span>
							  </a>
							 </li>`;

				});
			}else{
				html = `<div class="alert alert-primary" role="alert">
					 		No items found.
						</div>`;
			}
		},
		error: function(e){
			html = `<div class="alert alert-danger" role="alert">
					  Error: ${e.statusText}
					</div>`;
		}           
	});

	$("#recipes").html(html);
}



function filterlist(param,option){
	var html = `<div class="alert alert-primary" role="alert">
				  No items found.
				</div>`;
	if(option != -1 && param !== ""){
		$.ajax({
		   url:urldata,
		   async: false,
		   success:function(data){
		   		try {
		   			switch(option){		   			
			   			// case 'recipe_id':
			   			// 	filteredlist = data.recipes.filter((recipe) => recipe.recipe_id.toLowerCase().lastIndexOf(param.toLowerCase()) != -1);
			   			// 	break;

			   			case 'title':
			   				filteredlist = data.recipes.filter((recipe) => recipe.title.toLowerCase().lastIndexOf(param.toLowerCase()) != -1);
			   				break;

			   			case 'publisher':
			   				filteredlist = data.recipes.filter((recipe) => recipe.publisher.toLowerCase().lastIndexOf(param.toLowerCase()) != -1);
			   				break;

			   			// case 'social_rank':
			   			// 	filteredlist = data.recipes.filter((recipe) => recipe.social_rank == parseInt(param));
			   			// 	break;
			   		}

			    	if(filteredlist.length > 0){
			    		html ='';
			    		filteredlist.map((recipe, index) => {			    		
				    	html += `<li id=${index} class="col-lg-4 col-md-4 col-xs-12">

				    			<a class="recipe-link" href="recipe.source_url">

								<img src=${recipe.image_url} class="recipe-img" />
								<span class="recipe-title">
								
								<p><b>Title:</b> ${recipe.title}</p>
								<p><b>Publisher:</b> ${recipe.publisher}</p>
								<p><b>Social Rank:</b> ${recipe.social_rank}</p>
								</span>

								</a>

								</li>`;

						});
			    	}	    	
				}
				catch(err) {
    				html = `<div class="alert alert-danger" role="alert">
							  Error: ${err}
							</div>`;					
				}			
		   },
		    error: function(e){
				html = `<div class="alert alert-danger" role="alert">
						  Error: ${e.statusText}
						</div>`;
		   }           
		});
		$("#recipes").after().html(html);
	}else{
		loadlist();
	}
}