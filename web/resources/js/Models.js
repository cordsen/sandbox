(function($) {
// Image Model - used for a generic image container in the select view
    "use strict";
    var Image = Backbone.Model.extend({
        // Standard attributes
        id: "",
        title: "",
        description: "",
        tags: [],
        captureDate: "",
        captureLocation: { lat: "", lon: "" },
        iconUri: "http://apps.ezprints.com/Assets/Artwork/Utility/SampleSource/Stock/6863944_00000_thumb.jpg",
        screenUri: "",
        printUri: "",
        printSize: "",
        printWidth: "",
        printHeight: "",

        // Functions & Overrides
        initialize: function() { },

        validate: function() {
            // make sure screen uri is valid
            if (this.screenUri === "") {
                return "need at least a screenUri";
            }
        }

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
			this.el.attr('class', '');
            this.el.find("img.image").attr('src', this.model.iconUri);
            return this.el;
        }

    });

    var ImageViewList = Backbone.View.extend({
        el : 'div',

		events : {
			'click button#addPhoto:' : 'addItem'
		},
		
		initialize: function() {
            _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new ImageList();
            //this.collection.bind('addPhoto', this.appendItem); // collection event binder

            this.render();
        },
		
		render : function () {
			this.el = $('#ezp_image_list_template').clone();
			this.el.attr('id','photo list');
			this.el.attr('class', '');
			$('#ezp_container').append(this.el);

		},
		
		addItem : function () {
			var image = new Image();
			var iv = new ImageView({model: image});
			this.collection.add(image);
			this.el.append(iv.render());

		}
    });

    //var photo = new ImageView();
	var list = new ImageViewList();
})(jQuery);
