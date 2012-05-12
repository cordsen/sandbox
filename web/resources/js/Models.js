// Image Model - used for a generic image container in the select view
(function($) {
    "use strict";
    var Image = Backbone.Model.extend({
        // Standard attributes
        id: "",
        title: "",
        description: "",
        tags: [],
        captureDate: "",
        captureLocation: { lat: "", lon: "" },
        iconUri: "",
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
        model: Image
    });

    var ImageViewList = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new ImageList();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render();
        }
    });

    var ImageView = Backbone.View.extend({
        el: '#ezp_image_list',

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
            this.render(); // not all views are self-rendering. This one is.
        },

        render: function() {
            var newImage = $('#ezp_image').clone();
            newImage.find("img.image").attr('src', 'http://apps.ezprints.com/Assets/Artwork/Utility/SampleSource/Stock/6863944_00000_thumb.jpg');
            $(this.el).append(newImage);
        }

    });

    var photo = new ImageView();
})(jQuery);