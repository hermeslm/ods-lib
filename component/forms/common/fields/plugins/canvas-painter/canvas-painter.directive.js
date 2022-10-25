'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainter', CanvasPainterDirective);

CanvasPainterDirective.$inject = ['dialogs'];

function CanvasPainterDirective(dialogs) {

  return {
    restrict: 'E',
    templateUrl: 'forms/common/fields/plugins/canvas-painter/canvas-painter.html',
    scope: {
      field: '='
    },
    link: function postLink(scope, elm) {
      var isTouch = !!('ontouchstart' in window);
      var PAINT_START = isTouch ? 'touchstart' : 'mousedown';
      var PAINT_MOVE = isTouch ? 'touchmove' : 'mousemove';
      var PAINT_END = isTouch ? 'touchend' : 'mouseup';

      scope.version = 0;

      // background image
      if (scope.field.options.imageSrc) {
        var image = new Image();
        image.onload = function () {
          ctx.drawImage(this, 0, 0);
          scope.field.options.width = image.width
          scope.field.options.height = image.height
        };
        image.src = scope.field.options.imageSrc;
      }

      //undo
      if (scope.field.options.undo) {
        var undoCache = [];
        scope.$watch(function () {
          return undoCache.length;
        }, function (newVal) {
          scope.version = newVal;
        });

        scope.$watch('version', function (newVal) {
          if (newVal < 0) {
            scope.version = 0;
            return;
          }
          if (newVal >= undoCache.length) {
            scope.version = undoCache.length;
            return;
          }
          undo(newVal);
        });
      }

      //create canvas and context
      var canvas = document.getElementById('ods-canvas');
      canvas.id = scope.field.options.canvasId;
      var canvasTmp = document.getElementById('ods-canvas-tmp');
      canvasTmp.id = scope.field.options.tmpCanvasId;
      var ctx = canvas.getContext('2d');
      var ctxTmp = canvasTmp.getContext('2d');

      //init variables
      var point = {
        x: 0,
        y: 0
      };
      var ppts = [];

      //set canvas size
      canvas.width = canvasTmp.width = scope.field.options.width;
      canvas.height = canvasTmp.height = scope.field.options.height;

      //set context style
      ctx.fillStyle = scope.field.options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctxTmp.globalAlpha = scope.field.options.opacity;
      ctxTmp.lineJoin = ctxTmp.lineCap = 'round';
      ctxTmp.lineWidth = 10;
      ctxTmp.strokeStyle = scope.field.options.color;


      //Watch options
      scope.$watch('field.options.lineWidth', function (newValue) {
        if (typeof newValue === 'string') {
          newValue = parseInt(newValue, 10);
        }
        if (newValue && typeof newValue === 'number') {
          ctxTmp.lineWidth = scope.field.options.lineWidth = newValue;
        }
      });

      scope.$watch('field.options.color', function (newValue) {
        if (newValue) {
          //ctx.fillStyle = newValue;
          ctxTmp.strokeStyle = ctxTmp.fillStyle = newValue;
        }
      });

      scope.$watch('field.options.opacity', function (newValue) {
        if (newValue) {
          ctxTmp.globalAlpha = newValue;
        }
      });

      var getOffset = function (elem) {
        var bbox = elem.getBoundingClientRect();
        return {
          left: bbox.left,
          top: bbox.top
        };
      };

      var setPointFromEvent = function (point, e) {
        if (isTouch) {
          point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
          point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
        } else {
          point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
          point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
        }
      };


      var paint = function (e) {
        if (e) {
          e.preventDefault();
          setPointFromEvent(point, e);
        }

        // Saving all the points in an array
        ppts.push({
          x: point.x,
          y: point.y
        });

        if (ppts.length === 3) {
          var b = ppts[0];
          ctxTmp.beginPath();
          ctxTmp.arc(b.x, b.y, ctxTmp.lineWidth / 2, 0, Math.PI * 2, !0);
          ctxTmp.fill();
          ctxTmp.closePath();
          return;
        }

        // Tmp canvas is always cleared up before drawing.
        ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);

        ctxTmp.beginPath();
        ctxTmp.moveTo(ppts[0].x, ppts[0].y);

        for (var i = 1; i < ppts.length - 2; i++) {
          var c = (ppts[i].x + ppts[i + 1].x) / 2;
          var d = (ppts[i].y + ppts[i + 1].y) / 2;
          ctxTmp.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
        }

        // For the last 2 points
        ctxTmp.quadraticCurveTo(
          ppts[i].x,
          ppts[i].y,
          ppts[i + 1].x,
          ppts[i + 1].y
        );
        ctxTmp.stroke();
      };

      var copyTmpImage = function () {
        if (scope.field.options.undo) {
          scope.$apply(function () {
            undoCache.push(ctx.getImageData(0, 0, canvasTmp.width, canvasTmp.height));
            if (angular.isNumber(scope.field.options.undo) && scope.field.options.undo > 0) {
              undoCache = undoCache.slice(-1 * scope.field.options.undo);
            }
          });
        }
        canvasTmp.removeEventListener(PAINT_MOVE, paint, false);
        ctx.drawImage(canvasTmp, 0, 0);
        ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
        ppts = [];
        scope.field.value = canvas.toDataURL();
      };

      var startTmpImage = function (e) {
        e.preventDefault();
        canvasTmp.addEventListener(PAINT_MOVE, paint, false);

        setPointFromEvent(point, e);
        ppts.push({
          x: point.x,
          y: point.y
        });
        ppts.push({
          x: point.x,
          y: point.y
        });

        paint();
      };

      var initListeners = function () {
        canvasTmp.addEventListener(PAINT_START, startTmpImage, false);
        canvasTmp.addEventListener(PAINT_END, copyTmpImage, false);

        if (!isTouch) {
          var MOUSE_DOWN;

          document.body.addEventListener('mousedown', mousedown);
          document.body.addEventListener('mouseup', mouseup);

          scope.$on('$destroy', removeEventListeners);

          canvasTmp.addEventListener('mouseenter', mouseenter);
          canvasTmp.addEventListener('mouseleave', mouseleave);
        }

        function mousedown() {
          MOUSE_DOWN = true;
        }

        function mouseup() {
          MOUSE_DOWN = false;
        }

        function removeEventListeners() {
          document.body.removeEventListener('mousedown', mousedown);
          document.body.removeEventListener('mouseup', mouseup);
        }

        function mouseenter(e) {
          // If the mouse is down when it enters the canvas, start a path
          if (MOUSE_DOWN) {
            startTmpImage(e);
          }
        }

        function mouseleave(e) {
          // If the mouse is down when it leaves the canvas, end the path
          if (MOUSE_DOWN) {
            copyTmpImage(e);
          }
        }
      };

      var undo = function (version) {
        if (undoCache.length > 0) {
          ctx.putImageData(undoCache[version], 0, 0);
          undoCache = undoCache.slice(0, version);
          scope.field.value = canvas.toDataURL();
        }
      };

      scope.undoCanvas = function () {
        scope.version--;
      };

      scope.clearCanvas = function () {
        dialogs.confirm('Confirm!!!', 'This operation will erase all draw you did, do you want to proceed?',
          {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
          scope.version = 0;
          scope.field.value = scope.field.options.imageSrc;
        });
      };

      scope.toggleEdit = function () {
        scope.field.readonly = !scope.field.readonly;
      };


      initListeners();
    }
  };
}
