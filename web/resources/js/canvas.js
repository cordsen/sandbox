$(function () {
    var canvas1 = new fabric.Canvas('print-area');
    canvas1.add(new fabric.Rect({ width: 50, height: 50, fill: 'red', top: 100, left: 100 }));
    canvas1.add(new fabric.Rect({ width: 30, height: 30, fill: 'green', top: 50, left: 50 }));

    function observe(eventName) {
        canvas1.observe(eventName, function () { });
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
});