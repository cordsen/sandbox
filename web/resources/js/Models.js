(function($) {
// Image Model - used for a generic image container in the select view
    "use strict";

    var root = this;
    var ezpimg;
    var canvas1;
    var printArea;

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
        model: Image

    });

    var ImageView = Backbone.View.extend({
        el: 'div',

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        },
        

        render: function(list) {
            this.el = $('#ezp-templates #image').clone();
			//this.el.attr('class', 'image');
            //this.el.css('background-image','url('+this.model.get('iconUri')+')')
            var img = this.el.find("img.image");
            this.url = this.model.get('iconUri');
            img.attr('src', this.url);
            img.draggable({ appendTo: '#ezp-container', scroll: false, helper: 'clone', opacity: 0.60,
                stop: function(event, ui) {
                    var co = $('#print-area').offset(); 
                    fabric.Image.fromURL(event.srcElement.src, function(img) {
                          var oImg = img.set({ left: ui.offset.left - co.left, top: ui.offset.top - co.top});
                          canvas1.add(oImg);
                          canvas1.renderAll();
                            console.log(co.left);
                            console.log(co.top);
                        });
                         }});
            return this.el;
        }

    });

    var ImageViewList = Backbone.View.extend({
        el : 'div',

		events : {
			//'click button#addPhoto1:' : 'appendItem'
		},
		
		initialize: function() {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new ImageList();
            this.collection.bind('add', this.addItem); // collection event binder

            this.render();
        },
		
		appendItem : function () {
			var image = new Image({});
			var iv = new ImageView({model: image});
			this.collection.add(image);
//			this.el.find('#ezp-container .image-tray .body').append(iv.render());
		},

		addItem : function (item) {
			var iv = new ImageView({model: item});
			$('#ezp-container .image-tray .image-list').append(iv.render());
		},
		render : function () {
			this.el = $('#ezp-templates #addPhoto').clone();
			//this.el.attr('id','addPhoto1');
			//this.el.attr('class', 'span4');
			$(this.el).click(this.appendItem);
			$('#ezp-container .image-tray .header').append(this.el);
		}
		
    });

    //var photo = new ImageView();
    ezpimg = root.ezpimg = new ImageViewList();
    root.ezp = ezpimg.collection;


    canvas1 = new fabric.Canvas('print-area');
    canvas1.add(new fabric.Rect({ width: 50, height: 50, fill: 'red', top: 100, left: 100 }));
    canvas1.add(new fabric.Rect({ width: 30, height: 30, fill: 'green', top: 50, left: 50 }));

    function observe(eventName) {
        canvas1.observe(eventName, function() { });
    }

    observe('object:modified');
    observe('object:moving');
    observe('object:selected');

    observe('before:selection:cleared');
    observe('selection:cleared');
    observe('selection:created');

    // observe('after:render');
    observe('mouse:up');
    observe('mouse:down');

    


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
 - toggle between views

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



