(function($) {
// Image Model - used for a generic image container in the select view
    "use strict";

    var root = this;
    var ezpimg;

    var Image = root.Image = Backbone.Model.extend({
        // Standard attributes
        defaults : {
            /*id: "",
            title: "",
            description: "",
            tags: [],
            captureDate: "",
            captureLocation: { lat: "", lon: "" }, */
            "iconUri": "http://apps.ezprints.com/Assets/Artwork/Utility/SampleSource/Stock/6863944_00000_thumb.jpg"
            /* screenUri: "",
            printUri: "",
            printSize: "",
            printWidth: "",
            printHeight: "" */
        },

        // Functions & Overrides
        //initialize: function() { },

        /*validate: function() {
            // make sure screen uri is valid
            if (this.screenUri === "") {
                return "need at least a screenUri";
            }
        }*/

    });

    var ImageList = Backbone.Collection.extend({
        model: Image,

        

    });

    var ImageView = Backbone.View.extend({
        el: 'div',

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        },

        render: function(list) {
            this.el = $('#ezp_image').clone();
			this.el.attr('class', 'image');
            this.el.find("img.image").attr('src', this.model.get('iconUri'));
            return this.el;
        }

    });

    var ImageViewList = Backbone.View.extend({
        el : 'div',

		events : {
			'click button#addPhoto:' : 'appendItem'
		},
		
		initialize: function() {
            _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new ImageList();
            this.collection.bind('add', this.addItem); // collection event binder

            this.render();
        },
		
		render : function () {
			this.el = $('#ezp_image_list_template').clone();
			this.el.attr('id','photo list');
			this.el.attr('class', 'span4');
			$('#ezp_container').append(this.el);

		},
		
		appendItem : function () {
			var image = new Image({});
			var iv = new ImageView({model: image});
			this.collection.add(image);
			this.el.find('#container').append(iv.render());
		},

		addItem : function (item) {
			var iv = new ImageView({model: item});
			this.el.find('#container').append(iv.render());
		}
    });

    //var photo = new ImageView();
    ezpimg = root.ezpimg = new ImageViewList();
    root.ezp = ezpimg.collection;

}).call(this, jQuery);


//ezp.add(new Image());

/* todo

API
 - add a photo
 - load a list of photos
 - load a list of albums
 - load a collection
 - show a different collection

View properties
 - outer container for photos tab: 
    - includes list of sources and collections(albums) in a mega-dropdown 
    - includes a list of photos for the current album (photo is a model)
 - 

View actions
 - zoom in on a photo
 - drag/drop a photo on product


 Models (JSON)
  - var source = {
   name:"facebook",
   icon:"",
   albums:[
      {
         name:"my friends",
         icon:"http://some url",
         assets:[
            {
               name:"my photo",
               imageUrl:"http://bla"
            },
            {
               name:"my photo",
               imageUrl:"http://bla"
            }
         ]
      },
      {
         name:"my other friends",
         icon:"http://some url",
         assets:[
            {
               name:"my photo",
               imageUrl:"http://bla"
            },
            {
               name:"my photo",
               imageUrl:"http://bla"
            }
         ]
      }
   ]
};
*/



